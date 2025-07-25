"use client";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Install() {
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
    <>
      <Head>
        <title>Installer SocialPlanr Mobile - Téléchargez l&apos;app pour Android et iOS</title>
        <meta name="description" content="Téléchargez l&apos;application mobile SocialPlanr pour Android et iOS. Organisez vos événements où que vous soyez avec vos amis !" />
        <meta name="keywords" content="installer, télécharger, app mobile, Android, iOS, SocialPlanr, événements" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SocialPlanr
              </Link>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="/#fonctionnalites" className="text-gray-600 hover:text-blue-600 transition-colors">
                Fonctionnalités
              </Link>
              <Link href="#support" className="text-gray-600 hover:text-blue-600 transition-colors">
                Support
              </Link>
            </nav>
            
            {/* Desktop CTA Button */}
            <button className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
              Connexion
            </button>
            
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
                <Link 
                  href="/" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🏠 Accueil
                </Link>
                <Link 
                  href="/#fonctionnalites" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📋 Fonctionnalités
                </Link>
                <Link 
                  href="#support" 
                  className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🎧 Support
                </Link>
                <div className="border-t pt-2 mt-2">
                  <div className="space-y-2">
                    <Link 
                      href="/socialplanr-v1.0.0.apk" 
                      download="SocialPlanr-v1.0.0.apk"
                      className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-green-700 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      📱 Télécharger APK
                    </Link>
                    <button 
                      onClick={() => {
                        window.open('http://localhost:8081', '_blank');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors"
                    >
                      📲 QR Code Expo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Installez
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SocialPlanr Mobile
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Organisez vos événements où que vous soyez ! Téléchargez l&apos;application mobile 
            SocialPlanr pour Android et iOS et restez connecté avec votre groupe.
          </p>
          
          {/* App Preview */}
          <div className="relative max-w-md mx-auto mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-3xl">
              <div className="bg-gray-900 rounded-3xl p-6 text-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">SocialPlanr</h3>
                <p className="text-gray-400 text-sm mb-6">Organisez ensemble</p>
                
                {/* Mock App Interface */}
                <div className="bg-white rounded-2xl p-4 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">👥</span>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-900 font-medium">Week-end à Paris</p>
                      <p className="text-gray-500 text-sm">5 participants • En cours</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm">
                      ✓ Date: 15-17 Mars (votée)
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm">
                      📍 Lieu: Vote en cours...
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm">
                      🤖 Plan IA: Généré
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl text-sm">
                  Voir les détails →
                </div>
              </div>
            </div>
          </div>
          
          {/* QR Code Hero Section */}
          <div className="max-w-2xl mx-auto mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white text-center">
            <h2 className="text-2xl font-bold mb-4">📲 Installation Instantanée</h2>
            <p className="mb-6 opacity-90">Scannez ce QR code avec l&apos;app Expo Go pour tester SocialPlanr immédiatement</p>
            
            <div className="bg-white p-6 rounded-2xl inline-block mb-6">
              <Image 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=exp://192.168.1.115:8081"
                alt="QR Code SocialPlanr Expo Go"
                width={200}
                height={200}
                className="w-48 h-48 rounded-xl"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/socialplanr-v1.0.0.apk" 
                download="SocialPlanr-v1.0.0.apk"
                className="bg-white text-blue-600 px-8 py-3 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block"
              >
                📱 APK Android (78MB)
              </Link>
              <button 
                onClick={() => window.open('http://localhost:8081', '_blank')}
                className="border-2 border-white text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                🌐 Ouvrir dans le navigateur
              </button>
            </div>
            
            <p className="text-sm mt-4 opacity-75">
              <strong>Note :</strong> Installez d&apos;abord l&apos;app &quot;Expo Go&quot; depuis le Google Play Store ou l&apos;App Store
            </p>
          </div>
        </div>
      </section>

      {/* Download Options */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Téléchargez maintenant
            </h2>
            <p className="text-lg text-gray-600">
              Disponible sur toutes les plateformes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Android */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.3414c-.5665 0-1.0253-.4588-1.0253-1.0253s.4588-1.0253 1.0253-1.0253 1.0253.4588 1.0253 1.0253-.4588 1.0253-1.0253 1.0253zm-11.046 0c-.5665 0-1.0253-.4588-1.0253-1.0253s.4588-1.0253 1.0253-1.0253 1.0253.4588 1.0253 1.0253-.4588 1.0253-1.0253 1.0253zm11.4045-6.02l1.9623-3.8137c.1446-.2802-.0151-.6351-.3553-.6351-.0906 0-.1813.0302-.2416.0906l-2.0529 3.9892C15.5207 8.6728 13.8121 8.2534 12 8.2534s-3.5207.4194-5.2073.8728L4.7398 5.1370c-.0603-.0604-.151-.0906-.2416-.0906-.3402 0-.5-.3549-.3553-.6351L5.8852 8.3214C3.6125 9.4968 2.0651 11.7695 1.7699 14.5h20.4602c-.2952-2.7305-1.8426-5.0032-4.1153-6.1786z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Android</h3>
              <p className="text-gray-600 mb-6">
                Compatible avec Android 8.0 et versions ultérieures
              </p>
              
              {/* QR Code Expo Go pour Android */}
              <div className="bg-white p-4 rounded-xl mb-6 inline-block shadow-md">
                <div className="text-center mb-3">
                  <p className="text-sm font-semibold text-gray-700">📲 Installation Rapide</p>
                  <p className="text-xs text-gray-500">Scannez avec Expo Go</p>
                </div>
                <div className="w-32 h-32 rounded-lg flex items-center justify-center">
                  <Image 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=exp://192.168.1.115:8081"
                    alt="QR Code Expo Go Android"
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-lg border border-gray-200"
                  />
                </div>
                <p className="text-xs text-blue-600 mt-2 font-medium">exp://192.168.1.115:8081</p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-green-400 text-xl">✅</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        <strong>APK Fonctionnel Disponible :</strong> L&apos;APK complet (~78MB) est maintenant prêt à être installé ! 
                        Il contient toutes les fonctionnalités de SocialPlanr.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Link 
                  href="/socialplanr-v1.0.0.apk" 
                  download="SocialPlanr-v1.0.0.apk"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors inline-block text-center"
                >
                  📱 Télécharger APK Complet (v1.0.0 - 78MB)
                </Link>
                <button 
                  onClick={() => window.open('http://localhost:8081', '_blank')}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                >
                  🚀 Tester avec Expo Go (Développement)
                </button>
              </div>
            </div>

            {/* iOS */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">iOS 🚧</h3>
              <p className="text-gray-600 mb-6">
                Version iOS en cours de développement
              </p>
              
              {/* En développement */}
              <div className="bg-orange-50 p-4 rounded-xl mb-6 inline-block border-2 border-orange-200">
                <div className="w-32 h-32 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🚧</div>
                    <p className="text-sm font-semibold text-orange-600">En Développement</p>
                    <p className="text-xs text-orange-500 mt-1">Bientôt disponible</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-orange-400 text-xl">🚧</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-orange-700">
                        <strong>Version iOS en cours :</strong> L&apos;application iOS est actuellement en développement. 
                        Utilisez Expo Go temporairement avec le même QR code Android.
                      </p>
                    </div>
                  </div>
                </div>
                
                <button 
                  disabled
                  className="w-full bg-gray-400 text-white py-3 px-6 rounded-xl font-semibold cursor-not-allowed"
                >
                  🍎 App Store (En développement)
                </button>
                <button 
                  onClick={() => window.open('http://localhost:8081', '_blank')}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                >
                  📲 Expo Go (Compatible iOS/Android)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Instructions */}
      <section id="fonctionnalites" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment installer ?
            </h2>
            <p className="text-lg text-gray-600">
              Suivez ces étapes simples pour installer SocialPlanr
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Android Instructions */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414c-.5665 0-1.0253-.4588-1.0253-1.0253s.4588-1.0253 1.0253-1.0253 1.0253.4588 1.0253 1.0253-.4588 1.0253-1.0253 1.0253zm-11.046 0c-.5665 0-1.0253-.4588-1.0253-1.0253s.4588-1.0253 1.0253-1.0253 1.0253.4588 1.0253 1.0253-.4588 1.0253-1.0253 1.0253zm11.4045-6.02l1.9623-3.8137c.1446-.2802-.0151-.6351-.3553-.6351-.0906 0-.1813.0302-.2416.0906l-2.0529 3.9892C15.5207 8.6728 13.8121 8.2534 12 8.2534s-3.5207.4194-5.2073.8728L4.7398 5.1370c-.0603-.0604-.151-.0906-.2416-.0906-.3402 0-.5-.3549-.3553-.6351L5.8852 8.3214C3.6125 9.4968 2.0651 11.7695 1.7699 14.5h20.4602c-.2952-2.7305-1.8426-5.0032-4.1153-6.1786z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Android</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Téléchargez l&apos;APK</h4>
                    <p className="text-gray-600 text-sm">Cliquez sur le bouton de téléchargement ou scannez le QR code</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Autorisez l&apos;installation</h4>
                    <p className="text-gray-600 text-sm">Activez &quot;Sources inconnues&quot; dans les paramètres si nécessaire</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Installez et profitez</h4>
                    <p className="text-gray-600 text-sm">Ouvrez le fichier téléchargé et suivez les instructions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* iOS Instructions */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">iOS</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Téléchargez Expo Go</h4>
                    <p className="text-gray-600 text-sm">Installez l&apos;app Expo Go depuis l&apos;App Store</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Scannez le QR code</h4>
                    <p className="text-gray-600 text-sm">Utilisez Expo Go pour scanner le QR code de développement</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lancez l&apos;application</h4>
                    <p className="text-gray-600 text-sm">L&apos;app se lance automatiquement dans Expo Go</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements & Support */}
      <section id="support" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* System Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration requise</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-green-800 mb-3">📱 Android</h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Android 8.0 (API niveau 26) ou supérieur</li>
                    <li>• 2 GB RAM minimum, 4 GB recommandé</li>
                    <li>• 100 MB d&apos;espace libre</li>
                    <li>• Connexion Internet requise</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-blue-800 mb-3">🍎 iOS</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• iOS 13.0 ou supérieur</li>
                    <li>• iPhone 6s ou modèle plus récent</li>
                    <li>• 100 MB d&apos;espace libre</li>
                    <li>• Connexion Internet requise</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Support */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Besoin d&apos;aide ?</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">📚 Documentation</h3>
                  <p className="text-gray-600 mb-3">
                    Consultez notre guide complet d&apos;utilisation
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Voir la documentation →
                  </button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">💬 Support</h3>
                  <p className="text-gray-600 mb-3">
                    Notre équipe est là pour vous aider
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Contacter le support →
                  </button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">🐛 Signaler un bug</h3>
                  <p className="text-gray-600 mb-3">
                    Aidez-nous à améliorer l&apos;application
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Signaler un problème →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APK Build Info */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🔧 Informations Techniques</h2>
            <p className="text-xl text-gray-300">
              Comment l&apos;APK SocialPlanr est généré
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 text-green-400">📱 Build APK Actuel</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Version: 1.0.0</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Plateforme: Android (API 26+)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Build: EAS Build (Expo)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Type: Development Build</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-400">✓</span>
                  <span>Taille: ~25 MB</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">🛠️ Génération APK</h3>
              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">Commandes utilisées :</p>
                  <code className="text-green-400 text-sm">
                    # Installation EAS CLI<br/>
                    npm install -g eas-cli<br/><br/>
                    # Configuration build<br/>
                    eas build:configure<br/><br/>
                    # Génération APK<br/>
                    eas build --platform android --local
                  </code>
                </div>
                <p className="text-sm text-gray-400">
                  Le build est automatiquement signé avec une clé de développement 
                  et optimisé pour les tests sur appareils Android.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">🎉</div>
              <div>
                <h4 className="text-lg font-semibold mb-2">✅ Build APK Réussi !</h4>
                <p className="text-sm mb-4">
                  <strong>🎯 APK Fonctionnel Généré :</strong> L&apos;APK complet de SocialPlanr (78MB) a été généré avec succès ! 
                  Il est maintenant prêt à être installé sur n&apos;importe quel appareil Android.
                </p>
                <div className="bg-black/20 p-4 rounded-lg mb-4">
                  <p className="text-sm mb-2"><strong>✅ Build réussi avec :</strong></p>
                  <code className="text-xs">
                    Java 17.0.16 (OpenJDK Homebrew)<br/>
                    EAS CLI Preview Build - 78MB APK généré
                  </code>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link 
                    href="/INSTALL_APK.md" 
                    target="_blank"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    📖 Guide d&apos;installation
                  </Link>
                  <button 
                    onClick={() => window.open('https://github.com/expo/eas-cli', '_blank')}
                    className="border border-gray-200 text-white px-4 py-2 rounded-lg text-sm hover:bg-white hover:text-green-600 transition-colors"
                  >
                    📚 Documentation EAS
                  </button>
                  <button 
                    onClick={() => window.open('http://localhost:8081', '_blank')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    🚀 App Expo Go (Développement)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl">
            <div className="flex items-start space-x-4">
              <div className="text-2xl">📋</div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Étapes Réalisées avec Succès</h4>
                <ol className="text-sm space-y-2 mb-4">
                  <li><strong>✅ 1.</strong> Java JDK installé : <code className="bg-black/30 px-2 py-1 rounded">brew install openjdk@17</code></li>
                  <li><strong>✅ 2.</strong> Script exécuté : <code className="bg-black/30 px-2 py-1 rounded">./scripts/build-apk.sh</code></li>
                  <li><strong>✅ 3.</strong> APK copié vers le site web (78MB disponible au téléchargement)</li>
                </ol>
                <p className="text-xs opacity-75">
                  L&apos;APK est maintenant prêt à être installé ! Vous pouvez aussi continuer à utiliser Expo Go pour le développement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à organiser votre prochain événement ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Téléchargez SocialPlanr maintenant et commencez à planifier avec vos amis !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/socialplanr-v1.0.0.apk" 
              download="SocialPlanr-v1.0.0.apk"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block"
            >
              📱 Télécharger APK
            </Link>
            <Link href="/" className="border-2 border-white text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h4 className="text-xl font-bold">SocialPlanr</h4>
            </div>
            
            <div className="flex space-x-6 text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <Link href="#" className="hover:text-white transition-colors">Confidentialité</Link>
              <Link href="#" className="hover:text-white transition-colors">Conditions</Link>
              <Link href="#support" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SocialPlanr. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
} 