// ============================================================
// AUTHENTICATION SERVICE
// ============================================================

const Auth = {
    async login(email, password) {
        if (window.__firebase.useMock) {
            if (email === 'teacher@demo.com' && password === '123456') {
                return { email, uid: 'mock-user-123' };
            }
            throw new Error('Invalid credentials. Use teacher@demo.com / 123456');
        }
        const userCred = await window.__firebase.auth.signInWithEmailAndPassword(email, password);
        return userCred.user;
    },
    
    async logout() {
        if (!window.__firebase.useMock) {
            await window.__firebase.auth.signOut();
        }
    },
    
    onAuthStateChanged(callback) {
        if (window.__firebase.useMock) {
            callback({ email: 'teacher@demo.com', uid: 'mock-user-123' });
            return () => {};
        }
        return window.__firebase.auth.onAuthStateChanged(callback);
    }
};

window.Auth = Auth;