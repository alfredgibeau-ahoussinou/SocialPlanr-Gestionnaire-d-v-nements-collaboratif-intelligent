import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import AddExpenseModal from '../../components/AddExpenseModal';

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: 'accommodation' | 'transport' | 'food' | 'entertainment' | 'other';
  description?: string;
  groupId?: string;
  eventId?: string;
  paidBy: string;
  participants: string[];
  date: Date;
  status: 'pending' | 'paid' | 'settled';
  createdBy: string;
  createdAt: Date;
}

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Écouter les dépenses de l'utilisateur en temps réel
    const expensesQuery = query(
      collection(db, 'expenses'),
      where('participants', 'array-contains', user.uid)
    );

    const unsubscribeExpenses = onSnapshot(expensesQuery, (snapshot) => {
      const userExpenses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Expense[];
      setExpenses(userExpenses);
      setLoading(false);
    });

    return () => {
      unsubscribeExpenses();
    };
  }, [user]);

  const handleCreateExpense = () => {
    setShowAddExpenseModal(true);
  };

  const showExpenseDetails = (expense: Expense) => {
    const amountPerPerson = expense.amount / expense.participants.length;
    const isUserPayer = expense.paidBy === user?.uid;
    const statusText = getStatusText(expense.status);
    
    Alert.alert(
      `💰 ${expense.title}`,
      `Montant total : ${expense.amount.toFixed(2)}€\n` +
      `Catégorie : ${getCategoryLabel(expense.category)}\n` +
      `Participants : ${expense.participants.length} personnes\n` +
      `Par personne : ${amountPerPerson.toFixed(2)}€\n` +
      `Payé par : ${isUserPayer ? 'Vous' : 'Autre participant'}\n` +
      `Statut : ${statusText}\n` +
      `Date : ${new Date(expense.date).toLocaleDateString('fr-FR')}` +
      (expense.description ? `\n\nDescription : ${expense.description}` : ''),
      [
        {
          text: 'Fermer',
          style: 'cancel'
        },
        ...(expense.status === 'pending' && !isUserPayer ? [{
          text: 'Marquer comme payé',
          onPress: () => markExpenseAsPaid(expense.id)
        }] : [])
      ]
    );
  };

  const markExpenseAsPaid = (expenseId: string) => {
    // Fonctionnalité à implémenter : marquer une dépense comme payée
    Alert.alert('Fonctionnalité à venir', 'La gestion des statuts de paiement sera bientôt disponible.');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'accommodation': return '🏨';
      case 'transport': return '🚗';
      case 'food': return '🍽️';
      case 'entertainment': return '🎉';
      case 'other': return '📋';
      default: return '💰';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'accommodation': return 'Hébergement';
      case 'transport': return 'Transport';
      case 'food': return 'Nourriture';
      case 'entertainment': return 'Divertissement';
      case 'other': return 'Autre';
      default: return 'Dépense';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settled': return '#10B981';
      case 'paid': return '#F59E0B';
      case 'pending': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'settled': return 'Réglé';
      case 'paid': return 'Payé';
      case 'pending': return 'En attente';
      default: return 'Inconnu';
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Text style={styles.emptyEmoji}>💰</Text>
      </View>
      <Text style={styles.emptyTitle}>Aucune dépense</Text>
      <Text style={styles.emptyDescription}>
        Vous n&apos;avez aucune dépense enregistrée pour le moment.{'\n'}
        Les dépenses apparaîtront ici une fois que vous participerez à des événements avec gestion des frais.
      </Text>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateExpense}>
        <Text style={styles.createButtonText}>💰 Ajouter une dépense</Text>
      </TouchableOpacity>
    </View>
  );

  const renderExpenseCard = (expense: Expense) => {
    const amountPerPerson = expense.amount / expense.participants.length;
    const isUserPayer = expense.paidBy === user?.uid;
    
    return (
      <TouchableOpacity
        key={expense.id}
        style={styles.expenseCard}
        onPress={() => showExpenseDetails(expense)}
        activeOpacity={0.7}
      >
        <View style={styles.expenseHeader}>
          <View style={styles.expenseInfo}>
            <View style={styles.expenseTitle}>
              <Text style={styles.categoryIcon}>{getCategoryIcon(expense.category)}</Text>
              <Text style={styles.expenseName}>{expense.title}</Text>
            </View>
            <Text style={styles.categoryLabel}>{getCategoryLabel(expense.category)}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{expense.amount.toFixed(2)} €</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(expense.status) }]}>
              <Text style={styles.statusText}>{getStatusText(expense.status)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.expenseDetails}>
          <View style={styles.expenseDetail}>
            <Text style={styles.detailLabel}>📅 Date :</Text>
            <Text style={styles.detailValue}>
              {new Date(expense.date).toLocaleDateString('fr-FR')}
            </Text>
          </View>
          
          <View style={styles.expenseDetail}>
            <Text style={styles.detailLabel}>👥 Participants :</Text>
            <Text style={styles.detailValue}>{expense.participants.length} personnes</Text>
          </View>

          <View style={styles.expenseDetail}>
            <Text style={styles.detailLabel}>💰 Par personne :</Text>
            <Text style={styles.detailValue}>{amountPerPerson.toFixed(2)} €</Text>
          </View>

          <View style={styles.expenseDetail}>
            <Text style={styles.detailLabel}>💳 Payé par :</Text>
            <Text style={[styles.detailValue, isUserPayer && styles.userPayer]}>
              {isUserPayer ? 'Vous' : 'Autre participant'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const calculateTotals = () => {
    let totalOwed = 0;
    let totalLent = 0;

    expenses.forEach(expense => {
      const amountPerPerson = expense.amount / expense.participants.length;
      const isUserPayer = expense.paidBy === user?.uid;
      
      if (isUserPayer) {
        totalLent += expense.amount;
        totalOwed -= amountPerPerson; // L'utilisateur se doit à lui-même sa part
      } else {
        totalOwed += amountPerPerson;
      }
    });

    return { totalOwed: Math.max(0, totalOwed), totalLent };
  };

  const { totalOwed, totalLent } = calculateTotals();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement de vos dépenses...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mes Dépenses</Text>
          <Text style={styles.headerSubtitle}>
            {expenses.length > 0 ? `${expenses.length} dépense${expenses.length > 1 ? 's' : ''}` : 'Aucune dépense'}
          </Text>
        </View>
        {expenses.length > 0 && (
          <TouchableOpacity style={styles.addButton} onPress={handleCreateExpense}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Summary Cards - Only show if there are expenses */}
      {expenses.length > 0 && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryAmount}>-{totalOwed.toFixed(2)} €</Text>
            <Text style={styles.summaryLabel}>Vous devez</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryAmount, { color: '#10B981' }]}>+{totalLent.toFixed(2)} €</Text>
            <Text style={styles.summaryLabel}>Vous ont dû</Text>
          </View>
        </View>
      )}

      {/* Expenses List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {expenses.length === 0 ? (
          renderEmptyState()
        ) : (
          <View style={styles.expensesList}>
            {expenses.map(renderExpenseCard)}
          </View>
        )}
      </ScrollView>

      {/* Modal d'ajout de dépense */}
      <AddExpenseModal
        visible={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
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
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
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
  // Liste des dépenses
  expensesList: {
    paddingVertical: 20,
  },
  expenseCard: {
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
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  expenseInfo: {
    flex: 1,
    marginRight: 16,
  },
  expenseTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  expenseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  categoryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  expenseDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  expenseDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    minWidth: 120,
  },
  detailValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    flex: 1,
  },
  userPayer: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});