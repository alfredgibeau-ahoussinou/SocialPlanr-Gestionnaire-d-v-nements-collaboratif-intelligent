# 🔥 Configuration Google Sign-In sur Firebase - Guide Détaillé

## 📋 **Étapes de configuration Firebase Console**

### **🚀 Étape 1 : Activer Google Sign-In dans Firebase**

#### **1.1 Accéder à Firebase Console**
```
1. Ouvrir https://console.firebase.google.com/
2. Sélectionner votre projet SocialPlanr
3. Cliquer sur "Authentication" dans le menu de gauche
```

#### **1.2 Activer Google comme fournisseur**
```
1. Cliquer sur l'onglet "Sign-in method"
2. Dans la liste des fournisseurs, cliquer sur "Google"
3. Activer le commutateur "Enable"
4. Saisir un nom pour votre projet (ex: "SocialPlanr")
5. Saisir un email de support (votre email)
6. Cliquer sur "Save"
```

---

### **🔧 Étape 2 : Configurer les applications**

#### **2.1 Application Android**

##### **Ajouter l'application Android (si pas déjà fait)**
```
1. Aller dans "Project Settings" (icône engrenage)
2. Onglet "General" → Section "Your apps"
3. Cliquer sur "Add app" → Sélectionner Android
4. Saisir le package name : com.socialplanr.app (ou votre package)
5. Optionnel : App nickname "SocialPlanr Android"
6. Cliquer sur "Register app"
```

##### **Télécharger google-services.json**
```
1. Dans l'étape suivante, télécharger "google-services.json"
2. Placer ce fichier dans : mobile/android/app/google-services.json
3. IMPORTANT : Ce fichier contient vos clés privées, ne pas le commiter
```

##### **Ajouter les SHA fingerprints**
```
1. Dans Project Settings → Your apps → Android app
2. Cliquer sur "Add fingerprint"
3. Générer les SHA avec cette commande :

# Pour debug (développement)
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Pour release (production) - si vous avez une keystore
keytool -list -v -keystore your-release-key.keystore -alias your-key-alias
```

#### **2.2 Application iOS**

##### **Ajouter l'application iOS (si pas déjà fait)**
```
1. Dans "Project Settings" → "Your apps"
2. Cliquer sur "Add app" → Sélectionner iOS
3. Saisir le bundle ID : com.socialplanr.app (ou votre bundle)
4. Optionnel : App nickname "SocialPlanr iOS"
5. Cliquer sur "Register app"
```

##### **Télécharger GoogleService-Info.plist**
```
1. Télécharger "GoogleService-Info.plist"
2. Placer ce fichier dans : mobile/ios/SocialPlanr/GoogleService-Info.plist
3. IMPORTANT : Ce fichier contient vos clés privées, ne pas le commiter
```

---

### **🔑 Étape 3 : Obtenir le Web Client ID**

#### **3.1 Accéder à Google Cloud Console**
```
1. Aller sur https://console.cloud.google.com/
2. Sélectionner le même projet que Firebase (même nom)
3. Menu → "APIs & Services" → "Credentials"
```

#### **3.2 Trouver le Web Client ID**
```
1. Dans la section "OAuth 2.0 Client IDs"
2. Chercher le client avec le type "Web client"
3. Cliquer sur l'icône "Copy" à côté du Client ID
4. Format : 123456789-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
```

#### **3.3 Mettre à jour la configuration**
```typescript
// mobile/config/googleAuth.ts
webClientId: 'COLLER-ICI-VOTRE-WEB-CLIENT-ID.apps.googleusercontent.com',
```

---

### **📱 Étape 4 : Configuration des domaines autorisés**

#### **4.1 Ajouter les domaines**
```
1. Firebase Console → Authentication → Settings
2. Onglet "Authorized domains"
3. Ajouter ces domaines si pas présents :
   - localhost (pour développement)
   - votre-domaine.com (pour production)
   - *.firebaseapp.com (domaine Firebase par défaut)
```

---

## 🛠️ **Configuration du code**

### **📄 Fichiers à mettre à jour**

#### **1. Configuration Google Auth**
```typescript
// mobile/config/googleAuth.ts
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    // ⚠️ REMPLACER par votre vrai Web Client ID
    webClientId: 'VOTRE-WEB-CLIENT-ID.apps.googleusercontent.com',
    offlineAccess: true,
    hostedDomain: '', // Optionnel : restreindre à un domaine
    forceCodeForRefreshToken: true,
  });
};
```

#### **2. Placement des fichiers de configuration**
```bash
# Android
mobile/android/app/google-services.json

# iOS
mobile/ios/SocialPlanr/GoogleService-Info.plist
```

---

## 🔧 **Configuration native**

### **🤖 Android - build.gradle**

#### **Project level (android/build.gradle)**
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.15'
        // ... autres dépendances
    }
}
```

#### **App level (android/app/build.gradle)**
```gradle
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services' // Ajouter cette ligne

dependencies {
    implementation 'com.google.android.gms:play-services-auth:20.4.1'
    // ... autres dépendances
}
```

### **🍎 iOS - Configuration**

#### **Info.plist mise à jour**
```xml
<!-- mobile/ios/SocialPlanr/Info.plist -->
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>GoogleSignIn</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <!-- ⚠️ Remplacer par votre REVERSED_CLIENT_ID depuis GoogleService-Info.plist -->
            <string>com.googleusercontent.apps.123456789-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</string>
        </array>
    </dict>
</array>
```

---

## ✅ **Checklist de validation**

### **🔥 Firebase Console**
- [ ] ✅ Google Sign-In activé dans Authentication
- [ ] ✅ Application Android ajoutée avec SHA fingerprints
- [ ] ✅ Application iOS ajoutée
- [ ] ✅ Domaines autorisés configurés
- [ ] ✅ Web Client ID copié

### **📱 Fichiers de configuration**
- [ ] ✅ `google-services.json` placé dans `mobile/android/app/`
- [ ] ✅ `GoogleService-Info.plist` placé dans `mobile/ios/SocialPlanr/`
- [ ] ✅ Web Client ID mis à jour dans `mobile/config/googleAuth.ts`
- [ ] ✅ build.gradle modifié (Android)
- [ ] ✅ Info.plist modifié (iOS)

### **💻 Code**
- [ ] ✅ Dépendance `@react-native-google-signin/google-signin` installée
- [ ] ✅ AuthContext configuré
- [ ] ✅ Page de connexion mise à jour

---

## 🚨 **Erreurs communes et solutions**

### **❌ "Developer Error"**
```
Cause : SHA fingerprint manquant ou incorrect
Solution : Générer et ajouter le SHA-1 de votre keystore de debug/release
```

### **❌ "Web Client ID not found"**
```
Cause : Web Client ID incorrect ou manquant
Solution : Vérifier le Client ID depuis Google Cloud Console
```

### **❌ "Play Services not available"**
```
Cause : Google Play Services manquant sur l'appareil
Solution : Tester sur un vrai appareil Android (pas émulateur)
```

### **❌ "Unauthorized domain"**
```
Cause : Domaine non autorisé dans Firebase
Solution : Ajouter localhost et autres domaines dans Firebase Console
```

---

## 🧪 **Tests de validation**

### **📱 Tests à effectuer**
```bash
1. Compiler l'application : npx expo run:android / npx expo run:ios
2. Tester sur un appareil physique (pas émulateur)
3. Cliquer sur "Continuer avec Google"
4. Vérifier que la popup Google s'ouvre
5. Se connecter et vérifier la redirection
6. Vérifier que le profil utilisateur est créé dans Firestore
```

### **📊 Logs de débogage**
```typescript
// Ajouter des logs pour debug
console.log('🔑 Configuration Google :', GoogleSignin.getCurrentUser());
console.log('✅ Connexion réussie :', user.email);
```

---

## 🎯 **Commandes finales**

### **🔨 Rebuild nécessaire**
```bash
# Aller dans le dossier mobile
cd mobile

# Android (avec les nouveaux fichiers de config)
npx expo run:android

# iOS (avec les nouveaux fichiers de config)
npx expo run:ios

# ⚠️ Important : npx expo start ne suffit pas, il faut rebuild natif
```

### **🗂️ Structure finale des fichiers**
```
mobile/
├── android/
│   └── app/
│       └── google-services.json         ✅ REQUIS
├── ios/
│   └── SocialPlanr/
│       └── GoogleService-Info.plist     ✅ REQUIS
├── config/
│   └── googleAuth.ts                    ✅ Web Client ID à jour
└── ...
```

---

## 🎉 **Résultat attendu**

**🔐 Après cette configuration, les utilisateurs pourront :**

✅ **Cliquer sur "Continuer avec Google"**
✅ **Voir la popup Google native**
✅ **Sélectionner leur compte Google**
✅ **Se connecter automatiquement à SocialPlanr**
✅ **Avoir leur profil créé dans Firestore**

**🚀 L'authentification Google sera pleinement fonctionnelle !** 
 