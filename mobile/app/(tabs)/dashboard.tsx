import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateEventModal from '../../components/CreateEventModal';

interface Event {
  id: string;
  title: string;
  date: Date;
  status: 'planning' | 'voting' | 'confirmed' | 'in_progress' | 'completed';
  attendees: string[];
  groupId?: string;
}

interface Group {
  id: string;
  name: string;
  members: string[];
  status: 'active' | 'planning' | 'completed';
}

export default function DashboardScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const { user, userProfile, logout } = useAuth();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (!user) return;

    // Écouter les événements de l'utilisateur
    const eventsQuery = query(
      collection(db, 'events'),
      where('attendees', 'array-contains', user.uid)
    );

    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      const userEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      setEvents(userEvents);
      setLoading(false);
    });

    // Écouter les groupes de l'utilisateur
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
    });

    // Animations d'entrée
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      unsubscribeEvents();
      unsubscribeGroups();
    };
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleCreateEvent = () => {
    setShowCreateEventModal(true);
  };

  const handleCreateGroup = () => {
    Alert.alert('Créer un groupe', 'Utilisez l\'onglet principal (Dashboard) pour créer vos groupes');
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Se déconnecter',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoggingOut(true);
              await logout();
            } catch (error) {
              setLoggingOut(false);
              Alert.alert(
                'Erreur',
                'Une erreur est survenue lors de la déconnexion. Veuillez réessayer.',
                [{ text: 'OK' }]
              );
              console.error('Erreur de déconnexion:', error);
            }
          },
        },
      ]
    );
  };

  const renderEmptyState = () => (
    <Animated.View style={[styles.emptyContainer, { opacity: fadeAnim }]}>
      <View style={styles.emptyIcon}>
        <Text style={styles.emptyEmoji}>📊</Text>
      </View>
      <Text style={styles.emptyTitle}>Aucune activité pour le moment</Text>
      <Text style={styles.emptyDescription}>
        Vos événements et statistiques apparaîtront ici une fois que vous aurez créé vos premiers groupes et événements.
      </Text>
      <View style={styles.emptyActions}>
        <TouchableOpacity style={styles.emptyButton} onPress={handleCreateGroup}>
          <Text style={styles.emptyButtonText}>👥 Créer un groupe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emptyButton} onPress={handleCreateEvent}>
          <Text style={styles.emptyButtonText}>📅 Créer un événement</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderStats = () => {
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      const now = new Date();
      return eventDate > now;
    }).length;

    const completedEvents = events.filter(event => event.status === 'completed').length;
    const totalParticipants = groups.reduce((total, group) => total + group.members.length, 0);

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{events.length}</Text>
          <Text style={styles.statLabel}>Événements</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{upcomingEvents}</Text>
          <Text style={styles.statLabel}>À venir</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedEvents}</Text>
          <Text style={styles.statLabel}>Terminés</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalParticipants}</Text>
          <Text style={styles.statLabel}>Participants</Text>
        </View>
      </View>
    );
  };

  const renderEventCard = (event: Event, index: number) => (
    <Animated.View
      key={event.id}
      style={[
        styles.eventCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(event.status) }]}>
          <Text style={styles.statusText}>{getStatusText(event.status)}</Text>
        </View>
      </View>
      <Text style={styles.eventDate}>
        📅 {new Date(event.date).toLocaleDateString('fr-FR')}
      </Text>
      <Text style={styles.eventParticipants}>
        👥 {event.attendees.length} participants
      </Text>
    </Animated.View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'voting': return '#F59E0B';
      case 'planning': return '#3B82F6';
      case 'in_progress': return '#8B5CF6';
      case 'completed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'voting': return 'Vote en cours';
      case 'planning': return 'Planification';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      default: return 'Inconnu';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            {userProfile ? `Bonjour ${userProfile.firstName}` : 'Vue d\'ensemble de vos activités'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.logoutButton, loggingOut && styles.logoutButtonDisabled]}
          onPress={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <ActivityIndicator size="small" color="#EF4444" />
          ) : (
            <View style={styles.logoutContent}>
              <IconSymbol name="power" size={20} color="#EF4444" />
              <Text style={styles.logoutText}>Déconnexion</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {events.length === 0 && groups.length === 0 ? (
          renderEmptyState()
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            {/* Statistiques */}
            {(events.length > 0 || groups.length > 0) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Statistiques</Text>
                {renderStats()}
              </View>
            )}

            {/* Événements récents */}
            {events.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Événements récents</Text>
                {events.slice(0, 3).map(renderEventCard)}
              </View>
            )}
          </Animated.View>
        )}
      </ScrollView>

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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  // État vide
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyEmoji: {
    fontSize: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyActions: {
    gap: 12,
  },
  emptyButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  emptyButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  // Statistiques
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
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
  eventDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  eventParticipants: {
    fontSize: 14,
    color: '#6B7280',
  },
  // Bouton de déconnexion
  logoutButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    minWidth: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonDisabled: {
    opacity: 0.6,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
}); 