import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { router } from 'expo-router';
import EditProfileModal from '../../components/EditProfileModal';
import TermsOfServiceModal from '../../components/TermsOfServiceModal';
import PrivacyPolicyModal from '../../components/PrivacyPolicyModal';
import InviteFriendsModal from '../../components/InviteFriendsModal';
import SupportModal from '../../components/SupportModal';

export default function ProfileScreen() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const { user: authUser, userProfile, logout, refreshUserProfile } = useAuth();
  const { settings, unreadCount, updateSettings, showSuccess } = useNotifications();

  // Données utilisateur depuis Firebase ou simulées
  const user = userProfile ? {
    name: userProfile.displayName,
    email: userProfile.email,
    avatar: '👤',
    joinDate: new Date(userProfile.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
    stats: {
      groupsJoined: 0, // À implémenter avec Firestore
      eventsAttended: 0, // À implémenter avec Firestore
      totalSpent: 0 // À implémenter avec Firestore
    }
  } : {
    name: 'Utilisateur',
    email: authUser?.email || 'email@exemple.com',
    avatar: '👤',
    joinDate: 'Récent',
    stats: {
      groupsJoined: 0,
      eventsAttended: 0,
      totalSpent: 0
    }
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleProfileUpdated = async () => {
    await refreshUserProfile();
  };

  const handleInviteFriends = () => {
    setShowInviteModal(true);
  };

  const handleSupport = () => {
    setShowSupportModal(true);
  };

  const handleTermsOfService = () => {
    setShowTermsModal(true);
  };

  const handlePrivacyPolicy = () => {
    setShowPrivacyModal(true);
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/onboarding');
            } catch {
              Alert.alert('Erreur', 'Impossible de vous déconnecter');
            }
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer le compte',
      'Cette action est irréversible. Toutes vos données seront supprimées définitivement.',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Supprimer définitivement', 
          style: 'destructive',
          onPress: () => {
            // Deuxième confirmation pour sécurité
            Alert.alert(
              'Êtes-vous absolument sûr ?',
              'Cette action ne peut pas être annulée. Votre compte et toutes vos données seront supprimés.',
              [
                { text: 'Non, annuler', style: 'cancel' },
                { 
                  text: 'Oui, supprimer mon compte', 
                  style: 'destructive',
                  onPress: async () => {
                    Alert.alert(
                      'Fonctionnalité en développement',
                      'La suppression de compte sera disponible dans une prochaine version.',
                      [{ text: 'Compris' }]
                    );
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity onPress={handleEditProfile}>
          <Text style={styles.editButton}>Modifier</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Profile */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{user.avatar}</Text>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.joinDate}>Membre depuis {user.joinDate}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Mes statistiques</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <IconSymbol name="person.3" size={24} color="#3B82F6" />
              <Text style={styles.statNumber}>{user.stats.groupsJoined}</Text>
              <Text style={styles.statLabel}>Groupes</Text>
            </View>
            
            <View style={styles.statItem}>
              <IconSymbol name="calendar" size={24} color="#10B981" />
              <Text style={styles.statNumber}>{user.stats.eventsAttended}</Text>
              <Text style={styles.statLabel}>Événements</Text>
            </View>
            
            <View style={styles.statItem}>
              <IconSymbol name="creditcard" size={24} color="#F59E0B" />
              <Text style={styles.statNumber}>{user.stats.totalSpent}€</Text>
              <Text style={styles.statLabel}>Dépensé</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconSymbol name="bell" size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={settings.inAppEnabled}
              onValueChange={(value) => {
                updateSettings({ inAppEnabled: value });
                showSuccess(value ? 'Notifications activées' : 'Notifications désactivées');
              }}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={settings.inAppEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <IconSymbol name="moon" size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>Mode sombre</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
              thumbColor={darkModeEnabled ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.notificationContainer}>
          <Text style={styles.sectionTitle}>Centre de notifications</Text>
          
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => router.push('/notifications')}
          >
            <View style={styles.notificationInfo}>
              <IconSymbol name="bell" size={20} color="#6B7280" />
              <Text style={styles.notificationLabel}>Voir toutes les notifications</Text>
            </View>
            <View style={styles.notificationBadgeContainer}>
              {unreadCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                </View>
              )}
              <IconSymbol name="chevron.right" size={16} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Actions</Text>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleInviteFriends}>
            <View style={styles.actionInfo}>
              <IconSymbol name="person.badge.plus" size={20} color="#3B82F6" />
              <Text style={styles.actionLabel}>Inviter des amis</Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleSupport}>
            <View style={styles.actionInfo}>
              <IconSymbol name="questionmark.circle" size={20} color="#3B82F6" />
              <Text style={styles.actionLabel}>Support & Aide</Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleTermsOfService}>
            <View style={styles.actionInfo}>
              <IconSymbol name="doc.text" size={20} color="#3B82F6" />
              <Text style={styles.actionLabel}>Conditions d&apos;utilisation</Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem} onPress={handlePrivacyPolicy}>
            <View style={styles.actionInfo}>
              <IconSymbol name="lock.shield" size={20} color="#3B82F6" />
              <Text style={styles.actionLabel}>Politique de confidentialité</Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerContainer}>
          <Text style={styles.sectionTitle}>Zone de danger</Text>
          
          <TouchableOpacity style={styles.dangerItem} onPress={handleLogout}>
            <View style={styles.actionInfo}>
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#EF4444" />
              <Text style={[styles.actionLabel, styles.dangerLabel]}>Se déconnecter</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.dangerItem} onPress={handleDeleteAccount}>
            <View style={styles.actionInfo}>
              <IconSymbol name="trash" size={20} color="#EF4444" />
              <Text style={[styles.actionLabel, styles.dangerLabel]}>Supprimer le compte</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfoContainer}>
          <Text style={styles.appVersion}>SocialPlanr v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 SocialPlanr. Tous droits réservés.</Text>
        </View>
      </ScrollView>

      {/* Modal de modification du profil */}
      <EditProfileModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onProfileUpdated={handleProfileUpdated}
      />

      {/* Modal des conditions d'utilisation */}
      <TermsOfServiceModal
        visible={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />

      {/* Modal de politique de confidentialité */}
      <PrivacyPolicyModal
        visible={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />

      {/* Modal d'invitation d'amis */}
      <InviteFriendsModal
        visible={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />

      {/* Modal de support */}
      <SupportModal
        visible={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  editButton: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  actionsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  dangerContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dangerLabel: {
    color: '#EF4444',
  },
  appInfoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  appVersion: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  notificationContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationLabel: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  notificationBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  notificationBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});