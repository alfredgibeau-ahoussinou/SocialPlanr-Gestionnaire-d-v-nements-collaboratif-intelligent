import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateGroupModal from '../../components/CreateGroupModal';
import CreateEventModal from '../../components/CreateEventModal';

// Types pour les données réelles
interface Group {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  members: string[];
  createdBy: string;
  createdAt: Date;
  status: 'active' | 'planning' | 'completed';
}

interface Event {
  id: string;
  title: string;
  description?: string;
  groupId?: string;
  date: Date;
  location?: string;
  createdBy: string;
  createdAt: Date;
  attendees: string[];
}

export default function GroupsScreen() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const { user, userProfile } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Écouter les groupes de l'utilisateur en temps réel
    const groupsQuery = query(
      collection(db, 'groups'),
      where('members', 'array-contains', user.uid)
    );

    const unsubscribeGroups = onSnapshot(groupsQuery, (snapshot) => {
      const userGroups = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Group[];
      setGroups(userGroups);
      setLoading(false);
    });

    // Écouter les événements récents
    const eventsQuery = query(
      collection(db, 'events'),
      where('attendees', 'array-contains', user.uid)
    );

    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      const userEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      setRecentEvents(userEvents.slice(0, 3)); // Derniers 3 événements
    });

    return () => {
      unsubscribeGroups();
      unsubscribeEvents();
    };
  }, [user]);

  const handleCreateGroup = () => {
    setShowCreateGroupModal(true);
  };

  const handleCreateEvent = () => {
    setShowCreateEventModal(true);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateIcon}>
        <Text style={styles.emptyStateEmoji}>🎉</Text>
      </View>
      <Text style={styles.emptyStateTitle}>Bienvenue sur SocialPlanr !</Text>
      <Text style={styles.emptyStateDescription}>
        Commencez à organiser vos événements en créant votre premier groupe ou événement.
      </Text>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleCreateGroup}>
          <Text style={styles.buttonIcon}>👥</Text>
          <Text style={styles.primaryButtonText}>Créer un groupe</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={handleCreateEvent}>
          <Text style={styles.buttonIcon}>📅</Text>
          <Text style={styles.secondaryButtonText}>Créer un événement</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>💡 Conseils pour commencer :</Text>
        <Text style={styles.tip}>• Créez un groupe pour inviter vos amis</Text>
        <Text style={styles.tip}>• Organisez des événements collaboratifs</Text>
        <Text style={styles.tip}>• Gérez les dépenses en groupe</Text>
      </View>
    </View>
  );

  const renderGroupCard = (group: Group) => (
    <TouchableOpacity key={group.id} style={styles.groupCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.groupName}>{group.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(group.status) }]}>
          <Text style={styles.statusText}>{getStatusText(group.status)}</Text>
        </View>
      </View>
      {group.description && (
        <Text style={styles.groupDescription}>{group.description}</Text>
      )}
      <View style={styles.cardFooter}>
        <Text style={styles.memberCount}>👥 {group.memberCount} membres</Text>
        <Text style={styles.lastActivity}>
          Créé le {new Date(group.createdAt).toLocaleDateString('fr-FR')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEventCard = (event: Event) => (
    <TouchableOpacity key={event.id} style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDate}>
          {new Date(event.date).toLocaleDateString('fr-FR')}
        </Text>
      </View>
      {event.description && (
        <Text style={styles.eventDescription}>{event.description}</Text>
      )}
      {event.location && (
        <Text style={styles.eventLocation}>📍 {event.location}</Text>
      )}
      <Text style={styles.attendeesCount}>👥 {event.attendees.length} participants</Text>
    </TouchableOpacity>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'planning': return '#F59E0B';
      case 'completed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'planning': return 'Planification';
      case 'completed': return 'Terminé';
      default: return 'Inconnu';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement de votre dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec informations utilisateur */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bonjour,</Text>
          <Text style={styles.userName}>{userProfile?.firstName || 'Utilisateur'} 👋</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateGroup}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {groups.length === 0 && recentEvents.length === 0 ? (
          // État vide - Première fois
          renderEmptyState()
        ) : (
          <>
            {/* Section Groupes - Affichée seulement si l'utilisateur a des groupes */}
            {groups.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Mes Groupes ({groups.length})</Text>
                  <TouchableOpacity onPress={handleCreateGroup}>
                    <Text style={styles.seeAllText}>Créer +</Text>
                  </TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {groups.map(renderGroupCard)}
                </ScrollView>
              </View>
            )}

            {/* Section Événements récents - Affichée seulement si l'utilisateur a des événements */}
            {recentEvents.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Événements récents ({recentEvents.length})</Text>
                  <TouchableOpacity onPress={handleCreateEvent}>
                    <Text style={styles.seeAllText}>Créer +</Text>
                  </TouchableOpacity>
                </View>
                
                <View>
                  {recentEvents.map(renderEventCard)}
                </View>
              </View>
            )}

            {/* Section Statistiques - Affichée seulement si l'utilisateur a des données */}
            {(groups.length > 0 || recentEvents.length > 0) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Vos statistiques</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{groups.length}</Text>
                    <Text style={styles.statLabel}>Groupes</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{recentEvents.length}</Text>
                    <Text style={styles.statLabel}>Événements</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statNumber}>
                      {groups.reduce((total, group) => total + group.memberCount, 0)}
                    </Text>
                    <Text style={styles.statLabel}>Participants</Text>
                  </View>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Modal de création de groupe */}
      <CreateGroupModal
        visible={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
      />

      {/* Modal de création d'événement */}
      <CreateEventModal
        visible={showCreateEventModal}
        onClose={() => setShowCreateEventModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  // État vide
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyStateEmoji: {
    fontSize: 40,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  actionButtons: {
    width: '100%',
    marginBottom: 32,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsContainer: {
    width: '100%',
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 12,
  },
  tip: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 6,
  },
  // Sections
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },

  // Cartes groupes
  groupCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginRight: 12,
    width: 250,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  groupDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  lastActivity: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  // Cartes événements
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  eventDate: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  attendeesCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  // Statistiques
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

});
