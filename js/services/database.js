// ============================================================
// DATABASE SERVICE - Add Tracker Methods
// ============================================================

// Add these to your existing DB object:

// ----- TEACHER CLUBS -----
async getTeacherClubs() {
    if (window.__firebase.useMock) {
        // Mock data - return all clubs for demo
        return mockData.clubs.map(name => ({ id: name, name }));
    }
    
    try {
        // Get current user
        const user = window.Auth.getCurrentUser();
        if (!user) throw new Error('User not logged in');
        
        // Query teacher-club assignments
        const snapshot = await window.__firebase.db.collection('teacherClubs')
            .where('teacherId', '==', user.uid)
            .get();
        
        if (snapshot.empty) {
            // If no assignments, return all clubs (admin) or empty
            // For now, return all clubs for demo
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

// ----- ACTIVITIES -----
async getActivities(clubId, period) {
    if (window.__firebase.useMock) {
        const key = `activities_${clubId}_${period}`;
        return mockData[key] || [];
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
    if (window.__firebase.useMock) {
        const key = `activities_${clubId}_${activity.period}`;
        if (!mockData[key]) mockData[key] = [];
        mockData[key].push({ id: 'mock-' + Date.now(), ...activity });
        saveMock();
        return;
    }
    
    try {
        await window.__firebase.db.collection('activities').add({
            clubId,
            ...activity,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("✅ Activity added");
    } catch (error) {
        console.error("❌ Error adding activity:", error);
        throw error;
    }
},

async updateActivityStatus(clubId, activityId, status) {
    if (window.__firebase.useMock) {
        // Update mock data
        Object.keys(mockData).forEach(key => {
            if (key.startsWith('activities_')) {
                const activities = mockData[key];
                const idx = activities.findIndex(a => a.id === activityId);
                if (idx !== -1) {
                    activities[idx].status = status;
                }
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
    if (window.__firebase.useMock) {
        Object.keys(mockData).forEach(key => {
            if (key.startsWith('activities_')) {
                mockData[key] = mockData[key].filter(a => a.id !== activityId);
            }
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

// ----- TASKS -----
async getTasks(clubId) {
    if (window.__firebase.useMock) {
        const key = `tasks_${clubId}`;
        return mockData[key] || [];
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

async addTask(clubId, title, priority) {
    if (window.__firebase.useMock) {
        const key = `tasks_${clubId}`;
        if (!mockData[key]) mockData[key] = [];
        mockData[key].push({
            id: 'mock-task-' + Date.now(),
            title,
            priority: priority || 'medium',
            completed: false,
            createdAt: new Date().toISOString().slice(0, 10)
        });
        saveMock();
        return;
    }
    
    try {
        await window.__firebase.db.collection('tasks').add({
            clubId,
            title,
            priority: priority || 'medium',
            completed: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("✅ Task added");
    } catch (error) {
        console.error("❌ Error adding task:", error);
        throw error;
    }
},

async updateTaskStatus(clubId, taskId, completed) {
    if (window.__firebase.useMock) {
        const key = `tasks_${clubId}`;
        const tasks = mockData[key] || [];
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
    if (window.__firebase.useMock) {
        const key = `tasks_${clubId}`;
        mockData[key] = (mockData[key] || []).filter(t => t.id !== taskId);
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

// ----- MEDIA -----
async getMedia(clubId) {
    if (window.__firebase.useMock) {
        const key = `media_${clubId}`;
        return mockData[key] || [];
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
    if (window.__firebase.useMock) {
        const key = `media_${clubId}`;
        if (!mockData[key]) mockData[key] = [];
        
        // Create a mock URL for demo
        const url = URL.createObjectURL(file);
        mockData[key].push({
            id: 'mock-media-' + Date.now(),
            name: file.name,
            url: url,
            type: file.type.startsWith('video') ? 'video' : 'image',
            createdAt: new Date().toISOString().slice(0, 10)
        });
        saveMock();
        return;
    }
    
    try {
        // Upload to Firebase Storage
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`media/${clubId}/${Date.now()}_${file.name}`);
        await fileRef.put(file);
        const url = await fileRef.getDownloadURL();
        
        // Save metadata to Firestore
        await window.__firebase.db.collection('media').add({
            clubId,
            name: file.name,
            url: url,
            type: file.type.startsWith('video') ? 'video' : 'image',
            size: file.size,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("✅ Media uploaded");
    } catch (error) {
        console.error("❌ Error uploading media:", error);
        throw error;
    }
},

async deleteMedia(clubId, mediaId) {
    if (window.__firebase.useMock) {
        const key = `media_${clubId}`;
        mockData[key] = (mockData[key] || []).filter(m => m.id !== mediaId);
        saveMock();
        return;
    }
    
    try {
        // Get the media document to get the URL for deletion
        const doc = await window.__firebase.db.collection('media').doc(mediaId).get();
        if (doc.exists) {
            const data = doc.data();
            if (data.url) {
                // Delete from Storage
                const storageRef = firebase.storage().refFromURL(data.url);
                await storageRef.delete();
            }
        }
        
        // Delete from Firestore
        await window.__firebase.db.collection('media').doc(mediaId).delete();
        console.log("✅ Media deleted");
    } catch (error) {
        console.error("❌ Error deleting media:", error);
        throw error;
    }
}
