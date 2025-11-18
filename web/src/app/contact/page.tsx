"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ContactPage() {
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
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une question ? Une suggestion ? Nous sommes là pour vous aider. 
            Contactez-nous directement via les coordonnées ci-dessous.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Informations de contact */}
          <div className="space-y-6">
              {/* Coordonnées */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  📍 Nos coordonnées
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a 
                        href="mailto:socialplanr75@gmail.com" 
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        socialplanr75@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">💼</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">LinkedIn</h3>
                      <a 
                        href="https://www.linkedin.com/company/socialplanr75/?viewAsMember=true" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        SocialPlanr sur LinkedIn
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🌐</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Support</h3>
                      <Link 
                        href="/support" 
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Centre d&apos;aide et support
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  ⏰ Temps de réponse
                </h2>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Réponse moyenne</span>
                    <span className="text-blue-600 font-semibold">24-48h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Support urgent</span>
                    <span className="text-green-600 font-semibold">Sous 12h</span>
                  </div>
                  <div className="pt-4 border-t border-blue-200">
                    <p className="text-sm text-gray-600">
                      Nous nous efforçons de répondre à toutes les demandes dans les plus brefs délais. 
                      Pour les questions urgentes, n&apos;hésitez pas à nous contacter directement via LinkedIn.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ rapide */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  ❓ Questions fréquentes
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Comment installer l&apos;application ?
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Consultez notre page d&apos;installation pour télécharger l&apos;APK Android ou utiliser Expo Go.
                    </p>
                    <Link 
                      href="/install" 
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Voir la page d&apos;installation →
                    </Link>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Besoin d&apos;aide technique ?
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Consultez notre centre de support avec FAQ complète et guides d&apos;utilisation.
                    </p>
                    <Link 
                      href="/support" 
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Accéder au support →
                    </Link>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

