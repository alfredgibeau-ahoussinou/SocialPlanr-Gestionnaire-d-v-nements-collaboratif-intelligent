import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: "Organisez\ncomme un pro",
    subtitle: "Créez des événements inoubliables avec vos amis en quelques taps",
    icon: "🎉",
    color: "#6366F1",
    gradient: ["#8B5CF6", "#6366F1", "#3B82F6"],
    backgroundElements: [
      { emoji: "🎨", size: 60, x: 0.1, y: 0.2, rotation: 15 },
      { emoji: "🎭", size: 45, x: 0.8, y: 0.3, rotation: -20 },
      { emoji: "🎪", size: 50, x: 0.2, y: 0.7, rotation: 25 },
      { emoji: "🎊", size: 40, x: 0.9, y: 0.6, rotation: -15 },
      { emoji: "🎈", size: 55, x: 0.05, y: 0.8, rotation: 10 },
    ]
  },
  {
    id: 2,
    title: "Votez et\ndécidez ensemble",
    subtitle: "Laissez l'intelligence collective choisir les meilleures options",
    icon: "⚡",
    color: "#10B981",
    gradient: ["#34D399", "#10B981", "#059669"],
    backgroundElements: [
      { emoji: "🗳️", size: 50, x: 0.15, y: 0.25, rotation: -10 },
      { emoji: "✅", size: 45, x: 0.85, y: 0.2, rotation: 20 },
      { emoji: "🎯", size: 55, x: 0.1, y: 0.75, rotation: 15 },
      { emoji: "⭐", size: 40, x: 0.9, y: 0.7, rotation: -25 },
      { emoji: "🏆", size: 48, x: 0.75, y: 0.85, rotation: 5 },
    ]
  },
  {
    id: 3,
    title: "IA magique\nintégrée",
    subtitle: "Génération automatique de plans personnalisés basés sur vos goûts",
    icon: "✨",
    color: "#8B5CF6",
    gradient: ["#A855F7", "#8B5CF6", "#7C3AED"],
    backgroundElements: [
      { emoji: "🤖", size: 65, x: 0.12, y: 0.18, rotation: 12 },
      { emoji: "🧠", size: 50, x: 0.88, y: 0.25, rotation: -18 },
      { emoji: "⚡", size: 42, x: 0.08, y: 0.8, rotation: 22 },
      { emoji: "🔮", size: 48, x: 0.82, y: 0.75, rotation: -12 },
      { emoji: "🌟", size: 38, x: 0.5, y: 0.9, rotation: 8 },
    ]
  },
  {
    id: 4,
    title: "Dépenses\nsimplifiées",
    subtitle: "Partagez les frais équitablement sans prise de tête",
    icon: "💎",
    color: "#F59E0B",
    gradient: ["#FBBF24", "#F59E0B", "#D97706"],
    backgroundElements: [
      { emoji: "💳", size: 52, x: 0.1, y: 0.22, rotation: -15 },
      { emoji: "💵", size: 45, x: 0.85, y: 0.18, rotation: 25 },
      { emoji: "💰", size: 58, x: 0.15, y: 0.78, rotation: 18 },
      { emoji: "🪙", size: 40, x: 0.9, y: 0.72, rotation: -20 },
      { emoji: "📊", size: 46, x: 0.05, y: 0.5, rotation: 10 },
    ]
  },
  {
    id: 5,
    title: "Prêt à\ncommencer ?",
    subtitle: "Rejoignez des milliers d'utilisateurs qui organisent déjà mieux",
    icon: "🚀",
    color: "#EF4444",
    gradient: ["#F87171", "#EF4444", "#DC2626"],
    backgroundElements: [
      { emoji: "🌈", size: 60, x: 0.1, y: 0.2, rotation: 20 },
      { emoji: "🎊", size: 45, x: 0.85, y: 0.15, rotation: -15 },
      { emoji: "🎉", size: 50, x: 0.12, y: 0.8, rotation: 30 },
      { emoji: "✨", size: 42, x: 0.88, y: 0.75, rotation: -10 },
      { emoji: "🏆", size: 55, x: 0.5, y: 0.05, rotation: 5 },
    ]
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const floatingAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const parallaxAnim = useRef(new Animated.Value(0)).current;

  // Animations de fond flottantes
  useEffect(() => {
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    floatingAnimation.start();
    pulseAnimation.start();

    return () => {
      floatingAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  useEffect(() => {
    // Animation d'entrée sophistiquée
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: (currentIndex + 1) / onboardingData.length,
        duration: 500,
        useNativeDriver: false,
      })
    ]).start();
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      // Animation de transition fluide
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(parallaxAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        setCurrentIndex(currentIndex + 1);
        parallaxAnim.setValue(0);
        // Animation d'entrée
        Animated.parallel([
          Animated.spring(fadeAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          })
        ]).start();
      });
    } else {
      // Animation finale avant navigation
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        router.push('/login');
      });
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const currentData = onboardingData[currentIndex];

  // Rendu des éléments de fond flottants
  const renderBackgroundElements = () => {
    return currentData.backgroundElements.map((element, index) => (
      <Animated.View
        key={index}
        style={[
          styles.backgroundElement,
          {
            left: element.x * width,
            top: element.y * height,
            transform: [
              {
                translateY: floatingAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20 + (index * 8)]
                })
              },
                             { rotate: `${element.rotation}deg` },
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1]
                })
              }
            ]
          }
        ]}
      >
        <Text style={[styles.backgroundEmoji, { fontSize: element.size }]}>
          {element.emoji}
        </Text>
      </Animated.View>
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background coloré */}
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: currentData.color }]} />

      {/* Éléments de fond flottants */}
      <View style={StyleSheet.absoluteFillObject}>
        {renderBackgroundElements()}
      </View>

      {/* Overlay pour améliorer la lisibilité */}
      <View style={[StyleSheet.absoluteFillObject, styles.overlay]} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header avec Skip sophistiqué */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>SocialPlanr</Text>
          </View>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>
        </View>

        {/* Barre de progression stylée */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View 
              style={[
                styles.progressBar, 
                { 
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  })
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1} de {onboardingData.length}
          </Text>
        </View>

        {/* Contenu principal avec animations avancées */}
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                  })
                },
                {
                  translateX: parallaxAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -50]
                  })
                }
              ]
            }
          ]}
        >
          {/* Icône centrale avec effet de pulse */}
          <Animated.View 
            style={[
              styles.iconContainer,
              {
                transform: [
                  { scale: pulseAnim },
                  {
                    rotate: floatingAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '5deg']
                    })
                  }
                ]
              }
            ]}
          >
            <View style={styles.iconBackground}>
              <Text style={styles.iconEmoji}>{currentData.icon}</Text>
            </View>
            {/* Cercles concentriques animés */}
            <Animated.View 
              style={[
                styles.pulseCircle,
                styles.pulseCircle1,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.pulseCircle,
                styles.pulseCircle2,
                {
                  transform: [{ 
                    scale: pulseAnim.interpolate({
                      inputRange: [1, 1.1],
                      outputRange: [1.2, 1.4]
                    })
                  }]
                }
              ]} 
            />
          </Animated.View>

          {/* Textes avec animations en cascade */}
          <Animated.View 
            style={[
              styles.textContainer,
              {
                transform: [{
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                  })
                }]
              }
            ]}
          >
            <Text style={styles.title}>{currentData.title}</Text>
            <Animated.View
              style={{
                transform: [{
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0]
                  })
                }]
              }}
            >
              <Text style={styles.subtitle}>{currentData.subtitle}</Text>
            </Animated.View>
          </Animated.View>

          {/* Indicateurs de points modernisés */}
          <View style={styles.dotsContainer}>
            {onboardingData.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.4)',
                    width: index === currentIndex ? 32 : 12,
                    height: index === currentIndex ? 12 : 12,
                    transform: [{
                      scale: index === currentIndex ? 1 : 0.8
                    }]
                  }
                ]}
              />
            ))}
          </View>
        </Animated.View>

        {/* Footer avec bouton d'action stylé */}
        <Animated.View 
          style={[
            styles.footer,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0]
                })
              }]
            }
          ]}
        >
                     <TouchableOpacity 
             style={[styles.nextButton, currentIndex === onboardingData.length - 1 && styles.finalButton]} 
             onPress={handleNext}
             activeOpacity={0.9}
           >
             <View style={styles.buttonGradient}>
               <Text style={[styles.nextButtonText, currentIndex === onboardingData.length - 1 && styles.finalButtonText]}>
                 {currentIndex === onboardingData.length - 1 ? 'Commencer l\'aventure' : 'Continuer'}
               </Text>
               <View style={styles.buttonIcon}>
                 <Text style={styles.arrowIcon}>
                   {currentIndex === onboardingData.length - 1 ? '🚀' : '→'}
                 </Text>
               </View>
             </View>
           </TouchableOpacity>

          {/* Swipe indicator */}
          <Animated.View 
            style={[
              styles.swipeIndicator,
              {
                opacity: floatingAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 1]
                })
              }
            ]}
          >
            <Text style={styles.swipeText}>Glissez vers la droite →</Text>
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  backgroundElement: {
    position: 'absolute',
    zIndex: 1,
  },
  backgroundEmoji: {
    opacity: 0.15,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    zIndex: 10,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backdropFilter: 'blur(10px)',
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
    zIndex: 10,
  },
  progressBackground: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 3,
    marginRight: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  progressText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    zIndex: 10,
  },
  iconContainer: {
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    zIndex: 3,
  },
  iconEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  pulseCircle1: {
    width: 200,
    height: 200,
    zIndex: 1,
  },
  pulseCircle2: {
    width: 240,
    height: 240,
    borderWidth: 1,
    zIndex: 0,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -1,
    lineHeight: 48,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 19,
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
     dot: {
     borderRadius: 6,
     backgroundColor: 'rgba(255,255,255,0.4)',
   },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    zIndex: 10,
  },
  nextButton: {
    borderRadius: 30,
    marginBottom: 16,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  finalButton: {
    shadowColor: 'rgba(255,255,255,0.5)',
    shadowRadius: 20,
  },
     buttonGradient: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: 18,
     paddingHorizontal: 32,
     borderRadius: 30,
     borderWidth: 2,
     borderColor: 'rgba(255,255,255,0.5)',
     backgroundColor: 'rgba(255,255,255,0.2)',
   },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  finalButtonText: {
    fontSize: 19,
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 12,
  },
  arrowIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  swipeIndicator: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
    opacity: 0.7,
  },
  swipeText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
});