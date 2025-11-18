"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background image qui couvre toute la page y compris le header */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: 'url(/calculator-385506_1280.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
        }}
      ></div>
      {/* Overlay transparent avec flou qui couvre toute la page */}
      <div className="fixed inset-0 backdrop-blur-md bg-white/10 -z-10"></div>
      
      {/* Header */}
      <header className="bg-transparent backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                SocialPlanr
              </span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/fonctionnalites" className="text-white hover:text-blue-200 transition-colors drop-shadow-lg font-medium">
                Fonctionnalités
              </Link>
              <Link href="/comment-ca-marche" className="text-white hover:text-blue-200 transition-colors drop-shadow-lg font-medium">
                Comment ça marche
              </Link>
              <Link href="/install" className="text-white hover:text-blue-200 transition-colors drop-shadow-lg font-medium">
                📱 Installer l&apos;app
              </Link>
              <Link href="/contact" className="text-white hover:text-blue-200 transition-colors drop-shadow-lg font-medium">
                Contact
              </Link>
            </nav>
            

            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-white hover:text-blue-200 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 drop-shadow-lg"
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
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center z-10 w-full">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Gérez vos finances
            <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mt-3 drop-shadow-lg">
              entreprise et personnel
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-white mb-10 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Suivez vos budgets, analysez vos dépenses et revenus, générez des rapports détaillés. 
            Une solution complète pour gérer vos finances professionnelles et personnelles en toute simplicité.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            {user ? (
              <Link href="/dashboard" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-110 inline-block text-center min-w-[250px]">
                Accéder au dashboard
              </Link>
            ) : null}
            <Link href="/install" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-110 inline-block text-center min-w-[250px] shadow-lg">
              📱 Installer l&apos;app
            </Link>
          </motion.div>
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
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Créez vos comptes</h4>
              <p className="text-gray-600">
                Configurez vos comptes personnels et professionnels. 
                Organisez vos finances par catégories et suivez vos soldes en temps réel.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Enregistrez vos transactions</h4>
              <p className="text-gray-600">
                Ajoutez facilement vos revenus et dépenses avec catégories et descriptions. 
                Suivez toutes vos transactions financières en un seul endroit.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Analysez et optimisez</h4>
              <p className="text-gray-600">
                Consultez des rapports détaillés et des analyses de vos finances. 
                Identifiez les tendances et optimisez votre gestion budgétaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-white mb-6">
            Prêt à prendre le contrôle de vos finances ?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers d&apos;utilisateurs qui font confiance à SocialPlanr 
            pour gérer leurs finances personnelles et professionnelles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/install" className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block text-center">
              📱 Installer l&apos;app mobile
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
