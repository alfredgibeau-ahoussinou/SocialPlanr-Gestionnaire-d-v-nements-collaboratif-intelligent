import { InAppNotification } from '../contexts/NotificationContext';

// Types pour les événements de notification
export interface EventNotificationData {
  eventId: string;
  eventTitle: string;
  eventDate: Date;
  location?: string;
}

export interface GroupNotificationData {
  groupId: string;
  groupName: string;
  memberName?: string;
}

export interface ExpenseNotificationData {
  expenseId: string;
  amount: number;
  description: string;
  paidBy: string;
}

// Fonctions pour créer des notifications d'événements
export const createEventNotifications = {
  eventCreated: (data: EventNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '🎉 Événement créé !',
    message: `L'événement "${data.eventTitle}" a été créé avec succès pour le ${data.eventDate.toLocaleDateString('fr-FR')}.`,
    type: 'success',
    category: 'event',
    actionData: { eventId: data.eventId },
  }),

  eventReminder: (data: EventNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '⏰ Rappel d\'événement',
    message: `L'événement "${data.eventTitle}" commence bientôt ! ${data.location ? `Lieu: ${data.location}` : ''}`,
    type: 'info',
    category: 'event',
    actionData: { eventId: data.eventId },
  }),

  eventUpdated: (data: EventNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '📅 Événement modifié',
    message: `L'événement "${data.eventTitle}" a été mis à jour. Vérifiez les nouveaux détails.`,
    type: 'info',
    category: 'event',
    actionData: { eventId: data.eventId },
  }),

  eventCancelled: (data: EventNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '❌ Événement annulé',
    message: `L'événement "${data.eventTitle}" prévu le ${data.eventDate.toLocaleDateString('fr-FR')} a été annulé.`,
    type: 'warning',
    category: 'event',
    actionData: { eventId: data.eventId },
  }),

  eventStartingSoon: (data: EventNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '🚀 C\'est parti !',
    message: `L'événement "${data.eventTitle}" commence dans 30 minutes !`,
    type: 'info',
    category: 'event',
    actionData: { eventId: data.eventId },
  }),
};

// Fonctions pour créer des notifications de groupe
export const createGroupNotifications = {
  groupCreated: (data: GroupNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '👥 Groupe créé',
    message: `Le groupe "${data.groupName}" a été créé avec succès !`,
    type: 'success',
    category: 'group',
    actionData: { groupId: data.groupId },
  }),

  memberJoined: (data: GroupNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '👋 Nouveau membre',
    message: `${data.memberName || 'Un nouveau membre'} a rejoint le groupe "${data.groupName}".`,
    type: 'info',
    category: 'group',
    actionData: { groupId: data.groupId },
  }),

  memberLeft: (data: GroupNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '👋 Membre parti',
    message: `${data.memberName || 'Un membre'} a quitté le groupe "${data.groupName}".`,
    type: 'warning',
    category: 'group',
    actionData: { groupId: data.groupId },
  }),

  groupUpdated: (data: GroupNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '📝 Groupe mis à jour',
    message: `Le groupe "${data.groupName}" a été modifié.`,
    type: 'info',
    category: 'group',
    actionData: { groupId: data.groupId },
  }),
};

// Fonctions pour créer des notifications de frais
export const createExpenseNotifications = {
  expenseAdded: (data: ExpenseNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '💰 Nouveau frais ajouté',
    message: `${data.paidBy} a ajouté un frais de ${data.amount}€ pour "${data.description}".`,
    type: 'info',
    category: 'expense',
    actionData: { expenseId: data.expenseId },
  }),

  expenseUpdated: (data: ExpenseNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '📝 Frais modifié',
    message: `Le frais "${data.description}" (${data.amount}€) a été mis à jour.`,
    type: 'info',
    category: 'expense',
    actionData: { expenseId: data.expenseId },
  }),

  paymentReceived: (data: ExpenseNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '✅ Paiement reçu',
    message: `Vous avez reçu un paiement de ${data.amount}€ pour "${data.description}".`,
    type: 'success',
    category: 'expense',
    actionData: { expenseId: data.expenseId },
  }),

  paymentReminder: (data: ExpenseNotificationData): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '⏰ Rappel de paiement',
    message: `N'oubliez pas de régler ${data.amount}€ à ${data.paidBy} pour "${data.description}".`,
    type: 'warning',
    category: 'expense',
    actionData: { expenseId: data.expenseId },
  }),

  balanceUpdated: (balance: number): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '💳 Solde mis à jour',
    message: balance >= 0 
      ? `Votre solde a été mis à jour : +${balance.toFixed(2)}€`
      : `Votre solde a été mis à jour : ${balance.toFixed(2)}€`,
    type: balance >= 0 ? 'success' : 'warning',
    category: 'expense',
    actionData: { balance },
  }),
};

// Fonctions pour créer des notifications système
export const createSystemNotifications = {
  welcome: (): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '🎉 Bienvenue sur SocialPlanr !',
    message: 'Merci de nous avoir rejoint ! Découvrez toutes les fonctionnalités pour organiser vos événements.',
    type: 'success',
    category: 'system',
  }),

  profileUpdated: (): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '✅ Profil mis à jour',
    message: 'Vos informations de profil ont été mises à jour avec succès.',
    type: 'success',
    category: 'system',
  }),

  settingsChanged: (): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '⚙️ Paramètres modifiés',
    message: 'Vos préférences ont été sauvegardées.',
    type: 'success',
    category: 'system',
  }),

  errorOccurred: (error: string): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '❌ Erreur',
    message: error,
    type: 'error',
    category: 'system',
  }),

  maintenanceMode: (): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '🔧 Maintenance programmée',
    message: 'Une maintenance est prévue prochainement. Certaines fonctionnalités peuvent être temporairement indisponibles.',
    type: 'warning',
    category: 'system',
  }),

  featureUnlocked: (featureName: string): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '🆕 Nouvelle fonctionnalité !',
    message: `Découvrez "${featureName}", maintenant disponible dans votre application !`,
    type: 'info',
    category: 'system',
  }),

  backupCompleted: (): Omit<InAppNotification, 'id' | 'timestamp' | 'read'> => ({
    title: '☁️ Sauvegarde terminée',
    message: 'Vos données ont été sauvegardées avec succès.',
    type: 'success',
    category: 'system',
  }),
};

// Fonction utilitaire pour scheduler des notifications basées sur la date
export const scheduleEventReminders = (events: EventNotificationData[]) => {
  const reminders: {
    notification: Omit<InAppNotification, 'id' | 'timestamp' | 'read'>;
    scheduleTime: Date;
  }[] = [];

  events.forEach(event => {
    const eventTime = event.eventDate.getTime();
    const now = Date.now();

    // Rappel 24h avant
    const reminder24h = new Date(eventTime - 24 * 60 * 60 * 1000);
    if (reminder24h.getTime() > now) {
      reminders.push({
        notification: {
          title: '📅 Rappel : Événement demain',
          message: `N'oubliez pas ! L'événement "${event.eventTitle}" a lieu demain.${event.location ? ` Lieu: ${event.location}` : ''}`,
          type: 'info',
          category: 'event',
          actionData: { eventId: event.eventId },
        },
        scheduleTime: reminder24h,
      });
    }

    // Rappel 2h avant
    const reminder2h = new Date(eventTime - 2 * 60 * 60 * 1000);
    if (reminder2h.getTime() > now) {
      reminders.push({
        notification: {
          title: '⏰ Événement dans 2h',
          message: `L'événement "${event.eventTitle}" commence dans 2 heures !`,
          type: 'warning',
          category: 'event',
          actionData: { eventId: event.eventId },
        },
        scheduleTime: reminder2h,
      });
    }

    // Rappel 30min avant
    const reminder30min = new Date(eventTime - 30 * 60 * 1000);
    if (reminder30min.getTime() > now) {
      reminders.push({
        notification: createEventNotifications.eventStartingSoon(event),
        scheduleTime: reminder30min,
      });
    }
  });

  return reminders;
};

// Fonction pour formater les montants en euros
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}; 
 