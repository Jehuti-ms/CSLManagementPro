// ============================================================
// FIREBASE CONFIGURATION - CSL Management Pro
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
let useMock = false; // We have real credentials now!
let auth, db, googleProvider;

try {
    // Initialize Firebase (using compat version for older SDK style)
    firebase.initializeApp(firebaseConfig);
    
    // Get auth and firestore instances
    auth = firebase.auth();
    db = firebase.firestore();
    
    // Setup Google Auth Provider
    googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    });
    
    // Enable offline persistence for Firestore
    db.enablePersistence()
        .then(() => {
            console.log("✅ Firestore persistence enabled");
        })
        .catch((err) => {
            console.warn("⚠️ Firestore persistence error:", err);
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
    googleProvider, 
    useMock,
    config: firebaseConfig
};
