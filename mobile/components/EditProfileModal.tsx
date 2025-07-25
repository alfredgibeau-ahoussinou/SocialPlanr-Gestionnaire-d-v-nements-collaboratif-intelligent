import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from './ui/IconSymbol';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onProfileUpdated: () => void;
}

export default function EditProfileModal({ visible, onClose, onProfileUpdated }: EditProfileModalProps) {
  const { user, userProfile } = useAuth();
  const [firstName, setFirstName] = useState(userProfile?.firstName || '');
  const [lastName, setLastName] = useState(userProfile?.lastName || '');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (loading) return;
    setFirstName(userProfile?.firstName || '');
    setLastName(userProfile?.lastName || '');
    onClose();
  };

  const handleUpdateProfile = async () => {
    if (!user || !userProfile) return;

    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Erreur', 'Le prénom et le nom sont obligatoires');
      return;
    }

    try {
      setLoading(true);
      
      const displayName = `${firstName.trim()} ${lastName.trim()}`;
      
      // Mettre à jour le profil Firebase Auth
      await updateProfile(user, { displayName });
      
      // Mettre à jour le document Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        displayName,
        updatedAt: new Date(),
      });

      Alert.alert(
        'Profil mis à jour',
        'Vos informations ont été mises à jour avec succès',
        [
          {
            text: 'OK',
            onPress: () => {
              onProfileUpdated();
              handleClose();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors de la mise à jour de votre profil. Veuillez réessayer.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = firstName.trim().length > 0 && lastName.trim().length > 0;
  const hasChanges = 
    firstName.trim() !== (userProfile?.firstName || '') ||
    lastName.trim() !== (userProfile?.lastName || '');

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} disabled={loading}>
              <Text style={[styles.cancelButton, loading && styles.disabledText]}>
                Annuler
              </Text>
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Modifier le profil</Text>
            
            <TouchableOpacity
              onPress={handleUpdateProfile}
              disabled={loading || !isFormValid || !hasChanges}
              style={[
                styles.saveButton,
                (!isFormValid || !hasChanges) && styles.saveButtonDisabled
              ]}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#3B82F6" />
              ) : (
                <Text
                  style={[
                    styles.saveButtonText,
                    (!isFormValid || !hasChanges) && styles.saveButtonTextDisabled
                  ]}
                >
                  Sauvegarder
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Avatar */}
            <View style={styles.avatarSection}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>👤</Text>
              </View>
              <Text style={styles.avatarLabel}>Photo de profil</Text>
              <Text style={styles.avatarSubtext}>Bientôt disponible</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Prénom *</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Votre prénom"
                  placeholderTextColor="#9CA3AF"
                  editable={!loading}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nom *</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Votre nom"
                  placeholderTextColor="#9CA3AF"
                  editable={!loading}
                  autoCapitalize="words"
                  returnKeyType="done"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  value={userProfile?.email || ''}
                  editable={false}
                  placeholder="Email non modifiable"
                  placeholderTextColor="#9CA3AF"
                />
                <Text style={styles.helperText}>
                  L&apos;email ne peut pas être modifié pour des raisons de sécurité
                </Text>
              </View>
            </View>

            {/* Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>ℹ️ Informations :</Text>
              <Text style={styles.infoText}>• Les champs marqués d&apos;un * sont obligatoires</Text>
              <Text style={styles.infoText}>• Votre nom d&apos;affichage sera mis à jour automatiquement</Text>
              <Text style={styles.infoText}>• Les modifications sont appliquées immédiatement</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  safeArea: {
    flex: 1,
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
  cancelButton: {
    fontSize: 16,
    color: '#6B7280',
  },
  disabledText: {
    opacity: 0.5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#EBF4FF',
  },
  saveButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  saveButtonTextDisabled: {
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    fontSize: 48,
  },
  avatarLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  avatarSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  inputDisabled: {
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
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
}); 