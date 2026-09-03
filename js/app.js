// ============================================================
// js/app.js - MAIN APP CONTROLLER (NO ES6, PURE JS)
// ============================================================

console.log("🚀 Starting app...");

// App object
var App = {
    currentUser: null,
    currentPage: 'landing',
    
    init: function() {
        console.log("📱 App initializing...");
        this.setupNavigation();
        this.navigateTo('landing');  // Show landing page first
        this.setupAuthListener();
        console.log("✅ App initialized successfully");
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
        
        // Check for mock user
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
                    
                    // If clicking Admin tab and not logged in as admin, show admin login
                    if (page === 'admin' && !self.currentUser) {
                        self.navigateTo('adminlogin');
                        return;
                    }
                    
                    // If clicking Admin Profile and not logged in as admin, show admin login
                    if (page === 'adminprofile' && !self.currentUser) {
                        self.navigateTo('adminlogin');
                        return;
                    }
                    
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
                        // Remove login overlay if present
                        var overlay = document.getElementById('loginOverlay');
                        if (overlay) overlay.remove();
                        self.navigateTo('landing');
                    }).catch(function(error) {
                        console.error("❌ Logout error:", error);
                    });
                }
            });
        }
    },
    
    showLogin: function() {
        console.log("📄 Showing login page...");
        
        // Check if login overlay already exists
        var existingOverlay = document.getElementById('loginOverlay');
        if (existingOverlay) {
            existingOverlay.style.display = 'flex';
            return;
        }
        
        // Navigate to landing page if not already there
        if (this.currentPage !== 'landing') {
            this.navigateTo('landing');
        }
        
        var container = document.getElementById('pageContainer');
        if (!container) {
            console.error("❌ pageContainer not found!");
            return;
        }
        
        if (!window.LoginPage) {
            console.error("❌ LoginPage not loaded!");
            return;
        }
        
        // Create login overlay
        var loginOverlay = document.createElement('div');
        loginOverlay.id = 'loginOverlay';
        loginOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(8px);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;
        
        var loginHTML = window.LoginPage.render();
        loginOverlay.innerHTML = loginHTML;
        document.body.appendChild(loginOverlay);
        
        // Setup login events
        var self = this;
        setTimeout(function() {
            console.log("🔧 Setting up login events...");
            if (window.LoginPage && window.LoginPage.setupEvents) {
                window.LoginPage.setupEvents();
            }
        }, 100);
    },
    
    showMainApp: function(user) {
        console.log("📄 Showing main app...");
        
        // Remove login overlay if present
        var overlay = document.getElementById('loginOverlay');
        if (overlay) overlay.remove();
        
        // Show navigation and user badge
        var navTabs = document.getElementById('navTabs');
        var userBadge = document.getElementById('userBadge');
        if (navTabs) navTabs.style.display = 'flex';
        if (userBadge) userBadge.style.display = 'flex';
        
        // Update user email
        var userEmail = document.getElementById('userEmail');
        if (userEmail) {
            userEmail.textContent = user.displayName || user.email || 'Teacher';
        }
        
        // Check if user is admin/coordinator
        if (user.isAdmin || user.userType === 'coordinator') {
            // Show admin badge in user badge
            var badge = document.querySelector('.user-badge .admin-badge');
            if (!badge) {
                var badgeElement = document.createElement('span');
                badgeElement.className = 'admin-badge';
                badgeElement.style.cssText = `
                    background: var(--secondary);
                    color: white;
                    padding: 1px 10px;
                    border-radius: var(--radius-full);
                    font-size: 0.6rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                `;
                badgeElement.textContent = 'Coordinator';
                var userBadgeEl = document.getElementById('userBadge');
                if (userBadgeEl) {
                    var emailSpan = userBadgeEl.querySelector('span');
                    if (emailSpan) {
                        emailSpan.after(badgeElement);
                    }
                }
            }
        }
        
        // Check if this is first login and password is default
        this.checkFirstLogin(user);
        
        // Navigate to attendance page
        this.navigateTo('attendance');
    },
    
    checkFirstLogin: function(user) {
        // Check if this is a coordinator with default password
        if (user.isAdmin || user.userType === 'coordinator') {
            var admins = JSON.parse(localStorage.getItem('admins') || '[]');
            var admin = admins.find(function(a) { return a.email === user.email; });
            
            if (admin && admin.password === 'admin123') {
                // First login - show notification
                setTimeout(function() {
                    var notification = document.createElement('div');
                    notification.style.cssText = `
                        position: fixed;
                        bottom: 24px;
                        right: 24px;
                        background: var(--bg-primary);
                        border: 1px solid var(--secondary);
                        border-radius: var(--radius-lg);
                        padding: 20px 24px;
                        box-shadow: var(--shadow-heavy);
                        z-index: 100000;
                        max-width: 400px;
                        animation: modalSlideIn 0.3s ease;
                        border-left: 4px solid var(--secondary);
                    `;
                    notification.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <i class="fas fa-shield-alt" style="color: var(--secondary); font-size: 1.4rem;"></i>
                            <div>
                                <div style="font-weight: 600; color: var(--primary);">Welcome, ${user.displayName || 'Coordinator'}!</div>
                                <div style="font-size: 0.85rem; color: var(--gray-500);">
                                    Please change your default password in the <a href="#" onclick="window.app.navigateTo('adminprofile'); this.closest('div').remove();" style="color: var(--secondary); font-weight: 600; text-decoration: none;">Profile</a> section.
                                </div>
                            </div>
                            <button onclick="this.closest('div').remove()" style="background: none; border: none; font-size: 1.2rem; color: var(--gray-400); cursor: pointer; padding: 4px;">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `;
                    document.body.appendChild(notification);
                    
                    // Auto-remove after 10 seconds
                    setTimeout(function() {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 10000);
                }, 1500);
            }
        }
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
        
        // Show/hide nav tabs and user badge based on page
        var navTabs = document.getElementById('navTabs');
        var userBadge = document.getElementById('userBadge');
        var isLoggedIn = this.currentUser !== null;
        
        // Handle nav visibility
        if (pageId === 'landing' || pageId === 'adminlogin') {
            if (navTabs) navTabs.style.display = 'none';
            if (userBadge) userBadge.style.display = 'none';
        } else if (isLoggedIn) {
            if (navTabs) navTabs.style.display = 'flex';
            if (userBadge) userBadge.style.display = 'flex';
        }
        
        // Update active tab
        var tabs = document.querySelectorAll('.nav-tab');
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].dataset.page === pageId) {
                tabs[i].classList.add('active');
            } else {
                tabs[i].classList.remove('active');
            }
        }
        
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
                case 'adminlogin':
                    if (window.AdminLoginPage && typeof window.AdminLoginPage.render === 'function') {
                        html = window.AdminLoginPage.render();
                        console.log("✅ Admin Login HTML generated");
                    } else {
                        html = '<p>Admin Login page not loaded</p>';
                        console.error("❌ AdminLoginPage not available");
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
                default:
                    html = '<p>Page not found</p>';
            }
        } catch (error) {
            console.error("❌ Error rendering " + pageId + ":", error);
            html = '<p>Error: ' + error.message + '</p>';
        }
        
        container.innerHTML = html;
        console.log("✅ Page rendered: " + pageId);
        
        // Setup page events
        setTimeout(function() {
            try {
                switch (pageId) {
                    case 'landing':
                        if (window.LandingPage && typeof window.LandingPage.setupEvents === 'function') {
                            window.LandingPage.setupEvents();
                        }
                        break;
                    case 'adminlogin':
                        if (window.AdminLoginPage && typeof window.AdminLoginPage.setupEvents === 'function') {
                            window.AdminLoginPage.setupEvents();
                        }
                        break;
                    case 'adminprofile':
                        if (window.AdminProfilePage && typeof window.AdminProfilePage.setupEvents === 'function') {
                            console.log("🔧 Setting up admin profile events...");
                            window.AdminProfilePage.setupEvents();
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
