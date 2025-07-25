import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import NotificationBanner from './NotificationBanner';
import { useNotifications, InAppNotification } from '../contexts/NotificationContext';

export default function NotificationManager() {
  const { inAppNotifications, markAsRead, clearNotification } = useNotifications();
  const [currentNotification, setCurrentNotification] = useState<InAppNotification | null>(null);
  const [notificationQueue, setNotificationQueue] = useState<InAppNotification[]>([]);

  useEffect(() => {
    // Filtrer les nouvelles notifications non lues
    const unreadNotifications = inAppNotifications.filter(n => !n.read);
    
    if (unreadNotifications.length > 0 && !currentNotification) {
      // Afficher la notification la plus récente
      const latestNotification = unreadNotifications[0];
      setCurrentNotification(latestNotification);
      
      // Marquer comme lue immédiatement
      markAsRead(latestNotification.id);
      
      // Ajouter les autres à la queue si il y en a
      if (unreadNotifications.length > 1) {
        setNotificationQueue(unreadNotifications.slice(1));
      }
    }
  }, [inAppNotifications, currentNotification]);

  const handleNotificationDismiss = () => {
    setCurrentNotification(null);
    
    // Afficher la prochaine notification de la queue s'il y en a une
    if (notificationQueue.length > 0) {
      const nextNotification = notificationQueue[0];
      setCurrentNotification(nextNotification);
      markAsRead(nextNotification.id);
      setNotificationQueue(prev => prev.slice(1));
    }
  };

  const handleNotificationPress = () => {
    // Ici on peut ajouter la logique pour naviguer vers l'écran approprié
    // basé sur notification.category et notification.actionData
    if (currentNotification) {
      console.log('Navigation vers:', currentNotification.category, currentNotification.actionData);
    }
  };

  if (!currentNotification) {
    return null;
  }

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999 }}>
      <NotificationBanner
        notification={currentNotification}
        onPress={handleNotificationPress}
        onDismiss={handleNotificationDismiss}
        autoHide={true}
        duration={4000}
      />
    </View>
  );
} 
 