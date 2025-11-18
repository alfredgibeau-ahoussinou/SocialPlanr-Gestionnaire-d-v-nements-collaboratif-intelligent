"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  createdAt: Date;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Charger le profil utilisateur depuis Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserProfile({
              uid: data.uid || user.uid,
              email: data.email || user.email || '',
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              displayName: data.displayName || user.displayName || '',
              createdAt: data.createdAt?.toDate() || data.createdAt || new Date(),
            });
          } else {
            // Si le profil n'existe pas, créer un profil par défaut
            const defaultProfile: UserProfile = {
              uid: user.uid,
              email: user.email || '',
              firstName: '',
              lastName: '',
              displayName: user.displayName || '',
              createdAt: new Date(),
            };
            try {
              await setDoc(doc(db, 'users', user.uid), defaultProfile);
              setUserProfile(defaultProfile);
            } catch (createError) {
              console.error('Erreur lors de la création du profil:', createError);
              setUserProfile(defaultProfile);
            }
          }
        } catch (error: unknown) {
          if (error && typeof error === 'object' && 'code' in error && error.code === 'permission-denied') {
            console.log('ℹ️ Règles Firestore non publiées. Utilisation des données Firebase Auth.');
            setUserProfile({
              uid: user.uid,
              email: user.email || '',
              firstName: '',
              lastName: '',
              displayName: user.displayName || '',
              createdAt: new Date(),
            });
          } else {
            console.error('Erreur lors du chargement du profil:', error);
            setUserProfile({
              uid: user.uid,
              email: user.email || '',
              firstName: '',
              lastName: '',
              displayName: user.displayName || '',
              createdAt: new Date(),
            });
          }
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName });
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        firstName,
        lastName,
        displayName,
        createdAt: new Date(),
      };
      await setDoc(doc(db, 'users', user.uid), userProfile);
      setUserProfile(userProfile);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      throw error;
    }
  };

  const refreshUserProfile = async () => {
    if (!user) return;
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserProfile({
          uid: data.uid || user.uid,
          email: data.email || user.email || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          displayName: data.displayName || user.displayName || '',
          createdAt: data.createdAt?.toDate() || new Date(),
        });
      }
    } catch (error: unknown) {
      console.error('Erreur lors du rafraîchissement du profil:', error);
      if (error && typeof error === 'object' && 'code' in error && error.code === 'permission-denied') {
        setUserProfile({
          uid: user.uid,
          email: user.email || '',
          firstName: '',
          lastName: '',
          displayName: user.displayName || '',
          createdAt: new Date(),
        });
      }
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    login,
    signup,
    signInWithGoogle,
    logout,
    refreshUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
