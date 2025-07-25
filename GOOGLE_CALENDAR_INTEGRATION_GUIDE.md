# 📅 Intégration Google Calendar - Guide Complet

## 🎉 **Nouvelle fonctionnalité : Ajout au calendrier !**

L'application SocialPlanr propose maintenant l'ajout automatique des événements à **Google Calendar** ou au **calendrier local** de votre appareil !

---

## 🎯 **Fonctionnalités disponibles**

### **📝 Lors de la création d'événement :**
- ✅ **Option activable/désactivable** avec un interrupteur
- ✅ **Choix après création** : Google Calendar ou calendrier local
- ✅ **Configuration automatique** de la durée (1 heure par défaut)

### **📋 Depuis la liste des événements :**
- ✅ **Bouton "Ajouter au calendrier"** sur chaque événement
- ✅ **Accès rapide** sans modification de l'événement
- ✅ **Même choix** : Google Calendar ou calendrier local

---

## 🔧 **Comment utiliser**

### **🆕 Créer un nouvel événement avec calendrier :**

1. **Ouvrir le modal** de création d'événement
2. **Remplir les informations** (titre, date, heure, etc.)
3. **Activer l'option** "📅 Ajouter au calendrier" (activée par défaut)
4. **Créer l'événement**
5. **Choisir l'option** dans l'alerte de succès :
   - **"Terminer"** : Fermer sans ajouter au calendrier
   - **"📅 Ajouter au calendrier"** : Choisir où ajouter

### **📋 Ajouter un événement existant au calendrier :**

1. **Aller dans l'onglet "Événements"**
2. **Trouver l'événement** dans la liste
3. **Taper sur "📅 Ajouter au calendrier"**
4. **Choisir l'option** dans la popup :
   - **"🌐 Google Calendar"** : Ouvrir dans Google Calendar
   - **"📱 Calendrier local"** : Ajouter au calendrier natif

---

## 📱 **Options d'ajout au calendrier**

### **🌐 Google Calendar :**
- **Ouverture automatique** de Google Calendar (app ou web)
- **Formulaire pré-rempli** avec toutes les informations
- **Synchronisation** avec votre compte Google
- **Accessible partout** où vous avez Google Calendar

### **📱 Calendrier local :**
- **Ajout direct** au calendrier natif iOS/Android
- **Demande de permission** automatique
- **Intégration native** avec l'OS
- **Synchronisation** avec vos autres appareils (si configurée)

---

## 🎨 **Interface utilisateur**

### **Dans le modal de création :**
```
📅 Ajouter au calendrier                    [🔘 ON]
Propose d'ajouter automatiquement à Google 
Calendar ou calendrier local après création
```

### **Alerte après création (si option activée) :**
```
🎉 Événement créé !
L'événement "Mon événement" a été créé avec succès 
pour le jeudi 25 janvier 2024 à 19h00.

[Terminer] [📅 Ajouter au calendrier]
```

### **Choix du calendrier :**
```
📅 Ajouter au calendrier
Choisissez où ajouter votre événement :

[🌐 Google Calendar]
[📱 Calendrier local]
[Annuler]
```

### **Dans la liste des événements :**
```
┌─────────────────────────────────────┐
│ 🎉 Mon événement             [Actif] │
│ Description de l'événement...       │
│ 📅 Date : 25/01/2024               │
│ 📍 Lieu : Paris                    │
│ 👥 Participants : 3 personnes       │
│ ─────────────────────────────────   │
│ Créé le 20/01/2024                 │
├─────────────────────────────────────┤
│    [📅 Ajouter au calendrier]       │
└─────────────────────────────────────┘
```

---

## ⚙️ **Configuration technique**

### **Données envoyées au calendrier :**
- **Titre** : Titre de l'événement SocialPlanr
- **Description** : Description de l'événement + mention SocialPlanr
- **Date/Heure** : Date et heure sélectionnées
- **Durée** : 1 heure par défaut
- **Lieu** : Lieu de l'événement (si spécifié)

### **Format Google Calendar :**
- **URL générée** avec tous les paramètres
- **Compatible** avec l'app Google Calendar et le web
- **Pré-remplissage** complet du formulaire

### **Calendrier natif :**
- **Permissions** automatiquement demandées
- **Calendrier principal** utilisé par défaut
- **Intégration native** iOS/Android

---

## 🔒 **Permissions et sécurité**

### **Permissions requises :**
- **Calendrier local** : Accès au calendrier natif (iOS/Android)
- **Google Calendar** : Aucune permission (ouverture d'URL)

### **Données partagées :**
- **Avec Google** : Seulement les données de l'événement (via URL)
- **Stockage local** : Aucune donnée supplémentaire stockée
- **Respect de la vie privée** : Pas de tracking additionnel

---

## 🎯 **Avantages pour l'utilisateur**

### **🚀 Productivité :**
- ✅ **Pas de double saisie** - Informations automatiquement transférées
- ✅ **Synchronisation** avec vos calendriers existants
- ✅ **Rappels** via votre app de calendrier habituelle
- ✅ **Vue globale** de votre planning

### **🎨 Flexibilité :**
- ✅ **Choix libre** - Activer/désactiver selon vos besoins
- ✅ **Deux options** - Google Calendar ET calendrier local
- ✅ **Ajout ultérieur** - Depuis la liste des événements
- ✅ **Compatible** avec tous les appareils

### **🔄 Workflow amélioré :**
1. **Planifier** avec SocialPlanr (groupe, participants, etc.)
2. **Créer** l'événement avec toutes les options
3. **Ajouter** automatiquement à votre calendrier
4. **Recevoir** les rappels de votre calendrier
5. **Partager** avec vos outils habituels

---

## 🧪 **Comment tester**

### **Test 1 : Création avec calendrier**
1. Créer un nouvel événement
2. Vérifier que l'option calendrier est activée
3. Créer l'événement
4. Choisir "📅 Ajouter au calendrier"
5. Tester Google Calendar ET calendrier local

### **Test 2 : Ajout depuis la liste**
1. Aller dans l'onglet "Événements"
2. Trouver un événement existant
3. Taper sur "📅 Ajouter au calendrier"
4. Vérifier les deux options

### **Test 3 : Option désactivée**
1. Créer un événement avec l'option calendrier désactivée
2. Vérifier que seul "Parfait !" apparaît
3. Ajouter ultérieurement depuis la liste

---

## 🔮 **Évolutions futures**

### **À court terme :**
- 🔄 **Durée personnalisable** (30min, 1h, 2h, journée entière)
- 🔄 **Rappels configurables** (15min, 1h, 1 jour avant)
- 🔄 **Événements récurrents** (hebdo, mensuel)

### **À moyen terme :**
- 🔄 **Synchronisation bidirectionnelle** (modifications de calendrier → SocialPlanr)
- 🔄 **Calendriers multiples** (travail, personnel, etc.)
- 🔄 **Invitations automatiques** via calendrier

### **À long terme :**
- 🔄 **Intégration Outlook, Apple Calendar**
- 🔄 **Assistant IA** pour suggestions d'horaires
- 🔄 **Gestion des conflits** automatique

---

## ✅ **Résultat**

**L'intégration Google Calendar transforme SocialPlanr en véritable hub de planification !**

Les utilisateurs peuvent maintenant :
- 📅 **Planifier** leurs événements sociaux dans SocialPlanr
- 🔗 **Intégrer** automatiquement à leurs calendriers
- 🔔 **Recevoir** des rappels via leurs apps favorites
- 🌍 **Partager** facilement avec leurs outils existants

**Une expérience fluide de la création à la participation !** 🎉 
 