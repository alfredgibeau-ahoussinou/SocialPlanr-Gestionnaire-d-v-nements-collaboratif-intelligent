import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { createExpenseNotifications } from '../utils/notificationHelpers';

interface AddExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  groupId?: string;
  eventId?: string;
}

interface Group {
  id: string;
  name: string;
  members: string[];
}

interface Event {
  id: string;
  title: string;
  attendees: string[];
  groupId?: string;
}

interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
}

type ExpenseCategory = 'accommodation' | 'transport' | 'food' | 'entertainment' | 'other';

export default function AddExpenseModal({ visible, onClose, groupId, eventId }: AddExpenseModalProps) {
  // États du formulaire
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('other');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Sélection des participants
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [availableUsers, setAvailableUsers] = useState<UserProfile[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState(groupId || '');
  const [selectedEventId, setSelectedEventId] = useState(eventId || '');
  
  // Options avancées
  const [splitEqually, setSplitEqually] = useState(true);
  const [customSplits, setCustomSplits] = useState<{ [key: string]: string }>({});

  const { user, userProfile } = useAuth();
  const { addNotification } = useNotifications();

  const categories = [
    {
      id: 'accommodation' as const,
      label: 'Hébergement',
      icon: '🏨',
      color: '#3B82F6'
    },
    {
      id: 'transport' as const,
      label: 'Transport',
      icon: '🚗',
      color: '#10B981'
    },
    {
      id: 'food' as const,
      label: 'Nourriture',
      icon: '🍽️',
      color: '#F59E0B'
    },
    {
      id: 'entertainment' as const,
      label: 'Divertissement',
      icon: '🎉',
      color: '#EF4444'
    },
    {
      id: 'other' as const,
      label: 'Autre',
      icon: '📋',
      color: '#8B5CF6'
    }
  ];

  useEffect(() => {
    if (visible && user) {
      loadData();
      resetForm();
    }
  }, [visible, user]);

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory('other');
    setDescription('');
    setSelectedParticipants([user?.uid || '']);
    setSplitEqually(true);
    setCustomSplits({});
  };

  const loadData = async () => {
    if (!user) return;

    try {
      // Charger les groupes de l'utilisateur
      const groupsQuery = query(
        collection(db, 'groups'),
        where('members', 'array-contains', user.uid)
      );
      const groupsSnapshot = await getDocs(groupsQuery);
      const userGroups = groupsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Group[];
      setGroups(userGroups);

      // Charger les événements de l'utilisateur
      const eventsQuery = query(
        collection(db, 'events'),
        where('attendees', 'array-contains', user.uid)
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      const userEvents = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      setEvents(userEvents);

      // Charger les utilisateurs disponibles
      await loadAvailableUsers(userGroups, userEvents);

    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  const loadAvailableUsers = async (userGroups: Group[], userEvents: Event[]) => {
    if (!user) return;

    try {
      const allUserIds = new Set<string>([user.uid]);

      // Ajouter les membres des groupes
      userGroups.forEach(group => {
        group.members.forEach(memberId => allUserIds.add(memberId));
      });

      // Ajouter les participants des événements
      userEvents.forEach(event => {
        event.attendees.forEach(attendeeId => allUserIds.add(attendeeId));
      });

      // Charger les profils utilisateurs
      const userProfiles: UserProfile[] = [];
      for (const userId of allUserIds) {
        try {
          const userQuery = query(
            collection(db, 'users'),
            where('uid', '==', userId)
          );
          const userSnapshot = await getDocs(userQuery);
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data() as UserProfile;
            userProfiles.push(userData);
          }
        } catch (error) {
          console.error(`Erreur lors du chargement du profil ${userId}:`, error);
        }
      }

      setAvailableUsers(userProfiles);
      setSelectedParticipants([user.uid]);

    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  };

  const handleAddExpense = async () => {
    if (!user || !userProfile) {
      Alert.alert('Erreur', 'Vous devez être connecté pour ajouter une dépense');
      return;
    }

    if (!title.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un titre pour la dépense');
      return;
    }

    if (!amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Erreur', 'Veuillez saisir un montant valide');
      return;
    }

    if (selectedParticipants.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins un participant');
      return;
    }

    // Validation des répartitions personnalisées
    if (!splitEqually) {
      const totalCustomAmount = Object.values(customSplits).reduce((sum, splitAmount) => {
        return sum + (parseFloat(splitAmount) || 0);
      }, 0);
      
      const expenseAmount = parseFloat(amount);
      if (Math.abs(totalCustomAmount - expenseAmount) > 0.01) {
        Alert.alert(
          'Erreur de répartition',
          `La somme des montants personnalisés (${totalCustomAmount.toFixed(2)}€) ne correspond pas au montant total (${expenseAmount.toFixed(2)}€)`
        );
        return;
      }
    }

    setLoading(true);

    try {
      const expenseData = {
        title: title.trim(),
        amount: parseFloat(amount),
        category,
        description: description.trim() || null,
        groupId: selectedGroupId || null,
        eventId: selectedEventId || null,
        paidBy: user.uid,
        participants: selectedParticipants,
        date: new Date(),
        status: 'pending' as const,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        splitType: splitEqually ? 'equal' : 'custom',
        customSplits: splitEqually ? null : customSplits,
      };

      const docRef = await addDoc(collection(db, 'expenses'), expenseData);

      // Créer une notification de succès
      addNotification(createExpenseNotifications.expenseAdded({
        expenseId: docRef.id,
        amount: parseFloat(amount),
        description: title.trim(),
        paidBy: `${userProfile.firstName} ${userProfile.lastName}`,
      }));

      Alert.alert(
        '✅ Dépense ajoutée !',
        `La dépense "${title.trim()}" de ${amount}€ a été ajoutée avec succès.`,
        [
          {
            text: 'OK',
            onPress: () => {
              resetForm();
              onClose();
            }
          }
        ]
      );

    } catch (error) {
      console.error('Erreur lors de l\'ajout de la dépense:', error);
      Alert.alert('Erreur', 'Impossible d\'ajouter la dépense. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const toggleParticipant = (userId: string) => {
    if (userId === user?.uid) return; // L'utilisateur actuel doit toujours être inclus
    
    setSelectedParticipants(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const updateCustomSplit = (userId: string, splitAmount: string) => {
    setCustomSplits(prev => ({
      ...prev,
      [userId]: splitAmount
    }));
  };

  const calculateEqualSplit = () => {
    if (selectedParticipants.length === 0 || !amount) return 0;
    return parseFloat(amount) / selectedParticipants.length;
  };

  const renderCategorySelector = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>🏷️ Catégorie</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryButton,
              { borderColor: cat.color },
              category === cat.id && { backgroundColor: cat.color }
            ]}
            onPress={() => setCategory(cat.id)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={[
              styles.categoryLabel,
              category === cat.id && { color: 'white' }
            ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderParticipantsList = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>👥 Participants ({selectedParticipants.length})</Text>
      <View style={styles.participantsList}>
        {availableUsers.map((userItem) => {
          const isSelected = selectedParticipants.includes(userItem.uid);
          const isCurrentUser = userItem.uid === user?.uid;
          
          return (
            <TouchableOpacity
              key={userItem.uid}
              style={[
                styles.participantItem,
                isSelected && styles.participantSelected,
                isCurrentUser && styles.currentUserParticipant
              ]}
              onPress={() => !isCurrentUser && toggleParticipant(userItem.uid)}
              disabled={isCurrentUser}
            >
              <View style={styles.participantInfo}>
                <Text style={styles.participantName}>
                  {userItem.firstName} {userItem.lastName}
                  {isCurrentUser && ' (Vous)'}
                </Text>
                <Text style={styles.participantEmail}>{userItem.email}</Text>
              </View>
              <View style={[
                styles.participantCheckbox,
                isSelected && styles.participantCheckboxSelected
              ]}>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderSplitOptions = () => (
    <View style={styles.inputContainer}>
      <View style={styles.splitHeader}>
        <Text style={styles.label}>💰 Répartition</Text>
        <View style={styles.splitToggle}>
          <Text style={styles.splitToggleLabel}>
            {splitEqually ? 'Égale' : 'Personnalisée'}
          </Text>
          <Switch
            value={!splitEqually}
            onValueChange={(value) => setSplitEqually(!value)}
            trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
            thumbColor={splitEqually ? '#FFFFFF' : '#3B82F6'}
          />
        </View>
      </View>

      {splitEqually ? (
        <View style={styles.equalSplitInfo}>
          <Text style={styles.equalSplitText}>
            Chaque participant paiera : {calculateEqualSplit().toFixed(2)}€
          </Text>
        </View>
      ) : (
        <View style={styles.customSplitContainer}>
          {selectedParticipants.map((participantId) => {
            const participant = availableUsers.find(u => u.uid === participantId);
            if (!participant) return null;

            return (
              <View key={participantId} style={styles.customSplitItem}>
                <Text style={styles.customSplitName}>
                  {participant.firstName} {participant.lastName}
                </Text>
                <TextInput
                  style={styles.customSplitInput}
                  placeholder="0.00"
                  value={customSplits[participantId] || ''}
                  onChangeText={(text) => updateCustomSplit(participantId, text)}
                  keyboardType="numeric"
                />
                <Text style={styles.currencySymbol}>€</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ajouter une dépense</Text>
          <TouchableOpacity
            onPress={handleAddExpense}
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.saveButtonText}>Ajouter</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Titre */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>📝 Titre de la dépense</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Restaurant, Taxi, Hôtel..."
              value={title}
              onChangeText={setTitle}
              maxLength={50}
              editable={!loading}
            />
            <Text style={styles.inputHint}>{title.length}/50 caractères</Text>
          </View>

          {/* Montant */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>💶 Montant</Text>
            <View style={styles.amountInputContainer}>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                editable={!loading}
              />
              <Text style={styles.currencySymbol}>€</Text>
            </View>
          </View>

          {/* Catégorie */}
          {renderCategorySelector()}

          {/* Description optionnelle */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>📋 Description (optionnel)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Détails sur la dépense..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              maxLength={200}
              editable={!loading}
            />
            <Text style={styles.inputHint}>{description.length}/200 caractères</Text>
          </View>

          {/* Sélection groupe/événement */}
          {(groups.length > 0 || events.length > 0) && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>🔗 Associer à (optionnel)</Text>
              
              {groups.length > 0 && (
                <View style={styles.associationSection}>
                  <Text style={styles.associationSubtitle}>Groupe :</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                      style={[
                        styles.associationButton,
                        !selectedGroupId && styles.associationButtonSelected
                      ]}
                      onPress={() => setSelectedGroupId('')}
                    >
                      <Text style={styles.associationButtonText}>Aucun</Text>
                    </TouchableOpacity>
                    {groups.map((group) => (
                      <TouchableOpacity
                        key={group.id}
                        style={[
                          styles.associationButton,
                          selectedGroupId === group.id && styles.associationButtonSelected
                        ]}
                        onPress={() => setSelectedGroupId(group.id)}
                      >
                        <Text style={styles.associationButtonText}>{group.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {events.length > 0 && (
                <View style={styles.associationSection}>
                  <Text style={styles.associationSubtitle}>Événement :</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                      style={[
                        styles.associationButton,
                        !selectedEventId && styles.associationButtonSelected
                      ]}
                      onPress={() => setSelectedEventId('')}
                    >
                      <Text style={styles.associationButtonText}>Aucun</Text>
                    </TouchableOpacity>
                    {events.map((event) => (
                      <TouchableOpacity
                        key={event.id}
                        style={[
                          styles.associationButton,
                          selectedEventId === event.id && styles.associationButtonSelected
                        ]}
                        onPress={() => setSelectedEventId(event.id)}
                      >
                        <Text style={styles.associationButtonText}>{event.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          )}

          {/* Participants */}
          {renderParticipantsList()}

          {/* Options de répartition */}
          {renderSplitOptions()}

          {/* Résumé */}
          {amount && selectedParticipants.length > 0 && (
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>📊 Résumé</Text>
              <View style={styles.summaryContent}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Montant total :</Text>
                  <Text style={styles.summaryValue}>{parseFloat(amount).toFixed(2)}€</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Participants :</Text>
                  <Text style={styles.summaryValue}>{selectedParticipants.length} personnes</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Vous payez :</Text>
                  <Text style={[styles.summaryValue, styles.summaryHighlight]}>
                    {parseFloat(amount).toFixed(2)}€
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Vous récupérez :</Text>
                  <Text style={[styles.summaryValue, styles.summaryPositive]}>
                    {(parseFloat(amount) - calculateEqualSplit()).toFixed(2)}€
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'right',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  amountInput: {
    flex: 1,
    padding: 16,
    fontSize: 18,
    fontWeight: '600',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    paddingRight: 16,
  },
  // Catégories
  categoriesScroll: {
    marginTop: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  // Participants
  participantsList: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  participantSelected: {
    backgroundColor: '#EFF6FF',
  },
  currentUserParticipant: {
    backgroundColor: '#F0FDF4',
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  participantEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  participantCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  participantCheckboxSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Répartition
  splitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  splitToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  splitToggleLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  equalSplitInfo: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  equalSplitText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E40AF',
    textAlign: 'center',
  },
  customSplitContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  customSplitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  customSplitName: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  customSplitInput: {
    width: 80,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  // Association
  associationSection: {
    marginBottom: 16,
  },
  associationSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  associationButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  associationButtonSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  associationButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  // Résumé
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryContent: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  summaryHighlight: {
    color: '#EF4444',
    fontWeight: '600',
  },
  summaryPositive: {
    color: '#10B981',
    fontWeight: '600',
  },
}); 
 