// ============================================================
// js/app.js - MAIN APP CONTROLLER (SIMPLIFIED & FIXED)
// ============================================================

class App {
    constructor() {
        console.log("🚀 App constructor called");
        this.currentUser = null;
        this.currentPage = 'attendance';
        
        // Start immediately
        this.init();
    }
    
    init() {
        console.log("📱 App initializing...");
        
        // Setup navigation
        this.setupNavigation();
        
        // Show login page immediately
        this.showLogin();
        
        // Setup auth listener
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
        console.log(`📑 Found ${tabs.length} navigation tabs`);
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const page = tab.dataset.page;
                console.log(`📄 Navigating to: ${page}`);
                this.navigateTo(page);
            });
        });
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                console.log("🚪 Logging out...");
                await window.Auth.logout();
                this.currentUser = null;
                this.showLogin();
            });
        }
    }
    
    showLogin() {
        console.log("📄 Showing login page...");
        const container = document.getElementById('pageContainer');
        
        if (!container) {
            console.error("❌ pageContainer not found!");
            return;
        }
        
        if (!window.LoginPage) {
            console.error("❌ LoginPage not loaded!");
            container.innerHTML = `<div style="padding:40px;text-align:center;color:red;">
                <h2>Error: LoginPage not loaded</h2>
                <p>Check that login.js is loaded properly.</p>
            </div>`;
            return;
        }
        
        try {
            // Render login page
            container.innerHTML = window.LoginPage.render();
            console.log("✅ Login page rendered");
            
            // Hide navigation and user badge
            document.getElementById('navTabs').style.display = 'none';
            document.getElementById('userBadge').style.display = 'none';
            
            // Setup login events
            setTimeout(() => {
                console.log("🔧 Setting up login events...");
                if (window.LoginPage.setupEvents) {
                    window.LoginPage.setupEvents();
                }
            }, 100);
            
        } catch (error) {
            console.error("❌ Error rendering login:", error);
            container.innerHTML = `<div style="padding:40px;text-align:center;color:red;">
                <h2>Error: ${error.message}</h2>
            </div>`;
        }
    }
    
    showMainApp(user) {
        console.log("📄 Showing main app...");
        
        // Show navigation and user badge
        document.getElementById('navTabs').style.display = 'flex';
        document.getElementById('userBadge').style.display = 'flex';
        
        // Update user email
        const userEmail = document.getElementById('userEmail');
        if (userEmail) {
            userEmail.textContent = user.displayName || user.email || 'Teacher';
        }
        
        // Load attendance page
        this.navigateTo('attendance');
    }
    
    navigateTo(pageId) {
        console.log(`🧭 Navigating to: ${pageId}`);
        this.currentPage = pageId;
        
        const container = document.getElementById('pageContainer');
        if (!container) {
            console.error("❌ pageContainer not found!");
            return;
        }
        
        // Update nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.page === pageId);
        });
        
        // Render the page
        let html = '';
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
            console.error(`❌ Error rendering ${pageId}:`, error);
            html = `<p>Error: ${error.message}</p>`;
        }
        
        container.innerHTML = html;
        console.log(`✅ Page rendered: ${pageId}`);
        
        // Setup page events
        setTimeout(() => {
            try {
                switch (pageId) {
                    case 'attendance':
                        if (window.AttendancePage && window.AttendancePage.setupEvents) {
                            window.AttendancePage.setupEvents();
                        }
                        break;
                    case 'tracker':
                        if (window.TrackerPage && window.TrackerPage.setupEvents) {
                            window.TrackerPage.setupEvents();
                        }
                        break;
                    case 'reflections':
                        if (window.ReflectionsPage && window.ReflectionsPage.setupEvents) {
                            window.ReflectionsPage.setupEvents();
                        }
                        break;
                    case 'admin':
                        if (window.AdminPage && window.AdminPage.setupEvents) {
                            window.AdminPage.setupEvents();
                        }
                        break;
                }
            } catch (error) {
                console.error(`❌ Error setting up events for ${pageId}:`, error);
            }
        }, 150);
    }
}

// Start the app immediately
console.log("🚀 Starting app...");
window.app = new App();
