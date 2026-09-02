// ============================================================
// TRACKER PAGE - Complete with Forms, Student Assignment, Bulk Actions
// ============================================================

var TrackerPage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="trackerPage" class="page">
            <div class="section-title">
                <i class="fas fa-chart-simple"></i> Club Tracker
                <span id="trackerClubName" style="font-size: 1rem; font-weight: 400; color: var(--primary);"></span>
            </div>
            
            <!-- Club Selector -->
            <div class="toolbar" id="clubSelectorToolbar">
                <label style="font-weight: 600; color: var(--dark);">
                    <i class="fas fa-users"></i> Select Club:
                </label>
                <select id="trackerClubSelect" style="min-width: 200px; padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem; cursor: pointer;">
                    <option value="">Loading clubs...</option>
                </select>
            </div>
            
            <!-- Period Tabs + Add Activity Button -->
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
                <button class="btn-primary" id="addActivityBtn" style="background: var(--gradient-primary); border: none; padding: 10px 24px; border-radius: var(--border-radius-sm); color: white; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-family: Inter, sans-serif; font-size: 0.95rem;">
                    <i class="fas fa-plus"></i> Add Activity
                </button>
                <button class="btn-outline" id="bulkActionBtn" style="padding: 10px 20px;">
                    <i class="fas fa-tasks"></i> Bulk Actions
                </button>
            </div>
            
            <!-- Activities Table -->
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th style="width: 5%;"><input type="checkbox" id="selectAllActivities"></th>
                            <th style="width: 15%;">Date</th>
                            <th style="width: 25%;">Activity</th>
                            <th style="width: 20%;">Type</th>
                            <th style="width: 15%;">Status</th>
                            <th style="width: 20%;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="trackerActivitiesBody">
                        <tr><td colspan="6" style="text-align:center; padding: 40px; color: var(--gray);">
                            <i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>
                            <br>Loading activities...
                        </td></tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Stats -->
            <div class="tracker-stats" style="margin-top: 20px;">
                <div class="stat-box"><span id="totalActivities">0</span> Total Activities</div>
                <div class="stat-box"><span id="completedActivities">0</span> Completed</div>
                <div class="stat-box"><span id="pendingActivities">0</span> Pending</div>
                <div class="stat-box"><span id="studentCount">0</span> Students</div>
            </div>
            
            <!-- Task Manager -->
            <div style="margin-top: 32px;">
                <div class="section-title" style="font-size: 1.2rem;">
                    <i class="fas fa-tasks"></i> Task Manager
                    <span style="font-size: 0.9rem; font-weight: 400; color: var(--gray);">for this club</span>
                </div>
                <div class="toolbar">
                    <input type="text" id="taskInput" placeholder="Add a new task..." style="flex: 1; min-width: 200px; padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem;">
                    <select id="taskPriority" style="padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem;">
                        <option value="low">🟢 Low Priority</option>
                        <option value="medium" selected>🟡 Medium Priority</option>
                        <option value="high">🔴 High Priority</option>
                    </select>
                    <select id="taskAssignedTo" style="padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem;">
                        <option value="">Assign to...</option>
                        <option value="John">John</option>
                        <option value="Sarah">Sarah</option>
                        <option value="Mike">Mike</option>
                        <option value="Emma">Emma</option>
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
                                <th style="width: 40%;">Task</th>
                                <th style="width: 15%;">Assigned To</th>
                                <th style="width: 15%;">Priority</th>
                                <th style="width: 10%;">Created</th>
                                <th style="width: 15%;">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="trackerTasksBody">
                            <tr><td colspan="6" style="text-align:center; padding: 30px; color: var(--gray);">
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
                    <input type="file" id="mediaUploadInput" accept="video/*,image/*" style="display: none;" multiple>
                    <button class="btn-primary" id="mediaUploadBtn">
                        <i class="fas fa-upload"></i> Upload Media
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
        </div>
        
        <!-- ADD ACTIVITY MODAL -->
        <div id="addActivityModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
            <div style="background: white; border-radius: var(--border-radius-lg); padding: 40px; max-width: 550px; width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                <h3 style="margin-bottom: 20px; color: var(--dark); display: flex; align-items: center; gap: 12px;">
                    <i class="fas fa-plus-circle" style="color: var(--primary);"></i> Add New Activity
                </h3>
                
                <div class="form-group" style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 6px;">Activity Title *</label>
                    <input type="text" id="activityTitle" placeholder="e.g., Weekly Planning Meeting" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 1rem;">
                </div>
                
                <div class="form-group" style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 6px;">Description</label>
                    <textarea id="activityDescription" placeholder="What will the club do?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 1rem; font-family: Inter, sans-serif;"></textarea>
                </div>
                
                <div class="form-group" style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 6px;">Activity Type *</label>
                    <select id="activityType" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 1rem;">
                        <option value="Meeting">📋 Meeting</option>
                        <option value="Training">🏋️ Training</option>
                        <option value="Event">🎉 Event</option>
                        <option value="Planning">📝 Planning</option>
                        <option value="Volunteer">🤝 Volunteer</option>
                        <option value="Other">📌 Other</option>
                    </select>
                </div>
                
                <div class="form-group" style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 6px;">Date *</label>
                    <input type="date" id="activityDate" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 1rem;">
                </div>
                
                <div class="form-group" style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 6px;">Period *</label>
                    <select id="activityPeriod" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 1rem;">
                        <option value="weekly">📅 Weekly</option>
                        <option value="monthly">📆 Monthly</option>
                        <option value="yearly">📊 Yearly</option>
                    </select>
                </div>
                
                <div class="form-group" style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 6px;">Status</label>
                    <select id="activityStatus" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 1rem;">
                        <option value="pending">⏳ Pending</option>
                        <option value="in-progress">🔄 In Progress</option>
                        <option value="completed">✅ Completed</option>
                    </select>
                </div>
                
                <div class="form-group" style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 6px;">Assign Students</label>
                    <select id="activityStudents" multiple style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 1rem; min-height: 80px;">
                        <option value="all">All Students</option>
                    </select>
                    <small style="color: var(--gray);">Hold Ctrl/Cmd to select multiple</small>
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 20px;">
                    <button class="btn-primary" id="saveActivityBtn" style="flex: 1;">
                        <i class="fas fa-save"></i> Save Activity
                    </button>
                    <button class="btn-outline" id="closeModalBtn" style="flex: 0.5;">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        
        <!-- BULK ACTIONS DROPDOWN -->
        <div id="bulkActionsMenu" style="display: none; position: fixed; background: white; border-radius: var(--border-radius-sm); box-shadow: 0 10px 40px rgba(0,0,0,0.15); padding: 16px; z-index: 999; min-width: 200px;">
            <button class="bulk-action" data-action="complete" style="display: block; width: 100%; padding: 10px 16px; border: none; background: none; cursor: pointer; text-align: left; font-family: Inter, sans-serif; font-size: 0.95rem; border-radius: var(--border-radius-sm); transition: var(--transition);">
                <i class="fas fa-check-circle" style="color: var(--success);"></i> Mark as Completed
            </button>
            <button class="bulk-action" data-action="pending" style="display: block; width: 100%; padding: 10px 16px; border: none; background: none; cursor: pointer; text-align: left; font-family: Inter, sans-serif; font-size: 0.95rem; border-radius: var(--border-radius-sm); transition: var(--transition);">
                <i class="fas fa-clock" style="color: var(--warning);"></i> Mark as Pending
            </button>
            <button class="bulk-action" data-action="delete" style="display: block; width: 100%; padding: 10px 16px; border: none; background: none; cursor: pointer; text-align: left; font-family: Inter, sans-serif; font-size: 0.95rem; border-radius: var(--border-radius-sm); transition: var(--transition); color: var(--danger);">
                <i class="fas fa-trash"></i> Delete Selected
            </button>
        </div>
        `;
    },

    // ----- SHOW EMPTY STATE WITH ACTION -----
    showEmptyState: function(tbody, period) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 40px; color: var(--gray);">' +
            '<i class="fas fa-calendar-plus" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--primary); opacity: 0.6;"></i>' +
            '<h3 style="color: var(--dark); margin-bottom: 8px;">No activities for this ' + period + ' period</h3>' +
            '<p style="margin-bottom: 16px;">Get started by adding your first activity!</p>' +
            '<button class="btn-primary" onclick="document.getElementById(\'addActivityBtn\').click()" style="padding: 10px 28px;">' +
                '<i class="fas fa-plus"></i> Add Activity' +
            '</button>' +
        '</td></tr>';
    },

    // ----- LOAD DATA -----
    loadData: async function() {
        console.log("📊 Loading tracker data...");
        var select = document.getElementById('trackerClubSelect');
        if (!select) return;
        
        var clubId = select.value;
        
        if (!clubId || clubId === '') {
            console.log("ℹ️ No club selected");
            return;
        }
        
        try {
            var clubName = select.options[select.selectedIndex]?.text || '';
            var nameEl = document.getElementById('trackerClubName');
            if (nameEl) nameEl.textContent = '- ' + clubName;
            
            await this.loadActivities(clubId);
            await this.loadTasks(clubId);
            await this.loadMedia(clubId);
            await this.loadStudents(clubId);
            
        } catch (error) {
            console.error("❌ Error loading tracker data:", error);
        }
    },

    // ----- LOAD STUDENTS -----
    loadStudents: async function(clubId) {
        try {
            var students = await window.DB.getStudents();
            var studentCount = document.getElementById('studentCount');
            if (studentCount) studentCount.textContent = students.length || 0;
            
            // Update student dropdown in modal
            var studentSelect = document.getElementById('activityStudents');
            if (studentSelect) {
                studentSelect.innerHTML = '<option value="all">All Students</option>';
                for (var i = 0; i < students.length; i++) {
                    studentSelect.innerHTML += '<option value="' + students[i] + '">' + students[i] + '</option>';
                }
            }
            
            // Update task assignment dropdown
            var taskAssign = document.getElementById('taskAssignedTo');
            if (taskAssign) {
                taskAssign.innerHTML = '<option value="">Assign to...</option>';
                for (var i = 0; i < students.length; i++) {
                    taskAssign.innerHTML += '<option value="' + students[i] + '">' + students[i] + '</option>';
                }
            }
        } catch (error) {
            console.error("❌ Error loading students:", error);
        }
    },

    // ----- LOAD ACTIVITIES -----
    loadActivities: async function(clubId) {
        console.log("📋 Loading activities for club: " + clubId);
        var periodTab = document.querySelector('.period-tab.active');
        var period = periodTab ? periodTab.dataset.period : 'weekly';
        
        try {
            var activities = await window.DB.getActivities(clubId, period);
            var tbody = document.getElementById('trackerActivitiesBody');
            
            if (!tbody) return;
            
            if (!activities || activities.length === 0) {
                this.showEmptyState(tbody, period);
            } else {
                var html = '';
                for (var i = 0; i < activities.length; i++) {
                    var a = activities[i];
                    var statusColor = a.status === 'completed' ? 'var(--success)' : (a.status === 'in-progress' ? 'var(--warning)' : 'var(--gray)');
                    html += '<tr>' +
                        '<td style="text-align:center;"><input type="checkbox" class="activity-checkbox" data-id="' + (a.id || a._id) + '"></td>' +
                        '<td>' + (a.date || new Date().toISOString().slice(0, 10)) + '</td>' +
                        '<td><strong>' + (a.title || 'Untitled') + '</strong>' +
                            (a.description ? '<br><small style="color: var(--gray);">' + a.description + '</small>' : '') +
                            (a.students ? '<br><small style="color: var(--primary);"><i class="fas fa-user"></i> ' + a.students.join(', ') + '</small>' : '') +
                        '</td>' +
                        '<td><span class="badge" style="background: ' + this.getTypeColor(a.type) + '; color: white; padding: 4px 12px; border-radius: 40px; font-size: 0.8rem; font-weight: 600;">' + (a.type || 'General') + '</span></td>' +
                        '<td>' +
                            '<select class="activity-status" data-id="' + (a.id || a._id) + '" style="padding: 4px 8px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-family: Inter, sans-serif; font-size: 0.85rem; cursor: pointer;">' +
                                '<option value="pending" ' + (a.status === 'pending' ? 'selected' : '') + '>⏳ Pending</option>' +
                                '<option value="in-progress" ' + (a.status === 'in-progress' ? 'selected' : '') + '>🔄 In Progress</option>' +
                                '<option value="completed" ' + (a.status === 'completed' ? 'selected' : '') + '>✅ Completed</option>' +
                                '<option value="cancelled" ' + (a.status === 'cancelled' ? 'selected' : '') + '>❌ Cancelled</option>' +
                            '</select>' +
                        '</td>' +
                        '<td>' +
                            '<button class="delete-btn delete-activity" data-id="' + (a.id || a._id) + '" style="background: none; border: none; color: var(--gray); cursor: pointer; padding: 4px 8px; border-radius: var(--border-radius-sm); transition: var(--transition);">' +
                                '<i class="fas fa-edit" style="margin-right: 4px;"></i>' +
                                '<i class="fas fa-trash"></i>' +
                            '</button>' +
                        '</td>' +
                    '</tr>';
                }
                tbody.innerHTML = html;
                
                this.setupActivityHandlers();
            }
            
            this.updateStats(activities);
            
        } catch (error) {
            console.error("❌ Error loading activities:", error);
        }
    },

    // ----- SETUP ACTIVITY HANDLERS -----
    setupActivityHandlers: function() {
        // Status change handlers
        document.querySelectorAll('.activity-status').forEach(function(sel) {
            sel.addEventListener('change', function() {
                var id = this.dataset.id;
                var status = this.value;
                var clubId = document.getElementById('trackerClubSelect').value;
                window.DB.updateActivityStatus(clubId, id, status).then(function() {
                    window.TrackerPage.loadData();
                }).catch(function(error) {
                    console.error("❌ Error updating status:", error);
                });
            });
        });
        
        // Delete handlers
        document.querySelectorAll('.delete-activity').forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (confirm('Delete this activity?')) {
                    var id = this.dataset.id;
                    var clubId = document.getElementById('trackerClubSelect').value;
                    window.DB.deleteActivity(clubId, id).then(function() {
                        window.TrackerPage.loadData();
                    }).catch(function(error) {
                        console.error("❌ Error deleting activity:", error);
                    });
                }
            });
        });
        
        // Select all checkbox
        var selectAll = document.getElementById('selectAllActivities');
        if (selectAll) {
            selectAll.addEventListener('change', function() {
                document.querySelectorAll('.activity-checkbox').forEach(function(cb) {
                    cb.checked = this.checked;
                }, this);
            });
        }
    },

    // ----- LOAD TASKS -----
    loadTasks: async function(clubId) {
        console.log("📋 Loading tasks for club: " + clubId);
        
        try {
            var tasks = await window.DB.getTasks(clubId);
            var tbody = document.getElementById('trackerTasksBody');
            
            if (!tbody) return;
            
            if (!tasks || tasks.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 30px; color: var(--gray);">' +
                    '<i class="fas fa-check-circle" style="font-size: 2rem; display: block; margin-bottom: 8px; color: var(--primary); opacity: 0.6;"></i>' +
                    '<h4 style="color: var(--dark); margin-bottom: 4px;">No tasks yet</h4>' +
                    '<p style="font-size: 0.9rem;">Add a task using the form above!</p>' +
                '</td></tr>';
            } else {
                var html = '';
                for (var i = 0; i < tasks.length; i++) {
                    var t = tasks[i];
                    var checked = t.completed ? 'checked' : '';
                    var doneStyle = t.completed ? 'text-decoration: line-through; color: var(--gray);' : '';
                    var priorityColor = t.priority === 'high' ? '#FF6B6B' : (t.priority === 'medium' ? '#FFB84D' : '#00D2A0');
                    html += '<tr>' +
                        '<td style="text-align:center;">' +
                            '<input type="checkbox" class="task-checkbox" data-id="' + (t.id || t._id) + '" ' + checked + ' style="width: 20px; height: 20px; cursor: pointer; accent-color: var(--primary);">' +
                        '</td>' +
                        '<td style="' + doneStyle + '">' + t.title + '</td>' +
                        '<td>' + (t.assignedTo || 'Unassigned') + '</td>' +
                        '<td>' +
                            '<span style="background: ' + priorityColor + '; color: white; padding: 2px 10px; border-radius: 40px; font-size: 0.7rem; font-weight: 600;">' +
                                (t.priority || 'medium').toUpperCase() +
                            '</span>' +
                        '</td>' +
                        '<td style="font-size: 0.85rem; color: var(--gray);">' + (t.createdAt || new Date().toISOString().slice(0, 10)) + '</td>' +
                        '<td>' +
                            '<button class="delete-btn delete-task" data-id="' + (t.id || t._id) + '" style="background: none; border: none; color: var(--gray); cursor: pointer; padding: 4px 8px; border-radius: var(--border-radius-sm);">' +
                                '<i class="fas fa-trash"></i>' +
                            '</button>' +
                        '</td>' +
                    '</tr>';
                }
                tbody.innerHTML = html;
                
                // Task checkbox handlers
                document.querySelectorAll('.task-checkbox').forEach(function(cb) {
                    cb.addEventListener('change', function() {
                        var id = this.dataset.id;
                        var completed = this.checked;
                        var clubId = document.getElementById('trackerClubSelect').value;
                        window.DB.updateTaskStatus(clubId, id, completed).then(function() {
                            window.TrackerPage.loadData();
                        }).catch(function(error) {
                            console.error("❌ Error updating task:", error);
                        });
                    });
                });
                
                // Delete task handlers
                document.querySelectorAll('.delete-task').forEach(function(btn) {
                    btn.addEventListener('click', function() {
                        if (confirm('Delete this task?')) {
                            var id = this.dataset.id;
                            var clubId = document.getElementById('trackerClubSelect').value;
                            window.DB.deleteTask(clubId, id).then(function() {
                                window.TrackerPage.loadData();
                            }).catch(function(error) {
                                console.error("❌ Error deleting task:", error);
                            });
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
        console.log("📋 Loading media for club: " + clubId);
        
        try {
            var media = await window.DB.getMedia(clubId);
            var gallery = document.getElementById('mediaGallery');
            
            if (!gallery) return;
            
            if (!media || media.length === 0) {
                gallery.innerHTML = '<div style="text-align:center; padding: 30px; color: var(--gray); grid-column: 1 / -1;">' +
                    '<i class="fas fa-photo-video" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--primary); opacity: 0.6;"></i>' +
                    '<h4 style="color: var(--dark);">No media uploaded yet</h4>' +
                    '<p style="font-size: 0.9rem;">Upload photos or videos of your club activities!</p>' +
                    '<button class="btn-primary" onclick="document.getElementById(\'mediaUploadBtn\').click()" style="margin-top: 8px; padding: 8px 20px;">' +
                        '<i class="fas fa-upload"></i> Upload Now' +
                    '</button>' +
                '</div>';
            } else {
                var html = '';
                for (var i = 0; i < media.length; i++) {
                    var m = media[i];
                    html += '<div style="background: rgba(255,255,255,0.8); border-radius: var(--border-radius-sm); padding: 12px; border: 1px solid var(--gray-light); position: relative;">';
                    if (m.type === 'video') {
                        html += '<video style="width: 100%; border-radius: 8px; max-height: 150px; object-fit: cover;" controls>' +
                            '<source src="' + m.url + '" type="video/mp4">' +
                        '</video>';
                    } else {
                        html += '<img src="' + m.url + '" style="width: 100%; border-radius: 8px; max-height: 150px; object-fit: cover;" alt="' + m.name + '">';
                    }
                    html += '<div style="margin-top: 8px; font-size: 0.8rem; display: flex; justify-content: space-between; align-items: center;">' +
                        '<span style="color: var(--dark);">' + m.name + '</span>' +
                        '<button class="delete-btn delete-media" data-id="' + (m.id || m._id) + '" style="background: none; border: none; color: var(--gray); cursor: pointer; padding: 4px 8px;">' +
                            '<i class="fas fa-times"></i>' +
                        '</button>' +
                    '</div></div>';
                }
                gallery.innerHTML = html;
                
                document.querySelectorAll('.delete-media').forEach(function(btn) {
                    btn.addEventListener('click', function() {
                        if (confirm('Delete this media?')) {
                            var id = this.dataset.id;
                            var clubId = document.getElementById('trackerClubSelect').value;
                            window.DB.deleteMedia(clubId, id).then(function() {
                                window.TrackerPage.loadData();
                            }).catch(function(error) {
                                console.error("❌ Error deleting media:", error);
                            });
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
        var totalEl = document.getElementById('totalActivities');
        var completedEl = document.getElementById('completedActivities');
        var pendingEl = document.getElementById('pendingActivities');
        
        if (!activities) {
            if (totalEl) totalEl.textContent = '0';
            if (completedEl) completedEl.textContent = '0';
            if (pendingEl) pendingEl.textContent = '0';
            return;
        }
        
        var total = activities.length;
        var completed = 0;
        var pending = 0;
        
        for (var i = 0; i < activities.length; i++) {
            if (activities[i].status === 'completed') {
                completed++;
            } else if (activities[i].status === 'pending' || activities[i].status === 'in-progress') {
                pending++;
            }
        }
        
        if (totalEl) totalEl.textContent = total;
        if (completedEl) completedEl.textContent = completed;
        if (pendingEl) pendingEl.textContent = pending;
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
        var select = document.getElementById('trackerClubSelect');
        if (!select) return;
        
        try {
            var clubs = await window.DB.getTeacherClubs();
            
            if (!clubs || clubs.length === 0) {
                select.innerHTML = '<option value="">No clubs assigned to you</option>';
                var nameEl = document.getElementById('trackerClubName');
                if (nameEl) nameEl.textContent = '';
                var tbody = document.getElementById('trackerActivitiesBody');
                if (tbody) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 40px; color: var(--gray);">' +
                        '<i class="fas fa-info-circle" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--primary); opacity: 0.6;"></i>' +
                        '<h3 style="color: var(--dark);">No Clubs Assigned</h3>' +
                        '<p>You haven\'t been assigned to any clubs yet.<br>Contact your administrator to get started.</p>' +
                    '</td></tr>';
                }
                return;
            }
            
            var options = '';
            for (var i = 0; i < clubs.length; i++) {
                options += '<option value="' + clubs[i].id + '">' + clubs[i].name + '</option>';
            }
            select.innerHTML = options;
            
            if (clubs.length > 0) {
                select.value = clubs[0].id;
                await this.loadData();
            }
            
        } catch (error) {
            console.error("❌ Error loading teacher clubs:", error);
            select.innerHTML = '<option value="">Error loading clubs</option>';
        }
    },

    // ----- SHOW ADD ACTIVITY MODAL -----
    showAddActivityModal: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        // Set default date
        var today = new Date().toISOString().slice(0, 10);
        document.getElementById('activityDate').value = today;
        
        // Show modal
        var modal = document.getElementById('addActivityModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    },

    // ----- SAVE ACTIVITY FROM MODAL -----
    saveActivity: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        var title = document.getElementById('activityTitle').value.trim();
        if (!title) {
            alert('Please enter an activity title');
            document.getElementById('activityTitle').focus();
            return;
        }
        
        var description = document.getElementById('activityDescription').value.trim();
        var type = document.getElementById('activityType').value;
        var date = document.getElementById('activityDate').value;
        var period = document.getElementById('activityPeriod').value;
        var status = document.getElementById('activityStatus').value;
        var studentSelect = document.getElementById('activityStudents');
        var selectedStudents = [];
        for (var i = 0; i < studentSelect.options.length; i++) {
            if (studentSelect.options[i].selected) {
                selectedStudents.push(studentSelect.options[i].value);
            }
        }
        
        if (selectedStudents.includes('all')) {
            // Get all students from the dropdown
            var allStudents = [];
            for (var i = 0; i < studentSelect.options.length; i++) {
                var val = studentSelect.options[i].value;
                if (val !== 'all') allStudents.push(val);
            }
            selectedStudents = allStudents;
        }
        
        window.DB.addActivity(clubId, {
            title: title,
            description: description,
            type: type,
            date: date,
            period: period,
            status: status,
            students: selectedStudents
        }).then(function() {
            console.log("✅ Activity added successfully!");
            window.TrackerPage.loadData();
            window.TrackerPage.closeModal();
        }).catch(function(error) {
            console.error("❌ Error adding activity:", error);
            alert('Error adding activity: ' + error.message);
        });
    },

    // ----- CLOSE MODAL -----
    closeModal: function() {
        var modal = document.getElementById('addActivityModal');
        if (modal) {
            modal.style.display = 'none';
        }
        // Reset form
        document.getElementById('activityTitle').value = '';
        document.getElementById('activityDescription').value = '';
        document.getElementById('activityStatus').value = 'pending';
    },

    // ----- BULK ACTIONS -----
    showBulkActions: function(event) {
        var menu = document.getElementById('bulkActionsMenu');
        if (!menu) return;
        
        // Position the menu
        var rect = event.target.getBoundingClientRect();
        menu.style.top = (rect.bottom + 8) + 'px';
        menu.style.left = rect.left + 'px';
        
        // Toggle visibility
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
            // Close when clicking outside
            setTimeout(function() {
                document.addEventListener('click', function closeMenu(e) {
                    if (!menu.contains(e.target) && e.target.id !== 'bulkActionBtn') {
                        menu.style.display = 'none';
                        document.removeEventListener('click', closeMenu);
                    }
                });
            }, 10);
        }
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up tracker events...");
        var self = this;
        
        var select = document.getElementById('trackerClubSelect');
        if (select) {
            select.addEventListener('change', function() {
                self.loadData();
            });
        }
        
        var periodTabs = document.querySelectorAll('.period-tab');
        periodTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.period-tab').forEach(function(t) {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                self.loadData();
            });
        });
        
        // Add Activity button
        var addBtn = document.getElementById('addActivityBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                self.showAddActivityModal();
            });
        }
        
        // Modal buttons
        var saveBtn = document.getElementById('saveActivityBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                self.saveActivity();
            });
        }
        
        var closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                self.closeModal();
            });
        }
        
        // Close modal on click outside
        var modal = document.getElementById('addActivityModal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    self.closeModal();
                }
            });
        }
        
        // Bulk Actions
        var bulkBtn = document.getElementById('bulkActionBtn');
        if (bulkBtn) {
            bulkBtn.addEventListener('click', function(e) {
                self.showBulkActions(e);
            });
        }
        
        // Bulk action handlers
        document.querySelectorAll('.bulk-action').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var action = this.dataset.action;
                var clubId = document.getElementById('trackerClubSelect').value;
                var selected = document.querySelectorAll('.activity-checkbox:checked');
                
                if (selected.length === 0) {
                    alert('Please select at least one activity');
                    return;
                }
                
                var ids = [];
                selected.forEach(function(cb) {
                    ids.push(cb.dataset.id);
                });
                
                if (action === 'delete') {
                    if (!confirm('Delete ' + ids.length + ' selected activities?')) return;
                    ids.forEach(function(id) {
                        window.DB.deleteActivity(clubId, id).then(function() {
                            self.loadData();
                        });
                    });
                } else {
                    var status = action === 'complete' ? 'completed' : 'pending';
                    ids.forEach(function(id) {
                        window.DB.updateActivityStatus(clubId, id, status).then(function() {
                            self.loadData();
                        });
                    });
                }
                
                document.getElementById('bulkActionsMenu').style.display = 'none';
            });
        });
        
        // Add Task
        var addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', function() {
                var input = document.getElementById('taskInput');
                var title = input.value.trim();
                if (!title) {
                    alert('Please enter a task description');
                    return;
                }
                
                var priority = document.getElementById('taskPriority').value;
                var assignedTo = document.getElementById('taskAssignedTo').value;
                var clubId = document.getElementById('trackerClubSelect').value;
                
                if (!clubId) {
                    alert('Please select a club first');
                    return;
                }
                
                window.DB.addTask(clubId, title, priority, assignedTo).then(function() {
                    input.value = '';
                    self.loadData();
                }).catch(function(error) {
                    alert('Error adding task: ' + error.message);
                });
            });
        }
        
        var taskInput = document.getElementById('taskInput');
        if (taskInput) {
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    var btn = document.getElementById('addTaskBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        // Media Upload
        var uploadBtn = document.getElementById('mediaUploadBtn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', function() {
                document.getElementById('mediaUploadInput').click();
            });
        }
        
        var uploadInput = document.getElementById('mediaUploadInput');
        if (uploadInput) {
            uploadInput.addEventListener('change', function() {
                var files = this.files;
                if (!files || files.length === 0) return;
                
                var clubId = document.getElementById('trackerClubSelect').value;
                if (!clubId) {
                    alert('Please select a club first');
                    return;
                }
                
                var statusEl = document.getElementById('uploadStatus');
                var uploaded = 0;
                
                for (var i = 0; i < files.length; i++) {
                    statusEl.textContent = '⏳ Uploading ' + (i + 1) + '/' + files.length + '...';
                    (function(file, index) {
                        window.DB.uploadMedia(clubId, file).then(function() {
                            uploaded++;
                            if (uploaded === files.length) {
                                statusEl.textContent = '✅ ' + files.length + ' files uploaded successfully!';
                                self.loadData();
                                setTimeout(function() {
                                    if (statusEl) statusEl.textContent = '';
                                }, 3000);
                            }
                        }).catch(function(error) {
                            statusEl.textContent = '❌ Upload failed: ' + error.message;
                        });
                    })(files[i], i);
                }
                this.value = '';
            });
        }
        
        this.loadTeacherClubs();
    }
};

window.TrackerPage = TrackerPage;
console.log("✅ TrackerPage module loaded");
