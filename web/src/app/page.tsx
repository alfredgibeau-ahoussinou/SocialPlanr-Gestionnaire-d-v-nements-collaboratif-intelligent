"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SocialPlanr
              </h1>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#fonctionnalites" className="text-gray-600 hover:text-blue-600 transition-colors">
                Fonctionnalités
              </a>
              <a href="#comment-ca-marche" className="text-gray-600 hover:text-blue-600 transition-colors">
                Comment ça marche
              </a>
              <a href="/install" className="text-gray-600 hover:text-blue-600 transition-colors">
                📱 Installer l'app
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>
            

            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              data-mobile-menu
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden" data-mobile-menu>
              <div className={`px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg transition-all duration-200 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <a 
                  href="#fonctionnalites" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📋 Fonctionnalités
          </a>
          <a
                  href="#comment-ca-marche" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ❓ Comment ça marche
        </a>
        <a
                  href="/install" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📱 Installer l'app
        </a>
        <a
                  href="#contact" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📞 Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Organisez vos événements
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              en collaboration
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Week-end, voyage, soirée... Collaborez avec vos amis sur la date, le lieu, 
            les activités et les dépenses. Notre IA génère des plans automatiques personnalisés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/install" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block text-center">
              📱 Installer l'app mobile
            </a>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
              Voir la démo
            </button>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Application en cours d'exécution</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Testez SocialPlanr dès maintenant !
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              L'application mobile est actuellement en ligne et prête à être testée
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  📱 Sur votre téléphone
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">✅ Android: APK Complet</h5>
                    <ol className="space-y-1 text-sm text-gray-600">
                      <li>1. Téléchargez l'APK (78MB) depuis la page d'installation</li>
                      <li>2. Installez directement sur votre Android</li>
                      <li>3. Application complète et autonome !</li>
                    </ol>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700 mb-2">📲 iOS/Android: QR Code Expo</h5>
                    <ol className="space-y-1 text-sm text-gray-600">
                      <li>1. Installez <strong>Expo Go</strong> depuis votre App Store</li>
                      <li>2. Scannez le QR code sur la page d'installation</li>
                      <li>3. Test instantané (iOS/Android compatible)</li>
                    </ol>
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-2">🚧 iOS: En Développement</h5>
                    <p className="text-sm text-gray-600">
                      Version iOS native en cours de développement. Utilisez Expo Go temporairement.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  🌐 Dans votre navigateur
                </h4>
                <p className="text-gray-600 mb-4">
                  Testez directement la version web de l'application
                </p>
                <a href="http://localhost:8081" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                  Ouvrir l'app web
                </a>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-8 rounded-2xl shadow-xl inline-block">
                <div className="mb-4">
                  <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <div className="text-center">
                      <div className="text-6xl mb-2">📱</div>
                      <p className="text-sm text-gray-500">Mockup de l'app</p>
                      <p className="text-xs text-gray-400 mt-2">4 onglets principaux</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Groupes</div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Événements</div>
                  <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Dépenses</div>
                  <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">Profil</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités déjà implémentées
            </h3>
            <p className="text-xl text-gray-600">
              L'application mobile contient déjà toutes ces fonctionnalités
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">📱 Onglet Groupes</h4>
              <p className="text-gray-600">
                Interface complète avec 3 groupes d'exemple : "Week-end à Paris", "Voyage en Espagne", "Soirée d'anniversaire". 
                Statuts visuels, nombre de membres, bouton de création.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">📅 Onglet Événements</h4>
              <p className="text-gray-600">
                3 événements avec statuts réels : "Vote en cours", "Confirmé", "Terminé". 
                Tags IA, détails dates/lieux, compteur participants.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">🤖 Tags IA Intégrés</h4>
              <p className="text-gray-600">
                Les événements affichent des badges "🤖 IA" quand un plan a été généré automatiquement. 
                Interface prête pour l'intégration OpenAI.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">💳 Onglet Dépenses</h4>
              <p className="text-gray-600">
                Dashboard financier complet : "Vous devez" vs "On vous doit", solde net coloré, 
                4 dépenses d'exemple avec catégories (hôtel, restaurant, transport, loisirs).
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-red-50 to-pink-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">👤 Onglet Profil</h4>
              <p className="text-gray-600">
                Profil utilisateur complet avec statistiques (8 groupes, 15 événements), 
                paramètres avec switches, actions et zone de danger.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">🏗️ Architecture Prête</h4>
              <p className="text-gray-600">
                Types TypeScript partagés, hooks réutilisables, monorepo configuré. 
                Prêt pour Supabase Auth, OpenAI API, Booking.com et Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              🏗️ État Actuel du Développement
            </h3>
            <p className="text-xl text-gray-300">
              Monorepo complet avec application mobile fonctionnelle
            </p>
          </div>

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
                <li>• Authentification Supabase</li>
                <li>• Base de données PostgreSQL</li>
                <li>• API REST/GraphQL</li>
                <li>• Système de votes temps réel</li>
                <li>• Génération IA avec OpenAI</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-blue-400 text-2xl mb-3">🚀</div>
              <h4 className="text-lg font-semibold mb-3">Roadmap</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Intégration Booking.com API</li>
                <li>• Paiements Stripe</li>
                <li>• Notifications push</li>
                <li>• Build APK/App Store</li>
                <li>• Déploiement production</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-center">
            <h4 className="text-2xl font-bold mb-4">🎯 MVP Fonctionnel Disponible</h4>
            <p className="text-lg mb-6">
              L'interface utilisateur est entièrement implémentée avec des données simulées. 
              Prêt pour l'intégration backend et les fonctionnalités avancées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/install" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                📱 Tester l'app mobile
              </a>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                📚 Voir la documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="comment-ca-marche" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnement Actuel
            </h3>
            <p className="text-xl text-gray-600">
              Interface mobile complète avec données simulées
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Créez votre groupe</h4>
              <p className="text-gray-600">
                Invitez vos amis et créez un groupe pour votre événement. 
                Définissez qui peut proposer et voter.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Collaborez et votez</h4>
              <p className="text-gray-600">
                Proposez des dates, lieux et activités. Votez ensemble pour 
                prendre les meilleures décisions démocratiquement.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Plan généré par IA</h4>
              <p className="text-gray-600">
                Notre IA génère automatiquement un plan détaillé basé sur vos votes 
                et trouve les meilleurs hébergements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-white mb-6">
            Prêt à organiser votre prochain événement ?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers d'utilisateurs qui font confiance à SocialPlanr 
            pour leurs événements collaboratifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/install" className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block text-center">
              📱 Installer l'app mobile
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <h4 className="text-2xl font-bold">SocialPlanr</h4>
              </div>
              <p className="text-gray-400 mb-6">
                Le gestionnaire d'événements collaboratif intelligent qui révolutionne 
                la façon dont vous organisez vos sorties entre amis.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 0z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Produit</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Intégrations</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Statut</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SocialPlanr. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
