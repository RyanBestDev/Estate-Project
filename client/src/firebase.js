// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
	authDomain: 'mern-estate-57ede.firebaseapp.com',
	projectId: 'mern-estate-57ede',
	storageBucket: 'mern-estate-57ede.appspot.com',
	messagingSenderId: '981921707086',
	appId: '1:981921707086:web:fc19ea3b84ef4f8057bf1f',
	measurementId: 'G-WZJ1F69ZS8',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
