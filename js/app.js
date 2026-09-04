// ============================================================
// js/app.js - MAIN APP CONTROLLER (WITH LANDING PAGE & MOBILE)
// ============================================================

console.log("🚀 Starting app...");

// App object
var App = {
    currentUser: null,
    currentPage: 'landing',
    toastTimeout: null,
    isMenuOpen: false,
    
    init: function() {
        console.log("📱 App initializing...");
        
        // ===== INITIALIZE DEFAULT ADMIN =====
        this.initializeDefaultAdmin();
        
        this.setupNavigation();
        this.setupMobileNavigation();
        this.showLogin();
        this.setupAuthListener();
        console.log("✅ App initialized successfully");
    },
    
    // ----- INITIALIZE DEFAULT ADMIN -----
    initializeDefaultAdmin: function() {
        console.log("🔐 Checking for admin accounts...");
        
        try {
            var admins = [];
            var adminsData = localStorage.getItem('admins');
            
            if (adminsData) {
                try {
                    admins = JSON.parse(adminsData);
                } catch (e) {
                    console.warn("⚠️ Could not parse admins data, resetting");
                    admins = [];
                }
            }
            
            console.log("📋 Current admins count:", admins.length);
            
            var adminExists = false;
            for (var i = 0; i < admins.length; i++) {
                if (admins[i].email === 'admin@csl.com') {
                    adminExists = true;
                    break;
                }
            }
            
            if (!adminExists) {
                var defaultAdmin = {
                    id: 'admin-1',
                    email: 'admin@csl.com',
                    name: 'Club Coordinator',
                    password: 'admin123',
                    isPrimary: true,
                    created: Date.now()
                };
                
                var cleanAdmins = admins.filter(function(a) {
                    return a.email && a.password;
                });
                cleanAdmins.push(defaultAdmin);
                
                try {
                    localStorage.setItem('admins', JSON.stringify(cleanAdmins));
                    console.log("✅ Default admin created: admin@csl.com / admin123");
                } catch (e) {
                    console.warn("⚠️ Could not save admin to localStorage:", e);
                    localStorage.removeItem('admins');
                    localStorage.setItem('admins', JSON.stringify([defaultAdmin]));
                    console.log("✅ Default admin re-created");
                }
            } else {
                console.log("✅ Admin already exists");
            }
            
        } catch (error) {
            console.error("❌ Admin initialization error:", error);
            try {
                localStorage.removeItem('admins');
                var defaultAdmin = {
                    id: 'admin-1',
                    email: 'admin@csl.com',
                    name: 'Club Coordinator',
                    password: 'admin123',
                    isPrimary: true,
                    created: Date.now()
                };
                localStorage.setItem('admins', JSON.stringify([defaultAdmin]));
                console.log("✅ Admin re-created after error");
            } catch (e) {
                console.error("❌ Could not recover admin:", e);
            }
        }
    },
    
    setupAuthListener: function() {
        console.log("👤 Setting up auth listener...");
        var self = this;
        
        if (window.Auth && window.Auth.onAuthStateChanged) {
            window.Auth.onAuthStateChanged(function(user) {
                console.log("👤 Auth state changed:", user ? user.email : 'No user');
                if (user) {
                    self.currentUser = user;
                    self.showMainApp(user);
                }
            });
        }
        
        if (window.__firebase && window.__firebase.useMock) {
            var mockUser = localStorage.getItem('mockUser') || sessionStorage.getItem('mockUser');
            if (mockUser) {
                try {
                    var user = JSON.parse(mockUser);
                    self.currentUser = user;
                    self.showMainApp(user);
                } catch (e) {
                    console.warn("⚠️ Could not parse mock user:", e);
                }
            }
        }
    },
    
    setupNavigation: function() {
        console.log("🔧 Setting up navigation...");
        var self = this;
        
        var tabs = document.querySelectorAll('.nav-tab');
        console.log("📑 Found " + tabs.length + " navigation tabs");
        
        for (var i = 0; i < tabs.length; i++) {
            (function(tab) {
                tab.addEventListener('click', function() {
                    var page = this.dataset.page;
                    console.log("📄 Navigating to: " + page);
                    self.navigateTo(page);
                });
            })(tabs[i]);
        }
        
        var logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                console.log("🚪 Logging out...");
                if (window.Auth && window.Auth.logout) {
                    window.Auth.logout().then(function() {
                        self.currentUser = null;
                        self.showLogin();
                    }).catch(function(error) {
                        console.error("❌ Logout error:", error);
                    });
                }
            });
        }
    },
    
    // ============================================================
    // MOBILE NAVIGATION - HAMBURGER MENU
    // ============================================================
    setupMobileNavigation: function() {
        console.log("📱 Setting up mobile navigation...");
        var self = this;
        
        var menuToggle = document.getElementById('mobileMenuToggle');
        var navTabs = document.getElementById('navTabs');
        var overlay = document.getElementById('mobileOverlay');
        
        if (menuToggle) {
            menuToggle.removeEventListener('click', menuToggle._toggleHandler);
            
            var toggleHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                self.isMenuOpen = !self.isMenuOpen;
                
                if (navTabs) {
                    navTabs.classList.toggle('open');
                }
                
                if (overlay) {
                    overlay.classList.toggle('active');
                }
                
                var icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
                
                if (self.isMenuOpen) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            };
            
            menuToggle._toggleHandler = toggleHandler;
            menuToggle.addEventListener('click', toggleHandler);
        }
        
        if (overlay) {
            overlay.removeEventListener('click', overlay._closeHandler);
            
            var closeHandler = function(e) {
                self.closeMobileMenu();
            };
            
            overlay._closeHandler = closeHandler;
            overlay.addEventListener('click', closeHandler);
        }
        
        document.addEventListener('click', function(e) {
            if (self.isMenuOpen) {
                var menuToggle = document.getElementById('mobileMenuToggle');
                var navTabs = document.getElementById('navTabs');
                if (navTabs && !navTabs.contains(e.target) && !menuToggle?.contains(e.target)) {
                    self.closeMobileMenu();
                }
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && self.isMenuOpen) {
                self.closeMobileMenu();
            }
        });
    },
    
    // Helper to close mobile menu
    closeMobileMenu: function() {
        this.isMenuOpen = false;
        
        var navTabs = document.getElementById('navTabs');
        var overlay = document.getElementById('mobileOverlay');
        var menuToggle = document.getElementById('mobileMenuToggle');
        
        if (navTabs) navTabs.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        
        if (menuToggle) {
            var icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        document.body.style.overflow = '';
    },
    
    // ----- SHOW TOAST MESSAGE (Mobile) -----
    showToast: function(message, type) {
        var toast = document.getElementById('mobileToast');
        var toastMessage = document.getElementById('toastMessage');
        if (!toast || !toastMessage) return;
        
        toast.className = 'toast-mobile';
        if (type) toast.classList.add(type);
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    },
    
    showLogin: function() {
        console.log("📄 Showing login page...");
        var container = document.getElementById('pageContainer');
        
        // Hide mobile bottom nav
        var bottomNav = document.getElementById('mobileBottomNav');
        if (bottomNav) bottomNav.style.display = 'none';
        
        if (!container) {
            console.error("❌ pageContainer not found!");
            return;
        }
        
        if (!window.LoginPage) {
            console.error("❌ LoginPage not loaded!");
            container.innerHTML = '<div style="padding:40px;text-align:center;color:red;"><h2>Error: LoginPage not loaded</h2><p>Check that login.js is loaded properly.</p></div>';
            return;
        }
        
        try {
            console.log("📄 Calling LoginPage.render()...");
            var loginHTML = window.LoginPage.render();
            console.log("📄 Login HTML length:", loginHTML.length);
            container.innerHTML = loginHTML;
            console.log("✅ Login page rendered");
            
            var navTabs = document.getElementById('navTabs');
            var userBadge = document.getElementById('userBadge');
            if (navTabs) navTabs.style.display = 'none';
            if (userBadge) userBadge.style.display = 'none';
            
            var self = this;
            setTimeout(function() {
                console.log("🔧 Setting up login events...");
                if (window.LoginPage && window.LoginPage.setupEvents) {
                    window.LoginPage.setupEvents();
                }
            }, 100);
            
        } catch (error) {
            console.error("❌ Error rendering login:", error);
            container.innerHTML = '<div style="padding:40px;text-align:center;color:red;"><h2>Error: ' + error.message + '</h2></div>';
        }
    },
    
    // ============================================================
    // DYNAMIC BOTTOM NAVIGATION (Updated: Coordinator sees all)
    // ============================================================
    setupMobileBottomNav: function(user) {
        console.log("📱 Setting up dynamic mobile bottom nav...");
        var container = document.getElementById('mobileNavItems');
        if (!container) return;
        
        // Determine role
        var isCoordinator = user.email === 'admin@csl.com' || user.role === 'coordinator' || user.role === 'admin';
        var isStudent = user.role === 'student' || user.email === 'student@csl.com'; 

        var navHTML = '';

        // 1. STUDENT ROLE: Only sees Student page
        if (isStudent) {
            navHTML = `
                <button class="nav-item" data-page="student">
                    <i class="fas fa-user-graduate"></i>
                    <span>Student</span>
                </button>
            `;
        } 
        // 2. TEACHER ROLE: Sees all pages EXCEPT Admin
        else if (!isCoordinator) {
            navHTML = `
                <button class="nav-item" data-page="student">
                    <i class="fas fa-user-graduate"></i>
                    <span>Student</span>
                </button>
                <button class="nav-item" data-page="attendance">
                    <i class="fas fa-clipboard-list"></i>
                    <span>Attendance</span>
                </button>
                <button class="nav-item" data-page="tracker">
                    <i class="fas fa-chart-line"></i>
                    <span>Tracker</span>
                </button>
                <button class="nav-item" data-page="reflections">
                    <i class="fas fa-comment-dots"></i>
                    <span>Reflect</span>
                </button>
            `;
        } 
        // 3. COORDINATOR ROLE: Sees EVERYTHING (Student, Attendance, Tracker, Reflect, Admin)
        else {
            navHTML = `
                <button class="nav-item" data-page="student">
                    <i class="fas fa-user-graduate"></i>
                    <span>Student</span>
                </button>
                <button class="nav-item" data-page="attendance">
                    <i class="fas fa-clipboard-list"></i>
                    <span>Attendance</span>
                </button>
                <button class="nav-item" data-page="tracker">
                    <i class="fas fa-chart-line"></i>
                    <span>Tracker</span>
                </button>
                <button class="nav-item" data-page="reflections">
                    <i class="fas fa-comment-dots"></i>
                    <span>Reflect</span>
                </button>
                <button class="nav-item" data-page="admin">
                    <i class="fas fa-cog"></i>
                    <span>Manage</span>
                </button>
            `;
        }
        
        // Inject HTML
        container.innerHTML = navHTML;
        
        // Attach click events to the new buttons
        var self = this;
        var bottomNavItems = container.querySelectorAll('.nav-item');
        bottomNavItems.forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var page = this.dataset.page;
                self.closeMobileMenu();
                if (page) {
                    self.navigateTo(page);
                }
            });
        });
        
        // Show the bottom nav
        document.getElementById('mobileBottomNav').style.display = 'block';
    },
    
    showMainApp: function(user) {
        console.log("📄 Showing main app...");
        
        // Show mobile bottom nav
        var bottomNav = document.getElementById('mobileBottomNav');
        if (bottomNav) bottomNav.style.display = 'block';
        
        // Setup the dynamic bottom nav based on the user's role
        this.setupMobileBottomNav(user);
        
        var navTabs = document.getElementById('navTabs');
        var userBadge = document.getElementById('userBadge');
        if (navTabs) navTabs.style.display = 'flex';
        if (userBadge) userBadge.style.display = 'flex';
        
        var userEmail = document.getElementById('userEmail');
        if (userEmail) {
            userEmail.textContent = user.displayName || user.email || 'Teacher';
        }
        
        this.navigateTo('attendance');
    },
    
    // ============================================================
    // NAVIGATE TO
    // ============================================================
    navigateTo: function(pageId) {
        console.log("🧭 Navigating to: " + pageId);
        this.currentPage = pageId;
        var self = this;
        
        var container = document.getElementById('pageContainer');
        if (!container) return;
        
        // Close mobile menu if open
        this.closeMobileMenu();
        
        // Update nav tabs (desktop)
        var tabs = document.querySelectorAll('.nav-tab');
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].dataset.page === pageId) {
                tabs[i].classList.add('active');
            } else {
                tabs[i].classList.remove('active');
            }
        }
        
        // Show/hide nav based on page
        var navTabs = document.getElementById('navTabs');
        var userBadge = document.getElementById('userBadge');
        var isLoggedIn = this.currentUser !== null;
        
        // For landing page, hide nav and user badge
        if (pageId === 'landing') {
            if (navTabs) navTabs.style.display = 'none';
            if (userBadge) userBadge.style.display = 'none';
        } else if (isLoggedIn) {
            if (navTabs) navTabs.style.display = 'flex';
            if (userBadge) userBadge.style.display = 'flex';
        }

        // Update mobile bottom nav active state
        var bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
        bottomNavItems.forEach(function(item) {
            var itemPage = item.dataset.page;
            item.classList.remove('active');
            if (itemPage === pageId) {
                item.classList.add('active');
            }
        });
        
        // Render the page
        var html = '';
        try {
            switch (pageId) {
                case 'landing':
                    html = window.LandingPage ? window.LandingPage.render() : '<p>Landing page not loaded</p>';
                    break;
                case 'attendance':
                    html = window.AttendancePage ? window.AttendancePage.render() : '<p>Attendance page not loaded</p>';
                    break;
                case 'tracker':
                    html = window.TrackerPage ? window.TrackerPage.render() : '<p>Tracker page not loaded</p>';
                    break;
                case 'reflections':
                    html = window.ReflectionsPage ? window.ReflectionsPage.render() : '<p>Reflections page not loaded</p>';
                    break;
                case 'student':
                    html = window.StudentPage ? window.StudentPage.render() : '<p>Student page not loaded</p>';
                    break;
                case 'admin':
                    html = window.AdminPage ? window.AdminPage.render() : '<p>Admin page not loaded</p>';
                    break;
                case 'adminprofile':
                    html = window.AdminProfilePage ? window.AdminProfilePage.render() : '<p>Admin Profile page not loaded</p>';
                    break;
                default:
                    html = '<p>Page not found</p>';
            }
        } catch (error) {
            console.error("❌ Error rendering " + pageId + ":", error);
            html = '<p>Error: ' + error.message + '</p>';
        }
        
        container.innerHTML = html;
        console.log("✅ Page rendered: " + pageId);
        
        setTimeout(function() {
            try {
                switch (pageId) {
                    case 'landing': if (window.LandingPage && window.LandingPage.setupEvents) window.LandingPage.setupEvents(); break;
                    case 'attendance': if (window.AttendancePage && window.AttendancePage.setupEvents) window.AttendancePage.setupEvents(); break;
                    case 'tracker': if (window.TrackerPage && window.TrackerPage.setupEvents) window.TrackerPage.setupEvents(); break;
                    case 'reflections': if (window.ReflectionsPage && window.ReflectionsPage.setupEvents) window.ReflectionsPage.setupEvents(); break;
                    case 'student': if (window.StudentPage && window.StudentPage.setupEvents) window.StudentPage.setupEvents(); break;
                    case 'admin': if (window.AdminPage && window.AdminPage.setupEvents) window.AdminPage.setupEvents(); break;
                    case 'adminprofile': if (window.AdminProfilePage && window.AdminProfilePage.setupEvents) window.AdminProfilePage.setupEvents(); break;
                    default: console.warn("⚠️ Unknown page: " + pageId);
                }
            } catch (error) {
                console.error("❌ Error setting up events for " + pageId + ":", error);
            }
        }, 200);
    }
};

// Start the app
window.app = App;
App.init();
