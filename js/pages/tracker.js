// ============================================================
// TRACKER PAGE - Full Interface Always Visible
// ============================================================

var TrackerPage = {
    render: function() {
        return `
        <div id="trackerPage" class="page">
            <div class="section-title">
                <i class="fas fa-chart-simple"></i> Club Tracker
                <span id="trackerClubName" style="font-size: 1rem; font-weight: 400; color: var(--primary);"></span>
            </div>
            
            <!-- ===== CLUB SELECTOR ===== -->
            <div class="toolbar" id="clubSelectorToolbar">
                <label style="font-weight: 600; color: var(--dark);">
                    <i class="fas fa-users"></i> Select Club:
                </label>
                <select id="trackerClubSelect" style="min-width: 200px; padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem; cursor: pointer;">
                    <option value="">Loading clubs...</option>
                </select>
                <div style="flex:1;"></div>
                <button class="btn-primary" id="addActivityBtn" style="background: var(--gradient-primary); border: none; padding: 10px 24px; border-radius: var(--border-radius-sm); color: white; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                    <i class="fas fa-plus"></i> Add Activity
                </button>
            </div>
            
            <!-- ===== PERIOD TABS ===== -->
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
            </div>
            
            <!-- ===== ACTIVITIES TABLE ===== -->
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Activity</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
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
            
            <!-- ===== STATS ===== -->
            <div class="tracker-stats" style="margin-top: 20px;">
                <div class="stat-box"><span id="totalActivities">0</span> Total Activities</div>
                <div class="stat-box"><span id="completedActivities">0</span> Completed</div>
                <div class="stat-box"><span id="pendingActivities">0</span> Pending</div>
                <div class="stat-box"><span id="studentCount">0</span> Students</div>
            </div>
            
            <!-- ===== TASK MANAGER ===== -->
            <div style="margin-top: 32px;">
                <div class="section-title" style="font-size: 1.2rem;">
                    <i class="fas fa-tasks"></i> Task Manager
                    <span style="font-size: 0.9rem; font-weight: 400; color: var(--gray);">create and assign tasks</span>
                </div>
                
                <!-- Task Input Form -->
                <div class="toolbar">
                    <input type="text" id="taskInput" placeholder="Enter a new task..." style="flex: 2; min-width: 200px; padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem;">
                    <select id="taskPriority" style="padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem;">
                        <option value="low">🟢 Low</option>
                        <option value="medium" selected>🟡 Medium</option>
                        <option value="high">🔴 High</option>
                    </select>
                    <select id="taskAssignedTo" style="padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem;">
                        <option value="">Assign to...</option>
                    </select>
                    <button class="btn-primary" id="addTaskBtn" style="white-space: nowrap;">
                        <i class="fas fa-plus"></i> Add Task
                    </button>
                </div>
                
                <!-- Task List -->
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
            
            <!-- ===== MEDIA GALLERY ===== -->
            <div style="margin-top: 32px;">
                <div class="section-title" style="font-size: 1.2rem;">
                    <i class="fas fa-video"></i> Media Gallery
                    <span style="font-size: 0.9rem; font-weight: 400; color: var(--gray);">upload photos and videos</span>
                </div>
                <div class="toolbar">
                    <input type="file" id="mediaUploadInput" accept="video/*,image/*" style="display: none;" multiple>
                    <button class="btn-primary" id="mediaUploadBtn">
                        <i class="fas fa-upload"></i> Upload Media
                    </button>
                    <span id="uploadStatus" style="color: var(--gray); font-size: 0.9rem;"></span>
                </div>
                <div id="mediaGallery" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 12px;">
                    <div style="text-align:center; padding: 30px; color: var(--gray); grid-column: 1 / -1;">
                        <i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>
                        <br>Loading media...
                    </div>
                </div>
            </div>
        </div>`;
    },

    // ----- SHOW GETTING STARTED GUIDE (in the activities table only) -----
    showGettingStarted: function() {
        var tbody = document.getElementById('trackerActivitiesBody');
        if (!tbody) return;
        
        tbody.innerHTML = `
        <tr>
            <td colspan="5" style="padding: 40px; text-align: center;">
                <div style="max-width: 500px; margin: 0 auto;">
                    <i class="fas fa-calendar-plus" style="font-size: 3rem; color: var(--primary); opacity: 0.6; display: block; margin-bottom: 12px;"></i>
                    <h3 style="color: var(--dark); margin-bottom: 4px;">No Activities Yet</h3>
                    <p style="color: var(--gray); margin-bottom: 16px;">Start tracking your club's progress by adding your first activity!</p>
                    <button class="btn-primary" onclick="document.getElementById('addActivityBtn').click()" style="padding: 10px 24px;">
                        <i class="fas fa-plus"></i> Add Your First Activity
                    </button>
                    <button class="btn-outline" onclick="window.TrackerPage.loadSampleData()" style="padding: 10px 24px; margin-left: 8px;">
                        <i class="fas fa-download"></i> Load Sample Data
                    </button>
                </div>
            </td>
        </tr>`;
    },

    // ----- LOAD SAMPLE DATA -----
    loadSampleData: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        var activities = [
            {
                title: 'Weekly Planning Meeting',
                description: 'Plan next week\'s activities and assign roles',
                type: 'Meeting',
                date: new Date().toISOString().slice(0, 10),
                period: 'weekly',
                status: 'completed'
            },
            {
                title: 'Leadership Training',
                description: 'Train new members on leadership skills',
                type: 'Training',
                date: new Date().toISOString().slice(0, 10),
                period: 'weekly',
                status: 'in-progress'
            },
            {
                title: 'Community Service Event',
                description: 'Beach cleanup and environmental awareness',
                type: 'Volunteer',
                date: new Date().toISOString().slice(0, 10),
                period: 'monthly',
                status: 'pending'
            }
        ];
        
        var self = this;
        var count = 0;
        activities.forEach(function(activity) {
            window.DB.addActivity(clubId, activity).then(function() {
                count++;
                if (count === activities.length) {
                    alert('✅ Sample data loaded successfully!');
                    self.loadData();
                }
            }).catch(function(error) {
                console.error("❌ Error adding sample data:", error);
            });
        });
    },

    // ----- LOAD DATA -----
    loadData: function() {
        console.log("📊 Loading tracker data...");
        var select = document.getElementById('trackerClubSelect');
        if (!select) return;
        
        var clubId = select.value;
        if (!clubId || clubId === '') {
            console.log("ℹ️ No club selected");
            return;
        }
        
        var self = this;
        var periodTab = document.querySelector('.period-tab.active');
        var period = periodTab ? periodTab.dataset.period : 'weekly';
        
        // Load activities
        window.DB.getActivities(clubId, period).then(function(activities) {
            console.log("📋 Activities loaded:", activities ? activities.length : 0);
            
            if (!activities || activities.length === 0) {
                self.showGettingStarted();
                self.updateStats([]);
            } else {
                self.renderActivities(activities);
                self.updateStats(activities);
            }
        }).catch(function(error) {
            console.error("❌ Error loading activities:", error);
            self.showGettingStarted();
            self.updateStats([]);
        });
        
        // Load tasks
        window.DB.getTasks(clubId).then(function(tasks) {
            self.renderTasks(tasks);
        }).catch(function(error) {
            console.error("❌ Error loading tasks:", error);
        });
        
        // Load media
        window.DB.getMedia(clubId).then(function(media) {
            self.renderMedia(media);
        }).catch(function(error) {
            console.error("❌ Error loading media:", error);
        });
        
        // Load students for dropdowns
        window.DB.getStudents().then(function(students) {
            var studentCount = document.getElementById('studentCount');
            if (studentCount) studentCount.textContent = students.length || 0;
            
            // Update task assignment dropdown
            var taskAssign = document.getElementById('taskAssignedTo');
            if (taskAssign) {
                taskAssign.innerHTML = '<option value="">Assign to...</option>';
                for (var i = 0; i < students.length; i++) {
                    taskAssign.innerHTML += '<option value="' + students[i] + '">' + students[i] + '</option>';
                }
            }
        }).catch(function(error) {
            console.error("❌ Error loading students:", error);
        });
    },

    // ----- RENDER ACTIVITIES -----
    renderActivities: function(activities) {
        var tbody = document.getElementById('trackerActivitiesBody');
        if (!tbody) return;
        
        if (!activities || activities.length === 0) {
            this.showGettingStarted();
            return;
        }
        
        var html = '';
        var typeColors = {
            'Meeting': '#6C63FF',
            'Training': '#FF6584',
            'Event': '#00D2A0',
            'Planning': '#FFB84D',
            'Volunteer': '#4ECDC4'
        };
        
        for (var i = 0; i < activities.length; i++) {
            var a = activities[i];
            var typeColor = typeColors[a.type] || '#6C7A89';
            var statusOptions = {
                'pending': '⏳ Pending',
                'in-progress': '🔄 In Progress',
                'completed': '✅ Completed'
            };
            
            html += '<tr>' +
                '<td>' + (a.date || new Date().toISOString().slice(0, 10)) + '</td>' +
                '<td><strong>' + (a.title || 'Untitled') + '</strong>' +
                    (a.description ? '<br><small style="color: var(--gray);">' + a.description + '</small>' : '') +
                '</td>' +
                '<td><span style="background: ' + typeColor + '; color: white; padding: 4px 12px; border-radius: 40px; font-size: 0.8rem; font-weight: 600;">' + (a.type || 'General') + '</span></td>' +
                '<td>' +
                    '<select class="activity-status" data-id="' + (a.id || a._id) + '" style="padding: 4px 8px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.85rem; cursor: pointer;">' +
                        '<option value="pending" ' + (a.status === 'pending' ? 'selected' : '') + '>⏳ Pending</option>' +
                        '<option value="in-progress" ' + (a.status === 'in-progress' ? 'selected' : '') + '>🔄 In Progress</option>' +
                        '<option value="completed" ' + (a.status === 'completed' ? 'selected' : '') + '>✅ Completed</option>' +
                    '</select>' +
                '</td>' +
                '<td>' +
                    '<button class="delete-btn delete-activity" data-id="' + (a.id || a._id) + '" style="background: none; border: none; color: var(--gray); cursor: pointer; padding: 4px 8px; border-radius: var(--border-radius-sm);">' +
                        '<i class="fas fa-trash"></i>' +
                    '</button>' +
                '</td>' +
            '</tr>';
        }
        tbody.innerHTML = html;
        
        // Setup event handlers
        var self = this;
        document.querySelectorAll('.activity-status').forEach(function(sel) {
            sel.addEventListener('change', function() {
                var id = this.dataset.id;
                var status = this.value;
                var clubId = document.getElementById('trackerClubSelect').value;
                window.DB.updateActivityStatus(clubId, id, status).then(function() {
                    self.loadData();
                }).catch(function(error) {
                    console.error("❌ Error updating status:", error);
                });
            });
        });
        
        document.querySelectorAll('.delete-activity').forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (confirm('Delete this activity?')) {
                    var id = this.dataset.id;
                    var clubId = document.getElementById('trackerClubSelect').value;
                    window.DB.deleteActivity(clubId, id).then(function() {
                        self.loadData();
                    }).catch(function(error) {
                        console.error("❌ Error deleting activity:", error);
                    });
                }
            });
        });
    },

    // ----- RENDER TASKS -----
    renderTasks: function(tasks) {
        var tbody = document.getElementById('trackerTasksBody');
        if (!tbody) return;
        
        if (!tasks || tasks.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 30px; color: var(--gray);">' +
                '<i class="fas fa-check-circle" style="font-size: 2rem; display: block; margin-bottom: 8px; color: var(--primary); opacity: 0.6;"></i>' +
                '<h4 style="color: var(--dark); margin-bottom: 4px;">No Tasks Yet</h4>' +
                '<p style="font-size: 0.9rem;">Add a task using the form above!</p>' +
            '</td></tr>';
            return;
        }
        
        var html = '';
        var priorityColors = {
            'high': '#FF6B6B',
            'medium': '#FFB84D',
            'low': '#00D2A0'
        };
        
        for (var i = 0; i < tasks.length; i++) {
            var t = tasks[i];
            var checked = t.completed ? 'checked' : '';
            var doneStyle = t.completed ? 'text-decoration: line-through; color: var(--gray);' : '';
            var priorityColor = priorityColors[t.priority] || '#6C7A89';
            
            html += '<tr>' +
                '<td style="text-align:center;">' +
                    '<input type="checkbox" class="task-checkbox" data-id="' + (t.id || t._id) + '" ' + checked + ' style="width: 20px; height: 20px; cursor: pointer; accent-color: var(--primary);">' +
                '</td>' +
                '<td style="' + doneStyle + '">' + t.title + '</td>' +
                '<td>' + (t.assignedTo || 'Unassigned') + '</td>' +
                '<td><span style="background: ' + priorityColor + '; color: white; padding: 2px 10px; border-radius: 40px; font-size: 0.7rem; font-weight: 600;">' + (t.priority || 'medium').toUpperCase() + '</span></td>' +
                '<td style="font-size: 0.85rem; color: var(--gray);">' + (t.createdAt || new Date().toISOString().slice(0, 10)) + '</td>' +
                '<td>' +
                    '<button class="delete-btn delete-task" data-id="' + (t.id || t._id) + '" style="background: none; border: none; color: var(--gray); cursor: pointer; padding: 4px 8px;">' +
                        '<i class="fas fa-trash"></i>' +
                    '</button>' +
                '</td>' +
            '</tr>';
        }
        tbody.innerHTML = html;
        
        // Task checkbox handlers
        var self = this;
        document.querySelectorAll('.task-checkbox').forEach(function(cb) {
            cb.addEventListener('change', function() {
                var id = this.dataset.id;
                var completed = this.checked;
                var clubId = document.getElementById('trackerClubSelect').value;
                window.DB.updateTaskStatus(clubId, id, completed).then(function() {
                    self.loadData();
                }).catch(function(error) {
                    console.error("❌ Error updating task:", error);
                });
            });
        });
        
        document.querySelectorAll('.delete-task').forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (confirm('Delete this task?')) {
                    var id = this.dataset.id;
                    var clubId = document.getElementById('trackerClubSelect').value;
                    window.DB.deleteTask(clubId, id).then(function() {
                        self.loadData();
                    }).catch(function(error) {
                        console.error("❌ Error deleting task:", error);
                    });
                }
            });
        });
    },

    // ----- RENDER MEDIA -----
    renderMedia: function(media) {
        var gallery = document.getElementById('mediaGallery');
        if (!gallery) return;
        
        if (!media || media.length === 0) {
            gallery.innerHTML = '<div style="text-align:center; padding: 30px; color: var(--gray); grid-column: 1 / -1;">' +
                '<i class="fas fa-photo-video" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--primary); opacity: 0.6;"></i>' +
                '<h4 style="color: var(--dark); margin-bottom: 4px;">No Media Yet</h4>' +
                '<p style="font-size: 0.9rem;">Upload photos or videos of your club activities!</p>' +
                '<button class="btn-primary" onclick="document.getElementById(\'mediaUploadBtn\').click()" style="margin-top: 8px; padding: 8px 20px;">' +
                    '<i class="fas fa-upload"></i> Upload Now' +
                '</button>' +
            '</div>';
            return;
        }
        
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
    },

    // ----- UPDATE STATS -----
    updateStats: function(activities) {
        var total = activities ? activities.length : 0;
        var completed = 0;
        var pending = 0;
        
        if (activities) {
            for (var i = 0; i < activities.length; i++) {
                if (activities[i].status === 'completed') completed++;
                else if (activities[i].status === 'pending' || activities[i].status === 'in-progress') pending++;
            }
        }
        
        document.getElementById('totalActivities').textContent = total;
        document.getElementById('completedActivities').textContent = completed;
        document.getElementById('pendingActivities').textContent = pending;
    },

    // ----- SHOW ADD ACTIVITY MODAL -----
    showAddActivityModal: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        var title = prompt('📝 Activity title:');
        if (!title) return;
        
        var description = prompt('📄 Description (optional):') || '';
        var type = prompt('🏷️ Type (Meeting/Training/Event/Planning/Volunteer):') || 'General';
        var date = prompt('📅 Date (YYYY-MM-DD):') || new Date().toISOString().slice(0, 10);
        var periodTab = document.querySelector('.period-tab.active');
        var period = periodTab ? periodTab.dataset.period : 'weekly';
        
        var self = this;
        window.DB.addActivity(clubId, {
            title: title,
            description: description,
            type: type,
            date: date,
            period: period,
            status: 'pending'
        }).then(function() {
            console.log("✅ Activity added successfully!");
            self.loadData();
        }).catch(function(error) {
            console.error("❌ Error adding activity:", error);
            alert('Error adding activity: ' + error.message);
        });
    },

    // ----- LOAD TEACHER CLUBS -----
    loadTeacherClubs: function() {
        console.log("📋 Loading teacher's clubs...");
        var select = document.getElementById('trackerClubSelect');
        if (!select) return;
        
        var self = this;
        window.DB.getTeacherClubs().then(function(clubs) {
            console.log("📋 Clubs loaded:", clubs);
            
            if (!clubs || clubs.length === 0) {
                select.innerHTML = '<option value="">No clubs assigned to you</option>';
                var tbody = document.getElementById('trackerActivitiesBody');
                if (tbody) {
                    tbody.innerHTML = `
                    <tr><td colspan="5" style="padding: 40px; text-align: center;">
                        <div style="max-width: 500px; margin: 0 auto;">
                            <i class="fas fa-users-slash" style="font-size: 3rem; color: var(--danger); opacity: 0.5; display: block; margin-bottom: 12px;"></i>
                            <h3 style="color: var(--dark); margin-bottom: 4px;">No Clubs Assigned</h3>
                            <p style="color: var(--gray);">You haven't been assigned to any clubs yet.</p>
                            <p style="color: var(--gray); font-size: 0.9rem;">Contact your administrator to get started.</p>
                        </div>
                    </td></tr>`;
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
                self.loadData();
            }
        }).catch(function(error) {
            console.error("❌ Error loading clubs:", error);
            select.innerHTML = '<option value="">Error loading clubs</option>';
        });
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
                    document.querySelectorAll('.period-tab').forEach(function(t) {
                        t.classList.remove('active');
                    });
                    this.classList.add('active');
                    self.loadData();
                });
            })(periodTabs[i]);
        }
        
        // Add Activity
        var addBtn = document.getElementById('addActivityBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                self.showAddActivityModal();
            });
        }
        
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
        
        // Task Enter key
        var taskInput = document.getElementById('taskInput');
        if (taskInput) {
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('addTaskBtn').click();
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
                    (function(file, index) {
                        window.DB.uploadMedia(clubId, file).then(function() {
                            uploaded++;
                            if (uploaded === files.length) {
                                statusEl.textContent = '✅ ' + files.length + ' files uploaded!';
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
