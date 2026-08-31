// ============================================================
// FIREBASE CONFIGURATION
// ============================================================

// REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByUXiRZKJ4ZU9YYIcwyhmkqlLBtKTysX8",
  authDomain: "csl-management-pro.firebaseapp.com",
  projectId: "csl-management-pro",
  storageBucket: "csl-management-pro.firebasestorage.app",
  messagingSenderId: "75793557893",
  appId: "1:75793557893:web:e250d619831cf80fc4bcec",
  measurementId: "G-868VTMCR0W"
};


// Initialize Firebase
let useMock = true;
let auth, db;

try {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    useMock = false;
    console.log("✅ Firebase initialized successfully");
} catch (e) {
    console.warn("⚠️ Firebase config missing - using mock data mode");
    useMock = true;
}

// Export for other files
window.__firebase = { auth, db, useMock };