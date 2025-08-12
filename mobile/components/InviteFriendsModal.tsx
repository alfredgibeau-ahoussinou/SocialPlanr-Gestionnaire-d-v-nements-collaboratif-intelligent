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
  Share,
  Clipboard,
  TextInput,
} from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface InviteFriendsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function InviteFriendsModal({ visible, onClose }: InviteFriendsModalProps) {
  const [email, setEmail] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const inviteLink = 'https://socialplanr.app/invite';
  const defaultMessage = `🎉 Rejoins-moi sur SocialPlanr !

L'app parfaite pour organiser des sorties entre amis ! Planification d'événements, partage des frais, tout devient facile.

Télécharge l'app ici : ${inviteLink}

À bientôt ! 😊`;

  const handleShareApp = async () => {
    try {
      const message = customMessage.trim() || defaultMessage;
      await Share.share({
        message: message,
        url: inviteLink,
        title: 'Découvre SocialPlanr !',
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager l\'application');
    }
  };

  const handleCopyLink = async () => {
    try {
      await Clipboard.setString(inviteLink);
      Alert.alert('✅ Copié !', 'Le lien d\'invitation a été copié dans votre presse-papiers');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de copier le lien');
    }
  };

  const handleSendEmail = () => {
    if (!email.trim()) {
      Alert.alert('Email requis', 'Veuillez saisir une adresse email');
      return;
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Email invalide', 'Veuillez saisir une adresse email valide');
      return;
    }

    // Simulation d'envoi d'email (à implémenter avec un service d'email)
    Alert.alert(
      '✅ Invitation envoyée !',
      `Une invitation a été envoyée à ${email}`,
      [
        { 
          text: 'OK', 
          onPress: () => {
            setEmail('');
            setCustomMessage('');
          }
        }
      ]
    );
  };

  const shareOptions = [
    {
      title: 'WhatsApp',
      icon: 'message.fill' as const,
      color: '#25D366',
      onPress: () => handleShareApp(),
    },
    {
      title: 'Messages',
      icon: 'bubble.left.fill' as const,
      color: '#007AFF',
      onPress: () => handleShareApp(),
    },
    {
      title: 'Instagram',
      icon: 'camera.fill' as const,
      color: '#E4405F',
      onPress: () => handleShareApp(),
    },
    {
      title: 'Snapchat',
      icon: 'camera.viewfinder' as const,
      color: '#FFFC00',
      onPress: () => handleShareApp(),
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Inviter des amis</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconSymbol name="xmark" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroEmoji}>🎉</Text>
            <Text style={styles.heroTitle}>Invite tes amis sur SocialPlanr !</Text>
            <Text style={styles.heroDescription}>
              Plus on est de fous, plus on rit ! Partage l&apos;app avec tes proches 
              et organisez vos sorties ensemble.
            </Text>
          </View>

          {/* Quick Share */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🚀 Partage rapide</Text>
            <View style={styles.shareOptions}>
              {shareOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.shareOption, { backgroundColor: option.color + '20' }]}
                  onPress={option.onPress}
                >
                  <IconSymbol name={option.icon} size={24} color={option.color} />
                  <Text style={[styles.shareOptionText, { color: option.color }]}>
                    {option.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Copy Link */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔗 Lien d&apos;invitation</Text>
            <View style={styles.linkContainer}>
              <Text style={styles.linkText} numberOfLines={1}>
                {inviteLink}
              </Text>
              <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
                <IconSymbol name="square.and.arrow.up" size={20} color="#3B82F6" />
                <Text style={styles.copyButtonText}>Copier</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Email Invitation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📧 Invitation par email</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="Adresse email de ton ami"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendEmail}>
              <IconSymbol name="paperplane.fill" size={20} color="#FFFFFF" />
              <Text style={styles.sendButtonText}>Envoyer l&apos;invitation</Text>
            </TouchableOpacity>
          </View>

          {/* Custom Message */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✏️ Message personnalisé</Text>
            <Text style={styles.sectionDescription}>
              Personnalise ton message d&apos;invitation (optionnel)
            </Text>
            <TextInput
              style={styles.messageInput}
              placeholder={defaultMessage}
              placeholderTextColor="#9CA3AF"
              value={customMessage}
              onChangeText={setCustomMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Pourquoi utiliser SocialPlanr ?</Text>
            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitEmoji}>👥</Text>
                <Text style={styles.benefitText}>Organisez vos sorties en groupe facilement</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitEmoji}>💰</Text>
                <Text style={styles.benefitText}>Partagez les frais équitablement</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitEmoji}>📅</Text>
                <Text style={styles.benefitText}>Synchronisation avec vos calendriers</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitEmoji}>🔔</Text>
                <Text style={styles.benefitText}>Rappels automatiques des événements</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>📊 SocialPlanr en chiffres</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1K+</Text>
                <Text style={styles.statLabel}>Utilisateurs</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>Événements</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.8⭐</Text>
                <Text style={styles.statLabel}>Note</Text>
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
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  shareOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shareOption: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  shareOptionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    marginRight: 12,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  statsSection: {
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
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
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
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
}); 
 