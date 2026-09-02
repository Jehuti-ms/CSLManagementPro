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
                    <input type="email" id="loginEmail" placeholder="Email address" value="dmoseley@gams.edu.bb">
                </div>
                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="loginPassword" placeholder="Password" value="">
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
                    <i class="fas fa-info-circle"></i> Demo: Use any email + password (6+ chars) in mock mode
                </div>
            </div>
        </div>`;
    },

    // ----- SETUP LOGIN EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up login events...");
        
        // Email login
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            console.log("✅ Login button found");
            loginBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                console.log("🔑 Login button clicked");
                
                const email = document.getElementById('loginEmail').value.trim();
                const password = document.getElementById('loginPassword').value;
                const errorEl = document.getElementById('loginError');
                
                if (!email || !password) {
                    errorEl.textContent = '⚠️ Please enter both email and password';
                    return;
                }
                
                try {
                    errorEl.textContent = '⏳ Logging in...';
                    const user = await window.Auth.login(email, password);
                    errorEl.textContent = '';
                    console.log("✅ Login successful:", user.email);
                    
                    // Update user display
                    const userEmail = document.getElementById('userEmail');
                    if (userEmail) {
                        userEmail.textContent = user.displayName || user.email || 'Teacher';
                    }
                    
                    // Show main app
                    if (window.app) {
                        window.app.showMainApp(user);
                    } else {
                        console.error("❌ App not initialized");
                    }
                } catch (error) {
                    console.error("❌ Login error:", error);
                    errorEl.textContent = '❌ ' + error.message;
                    
                    // Suggest registration if user not found
                    if (error.message.includes('No account found') || error.message.includes('invalid-credential')) {
                        errorEl.textContent = '❌ No account found. Please register or use mock mode.';
                    }
                }
            });
        } else {
            console.error("❌ Login button not found!");
        }

        // Google login
        const googleLoginBtn = document.getElementById('googleLoginBtn');
        if (googleLoginBtn) {
            console.log("✅ Google login button found");
            googleLoginBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                console.log("🔑 Google login button clicked");
                
                const errorEl = document.getElementById('loginError');
                
                try {
                    errorEl.textContent = '⏳ Signing in with Google...';
                    const user = await window.Auth.loginWithGoogle();
                    errorEl.textContent = '';
                    console.log("✅ Google login successful:", user.email);
                    
                    const userEmail = document.getElementById('userEmail');
                    if (userEmail) {
                        userEmail.textContent = user.displayName || user.email || 'Teacher';
                    }
                    
                    if (window.app) {
                        window.app.showMainApp(user);
                    }
                } catch (error) {
                    console.error("❌ Google login error:", error);
                    errorEl.textContent = '❌ ' + error.message;
                }
            });
        } else {
            console.error("❌ Google login button not found!");
        }

        // Register link
        const showRegisterBtn = document.getElementById('showRegisterBtn');
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                const errorEl = document.getElementById('loginError');
                
                // Simple registration prompt
                const email = prompt('Enter email to register:');
                if (!email) return;
                
                const password = prompt('Enter password (min 6 characters):');
                if (!password || password.length < 6) {
                    errorEl.textContent = '⚠️ Password must be at least 6 characters';
                    return;
                }
                
                try {
                    errorEl.textContent = '⏳ Registering...';
                    const user = await window.Auth.register(email, password);
                    errorEl.textContent = '✅ Registration successful! Please login.';
                    console.log("✅ Registration successful:", user.email);
                    
                    // Pre-fill the login form
                    document.getElementById('loginEmail').value = email;
                    document.getElementById('loginPassword').value = password;
                    
                    // Auto-login in mock mode
                    if (window.__firebase.useMock) {
                        const loginBtn = document.getElementById('loginBtn');
                        if (loginBtn) loginBtn.click();
                    }
                } catch (error) {
                    console.error("❌ Registration error:", error);
                    errorEl.textContent = '❌ ' + error.message;
                }
            });
        }

        // Enter key shortcuts
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        
        if (emailInput) {
            emailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const btn = document.getElementById('loginBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const btn = document.getElementById('loginBtn');
                    if (btn) btn.click();
                }
            });
        }
    }
};

// Make LoginPage globally available
window.LoginPage = LoginPage;
