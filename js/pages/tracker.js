// ============================================================
// TRACKER PAGE - Complete with Club Access Control
// ============================================================

const TrackerPage = {
    // ----- RENDER HTML (synchronous) -----
    render: function() {
        return `
        <div id="trackerPage" class="page">
            <div class="section-title">
                <i class="fas fa-chart-simple"></i> Club Tracker
                <span id="trackerClubName" style="font-size: 1rem; font-weight: 400; color: var(--primary);"></span>
            </div>
            
            <!-- Club Selector (only shows clubs assigned to teacher) -->
            <div class="toolbar" id="clubSelectorToolbar">
                <label style="font-weight: 600; color: var(--dark);">
                    <i class="fas fa-users"></i> Select Club:
                </label>
                <select id="trackerClubSelect" style="min-width: 200px;">
                    <option value="">Loading clubs...</option>
                </select>
            </div>
            
            <!-- Period Tabs -->
            <div class="toolbar" style="background: rgba(108, 99, 255, 0.04);">
                <button class="period-tab active" data-period="weekly">
                    <i class="fas fa-calendar-week"></i> Weekly
                </button>
                <button class="period-tab" data-period="monthly">
                    <i class="fas fa-calendar-alt"></i> Monthly
                </button>
                <button class="period-tab" data-period="yearly">
                    <i class="fas fa-calendar-year"></i> Yearly
                </button>
                <div style="flex:1;"></div>
                <button class="btn-primary" id="addActivityBtn">
                    <i class="fas fa-plus"></i> Add Activity
                </button>
            </div>
            
            <!-- Activities Table -->
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th style="width: 15%;">Date</th>
                            <th style="width: 25%;">Activity</th>
                            <th style="width: 20%;">Type</th>
                            <th style="width: 15%;">Status</th>
                            <th style="width: 15%;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="trackerActivitiesBody">
                        <tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--gray);">
                            <i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>
                            <br>Loading activities...
                        </td></tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Stats Summary -->
            <div class="tracker-stats" style="margin-top: 20px;">
                <div class="stat-box"><span id="totalActivities">0</span> Total Activities</div>
                <div class="stat-box"><span id="completedActivities">0</span> Completed</div>
                <div class="stat-box"><span id="pendingActivities">0</span> Pending</div>
            </div>
            
            <!-- Task Manager -->
            <div style="margin-top: 32px;">
                <div class="section-title" style="font-size: 1.2rem;">
                    <i class="fas fa-tasks"></i> Task Manager
                    <span style="font-size: 0.9rem; font-weight: 400; color: var(--gray);">for this club</span>
                </div>
                <div class="toolbar">
                    <input type="text" id="taskInput" placeholder="Add a new task..." style="flex: 1; min-width: 200px;">
                    <select id="taskPriority">
                        <option value="low">Low Priority</option>
                        <option value="medium" selected>Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <button class="btn-primary" id="addTaskBtn">
                        <i class="fas fa-plus"></i> Add Task
                    </button>
                </div>
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 5%;">Done</th>
                                <th style="width: 50%;">Task</th>
                                <th style="width: 15%;">Priority</th>
                                <th style="width: 15%;">Created</th>
                                <th style="width: 15%;">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="trackerTasksBody">
                            <tr><td colspan="5" style="text-align:center; padding: 30px; color: var(--gray);">
                                <i class="fas fa-spinner fa-spin"></i> Loading tasks...
                            </td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Media Upload -->
            <div style="margin-top: 32px;">
                <div class="section-title" style="font-size: 1.2rem;">
                    <i class="fas fa-video"></i> Media Gallery
                    <span style="font-size: 0.9rem; font-weight: 400; color: var(--gray);">upload and manage media</span>
                </div>
                <div class="toolbar">
                    <input type="file" id="mediaUploadInput" accept="video/*,image/*" style="display: none;">
                    <button class="btn-primary" id="mediaUploadBtn">
                        <i class="fas fa-upload"></i> Upload Video/Image
                    </button>
                    <span id="uploadStatus" style="color: var(--gray); font-size: 0.9rem;"></span>
                </div>
                <div id="mediaGallery" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 12px;">
                    <div style="text-align:center; padding: 30px; color: var(--gray);">
                        <i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>
                        <br>Loading media...
                    </div>
                </div>
            </div>
        </div>`;
    },

    // ----- LOAD DATA (async) -----
    loadData: async function() {
        console.log("📊 Loading tracker data...");
        const clubId = document.getElementById('trackerClubSelect')?.value;
        
        if (!clubId) {
            console.log("ℹ️ No club selected");
            return;
        }
        
        try {
            // Get club name
            const clubName = document.getElementById('trackerClubSelect')?.options[
                document.getElementById('trackerClubSelect').selectedIndex
            ]?.text || '';

            document.getElementById('trackerClubName').textContent = `- ${clubName}`;
            
            // Load activities
            await this.loadActivities(clubId);
            
            // Load tasks
            await this.loadTasks(clubId);
            
            // Load media
            await this.loadMedia(clubId);
            
        } catch (error) {
            console.error("❌ Error loading tracker data:", error);
        }
    },

    // ----- LOAD ACTIVITIES -----
    loadActivities: async function(clubId) {
        console.log(`📋 Loading activities for club: ${clubId}`);
        const period = document.querySelector('.period-tab.active')?.dataset.period || 'weekly';
        
        try {
            const activities = await window.DB.getActivities(clubId, period);
            const tbody = document.getElementById('trackerActivitiesBody');
            
            if (!activities || activities.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--gray);">
                    <i class="fas fa-calendar-plus" style="font-size: 2rem; display: block; margin-bottom: 8px;"></i>
                    No activities for this ${period} period. Click "Add Activity" to get started!
                </td></tr>`;
            } else {
                tbody.innerHTML = activities.map(a => `
                    <tr>
                        <td>${a.date || new Date().toISOString().slice(0, 10)}</td>
                        <td><strong>${a.title || 'Untitled'}</strong>
                            ${a.description ? `<br><small style="color: var(--gray);">${a.description}</small>` : ''}
                        </td>
                        <td><span class="badge" style="background: ${this.getTypeColor(a.type)}; color: white;">${a.type || 'General'}</span></td>
                        <td>
                            <select class="activity-status" data-id="${a.id || a._id}" style="padding: 4px 8px;">
                                <option value="pending" ${a.status === 'pending' ? 'selected' : ''}>⏳ Pending</option>
                                <option value="in-progress" ${a.status === 'in-progress' ? 'selected' : ''}>🔄 In Progress</option>
                                <option value="completed" ${a.status === 'completed' ? 'selected' : ''}>✅ Completed</option>
                                <option value="cancelled" ${a.status === 'cancelled' ? 'selected' : ''}>❌ Cancelled</option>
                            </select>
                        </td>
                        <td>
                            <button class="delete-btn delete-activity" data-id="${a.id || a._id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');
                
                // Status change handlers
                document.querySelectorAll('.activity-status').forEach(sel => {
                    sel.addEventListener('change', async function() {
                        const id = this.dataset.id;
                        const status = this.value;
                        const clubId = document.getElementById('trackerClubSelect').value;
                        await window.DB.updateActivityStatus(clubId, id, status);
                        await window.TrackerPage.loadData();
                    });
                });
                
                // Delete handlers
                document.querySelectorAll('.delete-activity').forEach(btn => {
                    btn.addEventListener('click', async function() {
                        if (confirm('Delete this activity?')) {
                            const id = this.dataset.id;
                            const clubId = document.getElementById('trackerClubSelect').value;
                            await window.DB.deleteActivity(clubId, id);
                            await window.TrackerPage.loadData();
                        }
                    });
                });
            }
            
            // Update stats
            this.updateStats(activities);
            
        } catch (error) {
            console.error("❌ Error loading activities:", error);
        }
    },

    // ----- LOAD TASKS -----
    loadTasks: async function(clubId) {
        console.log(`📋 Loading tasks for club: ${clubId}`);
        
        try {
            const tasks = await window.DB.getTasks(clubId);
            const tbody = document.getElementById('trackerTasksBody');
            
            if (!tasks || tasks.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 30px; color: var(--gray);">
                    <i class="fas fa-check-circle" style="font-size: 2rem; display: block; margin-bottom: 8px;"></i>
                    No tasks yet. Add one above!
                </td></tr>`;
            } else {
                tbody.innerHTML = tasks.map(t => `
                    <tr>
                        <td style="text-align:center;">
                            <input type="checkbox" class="task-checkbox" data-id="${t.id || t._id}" ${t.completed ? 'checked' : ''}>
                        </td>
                        <td style="${t.completed ? 'text-decoration: line-through; color: var(--gray);' : ''}">
                            ${t.title}
                        </td>
                        <td>
                            <span class="badge" style="background: ${this.getPriorityColor(t.priority)}; color: white; font-size: 0.7rem;">
                                ${t.priority || 'medium'}
                            </span>
                        </td>
                        <td style="font-size: 0.85rem; color: var(--gray);">${t.createdAt || new Date().toISOString().slice(0, 10)}</td>
                        <td>
                            <button class="delete-btn delete-task" data-id="${t.id || t._id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('');
                
                // Task checkbox handlers
                document.querySelectorAll('.task-checkbox').forEach(cb => {
                    cb.addEventListener('change', async function() {
                        const id = this.dataset.id;
                        const completed = this.checked;
                        const clubId = document.getElementById('trackerClubSelect').value;
                        await window.DB.updateTaskStatus(clubId, id, completed);
                        await window.TrackerPage.loadData();
                    });
                });
                
                // Delete task handlers
                document.querySelectorAll('.delete-task').forEach(btn => {
                    btn.addEventListener('click', async function() {
                        if (confirm('Delete this task?')) {
                            const id = this.dataset.id;
                            const clubId = document.getElementById('trackerClubSelect').value;
                            await window.DB.deleteTask(clubId, id);
                            await window.TrackerPage.loadData();
                        }
                    });
                });
            }
        } catch (error) {
            console.error("❌ Error loading tasks:", error);
        }
    },

    // ----- LOAD MEDIA -----
    loadMedia: async function(clubId) {
        console.log(`📋 Loading media for club: ${clubId}`);
        
        try {
            const media = await window.DB.getMedia(clubId);
            const gallery = document.getElementById('mediaGallery');
            
            if (!media || media.length === 0) {
                gallery.innerHTML = `
                    <div style="text-align:center; padding: 30px; color: var(--gray); grid-column: 1 / -1;">
                        <i class="fas fa-photo-video" style="font-size: 2rem; display: block; margin-bottom: 8px;"></i>
                        No media uploaded yet.
                    </div>
                `;
            } else {
                gallery.innerHTML = media.map(m => `
                    <div style="background: rgba(255,255,255,0.8); border-radius: var(--border-radius-sm); padding: 12px; border: 1px solid var(--gray-light); position: relative;">
                        ${m.type === 'video' ? `
                            <video style="width: 100%; border-radius: 8px; max-height: 150px; object-fit: cover;" controls>
                                <source src="${m.url}" type="video/mp4">
                            </video>
                        ` : `
                            <img src="${m.url}" style="width: 100%; border-radius: 8px; max-height: 150px; object-fit: cover;" alt="${m.name}">
                        `}
                        <div style="margin-top: 8px; font-size: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--dark);">${m.name}</span>
                            <button class="delete-btn delete-media" data-id="${m.id || m._id}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
                
                // Delete media handlers
                document.querySelectorAll('.delete-media').forEach(btn => {
                    btn.addEventListener('click', async function() {
                        if (confirm('Delete this media?')) {
                            const id = this.dataset.id;
                            const clubId = document.getElementById('trackerClubSelect').value;
                            await window.DB.deleteMedia(clubId, id);
                            await window.TrackerPage.loadData();
                        }
                    });
                });
            }
        } catch (error) {
            console.error("❌ Error loading media:", error);
        }
    },

    // ----- UPDATE STATS -----
    updateStats: function(activities) {
        if (!activities) {
            document.getElementById('totalActivities').textContent = '0';
            document.getElementById('completedActivities').textContent = '0';
            document.getElementById('pendingActivities').textContent = '0';
            return;
        }
        
        const total = activities.length;
        const completed = activities.filter(a => a.status === 'completed').length;
        const pending = activities.filter(a => a.status === 'pending' || a.status === 'in-progress').length;
        
        document.getElementById('totalActivities').textContent = total;
        document.getElementById('completedActivities').textContent = completed;
        document.getElementById('pendingActivities').textContent = pending;
    },

    // ----- HELPER: Get priority color -----
    getPriorityColor: function(priority) {
        switch(priority) {
            case 'high': return '#FF6B6B';
            case 'medium': return '#FFB84D';
            case 'low': return '#00D2A0';
            default: return '#6C7A89';
        }
    },

    // ----- HELPER: Get type color -----
    getTypeColor: function(type) {
        switch(type) {
            case 'Training': return '#6C63FF';
            case 'Meeting': return '#FF6584';
            case 'Event': return '#00D2A0';
            case 'Planning': return '#FFB84D';
            case 'Volunteer': return '#4ECDC4';
            default: return '#6C7A89';
        }
    },

    // ----- LOAD CLUBS FOR TEACHER -----
    loadTeacherClubs: async function() {
        console.log("📋 Loading teacher's clubs...");
        const select = document.getElementById('trackerClubSelect');
        
        try {
            const clubs = await window.DB.getTeacherClubs();
            
            if (!clubs || clubs.length === 0) {
                select.innerHTML = `<option value="">No clubs assigned to you</option>`;
                document.getElementById('trackerClubName').textContent = '';
                document.getElementById('trackerActivitiesBody').innerHTML = 
                    `<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--gray);">
                        <i class="fas fa-info-circle" style="font-size: 2rem; display: block; margin-bottom: 8px;"></i>
                        You haven't been assigned to any clubs yet.<br>
                        Contact your administrator.
                    </td></tr>`;
                return;
            }
            
            select.innerHTML = clubs.map(c => 
                `<option value="${c.id}">${c.name}</option>`
            ).join('');
            
            // Auto-select first club and load data
            if (clubs.length > 0) {
                select.value = clubs[0].id;
                await this.loadData();
            }
            
        } catch (error) {
            console.error("❌ Error loading teacher clubs:", error);
            select.innerHTML = `<option value="">Error loading clubs</option>`;
        }
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up tracker events...");
        
        // Club selector change
        document.getElementById('trackerClubSelect').addEventListener('change', async function() {
            await window.TrackerPage.loadData();
        });
        
        // Period tabs
        document.querySelectorAll('.period-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                window.TrackerPage.loadData();
            });
        });
        
        // Add Activity
        document.getElementById('addActivityBtn').addEventListener('click', () => {
            this.showAddActivityModal();
        });
        
        // Add Task
        document.getElementById('addTaskBtn').addEventListener('click', async () => {
            const input = document.getElementById('taskInput');
            const title = input.value.trim();
            if (!title) return alert('Please enter a task description');
            
            const priority = document.getElementById('taskPriority').value;
            const clubId = document.getElementById('trackerClubSelect').value;
            
            if (!clubId) return alert('Please select a club first');
            
            await window.DB.addTask(clubId, title, priority);
            input.value = '';
            await this.loadData();
        });
        
        // Task Enter key
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('addTaskBtn').click();
        });
        
        // Media Upload
        document.getElementById('mediaUploadBtn').addEventListener('click', () => {
            document.getElementById('mediaUploadInput').click();
        });
        
        document.getElementById('mediaUploadInput').addEventListener('change', async function() {
            const file = this.files[0];
            if (!file) return;
            
            const clubId = document.getElementById('trackerClubSelect').value;
            if (!clubId) return alert('Please select a club first');
            
            const statusEl = document.getElementById('uploadStatus');
            statusEl.textContent = '⏳ Uploading...';
            
            try {
                await window.DB.uploadMedia(clubId, file);
                statusEl.textContent = '✅ Upload successful!';
                await window.TrackerPage.loadData();
            } catch (error) {
                statusEl.textContent = '❌ Upload failed: ' + error.message;
            }
            
            this.value = '';
            setTimeout(() => statusEl.textContent = '', 3000);
        });
        
        // Load teacher's clubs
        this.loadTeacherClubs();
    },

    // ----- SHOW ADD ACTIVITY MODAL -----
    showAddActivityModal: function() {
        const clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) return alert('Please select a club first');
        
        // Simple prompt-based modal (you can replace with a nicer modal later)
        const title = prompt('Activity title:');
        if (!title) return;
        
        const description = prompt('Description (optional):') || '';
        const type = prompt('Type (Training/Meeting/Event/Planning/Volunteer):') || 'General';
        const date = prompt('Date (YYYY-MM-DD):') || new Date().toISOString().slice(0, 10);
        const period = document.querySelector('.period-tab.active')?.dataset.period || 'weekly';
        
        window.DB.addActivity(clubId, {
            title,
            description,
            type,
            date,
            period,
            status: 'pending'
        }).then(() => {
            window.TrackerPage.loadData();
        }).catch(error => {
            alert('Error adding activity: ' + error.message);
        });
    }
};

window.TrackerPage = TrackerPage;
console.log("✅ TrackerPage module loaded");
