#!/bin/bash

# Script de déploiement rapide pour SocialPlanr Web
# Usage: ./deploy.sh [--dry-run]

set -e

DRY_RUN="${1:-}"

echo "🚀 Déploiement de SocialPlanr Web"
echo ""

cd "$(dirname "$0")"

# Vérifications pré-déploiement
echo "📋 Vérifications pré-déploiement..."

# Vérifier la taille de l'APK si présent
if [ -f "public/socialplanr-v1.0.1.apk" ]; then
    APK_SIZE=$(ls -lh public/socialplanr-v1.0.1.apk | awk '{print $5}' | sed 's/M//')
    if [ "$APK_SIZE" -gt 100 ] 2>/dev/null; then
        echo "⚠️  APK de $(ls -lh public/socialplanr-v1.0.1.apk | awk '{print $5}') dépasse la limite Vercel (100 MB)"
        echo "💡 L'APK doit être hébergé ailleurs (Firebase Storage, GitHub Releases, etc.)"
        echo "💡 Retirer l'APK de public/ pour permettre le déploiement"
        read -p "Continuer le déploiement sans l'APK dans Vercel? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
        echo "📦 Déplacement de l'APK hors de public/..."
        mkdir -p ../apk-archive
        mv public/socialplanr-v1.0.1.apk ../apk-archive/socialplanr-v1.0.1.apk
        echo "✅ APK déplacé vers ../apk-archive/"
    else
        echo "✅ APK v1.0.1 trouvé ($(ls -lh public/socialplanr-v1.0.1.apk | awk '{print $5}'))"
    fi
else
    echo "ℹ️  APK non présent dans public/ (sera hébergé ailleurs)"
fi

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Erreur: Vercel CLI non installé"
    echo "💡 Installer avec: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI installé"

# Tester le build
echo ""
echo "🔨 Test du build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build réussi"
else
    echo "❌ Erreur: Build échoué"
    echo "💡 Vérifier les erreurs avec: npm run build"
    exit 1
fi

# Déploiement
echo ""
if [ "$DRY_RUN" == "--dry-run" ]; then
    echo "🔍 Mode dry-run - Aucun déploiement effectué"
    echo "💡 Pour déployer réellement, exécutez: ./deploy.sh"
else
    echo "🚀 Déploiement en production..."
    vercel --prod
    
    echo ""
    echo "✅ Déploiement terminé!"
    echo "💡 Vérifier le site sur votre domaine Vercel"
fi

