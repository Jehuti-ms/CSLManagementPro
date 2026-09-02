// ============================================================
// js/app.js - MAIN APP CONTROLLER
// ============================================================

var App = function() {
    console.log("🚀 App constructor called");
    this.currentUser = null;
    this.currentPage = 'attendance';
    this.init();
};

App.prototype.init = function() {
    console.log("📱 App initializing...");
    this.setupNavigation();
    this.showLogin();
    this.setupAuthListener();
    console.log("✅ App initialized successfully");
};

App.prototype.setupAuthListener = function() {
    console.log("👤 Setting up auth listener...");
    var self = this;
    
    window.Auth.onAuthStateChanged(function(user) {
        console.log("👤 Auth state changed:", user ? user.email : 'No user');
        if (user) {
            self.currentUser = user;
            self.showMainApp(user);
        }
    });
    
    if (window.__firebase && window.__firebase.useMock) {
        var mockUser = sessionStorage.getItem('mockUser');
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
};

App.prototype.setupNavigation = function() {
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
            window.Auth.logout().then(function() {
                self.currentUser = null;
                self.showLogin();
            }).catch(function(error) {
                console.error("❌ Logout error:", error);
            });
        });
    }
};

App.prototype.showLogin = function() {
    console.log("📄 Showing login page...");
    var container = document.getElementById('pageContainer');
    
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
        container.innerHTML = window.LoginPage.render();
        console.log("✅ Login page rendered");
        
        document.getElementById('navTabs').style.display = 'none';
        document.getElementById('userBadge').style.display = 'none';
        
        var self = this;
        setTimeout(function() {
            console.log("🔧 Setting up login events...");
            if (window.LoginPage.setupEvents) {
                window.LoginPage.setupEvents();
            }
        }, 100);
        
    } catch (error) {
        console.error("❌ Error rendering login:", error);
        container.innerHTML = '<div style="padding:40px;text-align:center;color:red;"><h2>Error: ' + error.message + '</h2></div>';
    }
};

App.prototype.showMainApp = function(user) {
    console.log("📄 Showing main app...");
    
    document.getElementById('navTabs').style.display = 'flex';
    document.getElementById('userBadge').style.display = 'flex';
    
    var userEmail = document.getElementById('userEmail');
    if (userEmail) {
        userEmail.textContent = user.displayName || user.email || 'Teacher';
    }
    
    this.navigateTo('attendance');
};

App.prototype.navigateTo = function(pageId) {
    console.log("🧭 Navigating to: " + pageId);
    this.currentPage = pageId;
    var self = this;
    
    var container = document.getElementById('pageContainer');
    if (!container) {
        console.error("❌ pageContainer not found!");
        return;
    }
    
    var tabs = document.querySelectorAll('.nav-tab');
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].dataset.page === pageId) {
            tabs[i].classList.add('active');
        } else {
            tabs[i].classList.remove('active');
        }
    }
    
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
};

// Start the app
console.log("🚀 Starting app...");
window.app = new App();
