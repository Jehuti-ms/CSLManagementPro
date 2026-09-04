// ============================================================
// js/app.js - MAIN APP CONTROLLER (WITH LANDING PAGE & MOBILE)
// ============================================================

console.log("🚀 Starting app...");

// App object
var App = {
    currentUser: null,
    currentPage: 'landing',
    toastTimeout: null,
    
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
// MOBILE NAVIGATION
// ============================================================
setupMobileNavigation: function() {
    console.log("📱 Setting up mobile navigation...");
    var self = this;
    
    // Mobile menu toggle
    var menuToggle = document.getElementById('mobileMenuToggle');
    var navTabs = document.getElementById('navTabs');
    var overlay = document.getElementById('navOverlay');
    
    if (menuToggle && navTabs) {
        console.log("✅ Mobile menu toggle found");
        
        // Toggle menu on hamburger click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log("🔘 Menu toggle clicked");
            navTabs.classList.toggle('open');
            
            // Toggle icon
            var icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
            
            // Toggle overlay
            if (overlay) {
                overlay.classList.toggle('active');
            }
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navTabs.classList.contains('open') ? 'hidden' : '';
        });
    } else {
        console.warn("⚠️ Menu toggle or nav tabs not found");
    }
    
    // Close menu when clicking on a nav item
    var navItems = document.querySelectorAll('.nav-tab');
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            if (navTabs) {
                navTabs.classList.remove('open');
                var icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            if (navTabs) {
                navTabs.classList.remove('open');
                var icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navTabs && navTabs.classList.contains('open')) {
            navTabs.classList.remove('open');
            var icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            if (overlay) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    });
    
    // Mobile bottom navigation
    var bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
    bottomNavItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var page = this.dataset.page;
            console.log("📱 Mobile nav clicked:", page);
            
            // Close mobile menu if open
            if (navTabs) {
                navTabs.classList.remove('open');
                var icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
            
            self.navigateTo(page);
        });
    });
    
    // Close menu on window resize (if going back to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navTabs && navTabs.classList.contains('open')) {
            navTabs.classList.remove('open');
            var icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            if (overlay) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    });
    
    console.log("✅ Mobile navigation setup complete");
},
    
    // ----- SHOW TOAST MESSAGE (Mobile) -----
    showToast: function(message, type) {
        var toast = document.getElementById('mobileToast');
        var toastMessage = document.getElementById('toastMessage');
        if (!toast || !toastMessage) return;
        
        toast.className = 'toast-mobile';
        if (type) {
            toast.classList.add(type);
        }
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
        if (bottomNav) {
            bottomNav.style.display = 'none';
        }
        
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
    
    showMainApp: function(user) {
        console.log("📄 Showing main app...");

        // Show mobile bottom nav
        var bottomNav = document.getElementById('mobileBottomNav');
        if (bottomNav) {
            bottomNav.style.display = 'block';
        }
        
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
    
    navigateTo: function(pageId) {
        console.log("🧭 Navigating to: " + pageId);
        this.currentPage = pageId;
        var self = this;
        
        var container = document.getElementById('pageContainer');
        if (!container) {
            console.error("❌ pageContainer not found!");
            return;
        }
        
        // Update nav tabs
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
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Render the page
        var html = '';
        try {
            switch (pageId) {
                case 'landing':
                    if (window.LandingPage && typeof window.LandingPage.render === 'function') {
                        html = window.LandingPage.render();
                        console.log("✅ Landing HTML generated");
                    } else {
                        html = '<p>Landing page not loaded</p>';
                        console.error("❌ LandingPage not available");
                    }
                    break;
                case 'attendance':
                    if (window.AttendancePage && typeof window.AttendancePage.render === 'function') {
                        html = window.AttendancePage.render();
                        console.log("✅ Attendance HTML generated");
                    } else {
                        html = '<p>Attendance page not loaded</p>';
                    }
                    break;
                case 'tracker':
                    if (window.TrackerPage && typeof window.TrackerPage.render === 'function') {
                        html = window.TrackerPage.render();
                        console.log("✅ Tracker HTML generated");
                    } else {
                        html = '<p>Tracker page not loaded</p>';
                        console.error("❌ TrackerPage not available");
                    }
                    break;
                case 'reflections':
                    if (window.ReflectionsPage && typeof window.ReflectionsPage.render === 'function') {
                        html = window.ReflectionsPage.render();
                        console.log("✅ Reflections HTML generated");
                    } else {
                        html = '<p>Reflections page not loaded</p>';
                    }
                    break;
                case 'student':
                    if (window.StudentPage && typeof window.StudentPage.render === 'function') {
                        html = window.StudentPage.render();
                        console.log("✅ Student HTML generated");
                    } else {
                        html = '<p>Student page not loaded</p>';
                        console.error("❌ StudentPage not available");
                    }
                    break;
                case 'admin':
                    if (window.AdminPage && typeof window.AdminPage.render === 'function') {
                        html = window.AdminPage.render();
                        console.log("✅ Admin HTML generated");
                    } else {
                        html = '<p>Admin page not loaded</p>';
                    }
                    break;
                case 'adminprofile':
                    if (window.AdminProfilePage && typeof window.AdminProfilePage.render === 'function') {
                        html = window.AdminProfilePage.render();
                        console.log("✅ Admin Profile HTML generated");
                    } else {
                        html = '<p>Admin Profile page not loaded</p>';
                        console.error("❌ AdminProfilePage not available");
                    }
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
                    case 'landing':
                        if (window.LandingPage && typeof window.LandingPage.setupEvents === 'function') {
                            window.LandingPage.setupEvents();
                        }
                        break;
                    case 'attendance':
                        if (window.AttendancePage && typeof window.AttendancePage.setupEvents === 'function') {
                            window.AttendancePage.setupEvents();
                        }
                        break;
                    case 'tracker':
                        if (window.TrackerPage && typeof window.TrackerPage.setupEvents === 'function') {
                            console.log("🔧 Setting up tracker events...");
                            window.TrackerPage.setupEvents();
                        }
                        break;
                    case 'reflections':
                        if (window.ReflectionsPage && typeof window.ReflectionsPage.setupEvents === 'function') {
                            window.ReflectionsPage.setupEvents();
                        }
                        break;
                    case 'student':
                        if (window.StudentPage && typeof window.StudentPage.setupEvents === 'function') {
                            console.log("🔧 Setting up student events...");
                            window.StudentPage.setupEvents();
                        }
                        break;
                    case 'admin':
                        if (window.AdminPage && typeof window.AdminPage.setupEvents === 'function') {
                            window.AdminPage.setupEvents();
                        }
                        break;
                    case 'adminprofile':
                        if (window.AdminProfilePage && typeof window.AdminProfilePage.setupEvents === 'function') {
                            console.log("🔧 Setting up admin profile events...");
                            window.AdminProfilePage.setupEvents();
                        }
                        break;
                    default:
                        console.warn("⚠️ Unknown page: " + pageId);
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
