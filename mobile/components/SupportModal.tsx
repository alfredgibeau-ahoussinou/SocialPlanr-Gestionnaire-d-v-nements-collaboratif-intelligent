import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  Linking,
} from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface SupportModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SupportModal({ visible, onClose }: SupportModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const supportCategories = [
    {
      id: 'bug',
      title: 'Signaler un bug',
      icon: 'exclamationmark.triangle' as const,
      color: '#EF4444',
      description: 'Un problème technique avec l\'application',
    },
    {
      id: 'feature',
      title: 'Demande de fonctionnalité',
      icon: 'lightbulb' as const,
      color: '#F59E0B',
      description: 'Proposer une nouvelle fonctionnalité',
    },
    {
      id: 'account',
      title: 'Problème de compte',
      icon: 'person.circle' as const,
      color: '#3B82F6',
      description: 'Connexion, mot de passe, suppression',
    },
    {
      id: 'payment',
      title: 'Questions de paiement',
      icon: 'creditcard' as const,
      color: '#10B981',
      description: 'Frais partagés, remboursements',
    },
    {
      id: 'other',
      title: 'Autre question',
      icon: 'questionmark.circle' as const,
      color: '#8B5CF6',
      description: 'Toute autre question ou problème',
    },
  ];

  const faqItems = [
    {
      question: 'Comment créer un groupe ?',
      answer: 'Allez dans l\'onglet principal et appuyez sur "+ Créer un groupe". Donnez un nom à votre groupe et invitez vos amis !',
    },
    {
      question: 'Comment partager les frais ?',
      answer: 'Dans un événement, allez dans la section "Dépenses" et ajoutez les frais. L\'app calculera automatiquement la part de chacun.',
    },
    {
      question: 'Puis-je modifier un événement après création ?',
      answer: 'Oui, le créateur de l\'événement peut le modifier. Les participants seront notifiés des changements.',
    },
    {
      question: 'Comment inviter des amis ?',
      answer: 'Utilisez la fonction "Inviter des amis" dans votre profil pour partager l\'app via différents canaux.',
    },
    {
      question: 'L\'app est-elle gratuite ?',
      answer: 'Oui, SocialPlanr est entièrement gratuite ! Nous prévoyons des fonctionnalités premium dans le futur.',
    },
  ];

  const contactMethods = [
    {
      title: 'Email',
      subtitle: 'support@socialplanr.com',
      icon: 'envelope' as const,
      action: () => Linking.openURL('mailto:support@socialplanr.com'),
    },
    {
      title: 'Site web',
      subtitle: 'www.socialplanr.com',
      icon: 'globe' as const,
      action: () => Linking.openURL('https://socialplanr.com'),
    },
    {
      title: 'Twitter',
      subtitle: '@SocialPlanr',
      icon: 'at' as const,
      action: () => Linking.openURL('https://twitter.com/socialplanr'),
    },
  ];

  const handleSendMessage = () => {
    if (!selectedCategory) {
      Alert.alert('Catégorie requise', 'Veuillez sélectionner une catégorie');
      return;
    }

    if (!message.trim()) {
      Alert.alert('Message requis', 'Veuillez saisir votre message');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Email requis', 'Veuillez saisir votre adresse email');
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Email invalide', 'Veuillez saisir une adresse email valide');
      return;
    }

    // Simulation d'envoi (à implémenter avec un service)
    Alert.alert(
      '✅ Message envoyé !',
      'Merci pour votre message. Notre équipe vous répondra dans les 24h.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedCategory(null);
            setMessage('');
            setEmail('');
            onClose();
          }
        }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Support & Aide</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconSymbol name="xmark" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroEmoji}>🤝</Text>
            <Text style={styles.heroTitle}>Comment pouvons-nous vous aider ?</Text>
            <Text style={styles.heroDescription}>
              Notre équipe est là pour vous accompagner ! Consultez la FAQ ou contactez-nous directement.
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📞 Contact rapide</Text>
            <View style={styles.contactGrid}>
              {contactMethods.map((method, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.contactMethod}
                  onPress={method.action}
                >
                  <IconSymbol name={method.icon} size={24} color="#3B82F6" />
                  <Text style={styles.contactTitle}>{method.title}</Text>
                  <Text style={styles.contactSubtitle}>{method.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* FAQ */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>❓ Questions fréquentes</Text>
            {faqItems.map((item, index) => (
              <View key={index} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              </View>
            ))}
          </View>

          {/* Contact Form */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✉️ Nous contacter</Text>
            <Text style={styles.sectionDescription}>
              Pas trouvé votre réponse ? Envoyez-nous un message !
            </Text>

            {/* Category Selection */}
            <Text style={styles.inputLabel}>Catégorie :</Text>
            <View style={styles.categoryGrid}>
              {supportCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category.id && styles.categoryItemSelected
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <IconSymbol name={category.icon} size={20} color={category.color} />
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Email Input */}
            <Text style={styles.inputLabel}>Votre email :</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="votre@email.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Message Input */}
            <Text style={styles.inputLabel}>Votre message :</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Décrivez votre problème ou question en détail..."
              placeholderTextColor="#9CA3AF"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <IconSymbol name="paperplane.fill" size={20} color="#FFFFFF" />
              <Text style={styles.sendButtonText}>Envoyer le message</Text>
            </TouchableOpacity>
          </View>

          {/* App Info */}
          <View style={styles.appInfoSection}>
            <Text style={styles.appInfoTitle}>📱 Informations de l'app</Text>
            <View style={styles.appInfoGrid}>
              <View style={styles.appInfoItem}>
                <Text style={styles.appInfoLabel}>Version</Text>
                <Text style={styles.appInfoValue}>v1.0.0</Text>
              </View>
              <View style={styles.appInfoItem}>
                <Text style={styles.appInfoLabel}>Build</Text>
                <Text style={styles.appInfoValue}>1.0.0</Text>
              </View>
              <View style={styles.appInfoItem}>
                <Text style={styles.appInfoLabel}>Plateforme</Text>
                <Text style={styles.appInfoValue}>React Native</Text>
              </View>
            </View>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    marginVertical: 20,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
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
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  contactGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactMethod: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
  contactSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryItem: {
    width: '48%',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryItemSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EBF8FF',
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#374151',
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#374151',
    backgroundColor: '#FFFFFF',
    minHeight: 120,
    marginBottom: 20,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  appInfoSection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 32,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  appInfoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  appInfoItem: {
    alignItems: 'center',
  },
  appInfoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  appInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
}); 
 