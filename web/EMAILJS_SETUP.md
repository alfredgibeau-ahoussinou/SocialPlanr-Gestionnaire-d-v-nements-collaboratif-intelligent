# Configuration EmailJS pour le formulaire de contact

Ce guide vous explique comment configurer EmailJS pour que les messages du formulaire de contact soient envoyés à `socialplanr75@gmail.com`.

## Étapes de configuration

### 1. Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit (100 emails/mois gratuits)
3. Connectez-vous à votre compte

### 2. Configurer un service email

1. Dans le dashboard EmailJS, allez dans **Email Services**
2. Cliquez sur **Add New Service**
3. Sélectionnez **Gmail** (ou votre service email préféré)
4. Connectez votre compte Gmail `socialplanr75@gmail.com`
5. Notez le **Service ID** (ex: `service_xxxxxxx`)

### 3. Créer un template d'email

1. Allez dans **Email Templates**
2. Cliquez sur **Create New Template**
3. Configurez le template avec les variables suivantes :
   - **To Email**: `socialplanr75@gmail.com`
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{from_email}}`
   - **Subject**: `Contact SocialPlanr - {{subject}}`
   - **Message**: 
     ```
     Nouveau message de contact depuis le site SocialPlanr
     
     Nom: {{from_name}}
     Email: {{from_email}}
     Sujet: {{subject}}
     
     Message:
     {{message}}
     ```
4. Notez le **Template ID** (ex: `template_xxxxxxx`)

### 4. Obtenir votre clé publique

1. Allez dans **Account** > **General**
2. Copiez votre **Public Key** (ex: `xxxxxxxxxxxxx`)

### 5. Configurer les variables d'environnement

1. Créez un fichier `.env.local` dans le dossier `web/`
2. Ajoutez les variables suivantes :

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=votre_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key
```

### 6. Configurer sur Vercel

1. Allez sur votre projet Vercel
2. Allez dans **Settings** > **Environment Variables**
3. Ajoutez les trois variables :
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. Redéployez votre application

## Test

Une fois configuré, testez le formulaire de contact sur votre site. Vous devriez recevoir les emails à `socialplanr75@gmail.com`.

## Vérification du template EmailJS

Assurez-vous que votre template EmailJS (`template_2ocbpt7`) utilise exactement ces variables :

- `{{from_name}}` - Nom de l'expéditeur
- `{{from_email}}` - Email de l'expéditeur
- `{{subject}}` - Sujet du message
- `{{message}}` - Contenu du message
- `{{to_email}}` - Email de destination (optionnel, peut être fixé dans le template)
- `{{reply_to}}` - Email pour répondre (optionnel)

**Exemple de template EmailJS :**

```
To Email: socialplanr75@gmail.com
From Name: {{from_name}}
From Email: {{from_email}}
Reply To: {{reply_to}}
Subject: Contact SocialPlanr - {{subject}}

Message:
Nouveau message de contact depuis le site SocialPlanr

Nom: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}
```

## Dépannage

### Erreur lors de l'envoi

1. **Vérifiez les variables d'environnement** :
   - Ouvrez la console du navigateur (F12)
   - Vérifiez les logs qui affichent la configuration EmailJS
   - Assurez-vous que les trois variables sont présentes (✓)

2. **Vérifiez le template EmailJS** :
   - Connectez-vous à votre compte EmailJS
   - Vérifiez que le template `template_2ocbpt7` existe
   - Vérifiez que toutes les variables sont correctement nommées

3. **Vérifiez le service EmailJS** :
   - Assurez-vous que le service `service_79gkdof` est actif
   - Vérifiez que Gmail est bien connecté
   - Testez l'envoi depuis le dashboard EmailJS

4. **Vérifiez les quotas** :
   - Le plan gratuit permet 100 emails/mois
   - Vérifiez que vous n'avez pas dépassé la limite

5. **Console du navigateur** :
   - Ouvrez la console (F12) lors de l'envoi
   - Regardez les messages d'erreur détaillés
   - Les logs affichent les paramètres envoyés et les erreurs

### Variables d'environnement configurées

Les variables suivantes sont déjà configurées sur Vercel :
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` = `service_79gkdof`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` = `IF_fEerZUBaDTcEt5`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` = `template_2ocbpt7`

## Alternative : Utiliser directement mailto

Si EmailJS ne fonctionne pas, le formulaire utilisera automatiquement un lien `mailto:` comme solution de secours.

