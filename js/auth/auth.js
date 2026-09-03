// ============================================================
// AUTHENTICATION SERVICE - Email & Google Sign-In
// ============================================================

var Auth = {
    // ----- EMAIL/PASSWORD LOGIN -----
    async login(email, password) {
        console.log("🔐 Attempting login for:", email);
        
        if (window.__firebase.useMock) {
            console.log("📦 Using mock authentication");
            if (password && password.length >= 6) {
                var isStudent = email.includes('student') || email.includes('@student.');
                var user = { 
                    email: email, 
                    uid: 'mock-user-' + Date.now(), 
                    displayName: email.split('@')[0] || 'User',
                    userType: isStudent ? 'student' : 'teacher'
                };
                sessionStorage.setItem('mockUser', JSON.stringify(user));
                localStorage.setItem('mockUser', JSON.stringify(user));
                console.log("✅ Mock login successful for:", email);
                return user;
            }
            throw new Error('Password must be at least 6 characters');
        }
        
        try {
            var userCred = await window.__firebase.auth.signInWithEmailAndPassword(email, password);
            var user = userCred.user;
            
            // Get user type from Firestore
            try {
                var userDoc = await window.__firebase.db.collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    var userData = userDoc.data();
                    user.userType = userData.userType || 'teacher';
                } else {
                    user.userType = 'teacher';
                }
            } catch (e) {
                console.warn("⚠️ Could not fetch user type, defaulting to teacher:", e);
                user.userType = 'teacher';
            }
            
            console.log("✅ User logged in:", user.email);
            return user;
        } catch (error) {
            console.error("❌ Login error:", error.code, error.message);
            
            var message = error.message;
            if (error.code === 'auth/user-not-found') {
                message = 'No account found with this email';
            } else if (error.code === 'auth/wrong-password') {
                message = 'Incorrect password';
            } else if (error.code === 'auth/invalid-email') {
                message = 'Invalid email address';
            } else if (error.code === 'auth/too-many-requests') {
                message = 'Too many failed attempts. Please try again later';
            } else if (error.code === 'auth/invalid-credential') {
                message = 'Invalid email or password. Please check your credentials.';
            }
            
            throw new Error(message);
        }
    },

    // ----- GOOGLE SIGN-IN (with better error handling) -----
    async loginWithGoogle() {
        console.log("🔐 Attempting Google login...");
        
        if (window.__firebase.useMock) {
            console.log("📦 Using mock Google authentication");
            var user = { 
                email: 'user@gmail.com', 
                uid: 'mock-google-' + Date.now(), 
                displayName: 'Google User',
                photoURL: 'https://ui-avatars.com/api/?name=Google+User&background=6C63FF&color=fff',
                userType: 'teacher'
            };
            sessionStorage.setItem('mockUser', JSON.stringify(user));
            localStorage.setItem('mockUser', JSON.stringify(user));
            console.log("✅ Mock Google login successful");
            return user;
        }
        
        try {
            var userCred = await window.__firebase.auth.signInWithPopup(window.__firebase.googleProvider);
            console.log("✅ Google user logged in:", userCred.user.displayName);
            return userCred.user;
        } catch (error) {
            console.error("❌ Google login error:", error.code, error.message);
            
            var message = error.message;
            if (error.code === 'auth/popup-closed-by-user') {
                message = 'Sign-in popup was closed';
            } else if (error.code === 'auth/popup-blocked') {
                message = 'Pop-up was blocked. Please allow pop-ups for this site';
            } else if (error.code === 'auth/unauthorized-domain') {
                message = 'This domain is not authorized for Google Sign-In. Please use Email/Password login or contact your administrator to add this domain to Firebase.';
                console.warn("⚠️ Add 'jehuti-ms.github.io' to Firebase Console -> Authentication -> Settings -> Authorized domains");
            }
            
            throw new Error(message);
        }
    },

    // ----- LOGOUT -----
    async logout() {
        console.log("🚪 Logging out...");
        
        if (window.__firebase.useMock) {
            sessionStorage.removeItem('mockUser');
            localStorage.removeItem('mockUser');
            console.log("✅ Mock logout successful");
            return;
        }
        
        try {
            await window.__firebase.auth.signOut();
            console.log("✅ User logged out");
        } catch (error) {
            console.error("❌ Logout error:", error);
            throw error;
        }
    },

    // ----- AUTH STATE LISTENER -----
    onAuthStateChanged(callback) {
        console.log("👤 Setting up auth state listener...");
        
        if (window.__firebase.useMock) {
            var mockUser = localStorage.getItem('mockUser') || sessionStorage.getItem('mockUser');
            if (mockUser) {
                try {
                    var user = JSON.parse(mockUser);
                    console.log("📦 Mock user found:", user.email);
                    callback(user);
                } catch (e) {
                    console.warn("⚠️ Could not parse mock user:", e);
                    callback(null);
                }
            } else {
                console.log("📦 No mock user found");
                callback(null);
            }
            return function() {};
        }
        
        return window.__firebase.auth.onAuthStateChanged(function(user) {
            if (user) {
                console.log("👤 Auth state changed:", user.email);
            } else {
                console.log("👤 Auth state: No user");
            }
            callback(user);
        });
    },

    // ----- GET CURRENT USER -----
    getCurrentUser: function() {
        if (window.__firebase.useMock) {
            var mockUser = localStorage.getItem('mockUser') || sessionStorage.getItem('mockUser');
            return mockUser ? JSON.parse(mockUser) : null;
        }
        return window.__firebase.auth.currentUser;
    },

    // ----- GET USER TYPE -----
    getUserType: function() {
        var user = this.getCurrentUser();
        return user ? user.userType || 'teacher' : null;
    },

    // ----- CHECK IF USER IS STUDENT -----
    isStudent: function() {
        return this.getUserType() === 'student';
    },

    // ----- CHECK IF USER IS TEACHER -----
    isTeacher: function() {
        return this.getUserType() === 'teacher';
    }
};

// Make Auth globally available
window.Auth = Auth;
console.log("✅ Auth module loaded");
