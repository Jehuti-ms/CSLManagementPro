// ============================================================
// LOGIN PAGE - Unified Login (Teacher, Coordinator, & Student)
// ============================================================

var LoginPage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="loginPage" class="page active-page">
            <div class="login-card" style="position: relative;">
                <!-- Close Button -->
                <button onclick="window.app.closeLogin()" style="
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--gray-500);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    padding: 4px 8px;
                    border-radius: var(--radius-sm);
                    z-index: 10;
                ">
                    <i class="fas fa-times"></i>
                </button>
                
                <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--secondary), var(--accent), var(--secondary)); background-size: 200% 100%; animation: shimmer 3s ease-in-out infinite;"></div>
                
                <div class="logo"><i class="fas fa-hands-helping"></i></div>
                <h2>Welcome Back</h2>
                <p class="subtitle">Sign in to manage your service clubs</p>
                
                <!-- ===== ROLE SELECTOR (3 Tabs) ===== -->
                <div style="
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 4px;
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
                        font-size: 0.8rem;
                        box-shadow: var(--shadow-soft);
                    ">
                        <i class="fas fa-chalkboard-teacher"></i> Teacher
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
                        font-size: 0.8rem;
                    ">
                        <i class="fas fa-crown"></i> Coord
                    </button>
                    <button id="loginRoleStudent" class="role-selector" style="
                        padding: 10px;
                        border: none;
                        border-radius: var(--radius-sm);
                        background: transparent;
                        color: var(--gray-500);
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        font-family: var(--font-sans);
                        font-size: 0.8rem;
                    ">
                        <i class="fas fa-user-graduate"></i> Student
                    </button>
                </div>
                
                <!-- ===== LOGIN FORM ===== -->
                <div id="loginForm">
                    <div class="input-group">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="loginEmail" placeholder="School email address" value="teacher@demo.com">
                    </div>
                    <div class="input-group">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="loginPassword" placeholder="Password" value="">
                    </div>
                    
                    <!-- Coordinator Hint -->
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

                    <!-- Student Hint -->
                    <div id="studentHint" style="
                        display: none;
                        padding: 8px 12px;
                        background: rgba(0, 210, 160, 0.08);
                        border: 1px solid rgba(0, 210, 160, 0.15);
                        border-radius: var(--radius-sm);
                        margin-bottom: 16px;
                        font-size: 0.8rem;
                        color: var(--gray-600);
                        text-align: center;
                    ">
                        <i class="fas fa-info-circle" style="color: var(--success);"></i>
                        Students: Use your school email. Password: welcome123
                    </div>
                    
                    <button id="loginBtn" class="btn-primary">
                        <i class="fas fa-arrow-right-to-bracket"></i> Sign in
                    </button>
                </div>
                
                <div id="loginError" class="login-error"></div>
                
                <!-- ===== DIVIDER ===== -->
                <div class="divider">
                    <hr>
                    <span>OR</span>
                    <hr>
                </div>
                
                <!-- ===== GOOGLE SIGN-IN ===== -->
                <button id="googleLoginBtn" class="btn-google" style="
                    width: 100%;
                    padding: 14px;
                    background: white;
                    border: 2px solid var(--gray-100);
                    border-radius: var(--radius-md);
                    color: var(--dark);
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: var(--transition);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    font-family: var(--font-sans);
                ">
                    <svg width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                    Sign in with Google
                </button>
                
                <div class="login-footer" style="margin-top: 16px; font-size: 0.85rem; color: var(--gray-500); text-align: center;">
                    Accounts are created by your Club Coordinator.
                </div>
                
                <div class="demo-info" style="margin-top: 8px;">
                    <i class="fas fa-info-circle"></i> Demo Teachers: teacher@demo.com / 123456
                </div>
            </div>
        </div>`;
    },
    
    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up login events...");
        var self = this;
        
        var teacherBtn = document.getElementById('loginRoleTeacher');
        var coordinatorBtn = document.getElementById('loginRoleCoordinator');
        var studentBtn = document.getElementById('loginRoleStudent');
        var coordinatorHint = document.getElementById('coordinatorHint');
        var studentHint = document.getElementById('studentHint');
        var loginBtn = document.getElementById('loginBtn');
        var googleBtn = document.getElementById('googleLoginBtn');
        var loginError = document.getElementById('loginError');
        
        // Helper to reset buttons
        var resetButtons = function() {
            var buttons = document.querySelectorAll('.role-selector');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.background = 'transparent';
                buttons[i].style.color = 'var(--gray-500)';
                buttons[i].style.boxShadow = 'none';
            }
            coordinatorHint.style.display = 'none';
            studentHint.style.display = 'none';
        };
        
        // ===== ROLE SELECTOR =====
        if (teacherBtn && coordinatorBtn && studentBtn) {
            teacherBtn.addEventListener('click', function() {
                console.log("🔄 Switching to Teacher role");
                resetButtons();
                this.style.background = 'var(--bg-primary)';
                this.style.color = 'var(--primary)';
                this.style.boxShadow = 'var(--shadow-soft)';
                
                loginBtn.innerHTML = '<i class="fas fa-chalkboard-teacher"></i> Sign in as Teacher';
                if (googleBtn) googleBtn.style.display = 'flex';
                
                document.getElementById('loginEmail').placeholder = 'Teacher school email';
                document.getElementById('loginEmail').value = 'teacher@demo.com';
                document.getElementById('loginPassword').value = '';
                if (loginError) loginError.textContent = '';
            });
            
            coordinatorBtn.addEventListener('click', function() {
                console.log("🔄 Switching to Coordinator role");
                resetButtons();
                this.style.background = 'var(--bg-primary)';
                this.style.color = 'var(--secondary)';
                this.style.boxShadow = 'var(--shadow-soft)';
                
                coordinatorHint.style.display = 'block';
                loginBtn.innerHTML = '<i class="fas fa-crown"></i> Sign in as Coordinator';
                if (googleBtn) googleBtn.style.display = 'none';
                
                document.getElementById('loginEmail').placeholder = 'Coordinator email';
                document.getElementById('loginEmail').value = 'admin@csl.com';
                document.getElementById('loginPassword').value = '';
                if (loginError) loginError.textContent = '';
            });
            
            studentBtn.addEventListener('click', function() {
                console.log("🔄 Switching to Student role");
                resetButtons();
                this.style.background = 'var(--bg-primary)';
                this.style.color = 'var(--success)';
                this.style.boxShadow = 'var(--shadow-soft)';
                
                studentHint.style.display = 'block';
                loginBtn.innerHTML = '<i class="fas fa-user-graduate"></i> Sign in as Student';
                if (googleBtn) googleBtn.style.display = 'none';
                
                document.getElementById('loginEmail').placeholder = 'Student school email';
                document.getElementById('loginEmail').value = 'student@demo.com';
                document.getElementById('loginPassword').value = '';
                if (loginError) loginError.textContent = '';
            });
        }
        
        // ===== LOGIN BUTTON =====
        if (loginBtn) {
            loginBtn.addEventListener('click', async function() {
                var email = document.getElementById('loginEmail').value.trim();
                var password = document.getElementById('loginPassword').value;
                var errorEl = document.getElementById('loginError');
                
                console.log("🔐 Login attempt with email:", email);
                
                // Check which role is selected
                var isCoordinator = coordinatorBtn && coordinatorBtn.style.color === 'var(--secondary)';
                var isStudent = studentBtn && studentBtn.style.color === 'var(--success)';
                
                console.log("📌 Role selected:", isCoordinator ? 'Coordinator' : (isStudent ? 'Student' : 'Teacher'));
                
                if (!email || !password) {
                    errorEl.textContent = '⚠️ Please enter both email and password';
                    return;
                }
                
                try {
                    errorEl.textContent = '⏳ Logging in...';
                    
                    // ================= COORDINATOR LOGIN =================
                    if (isCoordinator) {
                        console.log("🔑 Attempting Coordinator login...");
                        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
                        
                        var admin = admins.find(function(a) { return a.email === email; });
                        
                        if (admin && admin.password === password) {
                            console.log("✅ Coordinator login successful!");
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
                            console.log("❌ Coordinator login failed - invalid credentials");
                            errorEl.textContent = '❌ Invalid coordinator credentials. Please try again.';
                            return;
                        }
                    }
                    
                    // ================= STUDENT LOGIN =================
                    else if (isStudent) {
                        console.log("🔑 Attempting Student login...");
                        var students = JSON.parse(localStorage.getItem('students') || '[]');
                        
                        var student = students.find(function(s) { return s.email === email; });
                        
                        if (student && student.password === password) {
                            console.log("✅ Student login successful!");
                            var user = {
                                email: email,
                                uid: 'student-' + Date.now(),
                                displayName: student.name || 'Student',
                                userType: 'student',
                                isAdmin: false
                            };
                            sessionStorage.setItem('mockUser', JSON.stringify(user));
                            localStorage.setItem('mockUser', JSON.stringify(user));
                            errorEl.textContent = '';
                            window.app.currentUser = user;
                            window.app.showMainApp(user); 
                            return;
                        } else {
                            console.log("❌ Student login failed - invalid credentials");
                            errorEl.textContent = '❌ Invalid student credentials. Ask your coordinator for your account.';
                            return;
                        }
                    }
                    
                    // ================= TEACHER LOGIN =================
                    else {
                        console.log("🔑 Attempting Teacher login...");
                        // Try Firebase first
                        try {
                            var user = await window.Auth.login(email, password);
                            console.log("✅ Teacher login successful!");
                            errorEl.textContent = '';
                            window.app.showMainApp(user);
                            return;
                        } catch (firebaseError) {
                            // Fall back to localStorage 'teachers' list
                            var teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
                            var teacher = teachers.find(function(t) { return t.email === email && t.password === password; });
                            
                            if (teacher) {
                                console.log("✅ Local Teacher login successful!");
                                var localUser = {
                                    email: email,
                                    uid: 'teacher-' + Date.now(),
                                    displayName: teacher.name || 'Teacher',
                                    userType: 'teacher',
                                    isAdmin: false
                                };
                                sessionStorage.setItem('mockUser', JSON.stringify(localUser));
                                localStorage.setItem('mockUser', JSON.stringify(localUser));
                                errorEl.textContent = '';
                                window.app.currentUser = localUser;
                                window.app.showMainApp(localUser);
                                return;
                            }
                            
                            // If no teacher found locally
                            console.log("❌ Teacher login failed");
                            errorEl.textContent = '❌ Invalid teacher credentials. Ask your coordinator for your account.';
                        }
                    }
                } catch (error) {
                    console.error("❌ Login error:", error);
                    errorEl.textContent = '❌ ' + error.message;
                }
            });
        }
        
        // ===== GOOGLE SIGN-IN =====
        if (googleBtn) {
            googleBtn.addEventListener('click', async function() {
                var errorEl = document.getElementById('loginError');
                try {
                    errorEl.textContent = '⏳ Signing in with Google...';
                    var user = await window.Auth.loginWithGoogle();
                    errorEl.textContent = '';
                    window.app.showMainApp(user);
                } catch (error) {
                    console.error("❌ Google login error:", error);
                    errorEl.textContent = '❌ ' + error.message;
                }
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
