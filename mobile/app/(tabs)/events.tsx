import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { showCalendarOptions, calculateEndDate, CalendarEvent } from '../../utils/calendarUtils';
import CreateEventModal from '../../components/CreateEventModal';

interface Event {
  id: string;
  title: string;
  description?: string;
  groupId?: string;
  status: 'planning' | 'voting' | 'confirmed' | 'in_progress' | 'completed';
  date: Date;
  location?: string;
  attendees: string[];
  createdBy: string;
  createdAt: Date;
}

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Écouter les événements de l'utilisateur en temps réel
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

    return () => {
      unsubscribeEvents();
    };
  }, [user]);

  const handleCreateEvent = () => {
    setShowCreateModal(true);
  };

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

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Text style={styles.emptyEmoji}>📅</Text>
      </View>
      <Text style={styles.emptyTitle}>Aucun événement</Text>
      <Text style={styles.emptyDescription}>
        Vous n&apos;avez créé aucun événement pour le moment.{'\n'}
        Commencez par créer votre premier événement !
      </Text>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>📅 Créer un événement</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddToCalendar = (event: Event) => {
    const calendarEvent: CalendarEvent = {
      title: event.title,
      description: event.description || `Événement SocialPlanr`,
      location: event.location || '',
      startDate: new Date(event.date),
      endDate: calculateEndDate(new Date(event.date), 60),
    };
    showCalendarOptions(calendarEvent);
  };

  const renderEventCard = (event: Event) => (
    <View
      key={event.id}
      style={styles.eventCard}
    >
      <TouchableOpacity
        onPress={() => Alert.alert(event.title, 'Fonctionnalité de détail en cours de développement')}
        activeOpacity={0.7}
      >
        <View style={styles.eventHeader}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            {event.description && (
              <Text style={styles.eventDescription}>{event.description}</Text>
            )}
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(event.status) }]}>
            <Text style={styles.statusText}>{getStatusText(event.status)}</Text>
          </View>
        </View>

        <View style={styles.eventDetails}>
          <View style={styles.eventDetail}>
            <Text style={styles.detailLabel}>📅 Date :</Text>
            <Text style={styles.detailValue}>
              {new Date(event.date).toLocaleDateString('fr-FR')}
            </Text>
          </View>
          
          {event.location && (
            <View style={styles.eventDetail}>
              <Text style={styles.detailLabel}>📍 Lieu :</Text>
              <Text style={styles.detailValue}>{event.location}</Text>
            </View>
          )}

          <View style={styles.eventDetail}>
            <Text style={styles.detailLabel}>👥 Participants :</Text>
            <Text style={styles.detailValue}>{event.attendees.length} personnes</Text>
          </View>
        </View>

        <View style={styles.eventFooter}>
          <Text style={styles.eventDate}>
            Créé le {new Date(event.createdAt).toLocaleDateString('fr-FR')}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Bouton d'ajout au calendrier */}
      <View style={styles.eventActions}>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => handleAddToCalendar(event)}
        >
          <Text style={styles.calendarButtonText}>📅 Ajouter au calendrier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement de vos événements...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mes Événements</Text>
          <Text style={styles.headerSubtitle}>
            {events.length > 0 ? `${events.length} événement${events.length > 1 ? 's' : ''}` : 'Aucun événement'}
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateEvent}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {events.length === 0 ? (
          renderEmptyState()
        ) : (
          <View style={styles.eventsList}>
            {events.map(renderEventCard)}
          </View>
        )}
      </ScrollView>

      {/* Modal de création d'événement */}
      <CreateEventModal 
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
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
    paddingHorizontal: 20,
  },
  // État vide
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
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
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
    marginBottom: 32,
  },
  createButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Liste des événements
  eventsList: {
    paddingVertical: 20,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  eventInfo: {
    flex: 1,
    marginRight: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    minWidth: 100,
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    flex: 1,
  },
  eventFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  eventDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  calendarButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  calendarButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});