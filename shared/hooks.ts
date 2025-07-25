import { useState, useEffect, useCallback } from 'react';
import { AuthState, AuthUser, ApiResponse, Group, Event } from './types';

// Hook pour la gestion de l'authentification
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  const login = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // TODO: Implémentation avec Supabase
      // const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      
      // Mock pour le développement
      const mockUser: AuthUser = {
        id: '1',
        email,
        displayName: email.split('@')[0],
        emailVerified: true,
        provider: 'email'
      };
      
      setAuthState({
        user: mockUser,
        loading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erreur de connexion'
      }));
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // TODO: Implémentation avec Supabase
      // const { user, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      
      // Mock pour le développement
      const mockUser: AuthUser = {
        id: '1',
        email: 'user@gmail.com',
        displayName: 'Utilisateur Test',
        avatar: 'https://via.placeholder.com/100',
        emailVerified: true,
        provider: 'google'
      };
      
      setAuthState({
        user: mockUser,
        loading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erreur de connexion Google'
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, loading: true }));
    try {
      // TODO: Implémentation avec Supabase
      // await supabase.auth.signOut();
      
      setAuthState({
        user: null,
        loading: false,
        error: null
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erreur de déconnexion'
      }));
    }
  }, []);

  return {
    ...authState,
    login,
    loginWithGoogle,
    logout
  };
};

// Hook pour la gestion des groupes
export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implémentation avec API
      // const response = await fetch('/api/groups');
      // const data = await response.json();
      
      // Mock pour le développement
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockGroups: Group[] = [
        {
          id: '1',
          name: 'Week-end à Paris',
          description: 'Découverte de la capitale',
          adminId: '1',
          admin: {
            id: '1',
            email: 'user@gmail.com',
            displayName: 'Utilisateur Test',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          members: [],
          status: 'active' as any,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      setGroups(mockGroups);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors du chargement des groupes');
    } finally {
      setLoading(false);
    }
  }, []);

  const createGroup = useCallback(async (name: string, description?: string) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implémentation avec API
      const newGroup: Group = {
        id: Date.now().toString(),
        name,
        description,
        adminId: '1',
        admin: {
          id: '1',
          email: 'user@gmail.com',
          displayName: 'Utilisateur Test',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        members: [],
        status: 'active' as any,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setGroups(prev => [...prev, newGroup]);
      return newGroup;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la création du groupe');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {
    groups,
    loading,
    error,
    fetchGroups,
    createGroup
  };
};

// Hook pour la gestion des événements
export const useEvents = (groupId?: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!groupId) return;
    
    setLoading(true);
    setError(null);
    try {
      // TODO: Implémentation avec API
      // Mock pour le développement
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockEvents: Event[] = [
        {
          id: '1',
          groupId,
          group: {} as Group, // Sera populate par l'API
          title: 'Week-end découverte',
          description: 'Exploration de la ville',
          status: 'planning' as any,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      setEvents(mockEvents);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const createEvent = useCallback(async (title: string, description?: string) => {
    if (!groupId) throw new Error('Group ID requis');
    
    setLoading(true);
    setError(null);
    try {
      // TODO: Implémentation avec API
      const newEvent: Event = {
        id: Date.now().toString(),
        groupId,
        group: {} as Group,
        title,
        description,
        status: 'planning' as any,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la création de l\'événement');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent
  };
};

// Hook générique pour les appels API
export const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (options?: RequestInit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: ApiResponse<T> = await response.json();
      
      if (result.success && result.data) {
        setData(result.data);
      } else {
        throw new Error(result.error || 'Erreur inconnue');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur de réseau');
    } finally {
      setLoading(false);
    }
  }, [url]);

  return {
    data,
    loading,
    error,
    execute
  };
};

// Hook pour la debounce
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook pour la gestion du storage local
export const useStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`Erreur lors de la lecture de ${key}:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erreur lors de l'écriture de ${key}:`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Erreur lors de la suppression de ${key}:`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}; 