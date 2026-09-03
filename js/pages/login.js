// ============================================================
// LOGIN PAGE - Unified Login (Teacher & Coordinator)
// ============================================================

var LoginPage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="loginPage" class="page active-page">
            <div class="login-card">
                <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--secondary), var(--accent), var(--secondary)); background-size: 200% 100%; animation: shimmer 3s ease-in-out infinite;"></div>
                
                <div class="logo"><i class="fas fa-hands-helping"></i></div>
                <h2>Welcome Back</h2>
                <p class="subtitle">Sign in to manage your service clubs</p>
                
                <!-- ===== ROLE SELECTOR ===== -->
                <div style="
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                    background: var(--bg-secondary);
                    border-radius: var(--radius-md);
                    padding: 4px;
                    margin-bottom: 24px;
                ">
                    <button id="loginRoleTeacher" class="role-selector active" style="
                        padding: 10px;
                        border: none;
                        border-radius: var(--radius-sm);
                        background: var(--bg-primary);
                        color: var(--primary);
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        font-family: var(--font-sans);
                        font-size: 0.85rem;
                        box-shadow: var(--shadow-soft);
                    ">
                        <i class="fas fa-user"></i> Teacher
                    </button>
                    <button id="loginRoleCoordinator" class="role-selector" style="
                        padding: 10px;
                        border: none;
                        border-radius: var(--radius-sm);
                        background: transparent;
                        color: var(--gray-500);
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        font-family: var(--font-sans);
                        font-size: 0.85rem;
                    ">
                        <i class="fas fa-crown"></i> Coordinator
                    </button>
                </div>
                
                <!-- ===== LOGIN FORM ===== -->
                <div id="loginForm">
                    <div class="input-group">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="loginEmail" placeholder="Email address" value="dmoseley@gams.edu.bb">
                    </div>
                    <div class="input-group">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="loginPassword" placeholder="Password" value="">
                    </div>
                    
                    <!-- Coordinator Hint (hidden by default) -->
                    <div id="coordinatorHint" style="
                        display: none;
                        padding: 8px 12px;
                        background: rgba(201,168,76,0.08);
                        border: 1px solid rgba(201,168,76,0.15);
                        border-radius: var(--radius-sm);
                        margin-bottom: 16px;
                        font-size: 0.8rem;
                        color: var(--gray-600);
                        text-align: center;
                    ">
                        <i class="fas fa-info-circle" style="color: var(--secondary);"></i>
                        Coordinator login: admin@csl.com / admin123
                    </div>
                    
                    <button id="loginBtn" class="btn-primary">
                        <i class="fas fa-arrow-right-to-bracket"></i> Sign in
                    </button>
                </div>
                
                <div id="loginError" class="login-error"></div>
                
                <div class="login-footer">
                    Don't have an account? 
                    <a id="showRegisterBtn">Create one</a>
                </div>
                
                <div class="demo-info">
                    <i class="fas fa-info-circle"></i> Demo: teacher@demo.com / 123456
                </div>
                
                <!-- ===== GOOGLE SIGN-IN (Disabled) ===== -->
                <!--
                <div class="divider">
                    <hr>
                    <span>OR</span>
                    <hr>
                </div>
                
                <button id="googleLoginBtn" class="btn-google">
                    ... Google SVG ...
                    Sign in with Google
                </button>
                -->
            </div>
        </div>`;
    },
    
    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up login events...");
        var self = this;
        
        // ===== ROLE SELECTOR =====
        var teacherBtn = document.getElementById('loginRoleTeacher');
        var coordinatorBtn = document.getElementById('loginRoleCoordinator');
        var coordinatorHint = document.getElementById('coordinatorHint');
        var loginBtn = document.getElementById('loginBtn');
        
        if (teacherBtn && coordinatorBtn) {
            teacherBtn.addEventListener('click', function() {
                // Switch to Teacher role
                document.querySelectorAll('.role-selector').forEach(function(b) {
                    b.style.background = 'transparent';
                    b.style.color = 'var(--gray-500)';
                    b.style.boxShadow = 'none';
                });
                this.style.background = 'var(--bg-primary)';
                this.style.color = 'var(--primary)';
                this.style.boxShadow = 'var(--shadow-soft)';
                
                coordinatorHint.style.display = 'none';
                loginBtn.innerHTML = '<i class="fas fa-arrow-right-to-bracket"></i> Sign in as Teacher';
                
                // Update placeholder email
                document.getElementById('loginEmail').placeholder = 'Teacher email address';
                document.getElementById('loginEmail').value = 'dmoseley@gams.edu.bb';
                document.getElementById('loginPassword').value = '';
                document.getElementById('loginError').textContent = '';
            });
            
            coordinatorBtn.addEventListener('click', function() {
                // Switch to Coordinator role
                document.querySelectorAll('.role-selector').forEach(function(b) {
                    b.style.background = 'transparent';
                    b.style.color = 'var(--gray-500)';
                    b.style.boxShadow = 'none';
                });
                this.style.background = 'var(--bg-primary)';
                this.style.color = 'var(--secondary)';
                this.style.boxShadow = 'var(--shadow-soft)';
                
                coordinatorHint.style.display = 'block';
                loginBtn.innerHTML = '<i class="fas fa-crown"></i> Sign in as Coordinator';
                
                // Update placeholder email
                document.getElementById('loginEmail').placeholder = 'Coordinator email address';
                document.getElementById('loginEmail').value = 'admin@csl.com';
                document.getElementById('loginPassword').value = '';
                document.getElementById('loginError').textContent = '';
            });
        }
        
        // ===== LOGIN BUTTON =====
        if (loginBtn) {
            loginBtn.addEventListener('click', async function() {
                var email = document.getElementById('loginEmail').value;
                var password = document.getElementById('loginPassword').value;
                var errorEl = document.getElementById('loginError');
                
                // Check which role is selected
                var isCoordinator = coordinatorBtn && coordinatorBtn.style.background !== 'transparent' && 
                                   coordinatorBtn.style.color === 'var(--secondary)';
                
                if (!email || !password) {
                    errorEl.textContent = '⚠️ Please enter both email and password';
                    return;
                }
                
                try {
                    errorEl.textContent = '⏳ Logging in...';
                    
                    if (isCoordinator) {
                        // Coordinator login
                        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
                        var admin = admins.find(function(a) { return a.email === email; });
                        
                        if (admin && admin.password === password) {
                            var user = {
                                email: email,
                                uid: 'admin-' + Date.now(),
                                displayName: admin.name || 'Club Coordinator',
                                userType: 'coordinator',
                                isAdmin: true
                            };
                            sessionStorage.setItem('mockUser', JSON.stringify(user));
                            localStorage.setItem('mockUser', JSON.stringify(user));
                            errorEl.textContent = '';
                            window.app.currentUser = user;
                            window.app.showMainApp(user);
                            return;
                        } else {
                            errorEl.textContent = '❌ Invalid coordinator credentials. Please try again.';
                            return;
                        }
                    } else {
                        // Teacher login - use Auth
                        var user = await window.Auth.login(email, password);
                        errorEl.textContent = '';
                        window.app.showMainApp(user);
                    }
                } catch (error) {
                    console.error("❌ Login error:", error);
                    errorEl.textContent = '❌ ' + error.message;
                }
            });
        }
        
        // ===== REGISTER LINK =====
        var registerBtn = document.getElementById('showRegisterBtn');
        if (registerBtn) {
            registerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Registration is currently by invitation only. Please contact your club coordinator.');
            });
        }
        
        // ===== ENTER KEY SUPPORT =====
        var emailInput = document.getElementById('loginEmail');
        var passwordInput = document.getElementById('loginPassword');
        
        if (emailInput) {
            emailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    var btn = document.getElementById('loginBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    var btn = document.getElementById('loginBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        console.log("✅ Login events ready");
    }
};

window.LoginPage = LoginPage;
console.log("✅ LoginPage module loaded");
