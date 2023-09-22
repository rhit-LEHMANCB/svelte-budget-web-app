// Import the functions you need from the SDKs you need
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth';
import {
	PUBLIC_FB_API_KEY,
	PUBLIC_FB_APP_ID,
	PUBLIC_FB_AUTH_DOMAIN,
	PUBLIC_FB_MEASUREMENT_ID,
	PUBLIC_FB_MESSAGING_SENDER_ID,
	PUBLIC_FB_PROJECT_ID,
	PUBLIC_FB_STORAGE_BUCKET
} from '$env/static/public';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: PUBLIC_FB_API_KEY,
	authDomain: PUBLIC_FB_AUTH_DOMAIN,
	projectId: PUBLIC_FB_PROJECT_ID,
	storageBucket: PUBLIC_FB_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FB_MESSAGING_SENDER_ID,
	appId: PUBLIC_FB_APP_ID,
	measurementId: PUBLIC_FB_MEASUREMENT_ID
};

function makeApp() {
	const apps = getApps();
	if (apps.length > 0) {
		return apps[0];
	}

	return initializeApp(firebaseConfig);
}

function makeAuth(app: FirebaseApp) {
	const auth = getAuth(app);
	setPersistence(auth, inMemoryPersistence);
	return auth;
}

const app = makeApp();
export const auth = makeAuth(app);
