# 🚀 Configuration Google Firebase - Guide Rapide

## 🔥 **Actions essentielles à faire MAINTENANT**

### **1️⃣ Firebase Console - Activer Google**
```
🌐 https://console.firebase.google.com/
👉 Votre projet SocialPlanr → Authentication → Sign-in method
👉 Cliquer sur "Google" → Activer → Save
```

### **2️⃣ Obtenir le Web Client ID** ⚠️ **CRUCIAL**
```
🌐 https://console.cloud.google.com/
👉 Même projet → APIs & Services → Credentials
👉 Section "OAuth 2.0 Client IDs" → Type "Web client"
👉 Copier le Client ID (format: xxxxx.apps.googleusercontent.com)
```

### **3️⃣ Mettre à jour le code**
```typescript
// mobile/config/googleAuth.ts
webClientId: 'COLLER-VOTRE-WEB-CLIENT-ID.apps.googleusercontent.com',
```

---

## 📱 **Pour Android (optionnel mais recommandé)**

### **4️⃣ Télécharger google-services.json**
```
🌐 Firebase Console → Project Settings → Your apps → Android
👉 Télécharger "google-services.json"  
👉 Placer dans : mobile/android/app/google-services.json
```

### **5️⃣ Ajouter SHA fingerprint**
```bash
# Générer le SHA pour développement
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Copier le SHA1 affiché
# Aller dans Firebase → Project Settings → Android app → Add fingerprint
```

---

## 🍎 **Pour iOS (optionnel mais recommandé)**

### **6️⃣ Télécharger GoogleService-Info.plist**
```
🌐 Firebase Console → Project Settings → Your apps → iOS
👉 Télécharger "GoogleService-Info.plist"
👉 Placer dans : mobile/ios/SocialPlanr/GoogleService-Info.plist
```

---

## ⚡ **Test rapide**

### **7️⃣ Tester dans Expo Go**
```bash
# L'app Expo est déjà lancée ✅
# Scanner le QR code avec Expo Go
# Aller sur la page de connexion
# Cliquer sur "Continuer avec Google"
```

**💡 NOTE : Google Sign-In fonctionne dans Expo Go avec juste le Web Client ID !**

---

## 🎯 **Résultat attendu**

✅ **Bouton Google cliquable** (plus "bientôt disponible")
✅ **Popup Google** qui s'ouvre
✅ **Connexion automatique** après sélection du compte
✅ **Profil créé** dans Firestore automatiquement

---

## 🆘 **Si ça ne marche pas**

### **❌ Erreur "Developer Error"**
```
➡️ Problème : Web Client ID incorrect
➡️ Solution : Vérifier le Client ID dans Google Cloud Console
```

### **❌ Erreur "Unauthorized domain"**
```
➡️ Problème : Domaine non autorisé
➡️ Solution : Firebase Console → Authentication → Settings → Authorized domains → Ajouter "localhost"
```

### **❌ Le bouton ne fait rien**
```
➡️ Problème : Configuration manquante
➡️ Solution : Vérifier que le Web Client ID est bien dans mobile/config/googleAuth.ts
```

---

## 🔥 **L'ESSENTIEL À RETENIR**

**🎯 3 étapes MINIMUM pour que ça marche :**

1. **Firebase Console** → Activer Google Sign-In ✅
2. **Google Cloud Console** → Copier Web Client ID ✅  
3. **Code** → Mettre le Web Client ID dans googleAuth.ts ✅

**Avec juste ça, Google Sign-In fonctionne dans Expo Go ! 🚀**

Les fichiers natifs (google-services.json, etc.) sont optionnels pour le développement mais recommandés pour la production.

---

## 📞 **Aide rapide**

**🔍 Où trouver le Web Client ID ?**
```
Google Cloud Console → APIs & Services → Credentials
Chercher : "Web client" dans OAuth 2.0 Client IDs
Format : 123456789-xxxxxxxx.apps.googleusercontent.com
```

**📱 Comment tester ?**
```
1. Expo Go sur téléphone
2. Scanner QR code
3. Page connexion → "Continuer avec Google"
4. Popup Google → Choisir compte
5. ✅ Connexion réussie !
```

**🎉 Ça marche ? Parfait ! Google Sign-In est activé ! ✨** 
 