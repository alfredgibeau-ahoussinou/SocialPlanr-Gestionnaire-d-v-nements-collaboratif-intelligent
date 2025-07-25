import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useNotifications } from '../contexts/NotificationContext';

export default function NotificationsScreen() {
  const {
    inAppNotifications,
    unreadCount,
    settings,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
    updateSettings,
    showSuccess,
    showError,
    sendPushNotification,
  } = useNotifications();

  const [refreshing, setRefreshing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Ici on peut ajouter la logique pour récupérer les notifications depuis le serveur
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
    showSuccess('Toutes les notifications ont été marquées comme lues');
  };

  const handleClearAll = () => {
    Alert.alert(
      'Supprimer toutes les notifications',
      'Êtes-vous sûr de vouloir supprimer toutes les notifications ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            clearAllNotifications();
            showSuccess('Toutes les notifications ont été supprimées');
          },
        },
      ]
    );
  };

  const handleTestNotification = async () => {
    // Test de notification push
    if (settings.pushEnabled) {
      await sendPushNotification(
        'Test de notification',
        'Ceci est une notification de test depuis SocialPlanr !',
        { type: 'test' }
      );
      showSuccess('Notification push envoyée !');
    } else {
      showError('Les notifications push sont désactivées');
    }
  };

  const getNotificationIcon = (category: string, type: string) => {
    if (category === 'event') return 'calendar';
    if (category === 'group') return 'person.3';
    if (category === 'expense') return 'dollarsign.circle';
    
    switch (type) {
      case 'success':
        return 'checkmark.circle';
      case 'error':
        return 'xmark.circle';
      case 'warning':
        return 'exclamationmark.triangle';
      default:
        return 'info.circle';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#10B981';
      case 'error':
        return '#EF4444';
      case 'warning':
        return '#F59E0B';
      default:
        return '#3B82F6';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}j`;
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  };

  const renderNotificationItem = (notification: any) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadNotification,
      ]}
      onPress={() => markAsRead(notification.id)}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.notificationInfo}>
          <IconSymbol
            name={getNotificationIcon(notification.category, notification.type)}
            size={20}
            color={getNotificationColor(notification.type)}
          />
          <View style={styles.notificationContent}>
            <Text style={[
              styles.notificationTitle,
              !notification.read && styles.unreadText,
            ]}>
              {notification.title}
            </Text>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {notification.message}
            </Text>
            <Text style={styles.notificationTime}>
              {formatTime(notification.timestamp)}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => clearNotification(notification.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="trash" size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>
      
      {!notification.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color="#1F2937" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </Text>
        
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setShowSettings(!showSettings)}
        >
          <IconSymbol name="gear" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* Actions rapides */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleMarkAllRead}
          disabled={unreadCount === 0}
        >
          <IconSymbol name="checkmark.circle" size={18} color={unreadCount > 0 ? "#3B82F6" : "#9CA3AF"} />
          <Text style={[styles.actionText, unreadCount === 0 && styles.disabledText]}>
            Tout marquer comme lu
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleClearAll}
          disabled={inAppNotifications.length === 0}
        >
          <IconSymbol name="trash" size={18} color={inAppNotifications.length > 0 ? "#EF4444" : "#9CA3AF"} />
          <Text style={[styles.actionText, inAppNotifications.length === 0 && styles.disabledText]}>
            Tout supprimer
          </Text>
        </TouchableOpacity>
      </View>

      {/* Paramètres (collapsible) */}
      {showSettings && (
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Paramètres de notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconSymbol name="bell" size={20} color="#6B7280" />
              <View>
                <Text style={styles.settingLabel}>Notifications push</Text>
                <Text style={styles.settingDescription}>Recevoir des notifications même quand l&apos;app est fermée</Text>
              </View>
            </View>
            <Switch
              value={settings.pushEnabled}
              onValueChange={(value) => updateSettings({ pushEnabled: value })}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={settings.pushEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconSymbol name="app.badge" size={20} color="#6B7280" />
              <View>
                <Text style={styles.settingLabel}>Notifications in-app</Text>
                <Text style={styles.settingDescription}>Afficher les notifications dans l&apos;application</Text>
              </View>
            </View>
            <Switch
              value={settings.inAppEnabled}
              onValueChange={(value) => updateSettings({ inAppEnabled: value })}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={settings.inAppEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconSymbol name="calendar" size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Rappels d&apos;événements</Text>
            </View>
            <Switch
              value={settings.eventReminders}
              onValueChange={(value) => updateSettings({ eventReminders: value })}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={settings.eventReminders ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconSymbol name="person.3" size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Mises à jour de groupe</Text>
            </View>
            <Switch
              value={settings.groupUpdates}
              onValueChange={(value) => updateSettings({ groupUpdates: value })}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={settings.groupUpdates ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconSymbol name="dollarsign.circle" size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Alertes de frais</Text>
            </View>
            <Switch
              value={settings.expenseAlerts}
              onValueChange={(value) => updateSettings({ expenseAlerts: value })}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={settings.expenseAlerts ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconSymbol name="speaker.2" size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Son</Text>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => updateSettings({ soundEnabled: value })}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={settings.soundEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <TouchableOpacity
            style={styles.testButton}
            onPress={handleTestNotification}
          >
            <IconSymbol name="paperplane" size={18} color="#FFFFFF" />
            <Text style={styles.testButtonText}>Tester les notifications</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Liste des notifications */}
      <ScrollView
        style={styles.notificationsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {inAppNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="bell.slash" size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Aucune notification</Text>
            <Text style={styles.emptyMessage}>
              Vous n&apos;avez pas encore reçu de notifications. Elles apparaîtront ici.
            </Text>
          </View>
        ) : (
          inAppNotifications.map(renderNotificationItem)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  settingsButton: {
    padding: 8,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  disabledText: {
    color: '#9CA3AF',
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 12,
    marginTop: 2,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  testButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  unreadNotification: {
    borderColor: '#3B82F6',
    backgroundColor: '#F8FAFF',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  notificationInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  notificationContent: {
    marginLeft: 12,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: '600',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  deleteButton: {
    padding: 4,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 24,
  },
}); 
 