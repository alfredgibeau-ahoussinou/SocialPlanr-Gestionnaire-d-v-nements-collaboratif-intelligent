import React, { useState } from 'react';
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
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

interface CreateGroupModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CreateGroupModal({ visible, onClose }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert('Erreur', 'Veuillez saisir un nom pour le groupe');
      return;
    }

    if (!user) {
      Alert.alert('Erreur', 'Vous devez être connecté pour créer un groupe');
      return;
    }

    setLoading(true);

    try {
      const groupData = {
        name: groupName.trim(),
        description: groupDescription.trim() || null,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        members: [user.uid], // Le créateur est automatiquement membre
        memberCount: 1,
        status: 'planning' as const,
        // Métadonnées pour les fonctionnalités futures
        events: [],
        expenses: [],
        inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      };

      await addDoc(collection(db, 'groups'), groupData);
      
      Alert.alert(
        'Groupe créé !',
        `Le groupe "${groupName}" a été créé avec succès.`,
        [{ text: 'OK', onPress: () => {
          setGroupName('');
          setGroupDescription('');
          onClose();
        }}]
      );
    } catch (error) {
      console.error('Erreur lors de la création du groupe:', error);
      Alert.alert('Erreur', 'Impossible de créer le groupe. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setGroupName('');
    setGroupDescription('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Créer un nouveau groupe</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Formulaire */}
            <View style={styles.form}>
              {/* Nom du groupe */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>👥 Nom du groupe *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Week-end à Paris, Voyage d'été..."
                  value={groupName}
                  onChangeText={setGroupName}
                  autoCapitalize="words"
                  maxLength={50}
                />
                <Text style={styles.inputHint}>{groupName.length}/50 caractères</Text>
              </View>

              {/* Description */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>📝 Description (optionnel)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Décrivez votre projet ou événement..."
                  value={groupDescription}
                  onChangeText={setGroupDescription}
                  multiline
                  numberOfLines={3}
                  maxLength={200}
                />
                <Text style={styles.inputHint}>{groupDescription.length}/200 caractères</Text>
              </View>

              {/* Informations */}
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>ℹ️ À savoir :</Text>
                <Text style={styles.infoText}>• Vous serez automatiquement administrateur du groupe</Text>
                <Text style={styles.infoText}>• Vous pourrez inviter des amis avec un code</Text>
                <Text style={styles.infoText}>• Le groupe commence en mode &quot;Planification&quot;</Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleClose}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.createButton, loading && styles.createButtonDisabled]} 
                onPress={handleCreateGroup}
                disabled={loading || !groupName.trim()}
              >
                <Text style={styles.createButtonText}>
                  {loading ? 'Création...' : 'Créer le groupe'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
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
    width: 30,
    height: 30,
    borderRadius: 15,
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
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
}); 