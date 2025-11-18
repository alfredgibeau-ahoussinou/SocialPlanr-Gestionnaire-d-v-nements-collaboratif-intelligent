"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function BugReportPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    steps: "",
    expected: "",
    actual: "",
    device: "",
    browser: "",
    severity: "medium",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
    setFormData({
      title: "",
      description: "",
      steps: "",
      expected: "",
      actual: "",
      device: "",
      browser: "",
      severity: "medium",
      email: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="text-6xl">🐛</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Signaler un bug
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Aidez-nous à améliorer SocialPlanr en signalant les problèmes que vous rencontrez
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Merci pour votre signalement !
              </h2>
              <p className="text-green-700 mb-6">
                Nous avons bien reçu votre rapport de bug. Notre équipe va l&apos;examiner et le corriger dans les plus brefs délais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Signaler un autre bug
                </button>
                <Link
                  href="/"
                  className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center"
                >
                  Retour à l&apos;accueil
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Titre du bug */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Titre du bug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex: L'application se ferme lors de l'ajout d'une transaction"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description détaillée <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Décrivez le problème en détail..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                  />
                </div>

                {/* Étapes pour reproduire */}
                <div>
                  <label htmlFor="steps" className="block text-sm font-semibold text-gray-700 mb-2">
                    Étapes pour reproduire le bug <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="steps"
                    name="steps"
                    required
                    rows={4}
                    value={formData.steps}
                    onChange={handleChange}
                    placeholder="1. Ouvrir l'application&#10;2. Aller dans l'onglet Transactions&#10;3. Cliquer sur Ajouter..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                  />
                </div>

                {/* Comportement attendu vs réel */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expected" className="block text-sm font-semibold text-gray-700 mb-2">
                      Comportement attendu
                    </label>
                    <textarea
                      id="expected"
                      name="expected"
                      rows={3}
                      value={formData.expected}
                      onChange={handleChange}
                      placeholder="Ce qui devrait se passer..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="actual" className="block text-sm font-semibold text-gray-700 mb-2">
                      Comportement réel
                    </label>
                    <textarea
                      id="actual"
                      name="actual"
                      rows={3}
                      value={formData.actual}
                      onChange={handleChange}
                      placeholder="Ce qui se passe réellement..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Informations techniques */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="severity" className="block text-sm font-semibold text-gray-700 mb-2">
                      Gravité <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="severity"
                      name="severity"
                      required
                      value={formData.severity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    >
                      <option value="low">Faible - Cosmétique</option>
                      <option value="medium">Moyenne - Fonctionnalité partielle</option>
                      <option value="high">Élevée - Fonctionnalité bloquée</option>
                      <option value="critical">Critique - Application inutilisable</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="device" className="block text-sm font-semibold text-gray-700 mb-2">
                      Appareil
                    </label>
                    <input
                      type="text"
                      id="device"
                      name="device"
                      value={formData.device}
                      onChange={handleChange}
                      placeholder="Ex: iPhone 13, Samsung Galaxy S21"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="browser" className="block text-sm font-semibold text-gray-700 mb-2">
                      Navigateur / OS
                    </label>
                    <input
                      type="text"
                      id="browser"
                      name="browser"
                      value={formData.browser}
                      onChange={handleChange}
                      placeholder="Ex: Chrome 120, iOS 17.2"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Votre email (optionnel)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pour vous tenir informé de la résolution du bug
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        Envoi en cours...
                      </span>
                    ) : (
                      "🚀 Envoyer le rapport de bug"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Conseils pour un bon rapport de bug</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Soyez aussi précis que possible dans la description</li>
              <li>Indiquez toutes les étapes nécessaires pour reproduire le problème</li>
              <li>Mentionnez si le bug est récurrent ou occasionnel</li>
              <li>Ajoutez des captures d&apos;écran si possible (via email)</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

