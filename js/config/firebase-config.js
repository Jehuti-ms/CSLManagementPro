// ============================================================
// FIREBASE CONFIGURATION - Add Storage
// ============================================================

// Your web app's Firebase configuration
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
let useMock = false;
let auth, db, storage, googleProvider;

try {
    // Initialize Firebase (using compat version)
    firebase.initializeApp(firebaseConfig);
    
    // Get auth, firestore, and storage instances
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();  // ADD THIS
    
    // Setup Google Auth Provider
    googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    });
    
    useMock = false;
    console.log("✅ Firebase initialized successfully with real credentials!");
    console.log(`📦 Project: ${firebaseConfig.projectId}`);
    
} catch (e) {
    console.error("❌ Firebase initialization failed:", e);
    console.warn("⚠️ Falling back to mock data mode");
    useMock = true;
}

// Export for other files
window.__firebase = { 
    auth, 
    db, 
    storage,  // ADD THIS
    googleProvider, 
    useMock,
    config: firebaseConfig
};
