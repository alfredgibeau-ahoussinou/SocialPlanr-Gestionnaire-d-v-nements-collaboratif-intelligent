"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function DevPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (mobileMenuOpen && !target.closest('[data-mobile-menu]')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SocialPlanr
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/fonctionnalites" className="text-gray-600 hover:text-blue-600 transition-colors">
                Fonctionnalités
              </Link>
              <Link href="/comment-ca-marche" className="text-gray-600 hover:text-blue-600 transition-colors">
                Comment ça marche
              </Link>
              <Link href="/install" className="text-gray-600 hover:text-blue-600 transition-colors">
                📱 Installer l&apos;app
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105"
              data-mobile-menu
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                <span 
                  className={`absolute w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45' : 'translate-y-[-6px]'
                  }`}
                />
                <span 
                  className={`absolute w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                />
                <span 
                  className={`absolute w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45' : 'translate-y-[6px]'
                  }`}
                />
              </div>
            </button>
          </div>
          
          {/* Mobile Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-[400ms] ease-in-out ${
              mobileMenuOpen 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
            data-mobile-menu
          >
            <div className="px-3 pt-3 pb-3 space-y-1.5 bg-white/98 backdrop-blur-2xl rounded-2xl mt-3 shadow-xl border-2 border-blue-100/50">
              <Link 
                href="/fonctionnalites" 
                className="block px-4 py-2.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all duration-300 transform hover:scale-[1.03] font-medium relative overflow-hidden group"
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  animation: mobileMenuOpen ? 'scaleIn 0.35s ease-out 0.05s both' : 'none' 
                }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="text-lg">📋</span>
                  <span>Fonctionnalités</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              <Link
                href="/comment-ca-marche" 
                className="block px-4 py-2.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all duration-300 transform hover:scale-[1.03] font-medium relative overflow-hidden group"
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  animation: mobileMenuOpen ? 'scaleIn 0.35s ease-out 0.1s both' : 'none' 
                }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="text-lg">❓</span>
                  <span>Comment ça marche</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              <Link
                href="/install" 
                className="block px-4 py-2.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all duration-300 transform hover:scale-[1.03] font-medium relative overflow-hidden group"
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  animation: mobileMenuOpen ? 'scaleIn 0.35s ease-out 0.15s both' : 'none' 
                }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="text-lg">📱</span>
                  <span>Installer l&apos;app</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              <Link
                href="/contact" 
                className="block px-4 py-2.5 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all duration-300 transform hover:scale-[1.03] font-medium relative overflow-hidden group"
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  animation: mobileMenuOpen ? 'scaleIn 0.35s ease-out 0.2s both' : 'none' 
                }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="text-lg">📞</span>
                  <span>Contact</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            🏗️ État Actuel du Développement
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Monorepo complet avec application mobile fonctionnelle
          </p>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-green-400 text-2xl mb-3">✅</div>
              <h4 className="text-lg font-semibold mb-3">Frontend Complet</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Site Next.js avec Tailwind CSS</li>
                <li>• App mobile Expo/React Native</li>
                <li>• 4 écrans entièrement fonctionnels</li>
                <li>• Types TypeScript partagés</li>
                <li>• Navigation et design cohérents</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-yellow-400 text-2xl mb-3">🔧</div>
              <h4 className="text-lg font-semibold mb-3">En Développement</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Authentification Firebase</li>
                <li>• Base de données Firestore</li>
                <li>• API REST pour transactions</li>
                <li>• Calculs financiers en temps réel</li>
                <li>• Génération de rapports automatiques</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-blue-400 text-2xl mb-3">🚀</div>
              <h4 className="text-lg font-semibold mb-3">Roadmap</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Intégration bancaire API</li>
                <li>• Paiements et virements</li>
                <li>• Notifications push</li>
                <li>• Build APK/App Store</li>
                <li>• Déploiement production</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-center">
            <h4 className="text-2xl font-bold mb-4">🎯 MVP Fonctionnel Disponible</h4>
            <p className="text-lg mb-6">
              L&apos;interface utilisateur est entièrement implémentée pour la gestion financière. 
              Prêt pour l&apos;intégration backend et les fonctionnalités comptables avancées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/install" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                📱 Tester l&apos;app mobile
              </Link>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                📚 Voir la documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🔧 Informations Techniques
            </h2>
            <p className="text-xl text-gray-600">
              Comment l&apos;APK SocialPlanr est généré
            </p>
          </div>

          {/* Build APK Actuel */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📱 Build APK Actuel</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <span className="font-semibold text-gray-700">Version:</span>
                  <span className="text-gray-600 ml-2">1.0.1</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <span className="font-semibold text-gray-700">Plateforme:</span>
                  <span className="text-gray-600 ml-2">Android (API 26+)</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <span className="font-semibold text-gray-700">Build:</span>
                  <span className="text-gray-600 ml-2">EAS Build (Expo)</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <span className="font-semibold text-gray-700">Type:</span>
                  <span className="text-gray-600 ml-2">Development Build</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <span className="font-semibold text-gray-700">Taille:</span>
                  <span className="text-gray-600 ml-2">36 MB (optimisé)</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <span className="font-semibold text-gray-700">Hébergement:</span>
                  <span className="text-gray-600 ml-2">Vercel (optimisé)</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:col-span-2">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <span className="font-semibold text-gray-700">SHA256:</span>
                  <span className="text-gray-600 ml-2 font-mono text-sm break-all">2f2dfcefb9b63d675e828d3812411ac6f665018d9279eaed5c25b1440c1d306d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Génération APK */}
          <div className="bg-gray-900 text-white p-8 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold mb-6">🛠️ Génération APK</h3>
            <p className="text-gray-300 mb-4">Commandes utilisées :</p>
            <div className="bg-gray-800 p-6 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="text-green-400 mb-2"># Installation EAS CLI</div>
              <div className="text-gray-300 mb-4">npm install -g eas-cli</div>
              
              <div className="text-green-400 mb-2"># Configuration build</div>
              <div className="text-gray-300 mb-4">eas build:configure</div>
              
              <div className="text-green-400 mb-2"># Génération APK</div>
              <div className="text-gray-300">eas build --platform android --local</div>
            </div>
            <p className="text-gray-300 mt-4">
              Le build est automatiquement signé avec une clé de développement et optimisé pour les tests sur appareils Android.
            </p>
          </div>

          {/* Build Réussi */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-2xl text-white mb-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold mb-2">✅ Build APK Réussi !</h3>
              <p className="text-lg text-green-50">
                🎯 APK Fonctionnel Généré : L&apos;APK complet de SocialPlanr (v1.0.1) a été généré avec succès ! 
                Il est maintenant prêt à être installé sur n&apos;importe quel appareil Android.
              </p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <p className="font-semibold mb-2">✅ Build réussi avec :</p>
              <ul className="space-y-1 text-green-50">
                <li>• Java 17.0.16 (OpenJDK Homebrew)</li>
                <li>• EAS CLI Preview Build - APK v1.0.1 généré</li>
              </ul>
            </div>
          </div>

          {/* Étapes Réalisées */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 Étapes Réalisées avec Succès</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✅</span>
                <div>
                  <span className="font-semibold text-gray-700">1. Java JDK installé :</span>
                  <span className="text-gray-600 ml-2 font-mono">brew install openjdk@17</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✅</span>
                <div>
                  <span className="font-semibold text-gray-700">2. Script exécuté :</span>
                  <span className="text-gray-600 ml-2 font-mono">./scripts/update-apk.sh --local</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✅</span>
                <div>
                  <span className="font-semibold text-gray-700">3. APK copié vers le site web :</span>
                  <span className="text-gray-600 ml-2">v1.0.1 disponible au téléchargement</span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg">
              <p className="text-gray-700">
                <strong>L&apos;APK est maintenant prêt à être installé !</strong> Vous pouvez aussi continuer à utiliser Expo Go pour le développement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Stack Technique */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🏛️ Architecture & Stack Technique
            </h2>
            <p className="text-xl text-gray-600">
              Structure monorepo et technologies utilisées
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Structure Monorepo */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📁 Structure Monorepo</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">📦 Packages</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">web/</code> - Application Next.js</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">mobile/</code> - Application Expo/React Native</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">shared/</code> - Types et hooks partagés</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">🔧 Configuration</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">tsconfig.root.json</code> - TypeScript root</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">package.json</code> - Workspace root</li>
                    <li>• <code className="bg-gray-100 px-2 py-1 rounded">firestore.rules</code> - Règles Firestore</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technologies Web */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🌐 Stack Web</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Framework & UI</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• <strong>Next.js 15.4.3</strong> - Framework React</li>
                    <li>• <strong>React 19.1.0</strong> - Bibliothèque UI</li>
                    <li>• <strong>Tailwind CSS 4</strong> - Framework CSS</li>
                    <li>• <strong>Framer Motion 12.23.24</strong> - Animations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Backend & Services</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• <strong>Firebase 12.5.0</strong> - Backend as a Service</li>
                    <li>• <strong>EmailJS 4.4.1</strong> - Service d&apos;email</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Mobile */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📱 Stack Mobile</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Core</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Expo 54.0.23</li>
                  <li>• React Native 0.81.5</li>
                  <li>• React 19.1.0</li>
                  <li>• TypeScript 5.9.2</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Navigation & UI</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Expo Router 6.0.14</li>
                  <li>• React Navigation 7.1.6</li>
                  <li>• React Native Reanimated 4.1.1</li>
                  <li>• Expo Vector Icons 15.0.3</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Services & Utils</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Firebase 12.0.0</li>
                  <li>• AsyncStorage 2.2.0</li>
                  <li>• Expo Secure Store 15.0.7</li>
                  <li>• Google Sign-In 15.0.0</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structure des Écrans Mobile */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              📱 Structure des Écrans Mobile
            </h2>
            <p className="text-xl text-gray-600">
              Architecture de navigation et écrans implémentés
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Écrans Principaux */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Écrans Principaux</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>index.tsx</strong> - Page d&apos;accueil/onboarding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>login.tsx</strong> - Connexion utilisateur</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>signup.tsx</strong> - Inscription utilisateur</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>verify-email.tsx</strong> - Vérification email</span>
                </li>
              </ul>
            </div>

            {/* Onglets Tab Navigation */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Onglets (Tabs)</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>dashboard.tsx</strong> - Tableau de bord</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>events.tsx</strong> - Gestion d&apos;événements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>expenses.tsx</strong> - Gestion des dépenses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span><strong>profile.tsx</strong> - Profil utilisateur</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Composants */}
          <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🧩 Composants Réutilisables</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Modals</h4>
                <ul className="space-y-1">
                  <li>• CreateAccountModal</li>
                  <li>• CreateBudgetModal</li>
                  <li>• CreateEventModal</li>
                  <li>• CreateTransactionModal</li>
                  <li>• AddExpenseModal</li>
                  <li>• EditProfileModal</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">UI Components</h4>
                <ul className="space-y-1">
                  <li>• ThemedText</li>
                  <li>• ThemedView</li>
                  <li>• FloatingMenu</li>
                  <li>• Collapsible</li>
                  <li>• HapticTab</li>
                  <li>• TabBarBackground</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contexts & Hooks</h4>
                <ul className="space-y-1">
                  <li>• AuthContext</li>
                  <li>• ThemeContext</li>
                  <li>• useBiometric</li>
                  <li>• useColorScheme</li>
                  <li>• useThemeColor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration & Scripts */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              ⚙️ Configuration & Scripts
            </h2>
            <p className="text-xl text-gray-300">
              Commandes et outils de développement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Scripts Web */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">🌐 Scripts Web</h3>
              <div className="space-y-3 font-mono text-sm">
                <div>
                  <code className="text-green-400">npm run dev</code>
                  <p className="text-gray-400 text-xs mt-1">Démarrer le serveur de développement (Turbopack)</p>
                </div>
                <div>
                  <code className="text-green-400">npm run build</code>
                  <p className="text-gray-400 text-xs mt-1">Build de production Next.js</p>
                </div>
                <div>
                  <code className="text-green-400">npm run start</code>
                  <p className="text-gray-400 text-xs mt-1">Démarrer le serveur de production</p>
                </div>
                <div>
                  <code className="text-green-400">npm run lint</code>
                  <p className="text-gray-400 text-xs mt-1">Vérifier le code avec ESLint</p>
                </div>
              </div>
            </div>

            {/* Scripts Mobile */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">📱 Scripts Mobile</h3>
              <div className="space-y-3 font-mono text-sm">
                <div>
                  <code className="text-green-400">npm start</code>
                  <p className="text-gray-400 text-xs mt-1">Démarrer Expo Dev Server</p>
                </div>
                <div>
                  <code className="text-green-400">npm run android</code>
                  <p className="text-gray-400 text-xs mt-1">Lancer sur Android</p>
                </div>
                <div>
                  <code className="text-green-400">npm run ios</code>
                  <p className="text-gray-400 text-xs mt-1">Lancer sur iOS</p>
                </div>
                <div>
                  <code className="text-green-400">npm run apk</code>
                  <p className="text-gray-400 text-xs mt-1">Générer l&apos;APK localement</p>
                </div>
                <div>
                  <code className="text-green-400">npm run build:android</code>
                  <p className="text-gray-400 text-xs mt-1">Build Android avec EAS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration EAS */}
          <div className="bg-gray-800 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">🔧 Configuration EAS Build</h3>
            <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="text-gray-300">
                <div className="mb-2">Profiles disponibles dans <code className="text-blue-400">eas.json</code>:</div>
                <div className="ml-4 space-y-1">
                  <div><span className="text-green-400">preview</span> - Build de développement</div>
                  <div><span className="text-green-400">production</span> - Build de production</div>
                </div>
              </div>
            </div>
          </div>

          {/* Firebase Configuration */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-red-400">🔥 Configuration Firebase</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-gray-300">Services configurés :</strong>
                <ul className="text-gray-400 ml-4 mt-1 space-y-1">
                  <li>• Authentication (Email/Password, Google)</li>
                  <li>• Firestore Database</li>
                  <li>• Storage (pour fichiers)</li>
                </ul>
              </div>
              <div>
                <strong className="text-gray-300">Fichiers de configuration :</strong>
                <ul className="text-gray-400 ml-4 mt-1 space-y-1">
                  <li>• <code className="bg-gray-900 px-2 py-1 rounded">web/src/config/firebase.ts</code></li>
                  <li>• <code className="bg-gray-900 px-2 py-1 rounded">mobile/config/firebase.ts</code></li>
                  <li>• <code className="bg-gray-900 px-2 py-1 rounded">firestore.rules</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus de Développement */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🔄 Processus de Développement
            </h2>
            <p className="text-xl text-gray-600">
              Workflow et bonnes pratiques
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Workflow Web */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🌐 Workflow Web</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <div>
                    <strong>Développement local</strong>
                    <p className="text-sm text-gray-600">npm run dev (port 3000)</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <div>
                    <strong>Build de test</strong>
                    <p className="text-sm text-gray-600">npm run build</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <div>
                    <strong>Déploiement Vercel</strong>
                    <p className="text-sm text-gray-600">Automatique via Git push</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Workflow Mobile */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📱 Workflow Mobile</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-purple-600">1.</span>
                  <div>
                    <strong>Développement Expo Go</strong>
                    <p className="text-sm text-gray-600">npm start (QR code)</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-purple-600">2.</span>
                  <div>
                    <strong>Build local APK</strong>
                    <p className="text-sm text-gray-600">npm run apk</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-bold text-purple-600">3.</span>
                  <div>
                    <strong>Build EAS Cloud</strong>
                    <p className="text-sm text-gray-600">eas build --platform android</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Partage de Code */}
          <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🔄 Partage de Code</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">📦 Package Shared</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <code className="bg-white px-2 py-1 rounded">types.ts</code> - Types TypeScript partagés</li>
                  <li>• <code className="bg-white px-2 py-1 rounded">hooks.ts</code> - Hooks réutilisables</li>
                  <li>• <code className="bg-white px-2 py-1 rounded">index.ts</code> - Exports centralisés</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">🎯 Avantages</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Types cohérents entre web et mobile</li>
                  <li>• Logique métier partagée</li>
                  <li>• Maintenance simplifiée</li>
                  <li>• Pas de duplication de code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environnements & Déploiement */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🚀 Environnements & Déploiement
            </h2>
            <p className="text-xl text-gray-600">
              Configuration des environnements et déploiement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🌍 Web - Vercel</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Déploiement automatique</li>
                <li>• CDN global</li>
                <li>• SSL automatique</li>
                <li>• Preview deployments</li>
                <li>• Analytics intégrés</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">📱 Mobile - EAS</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Build cloud Expo</li>
                <li>• Gestion des certificats</li>
                <li>• Distribution OTA</li>
                <li>• Builds Android/iOS</li>
                <li>• Gestion des versions</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🔥 Backend - Firebase</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Hosting Firestore</li>
                <li>• Authentication</li>
                <li>• Storage</li>
                <li>• Functions (à venir)</li>
                <li>• Analytics</li>
              </ul>
            </div>
          </div>

          {/* Variables d'Environnement */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🔐 Variables d&apos;Environnement</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Web (.env.local)</h4>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                  <div>NEXT_PUBLIC_FIREBASE_API_KEY=...</div>
                  <div>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...</div>
                  <div>NEXT_PUBLIC_FIREBASE_PROJECT_ID=...</div>
                  <div>NEXT_PUBLIC_EMAILJS_SERVICE_ID=...</div>
                  <div>NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...</div>
                  <div>NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Mobile (app.json)</h4>
                <div className="bg-gray-900 text-purple-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                  <div>expo.extra.firebaseApiKey</div>
                  <div>expo.extra.firebaseAuthDomain</div>
                  <div>expo.extra.firebaseProjectId</div>
                  <div>expo.extra.googleSignInClientId</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualité & Tests */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              ✅ Qualité & Tests
            </h2>
            <p className="text-xl text-gray-300">
              Outils de qualité de code et tests
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-green-400">🔍 Linting & Formatting</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• <strong>ESLint 9</strong> - Linting JavaScript/TypeScript</li>
                <li>• <strong>eslint-config-next</strong> - Règles Next.js</li>
                <li>• <strong>eslint-config-expo</strong> - Règles Expo</li>
                <li>• Configuration TypeScript stricte</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">📝 Type Checking</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• <strong>TypeScript 5</strong> - Typage statique</li>
                <li>• <strong>npm run type-check</strong> - Vérification types mobile</li>
                <li>• Types partagés via package shared</li>
                <li>• Strict mode activé</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">🧪 Tests (À venir)</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <strong>Unit Tests</strong>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>• Jest (à configurer)</li>
                  <li>• React Testing Library</li>
                </ul>
              </div>
              <div>
                <strong>E2E Tests</strong>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>• Detox (mobile)</li>
                  <li>• Playwright (web)</li>
                </ul>
              </div>
              <div>
                <strong>Integration Tests</strong>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>• Firebase Emulator</li>
                  <li>• API Mocking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation & Ressources */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              📚 Documentation & Ressources
            </h2>
            <p className="text-xl text-gray-600">
              Guides et ressources de développement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📖 Documentation Projet</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">📄</span>
                  <div>
                    <strong>README.md</strong>
                    <p className="text-sm text-gray-600">Documentation principale du projet</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">📄</span>
                  <div>
                    <strong>GOOGLE_SIGNIN_FIREBASE_SETUP.md</strong>
                    <p className="text-sm text-gray-600">Guide configuration Google Sign-In</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">📄</span>
                  <div>
                    <strong>EMAILJS_SETUP.md</strong>
                    <p className="text-sm text-gray-600">Configuration EmailJS</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">📄</span>
                  <div>
                    <strong>DEPLOYMENT.md</strong>
                    <p className="text-sm text-gray-600">Guide de déploiement</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔗 Ressources Externes</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500">🔗</span>
                  <div>
                    <strong>Next.js Documentation</strong>
                    <p className="text-sm text-gray-600">nextjs.org/docs</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500">🔗</span>
                  <div>
                    <strong>Expo Documentation</strong>
                    <p className="text-sm text-gray-600">docs.expo.dev</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500">🔗</span>
                  <div>
                    <strong>Firebase Documentation</strong>
                    <p className="text-sm text-gray-600">firebase.google.com/docs</p>
                  </div>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500">🔗</span>
                  <div>
                    <strong>EAS Build Documentation</strong>
                    <p className="text-sm text-gray-600">docs.expo.dev/build/introduction</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

