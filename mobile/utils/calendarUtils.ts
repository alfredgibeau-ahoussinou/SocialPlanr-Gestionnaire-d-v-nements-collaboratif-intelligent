import { Alert, Linking } from 'react-native';
import * as Calendar from 'expo-calendar';

// Types pour les événements
export interface CalendarEvent {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
}

// Fonction pour formater une date en format Google Calendar
const formatDateForGoogle = (date: Date): string => {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

// Fonction pour créer un lien Google Calendar
export const createGoogleCalendarLink = (event: CalendarEvent): string => {
  const baseUrl = 'https://calendar.google.com/calendar/render';
  const startDate = formatDateForGoogle(event.startDate);
  const endDate = formatDateForGoogle(event.endDate);
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startDate}/${endDate}`,
    details: event.description || '',
    location: event.location || '',
    sf: 'true',
    output: 'xml'
  });

  return `${baseUrl}?${params.toString()}`;
};

// Fonction pour ouvrir Google Calendar avec l'événement
export const addToGoogleCalendar = async (event: CalendarEvent): Promise<void> => {
  try {
    const googleCalendarUrl = createGoogleCalendarLink(event);
    
    const canOpen = await Linking.canOpenURL(googleCalendarUrl);
    if (canOpen) {
      await Linking.openURL(googleCalendarUrl);
    } else {
      Alert.alert(
        'Impossible d\'ouvrir Google Calendar',
        'Veuillez installer Google Calendar ou utiliser un navigateur web.',
        [{ text: 'OK' }]
      );
    }
  } catch (error) {
    console.error('Erreur lors de l\'ouverture de Google Calendar:', error);
    Alert.alert(
      'Erreur',
      'Impossible d\'ouvrir Google Calendar. Veuillez réessayer.',
      [{ text: 'OK' }]
    );
  }
};

// Fonction pour ajouter à l'agenda natif (iOS/Android)
export const addToNativeCalendar = async (event: CalendarEvent): Promise<boolean> => {
  try {
    // Demander les permissions
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission requise',
        'L\'accès au calendrier est nécessaire pour ajouter l\'événement.',
        [{ text: 'OK' }]
      );
      return false;
    }

    // Obtenir les calendriers disponibles
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find(cal => cal.isPrimary) || calendars[0];

    if (!defaultCalendar) {
      Alert.alert(
        'Aucun calendrier trouvé',
        'Aucun calendrier disponible sur cet appareil.',
        [{ text: 'OK' }]
      );
      return false;
    }

    // Créer l'événement
    const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
      title: event.title,
      notes: event.description,
      location: event.location,
      startDate: event.startDate,
      endDate: event.endDate,
    });

    if (eventId) {
      Alert.alert(
        '✅ Événement ajouté !',
        'L\'événement a été ajouté à votre calendrier local.',
        [{ text: 'Parfait !' }]
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error('Erreur lors de l\'ajout au calendrier natif:', error);
    Alert.alert(
      'Erreur',
      'Impossible d\'ajouter l\'événement au calendrier. Veuillez réessayer.',
      [{ text: 'OK' }]
    );
    return false;
  }
};

// Fonction pour proposer les options d'ajout au calendrier
export const showCalendarOptions = (event: CalendarEvent): void => {
  Alert.alert(
    '📅 Ajouter au calendrier',
    'Choisissez où ajouter votre événement :',
    [
      {
        text: '🌐 Google Calendar',
        onPress: () => addToGoogleCalendar(event),
      },
      {
        text: '📱 Calendrier local',
        onPress: () => addToNativeCalendar(event),
      },
      {
        text: 'Annuler',
        style: 'cancel',
      },
    ]
  );
};

// Fonction helper pour calculer la date de fin (1h après le début par défaut)
export const calculateEndDate = (startDate: Date, durationMinutes: number = 60): Date => {
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + durationMinutes);
  return endDate;
}; 
 