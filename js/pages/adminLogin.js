// ============================================================
// ADMIN LOGIN PAGE - Secure Coordinator Entry
// ============================================================

var AdminLoginPage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="adminLoginPage" class="page active-page">
            <div style="
                max-width: 440px;
                margin: 40px auto;
                background: var(--bg-primary);
                border: 1px solid var(--gray-100);
                border-radius: var(--radius-xl);
                padding: 48px 40px;
                box-shadow: var(--shadow-medium);
                position: relative;
                overflow: hidden;
            ">
                <!-- Premium Accent Line -->
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, var(--secondary), var(--accent), var(--secondary));
                    background-size: 200% 100%;
                    animation: shimmer 3s ease-in-out infinite;
                "></div>
                
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 32px;">
                    <div style="
                        width: 72px;
                        height: 72px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, var(--primary), var(--secondary));
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 16px;
                        font-size: 2rem;
                        color: white;
                        box-shadow: 0 8px 32px rgba(201, 168, 76, 0.25);
                    ">
                        <i class="fas fa-crown"></i>
                    </div>
                    <h2 style="
                        font-family: var(--font-serif);
                        font-size: 2rem;
                        font-weight: 700;
                        color: var(--primary);
                        margin-bottom: 4px;
                    ">
                        Coordinator Login
                    </h2>
                    <p style="color: var(--gray-500); font-size: 0.95rem;">
                        Secure access for club coordinators only
                    </p>
                </div>
                
                <!-- Admin Badge -->
                <div style="
                    background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02));
                    border: 1px solid rgba(201,168,76,0.15);
                    border-radius: var(--radius-lg);
                    padding: 12px 16px;
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                ">
                    <i class="fas fa-shield-alt" style="color: var(--secondary); font-size: 1.2rem;"></i>
                    <span style="color: var(--gray-600); font-size: 0.85rem;">
                        <strong style="color: var(--primary);">Administrative Access</strong>
                        <br>Manage clubs, teachers, and system settings
                    </span>
                </div>
                
                <!-- Login Form -->
                <div>
                    <div style="position: relative; margin-bottom: 16px;">
                        <i class="fas fa-envelope" style="
                            position: absolute;
                            left: 16px;
                            top: 50%;
                            transform: translateY(-50%);
                            color: var(--gray-500);
                        "></i>
                        <input type="email" id="adminLoginEmail" placeholder="Coordinator Email" value="admin@csl.com" style="
                            width: 100%;
                            padding: 14px 18px 14px 48px;
                            border: 2px solid var(--gray-100);
                            border-radius: var(--radius-md);
                            font-size: 1rem;
                            background: var(--bg-secondary);
                            transition: all 0.2s ease;
                            font-family: var(--font-sans);
                        ">
                    </div>
                    
                    <div style="position: relative; margin-bottom: 20px;">
                        <i class="fas fa-lock" style="
                            position: absolute;
                            left: 16px;
                            top: 50%;
                            transform: translateY(-50%);
                            color: var(--gray-500);
                        "></i>
                        <input type="password" id="adminLoginPassword" placeholder="Password" style="
                            width: 100%;
                            padding: 14px 18px 14px 48px;
                            border: 2px solid var(--gray-100);
                            border-radius: var(--radius-md);
                            font-size: 1rem;
                            background: var(--bg-secondary);
                            transition: all 0.2s ease;
                            font-family: var(--font-sans);
                        ">
                    </div>
                    
                    <button id="adminLoginBtn" style="
                        width: 100%;
                        padding: 16px;
                        background: linear-gradient(135deg, var(--primary), var(--secondary));
                        border: none;
                        border-radius: var(--radius-md);
                        color: white;
                        font-weight: 700;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        font-family: var(--font-sans);
                        position: relative;
                        overflow: hidden;
                    ">
                        <span style="position: relative; z-index: 1;">
                            <i class="fas fa-arrow-right-to-bracket"></i> Sign in as Coordinator
                        </span>
                    </button>
                    
                    <div id="adminLoginError" style="
                        color: var(--danger);
                        margin-top: 12px;
                        font-size: 0.9rem;
                        font-weight: 500;
                        text-align: center;
                    "></div>
                </div>
                
                <!-- Footer Links -->
                <div style="
                    margin-top: 24px;
                    padding-top: 20px;
                    border-top: 1px solid var(--gray-100);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 12px;
                ">
                    <button onclick="window.app.navigateTo('landing')" style="
                        background: none;
                        border: none;
                        color: var(--gray-500);
                        cursor: pointer;
                        font-size: 0.85rem;
                        transition: all 0.2s ease;
                        font-family: var(--font-sans);
                    ">
                        <i class="fas fa-arrow-left"></i> Back to Home
                    </button>
                    <button onclick="window.app.showLogin()" style="
                        background: none;
                        border: none;
                        color: var(--accent);
                        cursor: pointer;
                        font-size: 0.85rem;
                        font-weight: 500;
                        transition: all 0.2s ease;
                        font-family: var(--font-sans);
                    ">
                        <i class="fas fa-user"></i> Teacher Login
                    </button>
                </div>
                
                <!-- Demo Credentials -->
                <div style="
                    margin-top: 16px;
                    padding: 12px 16px;
                    background: var(--bg-secondary);
                    border-radius: var(--radius-md);
                    text-align: center;
                    font-size: 0.8rem;
                    color: var(--gray-500);
                ">
                    <i class="fas fa-info-circle" style="color: var(--secondary);"></i>
                    Demo Coordinator: admin@csl.com / admin123
                </div>
            </div>
        </div>`;
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up admin login events...");
        var self = this;
        
        var loginBtn = document.getElementById('adminLoginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                self.handleAdminLogin();
            });
        }
        
        // Enter key support
        var emailInput = document.getElementById('adminLoginEmail');
        var passwordInput = document.getElementById('adminLoginPassword');
        
        if (emailInput) {
            emailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    var btn = document.getElementById('adminLoginBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    var btn = document.getElementById('adminLoginBtn');
                    if (btn) btn.click();
                }
            });
        }
    },

    // ----- HANDLE ADMIN LOGIN -----
    handleAdminLogin: function() {
        console.log("🔐 Admin login attempt...");
        
        var email = document.getElementById('adminLoginEmail').value.trim();
        var password = document.getElementById('adminLoginPassword').value;
        var errorEl = document.getElementById('adminLoginError');
        
        if (!email || !password) {
            errorEl.textContent = '⚠️ Please enter both email and password';
            return;
        }
        
        // Admin credentials check
        if (email === 'admin@csl.com' && password === 'admin123') {
            errorEl.textContent = '';
            
            // Create admin user object
            var adminUser = {
                email: email,
                uid: 'admin-' + Date.now(),
                displayName: 'Club Coordinator',
                userType: 'coordinator',
                isAdmin: true
            };
            
            // Store admin session
            sessionStorage.setItem('mockUser', JSON.stringify(adminUser));
            localStorage.setItem('mockUser', JSON.stringify(adminUser));
            
            console.log("✅ Admin login successful!");
            
            // Update app user and show main app
            window.app.currentUser = adminUser;
            window.app.showMainApp(adminUser);
            
        } else {
            errorEl.textContent = '❌ Invalid coordinator credentials. Please try again.';
            console.warn("⚠️ Admin login failed for:", email);
        }
    }
};

window.AdminLoginPage = AdminLoginPage;
console.log("✅ AdminLoginPage module loaded");
