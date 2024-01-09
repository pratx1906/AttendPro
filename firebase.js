// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWw4wwWvvn56p3r9z2V-NKYWUOhquZ3S0",
  authDomain: "projecthr-e9f31.firebaseapp.com",
  projectId: "projecthr-e9f31",
  storageBucket: "projecthr-e9f31.appspot.com",
  messagingSenderId: "302763171463",
  appId: "1:302763171463:web:9d82b30c76aa1fdb486222",
  measurementId: "G-P1ZTX87GH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Updated Auth initialization with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
