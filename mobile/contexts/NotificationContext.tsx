import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert , Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// Types pour les notifications
export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
  read: boolean;
  category?: 'event' | 'group' | 'expense' | 'system';
  actionData?: any;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  inAppEnabled: boolean;
  eventReminders: boolean;
  groupUpdates: boolean;
  expenseAlerts: boolean;
  systemNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

interface NotificationContextType {
  // État des notifications
  inAppNotifications: InAppNotification[];
  unreadCount: number;
  settings: NotificationSettings;
  
  // Actions pour les notifications in-app
  addNotification: (notification: Omit<InAppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Gestion des paramètres
  updateSettings: (newSettings: Partial<NotificationSettings>) => void;
  
  // Notifications push
  expoPushToken: string | null;
  registerForPushNotifications: () => Promise<string | null>;
  sendPushNotification: (title: string, body: string, data?: any) => Promise<void>;
  
  // Utilitaires
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const defaultSettings: NotificationSettings = {
  pushEnabled: true,
  inAppEnabled: true,
  eventReminders: true,
  groupUpdates: true,
  expenseAlerts: true,
  systemNotifications: true,
  soundEnabled: true,
  vibrationEnabled: true,
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Configuration des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [inAppNotifications, setInAppNotifications] = useState<InAppNotification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  // Calculer le nombre de notifications non lues
  const unreadCount = inAppNotifications.filter(notification => !notification.read).length;

  // Initialiser les notifications push au montage
  useEffect(() => {
    if (settings.pushEnabled) {
      registerForPushNotifications();
    }
  }, [settings.pushEnabled]);

  // Fonction pour ajouter une notification in-app
  const addNotification = (notification: Omit<InAppNotification, 'id' | 'timestamp' | 'read'>) => {
    if (!settings.inAppEnabled) return;

    const newNotification: InAppNotification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };

    setInAppNotifications(prev => [newNotification, ...prev]);

    // Limiter à 50 notifications maximum
    setInAppNotifications(prev => prev.slice(0, 50));
  };

  // Marquer une notification comme lue
  const markAsRead = (id: string) => {
    setInAppNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setInAppNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Supprimer une notification
  const clearNotification = (id: string) => {
    setInAppNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Supprimer toutes les notifications
  const clearAllNotifications = () => {
    setInAppNotifications([]);
  };

  // Mettre à jour les paramètres
  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    
    // Si les notifications push sont désactivées, annuler l'enregistrement
    if (newSettings.pushEnabled === false) {
      setExpoPushToken(null);
    } else if (newSettings.pushEnabled === true && !expoPushToken) {
      registerForPushNotifications();
    }
  };

  // Enregistrer pour les notifications push
  const registerForPushNotifications = async (): Promise<string | null> => {
    let token = null;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permissions requises',
          'Les notifications push ne fonctionneront pas sans autorisation. Vous pouvez les activer dans les paramètres de votre appareil.',
          [{ text: 'OK' }]
        );
        return null;
      }
      
      try {
        const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        
        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        setExpoPushToken(token);
      } catch (e) {
        console.error('Erreur lors de l\'obtention du token push:', e);
        Alert.alert('Erreur', 'Impossible d\'obtenir le token de notification push');
      }
    } else {
      console.log('Les notifications push ne fonctionnent que sur un appareil physique');
    }

    return token;
  };

  // Envoyer une notification push (pour test)
  const sendPushNotification = async (title: string, body: string, data: any = {}) => {
    if (!expoPushToken) {
      console.log('Aucun token push disponible');
      return;
    }

    const message = {
      to: expoPushToken,
      sound: settings.soundEnabled ? 'default' : null,
      title,
      body,
      data,
      channelId: 'default',
    };

    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const result = await response.json();
      console.log('Notification push envoyée:', result);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification push:', error);
    }
  };

  // Fonctions utilitaires pour les notifications rapides
  const showSuccess = (message: string) => {
    addNotification({
      title: 'Succès',
      message,
      type: 'success',
      category: 'system',
    });
  };

  const showError = (message: string) => {
    addNotification({
      title: 'Erreur',
      message,
      type: 'error',
      category: 'system',
    });
  };

  const showWarning = (message: string) => {
    addNotification({
      title: 'Attention',
      message,
      type: 'warning',
      category: 'system',
    });
  };

  const showInfo = (message: string) => {
    addNotification({
      title: 'Information',
      message,
      type: 'info',
      category: 'system',
    });
  };

  const value = {
    // État
    inAppNotifications,
    unreadCount,
    settings,
    
    // Actions
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
    updateSettings,
    
    // Push notifications
    expoPushToken,
    registerForPushNotifications,
    sendPushNotification,
    
    // Utilitaires
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
} 
 