# 🔥 Guide de Configuration Firebase pour SocialPlanr

## 📋 **Étapes de configuration dans Firebase Console**

### 1. **Création du projet Firebase**

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Nom du projet : `socialplanr-production` (ou votre choix)
4. Activez Google Analytics (optionnel)
5. Sélectionnez votre région (Europe pour de meilleures performances)

---

### 2. **Configuration Authentication**

#### **2.1 Activer Authentication**
1. Dans la console Firebase → **Authentication**
2. Cliquez sur **Commencer**
3. Onglet **Sign-in method**

#### **2.2 Configurer les méthodes de connexion**
- ✅ **E-mail/Mot de passe** : Activer
- ✅ **Google** : Activer (pour plus tard)
- 🔧 **Domaines autorisés** : Ajouter votre domaine de production

#### **2.3 Paramètres utilisateur**
- **Création de compte** : Autorisée
- **Suppression de compte** : Autorisée par l'utilisateur
- **Multi-factor** : Désactivé (pour simplifier)

---

### 3. **Configuration Firestore Database**

#### **3.1 Créer la base de données**
1. Firebase Console → **Firestore Database**
2. Cliquez sur **Créer une base de données**
3. **Mode production** (avec règles de sécurité)
4. **Emplacement** : `europe-west1` ou `europe-west3`

#### **3.2 Appliquer les règles de sécurité**
1. Onglet **Règles**
2. Remplacer le contenu par les règles du fichier `firestore.rules`
3. **Publier** les modifications

#### **3.3 Créer les collections initiales**
```
📁 Firestore Database
├── 👥 users (collection)
├── 👥 groups (collection)  
├── 📅 events (collection)
└── 💰 expenses (collection) - pour plus tard
```

---

### 4. **Indexes Composites requis**

Créez ces indexes dans **Firestore** → **Index** → **Index composites** :

#### **4.1 Index pour les groupes d'un utilisateur**
```
Collection: groups
Champs indexés:
- members (Tableau-contient)
- createdAt (Décroissant)
Statut de requête: Activé
```

#### **4.2 Index pour les événements d'un utilisateur**
```
Collection: events  
Champs indexés:
- attendees (Tableau-contient)
- date (Décroissant)
Statut de requête: Activé
```

#### **4.3 Index pour les événements d'un groupe**
```
Collection: events
Champs indexés:
- groupId (Croissant)
- date (Décroissant)  
Statut de requête: Activé
```

#### **4.4 Index pour les événements par statut**
```
Collection: events
Champs indexés:
- status (Croissant)
- date (Décroissant)
Statut de requête: Activé
```

---

### 5. **Configuration des paramètres réseau**

#### **5.1 Résoudre les erreurs WebChannel**
1. **Firestore** → **Paramètres** → **Général**
2. **Mode hors ligne** : Activé
3. **Cache de persistance** : Activé
4. **Taille du cache** : 100 MB (recommandé)

#### **5.2 Paramètres de connexion réseau**
```javascript
// Dans mobile/config/firebase.ts - ajouter après initializeApp
import { connectFirestoreEmulator, enableNetwork } from 'firebase/firestore';

// Configuration réseau Firestore
const db = getFirestore(app);

// Optimisation pour réduire les erreurs WebChannel
enableNetwork(db);
```

---

### 6. **Configuration des paramètres de sécurité**

#### **6.1 Authentification**
- **Domaines autorisés** : 
  - `localhost` (développement)
  - Votre domaine de production
  - `socialplanr.com` (exemple)

#### **6.2 CORS et domaines**
1. **Authentication** → **Paramètres** → **Domaines autorisés**
2. Ajouter tous vos domaines de test et production

---

### 7. **Configuration pour le développement**

#### **7.1 Variables d'environnement**
Créer `mobile/.env` :
```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

#### **7.2 Mode développement**
```javascript
// Pour tester localement avec Firebase Emulator (optionnel)
if (__DEV__) {
  // Utiliser l'émulateur local si disponible
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

---

### 8. **Monitoring et Analytics**

#### **8.1 Activer les métriques**
1. **Firebase** → **Analytics**
2. Configurer Google Analytics 4
3. Activer les événements automatiques

#### **8.2 Surveillance des performances**
1. **Performance Monitoring** → Activer
2. **Crashlytics** → Activer (pour production)

---

### 9. **Quotas et limites**

#### **9.1 Plan gratuit Spark**
- ✅ **20,000 lectures/jour**
- ✅ **20,000 écritures/jour**  
- ✅ **20,000 suppressions/jour**
- ✅ **1 GB stockage**

#### **9.2 Surveillance des quotas**
1. **Usage and billing** → Surveiller l'utilisation
2. Configurer des alertes à 80% des quotas

---

### 10. **Optimisations pour réduire les erreurs**

#### **10.1 Corrections des erreurs WebChannel**
```javascript
// mobile/config/firebase.ts
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});
```

#### **10.2 Gestion hors ligne**
```javascript
// Activer le support hors ligne
import { enableNetwork, disableNetwork } from 'firebase/firestore';

// Écouter l'état de la connexion
NetInfo.addEventListener(state => {
  if (state.isConnected) {
    enableNetwork(db);
  } else {
    disableNetwork(db);
  }
});
```

---

## ✅ **Checklist de déploiement**

- [ ] Projet Firebase créé
- [ ] Authentication activée (Email/Password)
- [ ] Firestore configuré avec bonnes règles
- [ ] Index composites créés
- [ ] Domaines autorisés configurés
- [ ] Variables d'environnement définies
- [ ] Tests de connexion effectués
- [ ] Surveillance activée
- [ ] Quotas vérifiés

---

## 🚨 **Résolution des erreurs courantes**

### **Erreur "client is offline"**
- Vérifier la connexion internet
- Activer le mode hors ligne Firestore
- Configurer le cache persistant

### **Erreurs WebChannelConnection**
- Normal en développement
- Réduites avec la configuration de cache
- Pas bloquantes pour l'utilisation

### **Erreurs de permissions**
- Vérifier les règles Firestore
- S'assurer que l'utilisateur est authentifié
- Contrôler les champs requis dans les documents

---

## 📞 **Support**

Pour toute question sur la configuration Firebase :
1. [Documentation Firebase](https://firebase.google.com/docs)
2. [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
3. [Performance Best Practices](https://firebase.google.com/docs/firestore/best-practices) 