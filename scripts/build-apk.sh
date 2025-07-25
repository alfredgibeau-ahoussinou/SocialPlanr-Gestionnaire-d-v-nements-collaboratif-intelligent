#!/bin/bash

# Script de génération APK pour SocialPlanr
# Usage: ./scripts/build-apk.sh

set -e

echo "🚀 Génération de l'APK SocialPlanr..."

# Vérifier si Java est installé
if ! command -v java &> /dev/null; then
    echo "❌ Java n'est pas installé !"
    echo "📦 Installation requise :"
    echo "   macOS: brew install openjdk"
    echo "   Ubuntu: sudo apt-get install default-jdk"
    echo "   Windows: https://www.oracle.com/java/technologies/downloads/"
    echo ""
    echo "💡 En attendant, utilisez Expo Go : http://localhost:8081"
    exit 1
fi

# Vérifier si EAS CLI est installé
if ! command -v eas &> /dev/null; then
    echo "📦 Installation d'EAS CLI..."
    npm install -g eas-cli
fi

# Naviguer vers le dossier mobile
cd mobile

# Configurer EAS si pas déjà fait
if [ ! -f "eas.json" ]; then
    echo "⚙️ Configuration d'EAS Build..."
    eas build:configure
fi

# Créer le build APK local
echo "🔨 Génération du build APK local..."
eas build --platform android --local --profile preview

# Trouver le fichier APK généré
APK_FILE=$(find . -name "*.apk" -type f -exec ls -t {} + | head -n1)

if [ -n "$APK_FILE" ]; then
    # Copier l'APK vers le dossier web/public
    echo "📱 Copie de l'APK vers le site web..."
    cp "$APK_FILE" "../web/public/socialplanr-v1.0.0.apk"
    
    # Obtenir la taille du fichier
    SIZE=$(du -h "../web/public/socialplanr-v1.0.0.apk" | cut -f1)
    
    echo "✅ APK généré avec succès !"
    echo "📁 Fichier: socialplanr-v1.0.0.apk"
    echo "📏 Taille: $SIZE"
    echo "🌐 Disponible sur: http://localhost:3000/install"
else
    echo "❌ Échec de la génération de l'APK"
    exit 1
fi

cd ..

echo "🎉 Build terminé ! L'APK est maintenant disponible au téléchargement." 