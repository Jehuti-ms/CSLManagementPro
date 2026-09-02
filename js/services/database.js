// ============================================================
// DATABASE SERVICE - Complete with Tracker Methods
// ============================================================

// ----- MOCK DATA STORE -----
let mockData = {
    students: ['Emma Wilson', 'Liam Chen', 'Sophia Patel', 'Noah Kim', 'Olivia Martinez'],
    clubs: ['Community Service', 'Environmental', 'Tutoring'],
    attendance: {},
    projects: [],
    studentReflection: '',
    teacherReflection: '',
    // Tracker data
    activities: {},
    tasks: {},
    media: {}
};

// Load mock data from localStorage
try {
    const saved = localStorage.getItem('clubManagerMock');
    if (saved) mockData = JSON.parse(saved);
} catch (e) {}

function saveMock() {
    if (window.__firebase && window.__firebase.useMock) {
        localStorage.setItem('clubManagerMock', JSON.stringify(mockData));
    }
}

// ----- DATABASE SERVICE -----
const DB = {
    // ============================================================
    // STUDENTS
    // ============================================================
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

    // ============================================================
    // CLUBS
    // ============================================================
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

    // ============================================================
    // ATTENDANCE
    // ============================================================
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

    // ============================================================
    // PROJECTS (for backwards compatibility)
    // ============================================================
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

    // ============================================================
    // REFLECTIONS
    // ============================================================
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
    },

    // ============================================================
    // TRACKER - TEACHER CLUBS
    // ============================================================
    async getTeacherClubs() {
        console.log("📋 Getting teacher clubs...");
        
        if (window.__firebase.useMock) {
            // Return all clubs for demo
            return mockData.clubs.map(name => ({ id: name, name }));
        }

        try {
            const user = window.Auth.getCurrentUser();
            if (!user) throw new Error('User not logged in');

            const snapshot = await window.__firebase.db.collection('teacherClubs')
                .where('teacherId', '==', user.uid)
                .get();

            if (snapshot.empty) {
                // If no assignments, return all clubs (admin)
                const allClubs = await this.getClubs();
                return allClubs.map(name => ({ id: name, name }));
            }

            const clubIds = snapshot.docs.map(doc => doc.data().clubId);
            const clubs = await this.getClubs();
            return clubs
                .filter(c => clubIds.includes(c.id || c))
                .map(c => ({ id: c.id || c, name: c.name || c }));

        } catch (error) {
            console.error("❌ Error getting teacher clubs:", error);
            // Fallback: return all clubs
            const clubs = await this.getClubs();
            return clubs.map(name => ({ id: name, name }));
        }
    },

    // ============================================================
    // TRACKER - ACTIVITIES
    // ============================================================
    // ----- GET ACTIVITY BY ID -----
    async getActivityById(clubId, activityId) {
        if (window.__firebase.useMock) {
            var key = 'activities_' + clubId + '_' + activityId;
            // Search through all periods
            var periods = ['weekly', 'monthly', 'yearly'];
            for (var i = 0; i < periods.length; i++) {
                var periodKey = 'activities_' + clubId + '_' + periods[i];
                if (mockData.activities[periodKey]) {
                    var activities = mockData.activities[periodKey];
                    for (var j = 0; j < activities.length; j++) {
                        if (activities[j].id === activityId) {
                            return activities[j];
                        }
                    }
                }
            }
            return null;
        }
    
        try {
            var doc = await window.__firebase.db.collection('activities').doc(activityId).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error("❌ Error getting activity:", error);
            throw error;
        }
    },
    
    async getActivities(clubId, period) {
        console.log(`📋 Getting activities for club ${clubId}, period ${period}`);
        
        if (window.__firebase.useMock) {
            const key = `activities_${clubId}_${period}`;
            return mockData.activities[key] || [];
        }

        try {
            const snapshot = await window.__firebase.db.collection('activities')
                .where('clubId', '==', clubId)
                .where('period', '==', period)
                .orderBy('date', 'desc')
                .get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("❌ Error getting activities:", error);
            return [];
        }
    },

    async addActivity(clubId, activity) {
        console.log(`📋 Adding activity for club ${clubId}`);
        
        if (window.__firebase.useMock) {
            const key = `activities_${clubId}_${activity.period}`;
            if (!mockData.activities[key]) mockData.activities[key] = [];
            const newActivity = { id: 'mock-' + Date.now(), ...activity };
            mockData.activities[key].push(newActivity);
            saveMock();
            return newActivity;
        }

        try {
            const docRef = await window.__firebase.db.collection('activities').add({
                clubId,
                ...activity,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("✅ Activity added");
            return { id: docRef.id, ...activity };
        } catch (error) {
            console.error("❌ Error adding activity:", error);
            throw error;
        }
    },

    async updateActivityStatus(clubId, activityId, status) {
        console.log(`📋 Updating activity ${activityId} status to ${status}`);
        
        if (window.__firebase.useMock) {
            Object.keys(mockData.activities).forEach(key => {
                const activities = mockData.activities[key];
                const idx = activities.findIndex(a => a.id === activityId);
                if (idx !== -1) {
                    activities[idx].status = status;
                }
            });
            saveMock();
            return;
        }

        try {
            await window.__firebase.db.collection('activities')
                .doc(activityId)
                .update({ status });
            console.log("✅ Activity status updated");
        } catch (error) {
            console.error("❌ Error updating activity:", error);
            throw error;
        }
    },

    async deleteActivity(clubId, activityId) {
        console.log(`📋 Deleting activity ${activityId}`);
        
        if (window.__firebase.useMock) {
            Object.keys(mockData.activities).forEach(key => {
                mockData.activities[key] = mockData.activities[key].filter(a => a.id !== activityId);
            });
            saveMock();
            return;
        }

        try {
            await window.__firebase.db.collection('activities')
                .doc(activityId)
                .delete();
            console.log("✅ Activity deleted");
        } catch (error) {
            console.error("❌ Error deleting activity:", error);
            throw error;
        }
    },

    // ============================================================
    // TRACKER - TASKS
    // ============================================================
    async getTasks(clubId) {
        console.log(`📋 Getting tasks for club ${clubId}`);
        
        if (window.__firebase.useMock) {
            const key = `tasks_${clubId}`;
            return mockData.tasks[key] || [];
        }

        try {
            const snapshot = await window.__firebase.db.collection('tasks')
                .where('clubId', '==', clubId)
                .orderBy('createdAt', 'desc')
                .get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("❌ Error getting tasks:", error);
            return [];
        }
    },

    // In the TASKS section, update addTask to include assignedTo:
    async addTask(clubId, title, priority, assignedTo) {
        console.log("📋 Adding task for club " + clubId + ": " + title);
        
        if (window.__firebase.useMock) {
            var key = 'tasks_' + clubId;
            if (!mockData.tasks[key]) mockData.tasks[key] = [];
            var newTask = {
                id: 'mock-task-' + Date.now(),
                title: title,
                priority: priority || 'medium',
                assignedTo: assignedTo || '',
                completed: false,
                createdAt: new Date().toISOString().slice(0, 10)
            };
            mockData.tasks[key].push(newTask);
            saveMock();
            return newTask;
        }
    
        try {
            var docRef = await window.__firebase.db.collection('tasks').add({
                clubId: clubId,
                title: title,
                priority: priority || 'medium',
                assignedTo: assignedTo || '',
                completed: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("✅ Task added");
            return { id: docRef.id, title: title, priority: priority, assignedTo: assignedTo, completed: false };
        } catch (error) {
            console.error("❌ Error adding task:", error);
            throw error;
        }
    },
    
    async updateTaskStatus(clubId, taskId, completed) {
        console.log(`📋 Updating task ${taskId} completed: ${completed}`);
        
        if (window.__firebase.useMock) {
            const key = `tasks_${clubId}`;
            const tasks = mockData.tasks[key] || [];
            const idx = tasks.findIndex(t => t.id === taskId);
            if (idx !== -1) {
                tasks[idx].completed = completed;
            }
            saveMock();
            return;
        }

        try {
            await window.__firebase.db.collection('tasks')
                .doc(taskId)
                .update({ completed });
            console.log("✅ Task status updated");
        } catch (error) {
            console.error("❌ Error updating task:", error);
            throw error;
        }
    },

    async deleteTask(clubId, taskId) {
        console.log(`📋 Deleting task ${taskId}`);
        
        if (window.__firebase.useMock) {
            const key = `tasks_${clubId}`;
            mockData.tasks[key] = (mockData.tasks[key] || []).filter(t => t.id !== taskId);
            saveMock();
            return;
        }

        try {
            await window.__firebase.db.collection('tasks')
                .doc(taskId)
                .delete();
            console.log("✅ Task deleted");
        } catch (error) {
            console.error("❌ Error deleting task:", error);
            throw error;
        }
    },

    // ============================================================
    // TRACKER - MEDIA
    // ============================================================
    async getMedia(clubId) {
        console.log(`📋 Getting media for club ${clubId}`);
        
        if (window.__firebase.useMock) {
            const key = `media_${clubId}`;
            return mockData.media[key] || [];
        }

        try {
            const snapshot = await window.__firebase.db.collection('media')
                .where('clubId', '==', clubId)
                .orderBy('createdAt', 'desc')
                .get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("❌ Error getting media:", error);
            return [];
        }
    },

    async uploadMedia(clubId, file) {
        console.log(`📋 Uploading media for club ${clubId}: ${file.name}`);
        
        if (window.__firebase.useMock) {
            const key = `media_${clubId}`;
            if (!mockData.media[key]) mockData.media[key] = [];
            const url = URL.createObjectURL(file);
            const newMedia = {
                id: 'mock-media-' + Date.now(),
                name: file.name,
                url: url,
                type: file.type.startsWith('video') ? 'video' : 'image',
                createdAt: new Date().toISOString().slice(0, 10)
            };
            mockData.media[key].push(newMedia);
            saveMock();
            return newMedia;
        }

        try {
            // Check if storage is available
            if (!window.__firebase.storage) {
                console.warn("⚠️ Storage not available, using mock mode");
                const key = `media_${clubId}`;
                if (!mockData.media[key]) mockData.media[key] = [];
                const url = URL.createObjectURL(file);
                const newMedia = {
                    id: 'mock-media-' + Date.now(),
                    name: file.name,
                    url: url,
                    type: file.type.startsWith('video') ? 'video' : 'image',
                    createdAt: new Date().toISOString().slice(0, 10)
                };
                mockData.media[key].push(newMedia);
                saveMock();
                return newMedia;
            }

            const storageRef = window.__firebase.storage.ref();
            const fileRef = storageRef.child(`media/${clubId}/${Date.now()}_${file.name}`);
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();

            const docRef = await window.__firebase.db.collection('media').add({
                clubId,
                name: file.name,
                url: url,
                type: file.type.startsWith('video') ? 'video' : 'image',
                size: file.size,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("✅ Media uploaded");
            return { id: docRef.id, name: file.name, url, type: file.type.startsWith('video') ? 'video' : 'image' };
        } catch (error) {
            console.error("❌ Error uploading media:", error);
            throw error;
        }
    },

    async deleteMedia(clubId, mediaId) {
        console.log(`📋 Deleting media ${mediaId}`);
        
        if (window.__firebase.useMock) {
            const key = `media_${clubId}`;
            mockData.media[key] = (mockData.media[key] || []).filter(m => m.id !== mediaId);
            saveMock();
            return;
        }

        try {
            const doc = await window.__firebase.db.collection('media').doc(mediaId).get();
            if (doc.exists) {
                const data = doc.data();
                if (data.url && window.__firebase.storage) {
                    try {
                        const storageRef = window.__firebase.storage.refFromURL(data.url);
                        await storageRef.delete();
                    } catch (e) {
                        console.warn("Could not delete from storage:", e);
                    }
                }
            }
            await window.__firebase.db.collection('media').doc(mediaId).delete();
            console.log("✅ Media deleted");
        } catch (error) {
            console.error("❌ Error deleting media:", error);
            throw error;
        }
    }
};

// Make DB globally available
window.DB = DB;
console.log("✅ Database module loaded");
