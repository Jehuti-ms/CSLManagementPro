// ============================================================
// DATABASE SERVICE - Firestore (with real credentials)
// ============================================================

// Mock Data Store (fallback)
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
        try {
            const snapshot = await window.__firebase.db.collection('students')
                .orderBy('name')
                .get();
            return snapshot.docs.map(doc => doc.data().name);
        } catch (error) {
            console.error("❌ Error fetching students:", error);
            return [];
        }
    },
    
    async addStudent(name) {
        if (window.__firebase.useMock) {
            mockData.students.push(name);
            saveMock();
            return;
        }
        try {
            await window.__firebase.db.collection('students').add({ 
                name, 
                createdAt: firebase.firestore.FieldValue.serverTimestamp() 
            });
            console.log("✅ Student added:", name);
        } catch (error) {
            console.error("❌ Error adding student:", error);
            throw error;
        }
    },
    
    async deleteStudent(name) {
        if (window.__firebase.useMock) {
            mockData.students = mockData.students.filter(s => s !== name);
            saveMock();
            return;
        }
        try {
            const snapshot = await window.__firebase.db.collection('students')
                .where('name', '==', name)
                .get();
            snapshot.forEach(doc => doc.ref.delete());
            console.log("✅ Student deleted:", name);
        } catch (error) {
            console.error("❌ Error deleting student:", error);
            throw error;
        }
    },

    // ----- CLUBS -----
    async getClubs() {
        if (window.__firebase.useMock) return [...mockData.clubs];
        try {
            const snapshot = await window.__firebase.db.collection('clubs')
                .orderBy('name')
                .get();
            return snapshot.docs.map(doc => doc.data().name);
        } catch (error) {
            console.error("❌ Error fetching clubs:", error);
            return [];
        }
    },
    
    async addClub(name) {
        if (window.__firebase.useMock) {
            mockData.clubs.push(name);
            saveMock();
            return;
        }
        try {
            await window.__firebase.db.collection('clubs').add({ 
                name, 
                createdAt: firebase.firestore.FieldValue.serverTimestamp() 
            });
            console.log("✅ Club added:", name);
        } catch (error) {
            console.error("❌ Error adding club:", error);
            throw error;
        }
    },
    
    async deleteClub(name) {
        if (window.__firebase.useMock) {
            mockData.clubs = mockData.clubs.filter(c => c !== name);
            saveMock();
            return;
        }
        try {
            const snapshot = await window.__firebase.db.collection('clubs')
                .where('name', '==', name)
                .get();
            snapshot.forEach(doc => doc.ref.delete());
            console.log("✅ Club deleted:", name);
        } catch (error) {
            console.error("❌ Error deleting club:", error);
            throw error;
        }
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
        try {
            const snapshot = await window.__firebase.db.collection('attendance')
                .where('date', '==', date)
                .get();
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
        } catch (error) {
            console.error("❌ Error fetching attendance:", error);
            return {};
        }
    },
    
    async saveAttendance(date, records) {
        if (window.__firebase.useMock) {
            Object.keys(records).forEach(key => {
                mockData.attendance[key] = records[key];
            });
            saveMock();
            return;
        }
        try {
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
            console.log("✅ Attendance saved for:", date);
        } catch (error) {
            console.error("❌ Error saving attendance:", error);
            throw error;
        }
    },

    // ----- PROJECTS -----
    async getProjects() {
        if (window.__firebase.useMock) return [...mockData.projects];
        try {
            const snapshot = await window.__firebase.db.collection('projects')
                .orderBy('createdAt', 'desc')
                .get();
            return snapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.error("❌ Error fetching projects:", error);
            return [];
        }
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
        try {
            await window.__firebase.db.collection('projects').add(project);
            console.log("✅ Project added:", name);
        } catch (error) {
            console.error("❌ Error adding project:", error);
            throw error;
        }
    },
    
    async deleteProject(name, period) {
        if (window.__firebase.useMock) {
            mockData.projects = mockData.projects.filter(p => 
                !(p.name === name && p.period === period)
            );
            saveMock();
            return;
        }
        try {
            const snapshot = await window.__firebase.db.collection('projects')
                .where('name', '==', name)
                .where('period', '==', period)
                .get();
            snapshot.forEach(doc => doc.ref.delete());
            console.log("✅ Project deleted:", name);
        } catch (error) {
            console.error("❌ Error deleting project:", error);
            throw error;
        }
    },

    // ----- REFLECTIONS -----
    async getReflections() {
        if (window.__firebase.useMock) {
            return {
                student: mockData.studentReflection || '',
                teacher: mockData.teacherReflection || ''
            };
        }
        try {
            const doc = await window.__firebase.db.collection('settings')
                .doc('reflections')
                .get();
            return doc.exists ? doc.data() : { student: '', teacher: '' };
        } catch (error) {
            console.error("❌ Error fetching reflections:", error);
            return { student: '', teacher: '' };
        }
    },
    
    async saveReflection(type, content) {
        if (window.__firebase.useMock) {
            if (type === 'student') mockData.studentReflection = content;
            else mockData.teacherReflection = content;
            saveMock();
            return;
        }
        try {
            await window.__firebase.db.collection('settings').doc('reflections').set({
                [type]: content,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            console.log("✅ Reflection saved:", type);
        } catch (error) {
            console.error("❌ Error saving reflection:", error);
            throw error;
        }
    }
};

window.DB = DB;
