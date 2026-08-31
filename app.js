// ============================================================
// MAIN APP CONTROLLER
// ============================================================

class App {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'attendance';
        this.pages = {
            login: this.getLoginHTML(),
            attendance: this.getAttendanceHTML(),
            tracker: this.getTrackerHTML(),
            reflections: this.getReflectionsHTML(),
            admin: this.getAdminHTML()
        };
        
        this.init();
    }
    
    getLoginHTML() {
        return `
        <div id="loginPage" class="page active-page">
            <div class="login-card">
                <h2><i class="fas fa-user-graduate"></i> Teacher / Admin Login</h2>
                <input type="email" id="loginEmail" placeholder="Email" value="teacher@demo.com">
                <input type="password" id="loginPassword" placeholder="Password" value="123456">
                <button id="loginBtn"><i class="fas fa-arrow-right-to-bracket"></i> Sign in</button>
                <div id="loginError" class="login-error"></div>
                <div style="margin-top: 16px; font-size:0.9rem; color:#5a6f87;">Demo: teacher@demo.com / 123456</div>
            </div>
        </div>`;
    }
    
    getAttendanceHTML() {
        return `
        <div id="attendancePage" class="page active-page">
            <div class="section-title">
                <i class="fas fa-calendar-check"></i> Attendance · Excel-style with engagement
            </div>
            <div class="toolbar">
                <input type="date" id="attendanceDate">
                <input type="time" id="attendanceTime" value="09:30">
                <button class="btn-primary" id="markAllPresent"><i class="fas fa-user-check"></i> Mark all present</button>
                <button class="btn-outline" id="resetAttendance"><i class="fas fa-undo-alt"></i> Reset</button>
            </div>
            <div class="table-wrap">
                <table>
                    <thead><tr><th>Student</th><th>Status</th><th>Late time</th><th>Engagement (1-5)</th></tr></thead>
                    <tbody id="attendanceTableBody"></tbody>
                </table>
            </div>
            <div class="toolbar" style="margin-top: 12px; justify-content: flex-end;">
                <button class="btn-primary" id="saveAttendance"><i class="fas fa-save"></i> Save attendance</button>
            </div>
        </div>`;
    }
    
    getTrackerHTML() {
        return `
        <div id="trackerPage" class="page">
            <div class="section-title"><i class="fas fa-chart-simple"></i> Project Tracker</div>
            <div class="tracker-stats">
                <div class="stat-box"><span id="weeklyCount">0</span> Weekly</div>
                <div class="stat-box"><span id="monthlyCount">0</span> Monthly</div>
                <div class="stat-box"><span id="annualCount">0</span> Annual</div>
            </div>
            <div class="toolbar" style="margin-top: 18px;">
                <input type="text" id="projectName" placeholder="Project name" style="flex:1; min-width:180px;">
                <select id="projectPeriod">
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                </select>
                <button class="btn-primary" id="addProject"><i class="fas fa-plus"></i> Add project</button>
            </div>
            <div class="table-wrap">
                <table>
                    <thead><tr><th>Project</th><th>Period</th><th>Date</th><th>Action</th></tr></thead>
                    <tbody id="trackerTableBody"></tbody>
                </table>
            </div>
        </div>`;
    }
    
    getReflectionsHTML() {
        return `
        <div id="reflectionsPage" class="page">
            <div class="section-title"><i class="fas fa-comment-dots"></i> Reflections</div>
            <div class="grid-2col">
                <div class="reflection-card">
                    <h3><i class="fas fa-user-graduate"></i> Student Reflection</h3>
                    <textarea id="studentReflection" placeholder="Write student reflection..."></textarea>
                    <button class="btn-primary" id="saveStudentReflection"><i class="fas fa-save"></i> Save student reflection</button>
                    <div id="studentRefDisplay" style="margin-top: 14px; background:white; padding:12px; border-radius:16px;"></div>
                </div>
                <div class="reflection-card">
                    <h3><i class="fas fa-chalkboard-user"></i> Teacher Reflection</h3>
                    <textarea id="teacherReflection" placeholder="Write teacher reflection..."></textarea>
                    <button class="btn-primary" id="saveTeacherReflection"><i class="fas fa-save"></i> Save teacher reflection</button>
                    <div id="teacherRefDisplay" style="margin-top: 14px; background:white; padding:12px; border-radius:16px;"></div>
                </div>
            </div>
        </div>`;
    }
    
    getAdminHTML() {
        return `
        <div id="adminPage" class="page">
            <div class="section-title"><i class="fas fa-users-cog"></i> Admin · Allocations & Clubs</div>
            <div class="toolbar">
                <input type="text" id="clubNameInput" placeholder="Club name">
                <button class="btn-primary" id="addClubBtn"><i class="fas fa-plus-circle"></i> Add Club</button>
                <input type="text" id="studentNameInput" placeholder="Student name">
                <button class="btn-primary" id="addStudentBtn"><i class="fas fa-user-plus"></i> Add Student</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                <div style="flex:1; min-width:200px;">
                    <h4>Clubs</h4>
                    <ul id="clubList"></ul>
                </div>
                <div style="flex:2; min-width:280px;">
                    <h4>Students</h4>
                    <ul id="studentList"></ul>
                </div>
            </div>
            <div style="margin-top: 24px; background:#f0f5fe; padding:16px 20px; border-radius:40px;">
                <i class="fas fa-info-circle"></i> Teacher allocation: <span id="teacherAllocationDisplay">All teachers are admins.</span>
            </div>
        </div>`;
    }
    
    async init() {
        // Set default date
        const today = new Date().toISOString().slice(0, 10);
        const dateInput = document.getElementById('attendanceDate');
        if (dateInput) dateInput.value = today;
        
        // Load login page initially
        this.loadPage('login');
        
        // Auth listener
        window.Auth.onAuthStateChanged(user => {
            if (user) {
                this.currentUser = user;
                this.showMainApp(user);
            } else if (!window.__firebase.useMock) {
                this.loadPage('login');
            }
        });
        
        // Setup navigation
        this.setupNavigation();
        
        // Auto-login for mock mode
        if (window.__firebase.useMock) {
            try {
                await window.Auth.login('teacher@demo.com', '123456');
            } catch (e) {
                console.warn('Auto-login failed:', e);
            }
        }
    }
    
    setupNavigation() {
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const page = tab.dataset.page;
                this.navigateTo(page);
            });
        });
        
        // Login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', async () => {
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                try {
                    await window.Auth.login(email, password);
                    document.getElementById('loginError').textContent = '';
                } catch (error) {
                    document.getElementById('loginError').textContent = error.message;
                }
            });
        }
        
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', async () => {
            await window.Auth.logout();
            this.currentUser = null;
            this.loadPage('login');
        });
        
        // Enter key shortcuts
        document.getElementById('loginEmail')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('loginBtn').click();
        });
        document.getElementById('loginPassword')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('loginBtn').click();
        });
    }
    
    loadPage(pageName) {
        const container = document.getElementById('pageContainer');
        if (this.pages[pageName]) {
            container.innerHTML = this.pages[pageName];
        }
    }
    
    showMainApp(user) {
        document.getElementById('userEmail').textContent = user.email;
        this.loadPage('attendance');
        this.navigateTo('attendance');
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
                this.setupAttendanceEvents();
                break;
            case 'tracker':
                await window.TrackerPage.render();
                this.setupTrackerEvents();
                break;
            case 'reflections':
                await window.ReflectionsPage.render();
                this.setupReflectionsEvents();
                break;
            case 'admin':
                await window.AdminPage.render();
                this.setupAdminEvents();
                break;
        }
    }
    
    setupAttendanceEvents() {
        document.getElementById('markAllPresent')?.addEventListener('click', () => {
            window.AttendancePage.markAllPresent();
        });
        document.getElementById('resetAttendance')?.addEventListener('click', () => {
            window.AttendancePage.reset();
        });
        document.getElementById('saveAttendance')?.addEventListener('click', () => {
            window.AttendancePage.save();
        });
    }
    
    setupTrackerEvents() {
        document.getElementById('addProject')?.addEventListener('click', () => {
            window.TrackerPage.add();
        });
        document.getElementById('projectName')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('addProject').click();
        });
    }
    
    setupReflectionsEvents() {
        document.getElementById('saveStudentReflection')?.addEventListener('click', () => {
            window.ReflectionsPage.save('student');
        });
        document.getElementById('saveTeacherReflection')?.addEventListener('click', () => {
            window.ReflectionsPage.save('teacher');
        });
    }
    
    setupAdminEvents() {
        document.getElementById('addClubBtn')?.addEventListener('click', () => {
            window.AdminPage.addClub();
        });
        document.getElementById('addStudentBtn')?.addEventListener('click', () => {
            window.AdminPage.addStudent();
        });
        document.getElementById('clubNameInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('addClubBtn').click();
        });
        document.getElementById('studentNameInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('addStudentBtn').click();
        });
    }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    console.log('🚀 Service Club Manager started!');
    console.log(`📦 Mode: ${window.__firebase.useMock ? 'MOCK (local storage)' : 'FIREBASE'}`);
});