# 🎉 SocialPlanr - Gestionnaire d'événements collaboratif intelligent

[![Expo](https://img.shields.io/badge/Expo-53.0.20-blue.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-12.0.0-orange.svg)](https://firebase.google.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Organisez vos événements en collaboration avec vos amis !** 

SocialPlanr est une application mobile moderne qui simplifie l'organisation d'événements en groupe, la gestion des dépenses partagées et la synchronisation avec vos calendriers.

## ✨ Fonctionnalités principales

### 🎯 Gestion d'événements
- **Création d'événements** avec titre, description, date, heure et lieu
- **Système de groupes** pour organiser vos événements par cercle d'amis
- **Invitations** par email ou partage de lien
- **Statuts d'événements** : planification, vote, confirmé, en cours, terminé

### 💰 Gestion des dépenses
- **Ajout de dépenses** avec description et montant
- **Calcul automatique** des parts de chacun
- **Historique des dépenses** par événement
- **Remboursements** et équilibrage des comptes

### 📅 Intégration calendrier
- **Synchronisation Google Calendar** automatique
- **Calendrier natif** iOS/Android
- **Rappels automatiques** des événements
- **Notifications push** personnalisées

### 👥 Collaboration
- **Groupes privés** avec invitations
- **Partage de frais** équitable
- **Notifications en temps réel**
- **Chat intégré** (en développement)

## 🚀 Installation et démarrage

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/go) (pour tester sur mobile)

### Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd SocialPlanr-Gestionnaire-d-v-nements-collaboratif-intelligent/mobile
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration Firebase**
   - Créer un projet Firebase
   - Copier les clés de configuration dans `config/firebase.ts`
   - Activer Authentication et Firestore

4. **Démarrer l'application**
   ```bash
   npx expo start
   ```

5. **Tester l'application**
   - Scanner le QR code avec Expo Go (Android)
   - Utiliser l'app Camera (iOS)
   - Ou ouvrir dans un émulateur

## 📱 Structure du projet

```
mobile/
├── app/                    # Pages principales (Expo Router)
│   ├── (tabs)/            # Navigation par onglets
│   ├── login.tsx          # Page de connexion
│   ├── signup.tsx         # Page d'inscription
│   └── onboarding.tsx     # Page d'accueil
├── components/            # Composants réutilisables
│   ├── CreateEventModal.tsx
│   ├── AddExpenseModal.tsx
│   ├── CreateGroupModal.tsx
│   └── ui/               # Composants UI de base
├── contexts/             # Contextes React
│   ├── AuthContext.tsx   # Gestion de l'authentification
│   └── NotificationContext.tsx
├── config/              # Configuration
│   ├── firebase.ts      # Configuration Firebase
│   └── googleAuth.ts    # Configuration Google Auth
├── utils/               # Utilitaires
│   ├── calendarUtils.ts # Intégration calendrier
│   └── notificationHelpers.ts
└── assets/              # Ressources (images, fonts)
```

## 🔧 Technologies utilisées

### Frontend
- **React Native** 0.79.5 - Framework mobile cross-platform
- **Expo** 53.0.20 - Plateforme de développement
- **TypeScript** 5.8.3 - Typage statique
- **Expo Router** - Navigation basée sur les fichiers

### Backend & Services
- **Firebase** 12.0.0
  - **Authentication** - Connexion email/mot de passe et Google
  - **Firestore** - Base de données NoSQL en temps réel
  - **Cloud Functions** - Logique serveur (en développement)

### UI/UX
- **Expo Vector Icons** - Icônes système
- **React Native Reanimated** - Animations fluides
- **Expo Haptics** - Retour haptique
- **Expo Notifications** - Notifications push

### Intégrations
- **Google Calendar API** - Synchronisation calendrier
- **Expo Calendar** - Calendrier natif
- **Expo Linking** - Liens profonds

## 🎨 Interface utilisateur

### Design System
- **Couleurs** : Palette moderne avec bleu principal (#3B82F6)
- **Typographie** : Hiérarchie claire et lisible
- **Animations** : Transitions fluides et feedback visuel
- **Accessibilité** : Support des lecteurs d'écran

### Navigation
- **Onglets principaux** : Dashboard, Événements, Dépenses, Profil
- **Modales** : Création d'événements, ajout de dépenses
- **Navigation stack** : Détails et modifications

## 🔐 Sécurité

### Authentification
- **Firebase Auth** avec email/mot de passe
- **Google Sign-In** pour une connexion rapide
- **Persistance sécurisée** des sessions
- **Gestion des permissions** utilisateur

### Données
- **Chiffrement** des données sensibles
- **Règles Firestore** pour la sécurité
- **Validation** côté client et serveur
- **GDPR compliant** - Respect de la vie privée

## 📊 État du projet

### ✅ Fonctionnalités terminées
- [x] Authentification Firebase
- [x] Création et gestion d'événements
- [x] Système de groupes
- [x] Gestion des dépenses
- [x] Intégration Google Calendar
- [x] Notifications push
- [x] Interface utilisateur complète
- [x] Tests de qualité (ESLint, TypeScript)

### 🚧 En développement
- [ ] Chat en temps réel
- [ ] Partage de photos
- [ ] Rapports et statistiques
- [ ] Mode hors ligne
- [ ] Synchronisation multi-appareils

### 📋 Roadmap
- [ ] Version web (Next.js)
- [ ] API REST publique
- [ ] Intégrations tierces (WhatsApp, Telegram)
- [ ] Fonctionnalités premium
- [ ] Application desktop

## 🧪 Tests et qualité

### Qualité du code
```bash
# Vérification ESLint
npm run lint

# Vérification TypeScript
npx tsc --noEmit

# Vérification Expo
npx expo-doctor
```

### Métriques actuelles
- **Erreurs ESLint** : 0 ✅
- **Warnings ESLint** : 13 (non critiques)
- **TypeScript** : 100% valide ✅
- **Couverture de tests** : En cours

## 📦 Build et déploiement

### Build Android
```bash
# Build APK
npx expo run:android

# Build avec EAS
eas build --platform android
```

### Build iOS
```bash
# Build iOS (nécessite macOS)
npx expo run:ios

# Build avec EAS
eas build --platform ios
```

### Déploiement
- **Expo Go** : Test rapide et développement
- **Development Build** : Fonctionnalités natives
- **Production Build** : App Store / Google Play

## 🤝 Contribution

### Comment contribuer
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de code
- **TypeScript** strict
- **ESLint** configuration Expo
- **Prettier** pour le formatage
- **Conventional Commits** pour les messages

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

### Documentation
- [Guide d'utilisation](docs/USER_GUIDE.md)
- [Guide développeur](docs/DEVELOPER_GUIDE.md)
- [API Reference](docs/API.md)

### Contact
- **Email** : support@socialplanr.com
- **Site web** : [www.socialplanr.com](https://www.socialplanr.com)
- **Discord** : [Serveur communautaire](https://discord.gg/socialplanr)

### Signaler un bug
Utilisez l'onglet "Support" dans l'application ou ouvrez une [issue GitHub](https://github.com/your-username/socialplanr/issues).

## 🙏 Remerciements

- **Expo** pour la plateforme de développement
- **Firebase** pour les services backend
- **React Native** pour le framework mobile
- **La communauté open source** pour les contributions

---

**Développé avec ❤️ par l'équipe SocialPlanr**

*Organisez vos événements en collaboration avec vos amis !*
