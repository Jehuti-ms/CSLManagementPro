// ============================================================
// js/app.js - MAIN APP CONTROLLER
// ============================================================

class App {
    constructor() {
        console.log("🚀 App constructor called");
        this.currentUser = null;
        this.currentPage = 'attendance';
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    async init() {
        console.log("📱 App initializing...");
        
        // Set default date
        const today = new Date().toISOString().slice(0, 10);
        const dateInput = document.getElementById('attendanceDate');
        if (dateInput) dateInput.value = today;
        
        // Setup navigation
        this.setupNavigation();
        
        // Load login page
        this.showLogin();
        
        // Auth listener
        window.Auth.onAuthStateChanged((user) => {
            console.log("👤 Auth state changed:", user ? user.email : 'No user');
            if (user) {
                this.currentUser = user;
                const userEmail = document.getElementById('userEmail');
                if (userEmail) {
                    userEmail.textContent = user.displayName || user.email || 'Teacher';
                }
                this.showMainApp(user);
            }
        });
        
        // Auto-login for mock mode
        if (window.__firebase && window.__firebase.useMock) {
            const mockUser = sessionStorage.getItem('mockUser');
            if (mockUser) {
                try {
                    const user = JSON.parse(mockUser);
                    this.currentUser = user;
                    const userEmail = document.getElementById('userEmail');
                    if (userEmail) {
                        userEmail.textContent = user.displayName || user.email || 'Teacher';
                    }
                    this.showMainApp(user);
                } catch (e) {
                    console.warn("⚠️ Could not parse mock user:", e);
                }
            }
        }
        
        console.log("✅ App initialized successfully");
    }
    
    setupNavigation() {
        console.log("🔧 Setting up navigation...");
        
        // Navigation tabs
        const tabs = document.querySelectorAll('.nav-tab');
        console.log(`📑 Found ${tabs.length} navigation tabs`);
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const page = tab.dataset.page;
                console.log(`📄 Navigating to: ${page}`);
                this.navigateTo(page);
            });
        });
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                console.log("🚪 Logging out...");
                await window.Auth.logout();
                this.currentUser = null;
                this.showLogin();
            });
        } else {
            console.warn("⚠️ Logout button not found");
        }
    }
    
    showLogin() {
        console.log("📄 Showing login page...");
        const container = document.getElementById('pageContainer');
        if (container) {
            container.innerHTML = window.LoginPage.render();
            // Setup events after rendering
            setTimeout(() => {
                window.LoginPage.setupEvents();
            }, 50);
        } else {
            console.error("❌ pageContainer not found!");
        }
        // Hide navigation and user badge
        const navTabs = document.getElementById('navTabs');
        const userBadge = document.getElementById('userBadge');
        if (navTabs) navTabs.style.display = 'none';
        if (userBadge) userBadge.style.display = 'none';
    }
    
    showMainApp(user) {
        console.log("📄 Showing main app...");
        
        // Show navigation and user badge
        const navTabs = document.getElementById('navTabs');
        const userBadge = document.getElementById('userBadge');
        if (navTabs) navTabs.style.display = 'flex';
        if (userBadge) userBadge.style.display = 'flex';
        
        // Update user email
        const userEmail = document.getElementById('userEmail');
        if (userEmail) {
            userEmail.textContent = user.displayName || user.email || 'Teacher';
        }
        
        // Load attendance page
        this.loadPage('attendance');
        setTimeout(() => {
            this.navigateTo('attendance');
        }, 50);
    }
    
    loadPage(pageName) {
        const container = document.getElementById('pageContainer');
        if (!container) {
            console.error("❌ pageContainer not found!");
            return;
        }
        
        console.log(`📄 Loading page: ${pageName}`);
        
        switch (pageName) {
            case 'attendance':
                container.innerHTML = window.AttendancePage.render();
                break;
            case 'tracker':
                container.innerHTML = window.TrackerPage.render();
                break;
            case 'reflections':
                container.innerHTML = window.ReflectionsPage.render();
                break;
            case 'admin':
                container.innerHTML = window.AdminPage.render();
                break;
            default:
                console.warn(`⚠️ Unknown page: ${pageName}`);
        }
    }
    
    async navigateTo(pageId) {
        console.log(`🧭 Navigating to: ${pageId}`);
        this.currentPage = pageId;
        
        // Update nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.page === pageId);
        });
        
        // Load the page
        this.loadPage(pageId);
        
        // Wait for DOM to update
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Setup page-specific events and render
        switch (pageId) {
            case 'attendance':
                if (window.AttendancePage) {
                    await window.AttendancePage.render();
                    window.AttendancePage.setupEvents();
                }
                break;
            case 'tracker':
                if (window.TrackerPage) {
                    await window.TrackerPage.render();
                    window.TrackerPage.setupEvents();
                }
                break;
            case 'reflections':
                if (window.ReflectionsPage) {
                    await window.ReflectionsPage.render();
                    window.ReflectionsPage.setupEvents();
                }
                break;
            case 'admin':
                if (window.AdminPage) {
                    await window.AdminPage.render();
                    window.AdminPage.setupEvents();
                }
                break;
        }
    }
}

// Start the app - but only after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new App();
    });
} else {
    window.app = new App();
}
