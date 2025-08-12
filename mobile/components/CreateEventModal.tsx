import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Switch,
} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { showCalendarOptions, calculateEndDate, CalendarEvent } from '../utils/calendarUtils';
import { createEventNotifications } from '../utils/notificationHelpers';

interface CreateEventModalProps {
  visible: boolean;
  onClose: () => void;
}

interface Group {
  id: string;
  name: string;
  members: string[];
}

export default function CreateEventModal({ visible, onClose }: CreateEventModalProps) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [eventLocation, setEventLocation] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [addToCalendar, setAddToCalendar] = useState(true);
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // const [showTimePicker, setShowTimePicker] = useState(false);
  const { user } = useAuth();
  const { addNotification, showError } = useNotifications();

  useEffect(() => {
    if (visible && user) {
      loadUserGroups();
      // Réinitialiser les dates à aujourd'hui + 1 heure
      const now = new Date();
      const futureTime = new Date(now.getTime() + 60 * 60 * 1000);
      setEventDate(now);
      setEventTime(futureTime);
    }
  }, [visible, user]);

  const loadUserGroups = async () => {
    if (!user) return;

    try {
      const groupsQuery = query(
        collection(db, 'groups'),
        where('members', 'array-contains', user.uid)
      );
      
      const snapshot = await getDocs(groupsQuery);
      const groups = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Group[];
      
      setUserGroups(groups);
    } catch (error) {
      console.error('Erreur lors du chargement des groupes:', error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const adjustDate = (days: number) => {
    const newDate = new Date(eventDate);
    newDate.setDate(newDate.getDate() + days);
    
    // Empêcher de programmer dans le passé
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newDate >= today) {
      setEventDate(newDate);
    }
  };

  const setSpecificTime = (hours: number, minutes: number = 0) => {
    const newTime = new Date();
    newTime.setHours(hours, minutes, 0, 0);
    setEventTime(newTime);
  };

  const handleCreateEvent = async () => {
    if (!eventTitle.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un titre pour l\'événement');
      return;
    }

    if (!user) {
      Alert.alert('Erreur', 'Vous devez être connecté pour créer un événement');
      return;
    }

    // Vérifier que la date n'est pas dans le passé
    const now = new Date();
    const finalDateTime = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
      eventTime.getHours(),
      eventTime.getMinutes()
    );

    if (finalDateTime <= now) {
      Alert.alert('Erreur', 'L\'événement ne peut pas être programmé dans le passé');
      return;
    }

    setLoading(true);

    try {
      const eventData = {
        title: eventTitle.trim(),
        description: eventDescription.trim() || null,
        date: finalDateTime,
        location: eventLocation.trim() || null,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        attendees: [user.uid], // Le créateur participe automatiquement
        groupId: selectedGroupId || null,
        // Métadonnées pour les fonctionnalités futures
        votes: [],
        expenses: [],
        status: 'planning',
      };

      const docRef = await addDoc(collection(db, 'events'), eventData);
      
      // Créer une notification de succès
      addNotification(createEventNotifications.eventCreated({
        eventId: docRef.id,
        eventTitle: eventTitle.trim(),
        eventDate: finalDateTime,
        location: eventLocation.trim() || undefined,
      }));
      
      // Préparer les données de l'événement pour l'ajout au calendrier
      const calendarEvent: CalendarEvent = {
        title: eventTitle.trim(),
        description: eventDescription.trim() || `Événement créé avec SocialPlanr`,
        location: eventLocation.trim() || '',
        startDate: finalDateTime,
        endDate: calculateEndDate(finalDateTime, 60), // 1 heure par défaut
      };

      // Afficher l'alerte en fonction de l'option calendrier
      if (addToCalendar) {
        Alert.alert(
          '🎉 Événement créé !',
          `L'événement "${eventTitle}" a été créé avec succès pour le ${formatDate(finalDateTime)} à ${formatTime(finalDateTime)}.`,
          [
            { 
              text: 'Terminer', 
              style: 'cancel',
              onPress: () => {
                resetForm();
                onClose();
              }
            },
            {
              text: '📅 Ajouter au calendrier',
              onPress: () => {
                showCalendarOptions(calendarEvent);
                resetForm();
                onClose();
              }
            }
          ]
        );
      } else {
        Alert.alert(
          '🎉 Événement créé !',
          `L'événement "${eventTitle}" a été créé avec succès pour le ${formatDate(finalDateTime)} à ${formatTime(finalDateTime)}.`,
          [{ 
            text: 'Parfait !', 
            onPress: () => {
              resetForm();
              onClose();
            }
          }]
        );
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
      showError('Impossible de créer l\'événement. Veuillez réessayer.');
      Alert.alert('Erreur', 'Impossible de créer l\'événement. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEventTitle('');
    setEventDescription('');
    setEventLocation('');
    setSelectedGroupId('');
    setAddToCalendar(true);
    const now = new Date();
    const futureTime = new Date(now.getTime() + 60 * 60 * 1000);
    setEventDate(now);
    setEventTime(futureTime);
  };

  const handleClose = () => {
    if (loading) return;
    resetForm();
    onClose();
  };

  const isFormValid = eventTitle.trim().length > 0;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Nouvel événement</Text>
                <TouchableOpacity 
                  onPress={handleClose} 
                  style={styles.closeButton}
                  disabled={loading}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Formulaire */}
              <View style={styles.form}>
                {/* Titre de l'événement */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>📅 Titre de l&apos;événement *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Soirée cinéma, Week-end ski..."
                    value={eventTitle}
                    onChangeText={setEventTitle}
                    autoCapitalize="words"
                    maxLength={50}
                    editable={!loading}
                  />
                  <Text style={styles.inputHint}>{eventTitle.length}/50 caractères</Text>
                </View>

                {/* Date et Heure */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>📆 Date</Text>
                  
                  <View style={styles.datePickerRow}>
                    <TouchableOpacity 
                      style={styles.dateAdjustButton}
                      onPress={() => adjustDate(-1)}
                      disabled={loading}
                    >
                      <Text style={styles.dateAdjustButtonText}>◀</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.dateDisplay}>
                      <Text style={styles.dateDisplayText}>
                        📅 {formatDate(eventDate)}
                      </Text>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.dateAdjustButton}
                      onPress={() => adjustDate(1)}
                      disabled={loading}
                    >
                      <Text style={styles.dateAdjustButtonText}>▶</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={[styles.label, {marginTop: 15}]}>🕐 Heure</Text>
                  <View style={styles.timePickerGrid}>
                    {[
                      { label: '9h00', hours: 9 },
                      { label: '12h00', hours: 12 },
                      { label: '14h00', hours: 14 },
                      { label: '17h00', hours: 17 },
                      { label: '19h00', hours: 19 },
                      { label: '21h00', hours: 21 },
                    ].map((time) => (
                      <TouchableOpacity
                        key={time.hours}
                        style={[
                          styles.timeOption,
                          eventTime.getHours() === time.hours && styles.timeOptionSelected
                        ]}
                        onPress={() => setSpecificTime(time.hours)}
                        disabled={loading}
                      >
                        <Text style={[
                          styles.timeOptionText,
                          eventTime.getHours() === time.hours && styles.timeOptionTextSelected
                        ]}>
                          {time.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  
                  <Text style={styles.selectedDateTime}>
                    📅 Événement prévu le {formatDate(eventDate)} à {formatTime(eventTime)}
                  </Text>
                  
                  {/* DateTimePicker temporairement désactivé pour Expo Go */}
                  {/* {showDatePicker && (
                    <DateTimePicker
                      value={eventDate}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                      minimumDate={new Date()}
                    />
                  )}
                  
                  {showTimePicker && (
                    <DateTimePicker
                      value={eventTime}
                      mode="time"
                      display="default"
                      onChange={handleTimeChange}
                    />
                  )} */}
                </View>

                {/* Lieu */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>📍 Lieu (optionnel)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Paris, Restaurant Le Comptoir..."
                    value={eventLocation}
                    onChangeText={setEventLocation}
                    autoCapitalize="words"
                    maxLength={100}
                    editable={!loading}
                  />
                </View>

                {/* Description */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>📝 Description (optionnel)</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Décrivez votre événement..."
                    value={eventDescription}
                    onChangeText={setEventDescription}
                    multiline
                    numberOfLines={3}
                    maxLength={200}
                    editable={!loading}
                  />
                  <Text style={styles.inputHint}>{eventDescription.length}/200 caractères</Text>
                </View>

                {/* Groupe associé */}
                {userGroups.length > 0 && (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>👥 Associer à un groupe (optionnel)</Text>
                    <View style={styles.groupsContainer}>
                      <TouchableOpacity 
                        style={[styles.groupOption, !selectedGroupId && styles.groupOptionSelected]}
                        onPress={() => setSelectedGroupId('')}
                        disabled={loading}
                      >
                        <Text style={[styles.groupOptionText, !selectedGroupId && styles.groupOptionTextSelected]}>
                          🔓 Événement personnel
                        </Text>
                      </TouchableOpacity>
                      {userGroups.map(group => (
                        <TouchableOpacity 
                          key={group.id}
                          style={[styles.groupOption, selectedGroupId === group.id && styles.groupOptionSelected]}
                          onPress={() => setSelectedGroupId(group.id)}
                          disabled={loading}
                        >
                          <Text style={[styles.groupOptionText, selectedGroupId === group.id && styles.groupOptionTextSelected]}>
                            👥 {group.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Option Calendrier */}
                <View style={styles.inputContainer}>
                  <View style={styles.calendarOptionContainer}>
                    <View style={styles.calendarOptionContent}>
                      <Text style={styles.label}>📅 Ajouter au calendrier</Text>
                      <Text style={styles.calendarOptionDescription}>
                        Propose d&apos;ajouter automatiquement à Google Calendar ou calendrier local après création
                      </Text>
                    </View>
                    <Switch
                      value={addToCalendar}
                      onValueChange={setAddToCalendar}
                      trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                      thumbColor={addToCalendar ? '#FFFFFF' : '#9CA3AF'}
                      disabled={loading}
                    />
                  </View>
                </View>

                {/* Informations */}
                <View style={styles.infoContainer}>
                  <Text style={styles.infoTitle}>ℹ️ À savoir :</Text>
                  <Text style={styles.infoText}>• Utilisez ◀ ▶ pour naviguer entre les dates</Text>
                  <Text style={styles.infoText}>• Choisissez l&apos;heure parmi les créneaux proposés</Text>
                  <Text style={styles.infoText}>• Vous participez automatiquement à l&apos;événement</Text>
                  <Text style={styles.infoText}>• Option calendrier : ajout à Google Calendar ou calendrier local</Text>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={[styles.cancelButton, loading && styles.buttonDisabled]} 
                  onPress={handleClose}
                  disabled={loading}
                >
                  <Text style={[styles.cancelButtonText, loading && styles.disabledText]}>
                    Annuler
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.createButton, (!isFormValid || loading) && styles.createButtonDisabled]} 
                  onPress={handleCreateEvent}
                  disabled={!isFormValid || loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.createButtonText}>
                      Créer l&apos;événement
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxHeight: '85%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  scrollView: {
    flex: 1,
  },
  modalContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#6B7280',
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'right',
  },
  dateTimeButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    marginBottom: 8,
  },
  dateTimeButtonText: {
    fontSize: 16,
    color: '#1F2937',
  },
  groupsContainer: {
    gap: 8,
  },
  groupOption: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  groupOptionSelected: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  groupOptionText: {
    fontSize: 16,
    color: '#6B7280',
  },
  groupOptionTextSelected: {
    color: '#10B981',
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#1E40AF',
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  createButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.6,
  },
  datePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  dateAdjustButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
  },
  dateAdjustButtonText: {
    fontSize: 18,
    color: '#1F2937',
    fontWeight: 'bold',
  },
  dateDisplay: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  dateDisplayText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  timePickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 8,
  },
  timeOption: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 10,
    margin: 4,
    minWidth: 48,
    alignItems: 'center',
  },
  timeOptionSelected: {
    backgroundColor: '#3B82F6',
  },
  timeOptionText: {
    fontSize: 16,
    color: '#1F2937',
  },
  timeOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedDateTime: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  calendarOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  calendarOptionContent: {
    flex: 1,
    marginLeft: 12,
  },
  calendarOptionDescription: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 2,
  },
});