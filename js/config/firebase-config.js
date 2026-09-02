// ============================================================
// FIREBASE CONFIGURATION - CSL Management Pro
// ============================================================

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
    firebase.initializeApp(firebaseConfig);
    
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();  // ✅ This must be here
    
    googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    });
    
    useMock = false;
    console.log("✅ Firebase initialized successfully");
    console.log(`📦 Project: ${firebaseConfig.projectId}`);
    
} catch (e) {
    console.error("❌ Firebase initialization failed:", e);
    useMock = true;
}

window.__firebase = { 
    auth, 
    db, 
    storage,  // ✅ This must be exported
    googleProvider, 
    useMock,
    config: firebaseConfig
};
