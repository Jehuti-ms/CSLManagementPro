// ============================================================
// LOGIN PAGE - Handles login UI and events
// ============================================================

const LoginPage = {
    // ----- RENDER LOGIN PAGE -----
    render: function() {
        return `
        <div id="loginPage" class="page active-page">
            <div class="login-card">
                <div class="logo"><i class="fas fa-hands-helping"></i></div>
                <h2>Welcome Back</h2>
                <p class="subtitle">Sign in to manage your service clubs</p>
                
                <!-- Email Login -->
                <div class="input-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" id="loginEmail" placeholder="Email address" value="teacher@demo.com">
                </div>
                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="loginPassword" placeholder="Password" value="123456">
                </div>
                <button id="loginBtn" class="btn-primary">
                    <i class="fas fa-arrow-right-to-bracket"></i> Sign in with Email
                </button>
                
                <!-- Divider -->
                <div class="divider">
                    <hr>
                    <span>OR</span>
                    <hr>
                </div>
                
                <!-- Google Sign-In -->
                <button id="googleLoginBtn" class="btn-google">
                    <svg width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                    Sign in with Google
                </button>
                
                <div id="loginError" class="login-error"></div>
                
                <div class="login-footer">
                    Don't have an account? 
                    <a id="showRegisterBtn">Create one</a>
                </div>
                
                <div class="demo-info">
                    <i class="fas fa-info-circle"></i> Demo: teacher@demo.com / 123456
                </div>
            </div>
        </div>`;
    },

    // ----- SETUP LOGIN EVENTS -----
    setupEvents: function() {
        // Email login
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', async () => {
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                try {
                    const user = await window.Auth.login(email, password);
                    document.getElementById('loginError').textContent = '';
                    // Update user display
                    const userEmail = document.getElementById('userEmail');
                    if (userEmail) {
                        userEmail.textContent = user.displayName || user.email || 'Teacher';
                    }
                    // Show main app
                    window.app.showMainApp(user);
                } catch (error) {
                    document.getElementById('loginError').textContent = error.message;
                }
            });
        }

        // Google login
        const googleLoginBtn = document.getElementById('googleLoginBtn');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', async () => {
                try {
                    const user = await window.Auth.loginWithGoogle();
                    document.getElementById('loginError').textContent = '';
                    const userEmail = document.getElementById('userEmail');
                    if (userEmail) {
                        userEmail.textContent = user.displayName || user.email || 'Teacher';
                    }
                    window.app.showMainApp(user);
                } catch (error) {
                    document.getElementById('loginError').textContent = 'Google Sign-In failed: ' + error.message;
                }
            });
        }

        // Register link
        const showRegisterBtn = document.getElementById('showRegisterBtn');
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // For now, show a message
                alert('Registration coming soon! For now, use the demo account or Google Sign-In.');
                // You can implement registration modal here
            });
        }

        // Enter key shortcuts
        document.getElementById('loginEmail')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('loginBtn').click();
        });
        document.getElementById('loginPassword')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('loginBtn').click();
        });
    }
};

// Make LoginPage globally available
window.LoginPage = LoginPage;
