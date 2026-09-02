// ============================================================
// js/app.js - MAIN APP CONTROLLER
// ============================================================

class App {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'attendance';
        this.pages = {};
        
        this.init();
    }
    
    async init() {
        // Set default date
        const today = new Date().toISOString().slice(0, 10);
        const dateInput = document.getElementById('attendanceDate');
        if (dateInput) dateInput.value = today;
        
        // Load login page
        this.showLogin();
        
        // Auth listener
        window.Auth.onAuthStateChanged(user => {
            if (user) {
                this.currentUser = user;
                const userEmail = document.getElementById('userEmail');
                if (userEmail) {
                    userEmail.textContent = user.displayName || user.email || 'Teacher';
                }
                this.showMainApp(user);
            }
        });
        
        // Setup navigation
        this.setupNavigation();
        
        // Auto-login for mock mode
        if (window.__firebase.useMock) {
            const mockUser = sessionStorage.getItem('mockUser');
            if (mockUser) {
                const user = JSON.parse(mockUser);
                this.currentUser = user;
                const userEmail = document.getElementById('userEmail');
                if (userEmail) {
                    userEmail.textContent = user.displayName || user.email || 'Teacher';
                }
                this.showMainApp(user);
            }
        }
    }
    
    setupNavigation() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const page = tab.dataset.page;
                this.navigateTo(page);
            });
        });
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await window.Auth.logout();
                this.currentUser = null;
                this.showLogin();
            });
        }
    }
    
    showLogin() {
        const container = document.getElementById('pageContainer');
        if (container) {
            container.innerHTML = window.LoginPage.render();
            window.LoginPage.setupEvents();
        }
        // Hide navigation and user badge
        document.getElementById('navTabs').style.display = 'none';
        document.getElementById('userBadge').style.display = 'none';
    }
    
    showMainApp(user) {
        // Show navigation and user badge
        document.getElementById('navTabs').style.display = 'flex';
        document.getElementById('userBadge').style.display = 'flex';
        
        // Update user email
        const userEmail = document.getElementById('userEmail');
        if (userEmail) {
            userEmail.textContent = user.displayName || user.email || 'Teacher';
        }
        
        // Load attendance page
        this.loadPage('attendance');
        this.navigateTo('attendance');
    }
    
    loadPage(pageName) {
        const container = document.getElementById('pageContainer');
        if (!container) return;
        
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
        }
    }
    
    async navigateTo(pageId) {
        this.currentPage = pageId;
        
        // Update nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.page === pageId);
        });
        
        // Load the page
        this.loadPage(pageId);
        
        // Wait for DOM to update
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Setup page-specific events and render
        switch (pageId) {
            case 'attendance':
                await window.AttendancePage.render();
                window.AttendancePage.setupEvents();
                break;
            case 'tracker':
                await window.TrackerPage.render();
                window.TrackerPage.setupEvents();
                break;
            case 'reflections':
                await window.ReflectionsPage.render();
                window.ReflectionsPage.setupEvents();
                break;
            case 'admin':
                await window.AdminPage.render();
                window.AdminPage.setupEvents();
                break;
        }
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    console.log('🚀 CSL Management Pro started!');
    console.log(`📦 Mode: ${window.__firebase.useMock ? 'MOCK (local storage)' : 'FIREBASE'}`);
});
