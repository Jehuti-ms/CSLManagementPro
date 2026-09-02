// ============================================================
// DATABASE SERVICE - Handles all data operations
// ============================================================

// Mock Data Store
let mockData = {
    students: ['Emma Wilson', 'Liam Chen', 'Sophia Patel', 'Noah Kim', 'Olivia Martinez'],
    clubs: ['Community Service', 'Environmental', 'Tutoring'],
    attendance: {},
    projects: [],
    studentReflection: '',
    teacherReflection: ''
};

// Load mock data from localStorage
try {
    const saved = localStorage.getItem('clubManagerMock');
    if (saved) mockData = JSON.parse(saved);
} catch (e) {}

function saveMock() {
    if (window.__firebase.useMock) {
        localStorage.setItem('clubManagerMock', JSON.stringify(mockData));
    }
}

// Database Service
const DB = {
    // ----- STUDENTS -----
    async getStudents() {
        if (window.__firebase.useMock) return [...mockData.students];
        const snapshot = await window.__firebase.db.collection('students').get();
        return snapshot.docs.map(doc => doc.data().name);
    },
    
    async addStudent(name) {
        if (window.__firebase.useMock) {
            mockData.students.push(name);
            saveMock();
            return;
        }
        await window.__firebase.db.collection('students').add({ 
            name, 
            createdAt: firebase.firestore.FieldValue.serverTimestamp() 
        });
    },
    
    async deleteStudent(name) {
        if (window.__firebase.useMock) {
            mockData.students = mockData.students.filter(s => s !== name);
            saveMock();
            return;
        }
        const snapshot = await window.__firebase.db.collection('students')
            .where('name', '==', name).get();
        snapshot.forEach(doc => doc.ref.delete());
    },

    // ----- CLUBS -----
    async getClubs() {
        if (window.__firebase.useMock) return [...mockData.clubs];
        const snapshot = await window.__firebase.db.collection('clubs').get();
        return snapshot.docs.map(doc => doc.data().name);
    },
    
    async addClub(name) {
        if (window.__firebase.useMock) {
            mockData.clubs.push(name);
            saveMock();
            return;
        }
        await window.__firebase.db.collection('clubs').add({ 
            name, 
            createdAt: firebase.firestore.FieldValue.serverTimestamp() 
        });
    },
    
    async deleteClub(name) {
        if (window.__firebase.useMock) {
            mockData.clubs = mockData.clubs.filter(c => c !== name);
            saveMock();
            return;
        }
        const snapshot = await window.__firebase.db.collection('clubs')
            .where('name', '==', name).get();
        snapshot.forEach(doc => doc.ref.delete());
    },

    // ----- ATTENDANCE -----
    async getAttendance(date) {
        if (window.__firebase.useMock) {
            const result = {};
            Object.keys(mockData.attendance).forEach(key => {
                if (key.startsWith(date + '_')) {
                    result[key] = mockData.attendance[key];
                }
            });
            return result;
        }
        const snapshot = await window.__firebase.db.collection('attendance')
            .where('date', '==', date).get();
        const data = {};
        snapshot.forEach(doc => {
            const d = doc.data();
            data[`${date}_${d.student}`] = { 
                status: d.status, 
                lateTime: d.lateTime || '', 
                engagement: d.engagement || '3' 
            };
        });
        return data;
    },
    
    async saveAttendance(date, records) {
        if (window.__firebase.useMock) {
            Object.keys(records).forEach(key => {
                mockData.attendance[key] = records[key];
            });
            saveMock();
            return;
        }
        const batch = window.__firebase.db.batch();
        Object.keys(records).forEach(key => {
            const student = key.split('_')[1];
            const ref = window.__firebase.db.collection('attendance').doc();
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
        if (window.__firebase.useMock) return [...mockData.projects];
        const snapshot = await window.__firebase.db.collection('projects')
            .orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => doc.data());
    },
    
    async addProject(name, period) {
        const project = {
            name,
            period,
            date: new Date().toISOString().slice(0, 10),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        if (window.__firebase.useMock) {
            mockData.projects.push(project);
            saveMock();
            return;
        }
        await window.__firebase.db.collection('projects').add(project);
    },
    
    async deleteProject(name, period) {
        if (window.__firebase.useMock) {
            mockData.projects = mockData.projects.filter(p => 
                !(p.name === name && p.period === period)
            );
            saveMock();
            return;
        }
        const snapshot = await window.__firebase.db.collection('projects')
            .where('name', '==', name)
            .where('period', '==', period).get();
        snapshot.forEach(doc => doc.ref.delete());
    },

    // ----- REFLECTIONS -----
    async getReflections() {
        if (window.__firebase.useMock) {
            return {
                student: mockData.studentReflection || '',
                teacher: mockData.teacherReflection || ''
            };
        }
        const doc = await window.__firebase.db.collection('settings')
            .doc('reflections').get();
        return doc.exists ? doc.data() : { student: '', teacher: '' };
    },
    
    async saveReflection(type, content) {
        if (window.__firebase.useMock) {
            if (type === 'student') mockData.studentReflection = content;
            else mockData.teacherReflection = content;
            saveMock();
            return;
        }
        await window.__firebase.db.collection('settings').doc('reflections').set({
            [type]: content,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    }
};

// Make DB globally available
window.DB = DB;
