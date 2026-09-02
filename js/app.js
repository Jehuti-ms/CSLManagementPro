// ============================================================
// js/app.js - MAIN APP CONTROLLER (CLEAN VERSION)
// ============================================================

class App {
    constructor() {
        console.log("🚀 App constructor called");
        this.currentUser = null;
        this.currentPage = 'attendance';
        this.init();
    }
    
    init() {
        console.log("📱 App initializing...");
        this.setupNavigation();
        this.showLogin();
        this.setupAuthListener();
        console.log("✅ App initialized successfully");
    }
    
    setupAuthListener() {
        console.log("👤 Setting up auth listener...");
        
        window.Auth.onAuthStateChanged((user) => {
            console.log("👤 Auth state changed:", user ? user.email : 'No user');
            if (user) {
                this.currentUser = user;
                this.showMainApp(user);
            }
        });
        
        // Check for mock user
        if (window.__firebase && window.__firebase.useMock) {
            const mockUser = sessionStorage.getItem('mockUser');
            if (mockUser) {
                try {
                    const user = JSON.parse(mockUser);
                    this.currentUser = user;
                    this.showMainApp(user);
                } catch (e) {
                    console.warn("⚠️ Could not parse mock user:", e);
                }
            }
        }
    }
    
    setupNavigation() {
        console.log("🔧 Setting up navigation...");
        
        const tabs = document.querySelectorAll('.nav-tab');
        console.log("📑 Found " + tabs.length + " navigation tabs");
        
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                const page = this.dataset.page;
                console.log("📄 Navigating to: " + page);
                window.app.navigateTo(page);
            });
        });
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                console.log("🚪 Logging out...");
                window.Auth.logout().then(function() {
                    window.app.currentUser = null;
                    window.app.showLogin();
                }).catch(function(error) {
                    console.error("❌ Logout error:", error);
                });
            });
        }
    }
    
    showLogin() {
        console.log("📄 Showing login page...");
        var container = document.getElementById('pageContainer');
        
        if (!container) {
            console.error("❌ pageContainer not found!");
            return;
        }
        
        if (!window.LoginPage) {
            console.error("❌ LoginPage not loaded!");
            container.innerHTML = '<div style="padding:40px;text-align:center;color:red;">' +
                '<h2>Error: LoginPage not loaded</h2>' +
                '<p>Check that login.js is loaded properly.</p>' +
                '</div>';
            return;
        }
        
        try {
            container.innerHTML = window.LoginPage.render();
            console.log("✅ Login page rendered");
            
            document.getElementById('navTabs').style.display = 'none';
            document.getElementById('userBadge').style.display = 'none';
            
            setTimeout(function() {
                console.log("🔧 Setting up login events...");
                if (window.LoginPage.setupEvents) {
                    window.LoginPage.setupEvents();
                }
            }, 100);
            
        } catch (error) {
            console.error("❌ Error rendering login:", error);
            container.innerHTML = '<div style="padding:40px;text-align:center;color:red;">' +
                '<h2>Error: ' + error.message + '</h2>' +
                '</div>';
        }
    }
    
    showMainApp(user) {
        console.log("📄 Showing main app...");
        
        document.getElementById('navTabs').style.display = 'flex';
        document.getElementById('userBadge').style.display = 'flex';
        
        var userEmail = document.getElementById('userEmail');
        if (userEmail) {
            userEmail.textContent = user.displayName || user.email || 'Teacher';
        }
        
        this.navigateTo('attendance');
    }
    
    navigateTo(pageId) {
        console.log("🧭 Navigating to: " + pageId);
        this.currentPage = pageId;
        
        var container = document.getElementById('pageContainer');
        if (!container) {
            console.error("❌ pageContainer not found!");
            return;
        }
        
        // Update nav tabs
        var tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(function(tab) {
            if (tab.dataset.page === pageId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Render the page
        var html = '';
        try {
            switch (pageId) {
                case 'attendance':
                    html = window.AttendancePage ? window.AttendancePage.render() : '<p>Attendance page not loaded</p>';
                    break;
                case 'tracker':
                    html = window.TrackerPage ? window.TrackerPage.render() : '<p>Tracker page not loaded</p>';
                    break;
                case 'reflections':
                    html = window.ReflectionsPage ? window.ReflectionsPage.render() : '<p>Reflections page not loaded</p>';
                    break;
                case 'admin':
                    html = window.AdminPage ? window.AdminPage.render() : '<p>Admin page not loaded</p>';
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
        var self = this;
        setTimeout(function() {
            try {
                switch (pageId) {
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
                    case 'admin':
                        if (window.AdminPage && typeof window.AdminPage.setupEvents === 'function') {
                            window.AdminPage.setupEvents();
                        }
                        break;
                }
            } catch (error) {
                console.error("❌ Error setting up events for " + pageId + ":", error);
            }
        }, 200);
    }
}

// Start the app
console.log("🚀 Starting app...");
window.app = new App();
