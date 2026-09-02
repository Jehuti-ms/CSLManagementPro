// ============================================================
// AUTHENTICATION SERVICE - Email & Google Sign-In
// ============================================================

const Auth = {
    // ----- EMAIL/PASSWORD LOGIN -----
    async login(email, password) {
        if (window.__firebase.useMock) {
            if (email === 'teacher@demo.com' && password === '123456') {
                return { email, uid: 'mock-user-123', displayName: 'Teacher' };
            }
            throw new Error('Invalid credentials. Use teacher@demo.com / 123456');
        }
        try {
            const userCred = await window.__firebase.auth.signInWithEmailAndPassword(email, password);
            console.log("✅ User logged in:", userCred.user.email);
            return userCred.user;
        } catch (error) {
            console.error("❌ Login error:", error.code, error.message);
            throw error;
        }
    },

    // ----- GOOGLE SIGN-IN -----
    async loginWithGoogle() {
        if (window.__firebase.useMock) {
            // Mock Google login
            return { 
                email: 'teacher@gmail.com', 
                uid: 'mock-google-123', 
                displayName: 'Teacher (Google)',
                photoURL: 'https://ui-avatars.com/api/?name=Teacher&background=6C63FF&color=fff'
            };
        }
        try {
            const userCred = await window.__firebase.auth.signInWithPopup(window.__firebase.googleProvider);
            console.log("✅ Google user logged in:", userCred.user.displayName);
            return userCred.user;
        } catch (error) {
            console.error("❌ Google login error:", error.code, error.message);
            throw error;
        }
    },

    // ----- REGISTER (for new users) -----
    async register(email, password, displayName) {
        if (window.__firebase.useMock) {
            // Mock registration
            const user = { email, uid: 'mock-user-' + Date.now(), displayName };
            sessionStorage.setItem('mockUser', JSON.stringify(user));
            return user;
        }
        try {
            const userCred = await window.__firebase.auth.createUserWithEmailAndPassword(email, password);
            // Update profile with display name
            if (displayName) {
                await userCred.user.updateProfile({ displayName });
            }
            console.log("✅ New user registered:", userCred.user.email);
            return userCred.user;
        } catch (error) {
            console.error("❌ Registration error:", error.code, error.message);
            throw error;
        }
    },

    // ----- LOGOUT -----
    async logout() {
        if (window.__firebase.useMock) {
            sessionStorage.removeItem('mockUser');
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
        if (window.__firebase.useMock) {
            // Check if user is stored in session
            const mockUser = sessionStorage.getItem('mockUser');
            if (mockUser) {
                callback(JSON.parse(mockUser));
            } else {
                callback(null);
            }
            return () => {};
        }
        return window.__firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("👤 Auth state changed:", user.email);
            }
            callback(user);
        });
    },

    // ----- GET CURRENT USER -----
    getCurrentUser() {
        if (window.__firebase.useMock) {
            const mockUser = sessionStorage.getItem('mockUser');
            return mockUser ? JSON.parse(mockUser) : null;
        }
        return window.__firebase.auth.currentUser;
    },

    // ----- UPDATE USER PROFILE -----
    async updateProfile(displayName, photoURL) {
        if (window.__firebase.useMock) {
            const user = this.getCurrentUser();
            if (user) {
                user.displayName = displayName || user.displayName;
                user.photoURL = photoURL || user.photoURL;
                sessionStorage.setItem('mockUser', JSON.stringify(user));
            }
            return;
        }
        try {
            const user = window.__firebase.auth.currentUser;
            if (user) {
                await user.updateProfile({ displayName, photoURL });
                console.log("✅ Profile updated");
            }
        } catch (error) {
            console.error("❌ Profile update error:", error);
            throw error;
        }
    },

    // ----- SEND PASSWORD RESET EMAIL -----
    async sendPasswordReset(email) {
        if (window.__firebase.useMock) {
            console.log("📧 Password reset email sent to:", email);
            return;
        }
        try {
            await window.__firebase.auth.sendPasswordResetEmail(email);
            console.log("📧 Password reset email sent to:", email);
        } catch (error) {
            console.error("❌ Password reset error:", error);
            throw error;
        }
    }
};

window.Auth = Auth;
