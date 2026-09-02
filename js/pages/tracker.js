// ============================================================
// TRACKER PAGE - Complete with Club Access Control (IMPROVED)
// ============================================================

var TrackerPage = {
    // ----- RENDER HTML (synchronous) -----
    render: function() {
        return '<div id="trackerPage" class="page">' +
            '<div class="section-title">' +
                '<i class="fas fa-chart-simple"></i> Club Tracker' +
                '<span id="trackerClubName" style="font-size: 1rem; font-weight: 400; color: var(--primary);"></span>' +
            '</div>' +
            
            // Club Selector
            '<div class="toolbar" id="clubSelectorToolbar">' +
                '<label style="font-weight: 600; color: var(--dark);">' +
                    '<i class="fas fa-users"></i> Select Club:' +
                '</label>' +
                '<select id="trackerClubSelect" style="min-width: 200px;">' +
                    '<option value="">Loading clubs...</option>' +
                '</select>' +
            '</div>' +
            
            // Period Tabs + Add Activity Button
            '<div class="toolbar" style="background: rgba(108, 99, 255, 0.04);">' +
                '<button class="period-tab active" data-period="weekly">' +
                    '<i class="fas fa-calendar-week"></i> Weekly' +
                '</button>' +
                '<button class="period-tab" data-period="monthly">' +
                    '<i class="fas fa-calendar-alt"></i> Monthly' +
                '</button>' +
                '<button class="period-tab" data-period="yearly">' +
                    '<i class="fas fa-calendar-year"></i> Yearly' +
                '</button>' +
                '<div style="flex:1;"></div>' +
                '<button class="btn-primary" id="addActivityBtn" style="background: var(--gradient-primary); border: none; padding: 10px 24px; border-radius: var(--border-radius-sm); color: white; font-weight: 600; cursor: pointer; transition: var(--transition); display: inline-flex; align-items: center; gap: 8px; font-family: Inter, sans-serif; font-size: 0.95rem;">' +
                    '<i class="fas fa-plus"></i> Add Activity' +
                '</button>' +
            '</div>' +
            
            // Activities Table
            '<div class="table-wrap">' +
                '<table>' +
                    '<thead>' +
                        '<tr>' +
                            '<th style="width: 15%;">Date</th>' +
                            '<th style="width: 25%;">Activity</th>' +
                            '<th style="width: 20%;">Type</th>' +
                            '<th style="width: 15%;">Status</th>' +
                            '<th style="width: 15%;">Actions</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody id="trackerActivitiesBody">' +
                        '<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--gray);">' +
                            '<i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>' +
                            '<br>Loading activities...' +
                        '</td></tr>' +
                    '</tbody>' +
                '</table>' +
            '</div>' +
            
            // Stats
            '<div class="tracker-stats" style="margin-top: 20px;">' +
                '<div class="stat-box"><span id="totalActivities">0</span> Total Activities</div>' +
                '<div class="stat-box"><span id="completedActivities">0</span> Completed</div>' +
                '<div class="stat-box"><span id="pendingActivities">0</span> Pending</div>' +
            '</div>' +
            
            // Task Manager
            '<div style="margin-top: 32px;">' +
                '<div class="section-title" style="font-size: 1.2rem;">' +
                    '<i class="fas fa-tasks"></i> Task Manager' +
                    '<span style="font-size: 0.9rem; font-weight: 400; color: var(--gray);">for this club</span>' +
                '</div>' +
                '<div class="toolbar">' +
                    '<input type="text" id="taskInput" placeholder="Add a new task..." style="flex: 1; min-width: 200px; padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem; transition: var(--transition); font-family: Inter, sans-serif;">' +
                    '<select id="taskPriority" style="padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem; transition: var(--transition); font-family: Inter, sans-serif;">' +
                        '<option value="low">Low Priority</option>' +
                        '<option value="medium" selected>Medium Priority</option>' +
                        '<option value="high">High Priority</option>' +
                    '</select>' +
                    '<button class="btn-primary" id="addTaskBtn">' +
                        '<i class="fas fa-plus"></i> Add Task' +
                    '</button>' +
                '</div>' +
                '<div class="table-wrap">' +
                    '<table>' +
                        '<thead>' +
                            '<tr>' +
                                '<th style="width: 5%;">Done</th>' +
                                '<th style="width: 50%;">Task</th>' +
                                '<th style="width: 15%;">Priority</th>' +
                                '<th style="width: 15%;">Created</th>' +
                                '<th style="width: 15%;">Actions</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody id="trackerTasksBody">' +
                            '<tr><td colspan="5" style="text-align:center; padding: 30px; color: var(--gray);">' +
                                '<i class="fas fa-spinner fa-spin"></i> Loading tasks...' +
                            '</td></tr>' +
                        '</tbody>' +
                    '</table>' +
                '</div>' +
            '</div>' +
            
            // Media Upload
            '<div style="margin-top: 32px;">' +
                '<div class="section-title" style="font-size: 1.2rem;">' +
                    '<i class="fas fa-video"></i> Media Gallery' +
                    '<span style="font-size: 0.9rem; font-weight: 400; color: var(--gray);">upload and manage media</span>' +
                '</div>' +
                '<div class="toolbar">' +
                    '<input type="file" id="mediaUploadInput" accept="video/*,image/*" style="display: none;">' +
                    '<button class="btn-primary" id="mediaUploadBtn">' +
                        '<i class="fas fa-upload"></i> Upload Video/Image' +
                    '</button>' +
                    '<span id="uploadStatus" style="color: var(--gray); font-size: 0.9rem;"></span>' +
                '</div>' +
                '<div id="mediaGallery" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 12px;">' +
                    '<div style="text-align:center; padding: 30px; color: var(--gray);">' +
                        '<i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>' +
                        '<br>Loading media...' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    },

    // ----- SHOW EMPTY STATE WITH ACTION -----
    showEmptyState: function(tbody, period) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--gray);">' +
            '<i class="fas fa-calendar-plus" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--primary); opacity: 0.6;"></i>' +
            '<h3 style="color: var(--dark); margin-bottom: 8px;">No activities for this ' + period + ' period</h3>' +
            '<p style="margin-bottom: 16px;">Get started by adding your first activity!</p>' +
            '<button class="btn-primary" onclick="document.getElementById(\'addActivityBtn\').click()" style="padding: 10px 28px;">' +
                '<i class="fas fa-plus"></i> Add Activity' +
            '</button>' +
        '</td></tr>';
    },

    // ----- LOAD DATA (async) -----
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
            
        } catch (error) {
            console.error("❌ Error loading tracker data:", error);
            var tbody = document.getElementById('trackerActivitiesBody');
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--danger);">' +
                    '<i class="fas fa-exclamation-circle" style="font-size: 2rem; display: block; margin-bottom: 8px;"></i>' +
                    'Error loading data: ' + error.message +
                    '</td></tr>';
            }
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
                    html += '<tr>' +
                        '<td>' + (a.date || new Date().toISOString().slice(0, 10)) + '</td>' +
                        '<td><strong>' + (a.title || 'Untitled') + '</strong>' +
                            (a.description ? '<br><small style="color: var(--gray);">' + a.description + '</small>' : '') +
                        '</td>' +
                        '<td><span class="badge" style="background: ' + this.getTypeColor(a.type) + '; color: white; padding: 4px 12px; border-radius: 40px; font-size: 0.8rem; font-weight: 600;">' + (a.type || 'General') + '</span></td>' +
                        '<td>' +
                            '<select class="activity-status" data-id="' + (a.id || a._id) + '" style="padding: 4px 8px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-family: Inter, sans-serif; font-size: 0.85rem; cursor: pointer; transition: var(--transition);">' +
                                '<option value="pending" ' + (a.status === 'pending' ? 'selected' : '') + '>⏳ Pending</option>' +
                                '<option value="in-progress" ' + (a.status === 'in-progress' ? 'selected' : '') + '>🔄 In Progress</option>' +
                                '<option value="completed" ' + (a.status === 'completed' ? 'selected' : '') + '>✅ Completed</option>' +
                                '<option value="cancelled" ' + (a.status === 'cancelled' ? 'selected' : '') + '>❌ Cancelled</option>' +
                            '</select>' +
                        '</td>' +
                        '<td>' +
                            '<button class="delete-btn delete-activity" data-id="' + (a.id || a._id) + '" style="background: none; border: none; color: var(--gray); cursor: pointer; padding: 4px 12px; border-radius: var(--border-radius-sm); transition: var(--transition); font-size: 0.9rem;">' +
                                '<i class="fas fa-trash"></i>' +
                            '</button>' +
                        '</td>' +
                    '</tr>';
                }
                tbody.innerHTML = html;
                
                // Status change handlers
                var statusSelects = document.querySelectorAll('.activity-status');
                for (var j = 0; j < statusSelects.length; j++) {
                    (function(sel) {
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
                    })(statusSelects[j]);
                }
                
                // Delete handlers
                var deleteBtns = document.querySelectorAll('.delete-activity');
                for (var k = 0; k < deleteBtns.length; k++) {
                    (function(btn) {
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
                    })(deleteBtns[k]);
                }
            }
            
            this.updateStats(activities);
            
        } catch (error) {
            console.error("❌ Error loading activities:", error);
            var tbody = document.getElementById('trackerActivitiesBody');
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--danger);">' +
                    '<i class="fas fa-exclamation-circle" style="font-size: 2rem; display: block; margin-bottom: 8px;"></i>' +
                    'Error loading activities: ' + error.message +
                    '</td></tr>';
            }
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
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 30px; color: var(--gray);">' +
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
                    html += '<tr>' +
                        '<td style="text-align:center;">' +
                            '<input type="checkbox" class="task-checkbox" data-id="' + (t.id || t._id) + '" ' + checked + ' style="width: 20px; height: 20px; cursor: pointer; accent-color: var(--primary); border-radius: 4px; transition: var(--transition);">' +
                        '</td>' +
                        '<td style="' + doneStyle + '">' + t.title + '</td>' +
                        '<td>' +
                            '<span class="badge" style="background: ' + this.getPriorityColor(t.priority) + '; color: white; font-size: 0.7rem; padding: 2px 10px; border-radius: 40px;">' +
                                (t.priority || 'medium') +
                            '</span>' +
                        '</td>' +
                        '<td style="font-size: 0.85rem; color: var(--gray);">' + (t.createdAt || new Date().toISOString().slice(0, 10)) + '</td>' +
                        '<td>' +
                            '<button class="delete-btn delete-task" data-id="' + (t.id || t._id) + '" style="background: none; border: none; color: var(--gray); cursor: pointer; padding: 4px 12px; border-radius: var(--border-radius-sm); transition: var(--transition); font-size: 0.9rem;">' +
                                '<i class="fas fa-trash"></i>' +
                            '</button>' +
                        '</td>' +
                    '</tr>';
                }
                tbody.innerHTML = html;
                
                // Task checkbox handlers
                var checkboxes = document.querySelectorAll('.task-checkbox');
                for (var j = 0; j < checkboxes.length; j++) {
                    (function(cb) {
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
                    })(checkboxes[j]);
                }
                
                // Delete task handlers
                var deleteBtns = document.querySelectorAll('.delete-task');
                for (var k = 0; k < deleteBtns.length; k++) {
                    (function(btn) {
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
                    })(deleteBtns[k]);
                }
            }
        } catch (error) {
            console.error("❌ Error loading tasks:", error);
            var tbody = document.getElementById('trackerTasksBody');
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 30px; color: var(--danger);">' +
                    '<i class="fas fa-exclamation-circle"></i> Error loading tasks: ' + error.message +
                    '</td></tr>';
            }
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
                        '<button class="delete-btn delete-media" data-id="' + (m.id || m._id) + '" style="background: none; border: none; color: var(--gray); cursor: pointer; padding: 4px 12px; border-radius: var(--border-radius-sm); transition: var(--transition);">' +
                            '<i class="fas fa-times"></i>' +
                        '</button>' +
                    '</div></div>';
                }
                gallery.innerHTML = html;
                
                // Delete media handlers
                var deleteBtns = document.querySelectorAll('.delete-media');
                for (var j = 0; j < deleteBtns.length; j++) {
                    (function(btn) {
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
                    })(deleteBtns[j]);
                }
            }
        } catch (error) {
            console.error("❌ Error loading media:", error);
            var gallery = document.getElementById('mediaGallery');
            if (gallery) {
                gallery.innerHTML = '<div style="text-align:center; padding: 30px; color: var(--danger); grid-column: 1 / -1;">' +
                    '<i class="fas fa-exclamation-circle" style="font-size: 2rem; display: block; margin-bottom: 8px;"></i>' +
                    'Error loading media: ' + error.message +
                    '</div>';
            }
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
                    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--gray);">' +
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
        for (var i = 0; i < periodTabs.length; i++) {
            (function(tab) {
                tab.addEventListener('click', function() {
                    var tabs = document.querySelectorAll('.period-tab');
                    for (var j = 0; j < tabs.length; j++) {
                        tabs[j].classList.remove('active');
                    }
                    this.classList.add('active');
                    self.loadData();
                });
            })(periodTabs[i]);
        }
        
        var addBtn = document.getElementById('addActivityBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                self.showAddActivityModal();
            });
        }
        
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
                var clubId = document.getElementById('trackerClubSelect').value;
                
                if (!clubId) {
                    alert('Please select a club first');
                    return;
                }
                
                window.DB.addTask(clubId, title, priority).then(function() {
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
        
        var uploadBtn = document.getElementById('mediaUploadBtn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', function() {
                document.getElementById('mediaUploadInput').click();
            });
        }
        
        var uploadInput = document.getElementById('mediaUploadInput');
        if (uploadInput) {
            uploadInput.addEventListener('change', function() {
                var file = this.files[0];
                if (!file) return;
                
                var clubId = document.getElementById('trackerClubSelect').value;
                if (!clubId) {
                    alert('Please select a club first');
                    return;
                }
                
                var statusEl = document.getElementById('uploadStatus');
                statusEl.textContent = '⏳ Uploading...';
                
                window.DB.uploadMedia(clubId, file).then(function() {
                    statusEl.textContent = '✅ Upload successful!';
                    self.loadData();
                }).catch(function(error) {
                    statusEl.textContent = '❌ Upload failed: ' + error.message;
                });
                
                this.value = '';
                setTimeout(function() {
                    if (statusEl) statusEl.textContent = '';
                }, 3000);
            });
        }
        
        this.loadTeacherClubs();
    },

    // ----- SHOW ADD ACTIVITY MODAL (Improved) -----
    showAddActivityModal: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        // Create a simple modal using prompt for now
        // In a production app, you'd use a proper modal
        var title = prompt('📝 Activity title:');
        if (!title) return;
        
        var description = prompt('📄 Description (optional):') || '';
        var type = prompt('🏷️ Type (Training/Meeting/Event/Planning/Volunteer):') || 'General';
        var date = prompt('📅 Date (YYYY-MM-DD):') || new Date().toISOString().slice(0, 10);
        var periodTab = document.querySelector('.period-tab.active');
        var period = periodTab ? periodTab.dataset.period : 'weekly';
        
        console.log("📝 Adding activity:", { title, description, type, date, period, status: 'pending' });
        
        window.DB.addActivity(clubId, {
            title: title,
            description: description,
            type: type,
            date: date,
            period: period,
            status: 'pending'
        }).then(function() {
            console.log("✅ Activity added successfully!");
            window.TrackerPage.loadData();
        }).catch(function(error) {
            console.error("❌ Error adding activity:", error);
            alert('Error adding activity: ' + error.message);
        });
    }
};

window.TrackerPage = TrackerPage;
console.log("✅ TrackerPage module loaded");
