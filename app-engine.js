// ============================================================
// SERVICE CLUB MANAGER - ENGINE
// Firebase Configuration & Core Logic
// ============================================================

// ---------- FIREBASE CONFIG ----------
// REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByUXiRZKJ4ZU9YYIcwyhmkqlLBtKTysX8",
  authDomain: "csl-management-pro.firebaseapp.com",
  projectId: "csl-management-pro",
  storageBucket: "csl-management-pro.firebasestorage.app",
  messagingSenderId: "75793557893",
  appId: "1:75793557893:web:e250d619831cf80fc4bcec",
  measurementId: "G-868VTMCR0W"
};


// Initialize Firebase (with fallback for demo)
let useMock = true;
let auth, db;

try {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    useMock = false;
    console.log("✅ Firebase initialized successfully");
} catch (e) {
    console.warn("⚠️ Firebase config missing or invalid - using mock data mode");
    useMock = true;
}

// ============================================================
// MOCK DATA STORE (fallback when Firebase isn't configured)
// ============================================================
let mockData = {
    students: ['Emma Wilson', 'Liam Chen', 'Sophia Patel', 'Noah Kim', 'Olivia Martinez'],
    clubs: ['Community Service', 'Environmental', 'Tutoring'],
    attendance: {}, // key: date_student -> {status, lateTime, engagement}
    projects: [],   // {name, period, date}
    studentReflection: '',
    teacherReflection: ''
};

// Load mock data from localStorage
try {
    const saved = localStorage.getItem('clubManagerMock');
    if (saved) mockData = JSON.parse(saved);
} catch (e) { }

function saveMock() {
    if (useMock) {
        localStorage.setItem('clubManagerMock', JSON.stringify(mockData));
    }
}

// ============================================================
// DATABASE HELPERS (works with both Firebase & Mock)
// ============================================================
const DB = {
    // ----- STUDENTS -----
    async getStudents() {
        if (useMock) return [...mockData.students];
        const snapshot = await db.collection('students').get();
        return snapshot.docs.map(doc => doc.data().name);
    },

    async addStudent(name) {
        if (useMock) {
            mockData.students.push(name);
            saveMock();
            return;
        }
        await db.collection('students').add({ name, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    },

    async deleteStudent(name) {
        if (useMock) {
            mockData.students = mockData.students.filter(s => s !== name);
            saveMock();
            return;
        }
        const snapshot = await db.collection('students').where('name', '==', name).get();
        snapshot.forEach(doc => doc.ref.delete());
    },

    // ----- CLUBS -----
    async getClubs() {
        if (useMock) return [...mockData.clubs];
        const snapshot = await db.collection('clubs').get();
        return snapshot.docs.map(doc => doc.data().name);
    },

    async addClub(name) {
        if (useMock) {
            mockData.clubs.push(name);
            saveMock();
            return;
        }
        await db.collection('clubs').add({ name, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    },

    async deleteClub(name) {
        if (useMock) {
            mockData.clubs = mockData.clubs.filter(c => c !== name);
            saveMock();
            return;
        }
        const snapshot = await db.collection('clubs').where('name', '==', name).get();
        snapshot.forEach(doc => doc.ref.delete());
    },

    // ----- ATTENDANCE -----
    async getAttendance(date) {
        if (useMock) {
            const result = {};
            Object.keys(mockData.attendance).forEach(key => {
                if (key.startsWith(date + '_')) {
                    result[key] = mockData.attendance[key];
                }
            });
            return result;
        }
        const snapshot = await db.collection('attendance')
            .where('date', '==', date)
            .get();
        const data = {};
        snapshot.forEach(doc => {
            const d = doc.data();
            data[`${date}_${d.student}`] = { status: d.status, lateTime: d.lateTime || '', engagement: d.engagement || '3' };
        });
        return data;
    },

    async saveAttendance(date, records) {
        if (useMock) {
            Object.keys(records).forEach(key => {
                mockData.attendance[key] = records[key];
            });
            saveMock();
            return;
        }
        const batch = db.batch();
        Object.keys(records).forEach(key => {
            const student = key.split('_')[1];
            const ref = db.collection('attendance').doc();
            batch.set(ref, {
                date,
                student,
                status: records[key].status,
                lateTime: records[key].lateTime || '',
                engagement: records[key].engagement || '3',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        await batch.commit();
    },

    // ----- PROJECTS -----
    async getProjects() {
        if (useMock) return [...mockData.projects];
        const snapshot = await db.collection('projects')
            .orderBy('createdAt', 'desc')
            .get();
        return snapshot.docs.map(doc => doc.data());
    },

    async addProject(name, period) {
        const project = {
            name,
            period,
            date: new Date().toISOString().slice(0, 10),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        if (useMock) {
            mockData.projects.push(project);
            saveMock();
            return;
        }
        await db.collection('projects').add(project);
    },

    async deleteProject(name, period) {
        if (useMock) {
            mockData.projects = mockData.projects.filter(p => !(p.name === name && p.period === period));
            saveMock();
            return;
        }
        const snapshot = await db.collection('projects')
            .where('name', '==', name)
            .where('period', '==', period)
            .get();
        snapshot.forEach(doc => doc.ref.delete());
    },

    // ----- REFLECTIONS -----
    async getReflections() {
        if (useMock) {
            return {
                student: mockData.studentReflection || '',
                teacher: mockData.teacherReflection || ''
            };
        }
        const doc = await db.collection('settings').doc('reflections').get();
        if (doc.exists) {
            return doc.data();
        }
        return { student: '', teacher: '' };
    },

    async saveReflection(type, content) {
        if (useMock) {
            if (type === 'student') mockData.studentReflection = content;
            else mockData.teacherReflection = content;
            saveMock();
            return;
        }
        await db.collection('settings').doc('reflections').set({
            [type]: content,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    }
};

// ============================================================
// AUTHENTICATION
// ============================================================
class AuthManager {
    static async login(email, password) {
        if (useMock) {
            if (email === 'teacher@demo.com' && password === '123456') {
                return { email, uid: 'mock-user-123' };
            }
            throw new Error('Invalid credentials. Use teacher@demo.com / 123456');
        }
        const userCred = await auth.signInWithEmailAndPassword(email, password);
        return userCred.user;
    }

    static async logout() {
        if (useMock) return;
        await auth.signOut();
    }

    static onAuthStateChanged(callback) {
        if (useMock) {
            // Auto-login for demo
            callback({ email: 'teacher@demo.com', uid: 'mock-user-123' });
            return () => { };
        }
        return auth.onAuthStateChanged(callback);
    }
}

// ============================================================
// APP CONTROLLER - Main Application Logic
// ============================================================
class AppController {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'attendance';
        this.attendanceData = {};

        // DOM references
        this.elements = {
            loginPage: document.getElementById('loginPage'),
            mainContent: document.getElementById('mainContent'),
            loginEmail: document.getElementById('loginEmail'),
            loginPassword: document.getElementById('loginPassword'),
            loginBtn: document.getElementById('loginBtn'),
            loginError: document.getElementById('loginError'),
            logoutBtn: document.getElementById('logoutBtn'),
            userEmail: document.getElementById('userEmail'),
            navTabs: document.querySelectorAll('.nav-tab'),
            pages: {
                attendance: document.getElementById('attendancePage'),
                tracker: document.getElementById('trackerPage'),
                reflections: document.getElementById('reflectionsPage'),
                admin: document.getElementById('adminPage')
            },
            // Attendance
            attendanceDate: document.getElementById('attendanceDate'),
            attendanceTime: document.getElementById('attendanceTime'),
            attendanceBody: document.getElementById('attendanceTableBody'),
            markAllPresent: document.getElementById('markAllPresent'),
            resetAttendance: document.getElementById('resetAttendance'),
            saveAttendance: document.getElementById('saveAttendance'),
            // Tracker
            projectName: document.getElementById('projectName'),
            projectPeriod: document.getElementById('projectPeriod'),
            addProject: document.getElementById('addProject'),
            trackerBody: document.getElementById('trackerTableBody'),
            weeklyCount: document.getElementById('weeklyCount'),
            monthlyCount: document.getElementById('monthlyCount'),
            annualCount: document.getElementById('annualCount'),
            // Reflections
            studentRef: document.getElementById('studentReflection'),
            teacherRef: document.getElementById('teacherReflection'),
            saveStudentRef: document.getElementById('saveStudentReflection'),
            saveTeacherRef: document.getElementById('saveTeacherReflection'),
            studentRefDisplay: document.getElementById('studentRefDisplay'),
            teacherRefDisplay: document.getElementById('teacherRefDisplay'),
            // Admin
            clubNameInput: document.getElementById('clubNameInput'),
            addClubBtn: document.getElementById('addClubBtn'),
            studentNameInput: document.getElementById('studentNameInput'),
            addStudentBtn: document.getElementById('addStudentBtn'),
            clubList: document.getElementById('clubList'),
            studentList: document.getElementById('studentList'),
            teacherAllocationDisplay: document.getElementById('teacherAllocationDisplay')
        };

        this.init();
    }

    async init() {
        // Setup authentication listener
        AuthManager.onAuthStateChanged(user => {
            if (user) {
                this.currentUser = user;
                this.showMainApp(user);
            } else if (!useMock) {
                this.showLogin();
            }
        });

        // Setup event listeners
        this.setupEventListeners();

        // Set default date
        const today = new Date().toISOString().slice(0, 10);
        this.elements.attendanceDate.value = today;

        // Auto-login for mock mode
        if (useMock) {
            try {
                await this.handleLogin('teacher@demo.com', '123456');
            } catch (e) {
                console.warn('Auto-login failed:', e);
            }
        }
    }

    setupEventListeners() {
        // Navigation
        this.elements.navTabs.forEach(tab => {
            tab.addEventListener('click', () => this.navigateTo(tab.dataset.page));
        });

        // Login
        this.elements.loginBtn.addEventListener('click', async () => {
            const email = this.elements.loginEmail.value;
            const password = this.elements.loginPassword.value;
            await this.handleLogin(email, password);
        });

        // Logout
        this.elements.logoutBtn.addEventListener('click', async () => {
            await AuthManager.logout();
            this.currentUser = null;
            this.showLogin();
        });

        // Attendance
        this.elements.markAllPresent.addEventListener('click', () => this.markAllPresent());
        this.elements.resetAttendance.addEventListener('click', () => this.resetAttendance());
        this.elements.saveAttendance.addEventListener('click', () => this.saveAttendance());

        // Tracker
        this.elements.addProject.addEventListener('click', () => this.addProject());

        // Reflections
        this.elements.saveStudentRef.addEventListener('click', () => this.saveReflection('student'));
        this.elements.saveTeacherRef.addEventListener('click', () => this.saveReflection('teacher'));

        // Admin
        this.elements.addClubBtn.addEventListener('click', () => this.addClub());
        this.elements.addStudentBtn.addEventListener('click', () => this.addStudent());

        // Keyboard shortcuts (Enter key)
        this.elements.loginEmail.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.elements.loginBtn.click();
        });
        this.elements.loginPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.elements.loginBtn.click();
        });
    }

    // ----- AUTHENTICATION -----
    async handleLogin(email, password) {
        try {
            const user = await AuthManager.login(email, password);
            this.currentUser = user;
            this.showMainApp(user);
            this.elements.loginError.textContent = '';
        } catch (error) {
            this.elements.loginError.textContent = error.message;
        }
    }

    showLogin() {
        this.elements.loginPage.style.display = 'block';
        this.elements.mainContent.style.display = 'none';
    }

    showMainApp(user) {
        this.elements.loginPage.style.display = 'none';
        this.elements.mainContent.style.display = 'block';
        this.elements.userEmail.textContent = user.email;
        this.navigateTo('attendance');
    }

    // ----- NAVIGATION -----
    navigateTo(pageId) {
        this.currentPage = pageId;
        Object.keys(this.elements.pages).forEach(key => {
            this.elements.pages[key].classList.toggle('active-page', key === pageId);
        });
        this.elements.navTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.page === pageId);
        });

        // Load data for the page
        switch (pageId) {
            case 'attendance': this.renderAttendance(); break;
            case 'tracker': this.renderTracker(); break;
            case 'reflections': this.renderReflections(); break;
            case 'admin': this.renderAdmin(); break;
        }
    }

    // ----- ATTENDANCE -----
    async renderAttendance() {
        const date = this.elements.attendanceDate.value || new Date().toISOString().slice(0, 10);
        const students = await DB.getStudents();
        const attendanceRecords = await DB.getAttendance(date);

        let html = '';
        students.forEach(name => {
            const key = `${date}_${name}`;
            const record = attendanceRecords[key] || { status: 'present', lateTime: '', engagement: '3' };
            const lateDisabled = record.status !== 'late' ? 'disabled' : '';
            html += `<tr>
                <td><strong>${name}</strong></td>
                <td>
                    <select class="status-select" data-name="${name}">
                        <option value="present" ${record.status === 'present' ? 'selected' : ''}>Present</option>
                        <option value="absent" ${record.status === 'absent' ? 'selected' : ''}>Absent</option>
                        <option value="late" ${record.status === 'late' ? 'selected' : ''}>Late</option>
                    </select>
                </td>
                <td>
                    <input type="time" class="late-time-input" data-name="${name}" value="${record.lateTime}" ${lateDisabled}>
                </td>
                <td>
                    <select class="engagement-select" data-name="${name}">
                        ${[1, 2, 3, 4, 5].map(n => `<option value="${n}" ${Number(record.engagement) === n ? 'selected' : ''}>${n}</option>`).join('')}
                    </select>
                </td>
            </tr>`;
        });

        this.elements.attendanceBody.innerHTML = html;

        // Enable/disable late time inputs
        document.querySelectorAll('.status-select').forEach(sel => {
            sel.addEventListener('change', function () {
                const name = this.dataset.name;
                const timeInput = document.querySelector(`.late-time-input[data-name="${name}"]`);
                if (this.value === 'late') {
                    timeInput.disabled = false;
                } else {
                    timeInput.disabled = true;
                    timeInput.value = '';
                }
            });
        });
    }

    markAllPresent() {
        document.querySelectorAll('.status-select').forEach(sel => sel.value = 'present');
        document.querySelectorAll('.late-time-input').forEach(inp => {
            inp.disabled = true;
            inp.value = '';
        });
        document.querySelectorAll('.engagement-select').forEach(sel => sel.value = '3');
    }

    resetAttendance() {
        this.markAllPresent();
    }

    async saveAttendance() {
        const date = this.elements.attendanceDate.value;
        const records = {};
        const rows = this.elements.attendanceBody.querySelectorAll('tr');

        rows.forEach(row => {
            const name = row.querySelector('.status-select')?.dataset.name;
            if (!name) return;
            const status = row.querySelector('.status-select').value;
            const lateTime = row.querySelector('.late-time-input').value;
            const engagement = row.querySelector('.engagement-select').value;
            records[`${date}_${name}`] = { status, lateTime, engagement };
        });

        try {
            await DB.saveAttendance(date, records);
            alert('✅ Attendance saved successfully!');
        } catch (error) {
            alert('❌ Error saving attendance: ' + error.message);
        }
    }

    // ----- TRACKER -----
    async renderTracker() {
        const projects = await DB.getProjects();
        let html = '';
        projects.forEach((p, idx) => {
            html += `<tr>
                <td>${p.name}</td>
                <td><span class="badge" style="background:#eef3f9;padding:4px 12px;border-radius:20px;">${p.period}</span></td>
                <td>${p.date || new Date().toISOString().slice(0, 10)}</td>
                <td>
                    <button class="btn-outline delete-project" data-name="${p.name}" data-period="${p.period}" style="padding:4px 14px;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>`;
        });

        this.elements.trackerBody.innerHTML = html;

        // Update counts
        const weekly = projects.filter(p => p.period === 'weekly').length;
        const monthly = projects.filter(p => p.period === 'monthly').length;
        const annual = projects.filter(p => p.period === 'annual').length;
        this.elements.weeklyCount.textContent = weekly;
        this.elements.monthlyCount.textContent = monthly;
        this.elements.annualCount.textContent = annual;

        // Delete handlers
        document.querySelectorAll('.delete-project').forEach(btn => {
            btn.addEventListener('click', async () => {
                const name = btn.dataset.name;
                const period = btn.dataset.period;
                if (confirm(`Delete project "${name}"?`)) {
                    await DB.deleteProject(name, period);
                    await this.renderTracker();
                }
            });
        });
    }

    async addProject() {
        const name = this.elements.projectName.value.trim();
        if (!name) return alert('Please enter a project name');
        const period = this.elements.projectPeriod.value;

        await DB.addProject(name, period);
        this.elements.projectName.value = '';
        await this.renderTracker();
    }

    // ----- REFLECTIONS -----
    async renderReflections() {
        const reflections = await DB.getReflections();
        this.elements.studentRef.value = reflections.student || '';
        this.elements.teacherRef.value = reflections.teacher || '';
        this.elements.studentRefDisplay.textContent = reflections.student || 'No student reflection yet.';
        this.elements.teacherRefDisplay.textContent = reflections.teacher || 'No teacher reflection yet.';
    }

    async saveReflection(type) {
        const content = type === 'student' ?
            this.elements.studentRef.value :
            this.elements.teacherRef.value;

        if (!content.trim()) {
            alert('Please write something before saving.');
            return;
        }

        await DB.saveReflection(type, content);
        await this.renderReflections();
        alert('✅ Reflection saved!');
    }

    // ----- ADMIN -----
    async renderAdmin() {
        const clubs = await DB.getClubs();
        const students = await DB.getStudents();

        this.elements.clubList.innerHTML = clubs.map(c =>
            `<li style="padding:8px 0; display:flex; justify-content:space-between; align-items:center;">
                <span><i class="fas fa-users" style="margin-right:10px;color:#2a7de1;"></i>${c}</span>
                <button class="btn-outline delete-club" data-name="${c}" style="padding:2px 12px; font-size:0.8rem;">✕</button>
            </li>`
        ).join('');

        this.elements.studentList.innerHTML = students.map(s =>
            `<li style="padding:8px 0; display:flex; justify-content:space-between; align-items:center;">
                <span><i class="fas fa-user" style="margin-right:10px;color:#2a7de1;"></i>${s}</span>
                <button class="btn-outline delete-student" data-name="${s}" style="padding:2px 12px; font-size:0.8rem;">✕</button>
            </li>`
        ).join('');

        // Delete handlers
        document.querySelectorAll('.delete-club').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm(`Delete club "${btn.dataset.name}"?`)) {
                    await DB.deleteClub(btn.dataset.name);
                    await this.renderAdmin();
                }
            });
        });

        document.querySelectorAll('.delete-student').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm(`Delete student "${btn.dataset.name}"?`)) {
                    await DB.deleteStudent(btn.dataset.name);
                    await this.renderAdmin();
                }
            });
        });

        this.elements.teacherAllocationDisplay.textContent = 'All teachers are admins. (manage in Firebase console)';
    }

    async addClub() {
        const name = this.elements.clubNameInput.value.trim();
        if (!name) return alert('Please enter a club name');
        await DB.addClub(name);
        this.elements.clubNameInput.value = '';
        await this.renderAdmin();
    }

    async addStudent() {
        const name = this.elements.studentNameInput.value.trim();
        if (!name) return alert('Please enter a student name');
        await DB.addStudent(name);
        this.elements.studentNameInput.value = '';
        await this.renderAdmin();
        // Also refresh attendance if it's the current page
        if (this.currentPage === 'attendance') {
            await this.renderAttendance();
        }
    }
}

// ============================================================
// START THE APP
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppController();
    console.log('🚀 Service Club Manager started!');
    console.log(`📦 Mode: ${useMock ? 'MOCK (local storage)' : 'FIREBASE'}`);
});