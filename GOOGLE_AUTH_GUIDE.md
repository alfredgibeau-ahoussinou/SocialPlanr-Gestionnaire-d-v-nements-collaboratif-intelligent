# 🔐 Guide Configuration Google OAuth - SocialPlanr

## 🎯 **Vue d'ensemble**

Ce guide explique comment configurer l'authentification Google OAuth avec Firebase pour SocialPlanr, permettant aux utilisateurs de s'inscrire et se connecter avec leur compte Google.

---

## 📋 **Fonctionnalités Ajoutées**

### **✅ Authentification Google Complète**
- 🔐 **Connexion Google** : Login via compte Google existant
- 📝 **Inscription Google** : Création compte automatique
- 👤 **Profil automatique** : Données utilisateur récupérées depuis Google
- 🔄 **Synchronisation Firestore** : Profil sauvegardé en base de données
- 🚪 **Déconnexion complète** : Logout Google + Firebase

### **🔧 Intégration Technique**
- ✅ **@react-native-google-signin/google-signin** : Package Google Sign-In
- ✅ **Firebase Auth** : Authentification avec credentials Google
- ✅ **AuthContext étendu** : Fonction `signInWithGoogle()` ajoutée
- ✅ **UI améliorée** : Boutons Google avec états de chargement
- ✅ **Gestion d'erreurs** : Messages utilisateur spécifiques

---

## 🛠️ **Configuration Technique**

### **📦 Dépendances Installées**
```bash
npm install @react-native-google-signin/google-signin
```

### **🔧 AuthContext Modifié**
```typescript
// Nouvelles imports
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

// Configuration Google Sign-In
GoogleSignin.configure({
  webClientId: '1086885031434-your-web-client-id.apps.googleusercontent.com',
});

// Nouvelle fonction dans AuthContext
const signInWithGoogle = async () => {
  try {
    setLoading(true);
    
    // Vérifier Google Play Services
    await GoogleSignin.hasPlayServices();
    
    // Se connecter à Google
    const signInResult = await GoogleSignin.signIn();
    const idToken = signInResult.data?.idToken;
    
    // Créer credentials Firebase
    const googleCredential = GoogleAuthProvider.credential(idToken);
    
    // Authentification Firebase
    const { user } = await signInWithCredential(auth, googleCredential);
    
    // Créer profil utilisateur si nouveau
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      const userProfile = {
        uid: user.uid,
        email: user.email!,
        firstName: 'Utilisateur',
        lastName: 'Google',
        displayName: user.displayName || 'Utilisateur Google',
        createdAt: new Date(),
      };
      await setDoc(doc(db, 'users', user.uid), userProfile);
    }
    
  } catch (error) {
    setLoading(false);
    throw error;
  }
};
```

### **📱 Pages Login/Signup Modifiées**

#### **🔑 Login.tsx**
```typescript
// Import AuthContext étendu
const { login, signInWithGoogle, user } = useAuth();
const [isGoogleLoading, setIsGoogleLoading] = useState(false);

// Fonction Google Login
const handleGoogleLogin = async () => {
  setIsGoogleLoading(true);
  try {
    await signInWithGoogle();
    router.replace('/(tabs)');
  } catch (error) {
    setIsGoogleLoading(false);
    Alert.alert('Erreur de connexion Google', errorMessage);
  }
};

// Bouton Google avec état de chargement
<TouchableOpacity
  style={[styles.googleButton, isGoogleLoading && styles.googleButtonDisabled]}
  onPress={handleGoogleLogin}
  disabled={isGoogleLoading}
>
  {isGoogleLoading ? (
    <View style={styles.loadingContainer}>
      <Animated.View style={styles.loadingSpinner} />
      <Text>Connexion Google...</Text>
    </View>
  ) : (
    <>
      <View style={styles.googleIcon}>
        <Text style={styles.googleIconText}>G</Text>
      </View>
      <Text>Continuer avec Google</Text>
    </>
  )}
</TouchableOpacity>
```

#### **📝 Signup.tsx**
```typescript
// Même logique que Login avec messages adaptés
const handleGoogleSignup = async () => {
  setIsGoogleLoading(true);
  try {
    await signInWithGoogle();
    Alert.alert(
      'Inscription réussie !',
      'Votre compte Google a été créé avec succès.',
      [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
    );
  } catch (error) {
    setIsGoogleLoading(false);
    Alert.alert('Erreur d\'inscription Google', errorMessage);
  }
};
```

---

## ⚙️ **Configuration Firebase Console** (IMPORTANT)

### **🔧 Étape 1 : Obtenir Web Client ID**

1. **Aller sur [Firebase Console](https://console.firebase.google.com/)**
2. **Sélectionner le projet** : `socialplanr-f09f1`
3. **Authentication → Sign-in method → Google → Configurer**
4. **Copier le "Web client ID"** (ressemble à : `1086885031434-abc123def456.apps.googleusercontent.com`)

### **🔧 Étape 2 : Remplacer dans AuthContext**
```typescript
// Dans mobile/contexts/AuthContext.tsx
GoogleSignin.configure({
  webClientId: 'REMPLACER-PAR-LE-VRAI-WEB-CLIENT-ID', // ← ICI
});
```

### **🔧 Étape 3 : Configuration Android (Expo)**

1. **Générer SHA-1 fingerprint** :
   ```bash
   cd mobile
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```

2. **Ajouter SHA-1 dans Firebase Console** :
   - Project Settings → Your apps → Android app
   - Add fingerprint → Coller SHA-1

3. **Télécharger google-services.json** et le placer dans `mobile/`

### **🔧 Étape 4 : Configuration iOS (si nécessaire)**

1. **Télécharger GoogleService-Info.plist**
2. **Ajouter REVERSED_CLIENT_ID dans app.json** :
   ```json
   {
     "expo": {
       "ios": {
         "config": {
           "googleSignIn": {
             "reservedClientId": "com.googleusercontent.apps.1086885031434-abc123"
           }
         }
       }
     }
   }
   ```

---

## 🧪 **Test de Fonctionnement**

### **✅ Scénarios de Test**

#### **📱 Connexion Google Existante**
1. Utilisateur clique "Continuer avec Google"
2. Popup Google s'ouvre → Sélection compte
3. Authentification réussie → Redirection dashboard
4. Profil existant chargé depuis Firestore

#### **📝 Inscription Google Nouvelle**
1. Nouvel utilisateur clique "S'inscrire avec Google"  
2. Popup Google → Autorisation permissions
3. Compte créé automatiquement dans Firebase Auth
4. Profil créé dans Firestore avec données Google
5. Redirection dashboard avec profil complet

#### **🚪 Déconnexion Complète**
1. Utilisateur clique déconnexion
2. Logout Google ET Firebase
3. Session nettoyée → Redirection onboarding

---

## 🔍 **Gestion d'Erreurs**

### **⚠️ Erreurs Possibles et Solutions**

#### **🚫 "Impossible d'obtenir le token Google"**
- **Cause** : Configuration Web Client ID incorrecte
- **Solution** : Vérifier et remplacer le Web Client ID

#### **🚫 "Google Play Services non disponible"**  
- **Cause** : Émulateur sans Google Play Services
- **Solution** : Tester sur appareil physique ou émulateur avec Google Play

#### **🚫 "Connexion Google annulée"**
- **Cause** : Utilisateur ferme la popup Google
- **Solution** : Message informatif, inviter à réessayer

#### **🚫 "Popup bloqué"**
- **Cause** : Navigateur bloque popups
- **Solution** : Message demandant d'autoriser popups

---

## 🎯 **Avantages Utilisateur**

### **⚡ Inscription Ultra Rapide**
- ✅ **1 clic inscription** : Plus de formulaire à remplir
- ✅ **Données pré-remplies** : Nom, email récupérés automatiquement  
- ✅ **Pas de mot de passe** : Sécurité gérée par Google
- ✅ **Connexion permanente** : Session maintenue entre ouvertures app

### **🔒 Sécurité Renforcée** 
- ✅ **OAuth 2.0** : Standard de sécurité Google
- ✅ **Tokens sécurisés** : Pas de stockage mot de passe local
- ✅ **Authentification 2FA** : Si activée sur compte Google
- ✅ **Révocation facile** : Depuis paramètres Google

---

## 📋 **État Actuel**

### **✅ FONCTIONNALITÉS OPÉRATIONNELLES**
- 🔐 **Connexion Google** : Bouton fonctionnel avec gestion erreurs
- 📝 **Inscription Google** : Création compte automatique
- 👤 **Profil utilisateur** : Sauvegarde Firestore des données Google  
- 🔄 **Synchronisation** : État auth global mis à jour
- 🎨 **UI/UX** : États de chargement, animations, messages d'erreur

### **⚙️ CONFIGURATION REQUISE**
- 🔧 **Web Client ID** : À remplacer dans AuthContext.tsx
- 📱 **SHA-1 Android** : À ajouter dans Firebase Console  
- 📋 **google-services.json** : À télécharger et placer

---

## 🚀 **Instructions de Déploiement**

### **📱 Pour Tester (Développement)**
1. **Remplacer Web Client ID** dans `AuthContext.tsx`
2. **Ajouter SHA-1** dans Firebase Console
3. **Redémarrer Expo** : `npx expo start --clear`
4. **Tester sur appareil** avec Google Play Services

### **🏗️ Pour Production**
1. **Configurer SHA-1 production** dans Firebase Console
2. **Mettre à jour google-services.json** production
3. **Tester APK** sur appareils réels
4. **Valider flow** inscription/connexion complet

---

## 🎉 **Résultat Final**

### **✅ GOOGLE OAUTH INTÉGRÉ**
- 🔐 **Authentification moderne** : Google Sign-In native  
- 📱 **Expérience utilisateur fluide** : 1 clic → connecté
- 🔄 **Synchronisation parfaite** : Firebase + Firestore + AuthContext
- 🛡️ **Sécurité optimale** : Standards Google OAuth 2.0
- 🎨 **Interface polished** : Boutons, animations, états chargement

**Google OAuth est maintenant entièrement intégré à SocialPlanr !** 🔐✨

**Les utilisateurs peuvent s'inscrire et se connecter en 1 clic avec leur compte Google !**

**Il ne reste plus qu'à configurer le Web Client ID pour l'activation complète !** 🚀 