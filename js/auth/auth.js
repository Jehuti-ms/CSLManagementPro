// ============================================================
// AUTHENTICATION SERVICE - Email & Google Sign-In
// ============================================================

var Auth = {
    // ----- EMAIL/PASSWORD LOGIN -----
    async login(email, password) {
        console.log("🔐 Attempting login for:", email);
        
        if (window.__firebase.useMock) {
            // Mock login - accept any valid-looking email with password
            if (password && password.length >= 6) {
                // Determine user type based on email
                var userType = 'teacher';
                var isStudent = email.includes('student') || email.includes('@student.');
                
                if (isStudent) {
                    userType = 'student';
                }
                
                var user = { 
                    email: email, 
                    uid: 'mock-user-' + Date.now(), 
                    displayName: email.split('@')[0] || 'User',
                    userType: userType
                };
                sessionStorage.setItem('mockUser', JSON.stringify(user));
                console.log("✅ Mock login successful for:", email, "Type:", userType);
                return user;
            }
            throw new Error('Password must be at least 6 characters');
        }
        
        try {
            var userCred = await window.__firebase.auth.signInWithEmailAndPassword(email, password);
            var user = userCred.user;
            
            // Check user type from Firestore
            var userDoc = await window.__firebase.db.collection('users').doc(user.uid).get();
            if (userDoc.exists) {
                var userData = userDoc.data();
                user.userType = userData.userType || 'teacher';
            } else {
                // Default to teacher if not specified
                user.userType = 'teacher';
            }
            
            console.log("✅ User logged in:", user.email, "Type:", user.userType);
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
            }
            
            throw new Error(message);
        }
    },

    // ----- GET CURRENT USER -----
    getCurrentUser: function() {
        if (window.__firebase.useMock) {
            var mockUser = sessionStorage.getItem('mockUser');
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
