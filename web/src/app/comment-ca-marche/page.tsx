"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function HowItWorksPage() {
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
            Comment ça marche ?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment SocialPlanr simplifie la gestion de vos finances 
            entreprise et personnel en quelques étapes simples.
          </p>
        </div>

        {/* Étapes principales */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Étape 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Créez vos comptes
              </h3>
              <p className="text-gray-600 mb-4">
                Commencez par créer vos comptes personnels et professionnels. 
                Organisez vos finances par catégories et définissez vos objectifs.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <p className="text-sm text-gray-700">
                  <strong>💡 Astuce :</strong> Créez des comptes séparés pour vos finances 
                  personnelles et professionnelles pour une meilleure organisation.
                </p>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Enregistrez vos transactions
              </h3>
              <p className="text-gray-600 mb-4">
                Ajoutez facilement vos revenus et dépenses avec catégories, 
                dates et descriptions. Suivez toutes vos transactions en temps réel.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg text-left">
                <p className="text-sm text-gray-700">
                  <strong>💡 Astuce :</strong> Utilisez les catégories pour mieux 
                  analyser vos dépenses et identifier les tendances.
                </p>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Analysez et optimisez
              </h3>
              <p className="text-gray-600 mb-4">
                Consultez des rapports détaillés et des analyses de vos finances. 
                Identifiez les tendances et optimisez votre gestion budgétaire.
              </p>
              <div className="bg-pink-50 p-4 rounded-lg text-left">
                <p className="text-sm text-gray-700">
                  <strong>💡 Astuce :</strong> Créez des budgets pour chaque catégorie 
                  et recevez des alertes lorsque vous approchez des limites.
                </p>
              </div>
            </div>
          </div>

          {/* Guide détaillé */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Guide détaillé d&apos;utilisation
            </h2>

            <div className="space-y-8">
              {/* Section Comptes */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">💰</span>
                  Gérer vos comptes
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    L&apos;onglet <strong>Comptes</strong> vous permet de créer et gérer plusieurs comptes 
                    pour organiser vos finances. Vous pouvez créer des comptes pour :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Vos finances personnelles</li>
                    <li>Vos finances professionnelles</li>
                    <li>Des projets spécifiques</li>
                    <li>Des catégories de dépenses</li>
                  </ul>
                  <p>
                    Chaque compte affiche son solde en temps réel, calculé automatiquement 
                    à partir de vos transactions.
                  </p>
                </div>
              </div>

              {/* Section Transactions */}
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">💳</span>
                  Enregistrer des transactions
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    L&apos;onglet <strong>Transactions</strong> est le cœur de votre gestion financière. 
                    Vous pouvez enregistrer :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Revenus :</strong> Salaires, ventes, revenus divers</li>
                    <li><strong>Dépenses :</strong> Achats, factures, frais</li>
                    <li><strong>Transferts :</strong> Entre vos comptes</li>
                  </ul>
                  <p>
                    Pour chaque transaction, vous pouvez ajouter :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Un montant</li>
                    <li>Une catégorie</li>
                    <li>Une date</li>
                    <li>Une description détaillée</li>
                    <li>Le compte concerné</li>
                  </ul>
                </div>
              </div>

              {/* Section Budgets */}
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">📈</span>
                  Créer et suivre des budgets
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    L&apos;onglet <strong>Budgets</strong> vous permet de définir des limites 
                    de dépenses par catégorie et de suivre votre progression.
                  </p>
                  <p>
                    <strong>Comment créer un budget :</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Choisissez une catégorie (ex: Alimentation, Transport)</li>
                    <li>Définissez un montant maximum pour la période</li>
                    <li>Sélectionnez la période (mensuel, trimestriel, annuel)</li>
                    <li>Activez les notifications pour être alerté</li>
                  </ol>
                  <p>
                    Vous verrez en temps réel votre progression et recevrez des alertes 
                    lorsque vous approchez ou dépassez vos limites.
                  </p>
                </div>
              </div>

              {/* Section Rapports */}
              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-3">📊</span>
                  Analyser vos finances
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    L&apos;onglet <strong>Rapports</strong> vous offre une vue d&apos;ensemble 
                    de vos finances avec :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Graphiques :</strong> Visualisation de vos revenus et dépenses</li>
                    <li><strong>Statistiques :</strong> Tendances et moyennes</li>
                    <li><strong>Rapports personnalisés :</strong> Par période, catégorie, compte</li>
                    <li><strong>Export :</strong> Téléchargez vos données en PDF ou Excel</li>
                  </ul>
                  <p>
                    Utilisez ces analyses pour identifier vos habitudes de dépenses et 
                    optimiser votre gestion budgétaire.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conseils et bonnes pratiques */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              💡 Conseils et bonnes pratiques
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">✅</span>
                  Enregistrez régulièrement
                </h3>
                <p className="text-gray-700">
                  Prenez l&apos;habitude d&apos;enregistrer vos transactions quotidiennement 
                  pour avoir une vue précise et à jour de vos finances.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">📱</span>
                  Utilisez les catégories
                </h3>
                <p className="text-gray-700">
                  Créez des catégories détaillées pour mieux analyser vos dépenses 
                  et identifier les postes où vous pouvez économiser.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  Fixez des objectifs
                </h3>
                <p className="text-gray-700">
                  Définissez des budgets réalistes et des objectifs d&apos;épargne 
                  pour rester motivé et atteindre vos objectifs financiers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">📊</span>
                  Analysez régulièrement
                </h3>
                <p className="text-gray-700">
                  Consultez vos rapports mensuellement pour suivre vos progrès 
                  et ajuster votre stratégie financière si nécessaire.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Téléchargez SocialPlanr maintenant et commencez à gérer vos finances 
              de manière simple et efficace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/install" 
                className="bg-white text-blue-600 px-8 py-3 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block"
              >
                📱 Installer l&apos;app mobile
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                💬 Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

