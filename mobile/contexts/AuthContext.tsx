import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { configureGoogleSignIn } from '../config/googleAuth';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
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

  // Configuration WebBrowser pour l'authentification web
  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Charger le profil utilisateur depuis Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error('Erreur lors du chargement du profil:', error);
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
      
      // Créer le compte Firebase Auth
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Mettre à jour le profil avec le nom d'affichage
      const displayName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName });
      
      // Créer le profil utilisateur dans Firestore
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
      
      // Créer l'URL d'authentification Google
      const redirectUri = makeRedirectUri({
        scheme: 'com.socialplanr.app',
        path: 'auth/google'
      });
      
      const authUrl = `https://accounts.google.com/oauth/authorize?` +
        `client_id=717130341106-o33mfjv8ua420v62hulkgr818m46gut2.apps.googleusercontent.com&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=openid%20email%20profile&` +
        `state=google_signin`;

      // Ouvrir le navigateur pour l'authentification
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

      if (result.type === 'success' && result.url) {
        // Extraire le code d'autorisation de l'URL de retour
        const url = new URL(result.url);
        const code = url.searchParams.get('code');
        
        if (!code) {
          throw new Error('Code d\'autorisation non reçu');
        }

        // Échanger le code contre un token (nécessiterait un endpoint backend)
        // Pour l'instant, on simule une connexion réussie
        console.log('✅ Code d\'autorisation Google reçu:', code);
        
        // Simulation : créer un utilisateur de test
        // EN PRODUCTION : Il faudrait échanger le code contre un token via votre backend
        throw new Error('Connexion Google nécessite un backend pour échanger le code contre un token. Utilisez email/mot de passe pour l\'instant.');

      } else if (result.type === 'cancel') {
        // Connexion annulée par l'utilisateur
        setLoading(false);
        return; // Pas d'erreur affichée
      } else {
        throw new Error('Authentification Google échouée');
      }

    } catch (error: any) {
      setLoading(false);
      console.error('Erreur Google Sign-In:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Déconnexion Firebase uniquement (pas de déconnexion Google native nécessaire avec WebBrowser)
      await signOut(auth);
      setUserProfile(null);
      console.log('✅ Déconnexion Firebase réussie');
    } catch (error) {
      throw error;
    }
  };

  const refreshUserProfile = async () => {
    if (!user) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as UserProfile);
      }
    } catch (error) {
      console.error('Erreur lors du rechargement du profil:', error);
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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};