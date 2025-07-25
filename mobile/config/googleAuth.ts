import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configuration Google Sign-In
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    // Web Client ID depuis Firebase Console
    webClientId: '717130341106-o33mfjv8ua420v62hulkgr818m46gut2.apps.googleusercontent.com',
    offlineAccess: true, // Si tu veux récupérer le refresh token
    hostedDomain: '', // Spécifie un domaine (optionnel)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  });
};

export default GoogleSignin; 
 