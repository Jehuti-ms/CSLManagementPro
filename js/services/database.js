// ============================================================
// TRACKER PAGE - Modal Scrolling Fix
// ============================================================

var TrackerPage = {
    // ----- RENDER HTML (same as before) -----
    render: function() {
        // ... (keep your existing render function)
    },

    // ----- RENDER MODALS (FIXED SCROLLING) -----
    renderModals: function() {
        if (document.getElementById('modalContainer')) return;
        
        // Get all modals from the page
        var modals = document.querySelectorAll('[id$="Modal"]');
        var modalHTML = '';
        
        modals.forEach(function(modal) {
            modalHTML += modal.outerHTML;
        });
        
        var container = document.createElement('div');
        container.id = 'modalContainer';
        container.innerHTML = modalHTML;
        document.body.appendChild(container);
        
        // Hide the original modals in the page
        modals.forEach(function(modal) {
            modal.style.display = 'none';
        });
    },

    // ----- SHOW MODAL (FIXED) -----
    showModal: function(modalId) {
        console.log("📝 Showing modal:", modalId);
        
        // Ensure modals are rendered
        this.renderModals();
        
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log("✅ Modal shown:", modalId);
        } else {
            console.error("❌ Modal not found:", modalId);
        }
    },

    // ----- CLOSE MODAL (FIXED) -----
    closeModal: function(modalId) {
        console.log("📝 Closing modal:", modalId);
        
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log("✅ Modal closed:", modalId);
        }
    },

    // ============================================================
    // SHOW ADD ACTIVITY MODAL
    // ============================================================
    showAddActivityModal: function(templateData) {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        // Ensure modals are rendered
        this.renderModals();
        
        // Reset form
        var titleInput = document.getElementById('activityTitle');
        var descInput = document.getElementById('activityDescription');
        var typeInput = document.getElementById('activityType');
        var periodInput = document.getElementById('activityPeriod');
        var statusInput = document.getElementById('activityStatus');
        var dateInput = document.getElementById('activityDate');
        var reminderCheck = document.getElementById('activityReminder');
        var reminderDays = document.getElementById('reminderDays');
        
        if (titleInput) titleInput.value = templateData ? templateData.name : '';
        if (descInput) descInput.value = '';
        if (typeInput) typeInput.value = templateData ? templateData.type : 'Meeting';
        if (periodInput) periodInput.value = templateData ? templateData.period : 'weekly';
        if (statusInput) statusInput.value = templateData ? templateData.status : 'pending';
        if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
        if (reminderCheck) reminderCheck.checked = false;
        if (reminderDays) reminderDays.value = 1;
        
        // Load students into dropdown
        var self = this;
        window.DB.getStudents().then(function(students) {
            var studentSelect = document.getElementById('activityStudents');
            if (studentSelect) {
                studentSelect.innerHTML = '<option value="all">All Students</option>';
                for (var i = 0; i < students.length; i++) {
                    studentSelect.innerHTML += '<option value="' + students[i] + '">' + students[i] + '</option>';
                }
            }
        }).catch(function(error) {
            console.error("❌ Error loading students:", error);
        });
        
        this.showModal('addActivityModal');
    },

    // ----- SAVE ACTIVITY FROM MODAL -----
    saveActivityFromModal: function() {
        console.log("📝 Saving activity from modal...");
        
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        var titleInput = document.getElementById('activityTitle');
        var descInput = document.getElementById('activityDescription');
        var typeInput = document.getElementById('activityType');
        var dateInput = document.getElementById('activityDate');
        var periodInput = document.getElementById('activityPeriod');
        var statusInput = document.getElementById('activityStatus');
        var studentSelect = document.getElementById('activityStudents');
        var reminderCheck = document.getElementById('activityReminder');
        var reminderDays = document.getElementById('reminderDays');
        
        if (!titleInput || !titleInput.value.trim()) {
            alert('Please enter an activity title');
            if (titleInput) titleInput.focus();
            return;
        }
        
        var title = titleInput.value.trim();
        var description = descInput ? descInput.value.trim() : '';
        var type = typeInput ? typeInput.value : 'Meeting';
        var date = dateInput ? dateInput.value : new Date().toISOString().slice(0, 10);
        var period = periodInput ? periodInput.value : 'weekly';
        var status = statusInput ? statusInput.value : 'pending';
        var reminder = reminderCheck ? reminderCheck.checked : false;
        var reminderDaysVal = reminderDays ? parseInt(reminderDays.value) || 1 : 1;
        
        // Get selected students
        var selectedStudents = [];
        if (studentSelect) {
            for (var i = 0; i < studentSelect.options.length; i++) {
                if (studentSelect.options[i].selected) {
                    selectedStudents.push(studentSelect.options[i].value);
                }
            }
        }
        
        if (selectedStudents.includes('all')) {
            var allStudents = [];
            for (var i = 0; i < studentSelect.options.length; i++) {
                var val = studentSelect.options[i].value;
                if (val !== 'all') allStudents.push(val);
            }
            selectedStudents = allStudents;
        }
        
        console.log("📋 Activity data:", { title, description, type, date, period, status, reminder, reminderDaysVal, students: selectedStudents });
        
        var self = this;
        window.DB.addActivity(clubId, {
            title: title,
            description: description,
            type: type,
            date: date,
            period: period,
            status: status,
            students: selectedStudents,
            reminder: reminder,
            reminderDays: reminderDaysVal,
            checkedIn: []
        }).then(function() {
            console.log("✅ Activity added successfully!");
            self.closeModal('addActivityModal');
            self.loadData();
        }).catch(function(error) {
            console.error("❌ Error adding activity:", error);
            alert('Error adding activity: ' + error.message);
        });
    },

    // ============================================================
    // SHOW ADD TASK MODAL
    // ============================================================
    showAddTaskModal: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        this.renderModals();
        
        var taskInput = document.getElementById('taskTitle');
        var priorityInput = document.getElementById('taskPriorityModal');
        var dueDateInput = document.getElementById('taskDueDate');
        
        if (taskInput) taskInput.value = '';
        if (priorityInput) priorityInput.value = 'medium';
        if (dueDateInput) dueDateInput.value = '';
        
        window.DB.getStudents().then(function(students) {
            var taskAssign = document.getElementById('taskAssignedToModal');
            if (taskAssign) {
                taskAssign.innerHTML = '<option value="">Unassigned</option>';
                for (var i = 0; i < students.length; i++) {
                    taskAssign.innerHTML += '<option value="' + students[i] + '">' + students[i] + '</option>';
                }
            }
        });
        
        this.showModal('addTaskModal');
    },

    // ----- SAVE TASK FROM MODAL -----
    saveTaskFromModal: function() {
        console.log("📝 Saving task from modal...");
        
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        var taskInput = document.getElementById('taskTitle');
        var priorityInput = document.getElementById('taskPriorityModal');
        var assignInput = document.getElementById('taskAssignedToModal');
        var dueDateInput = document.getElementById('taskDueDate');
        
        if (!taskInput || !taskInput.value.trim()) {
            alert('Please enter a task description');
            if (taskInput) taskInput.focus();
            return;
        }
        
        var title = taskInput.value.trim();
        var priority = priorityInput ? priorityInput.value : 'medium';
        var assignedTo = assignInput ? assignInput.value : '';
        var dueDate = dueDateInput ? dueDateInput.value : '';
        
        var self = this;
        window.DB.addTask(clubId, title, priority, assignedTo, dueDate).then(function() {
            self.closeModal('addTaskModal');
            self.loadData();
        }).catch(function(error) {
            alert('Error adding task: ' + error.message);
        });
    },

    // ============================================================
    // SHOW EDIT ACTIVITY MODAL
    // ============================================================
    showEditActivityModal: function(activityId, activity) {
        console.log("📝 Opening Edit Activity Modal for:", activityId);
        
        this.renderModals();
        
        document.getElementById('editActivityId').value = activityId;
        document.getElementById('editActivityTitle').value = activity.title || '';
        document.getElementById('editActivityDescription').value = activity.description || '';
        document.getElementById('editActivityType').value = activity.type || 'Meeting';
        document.getElementById('editActivityDate').value = activity.date || new Date().toISOString().slice(0, 10);
        document.getElementById('editActivityPeriod').value = activity.period || 'weekly';
        document.getElementById('editActivityStatus').value = activity.status || 'pending';
        
        this.showModal('editActivityModal');
    },

    // ----- UPDATE ACTIVITY FROM MODAL -----
    updateActivityFromModal: function() {
        console.log("📝 Updating activity from modal...");
        
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        var activityId = document.getElementById('editActivityId').value;
        var title = document.getElementById('editActivityTitle').value.trim();
        if (!title) {
            alert('Please enter an activity title');
            document.getElementById('editActivityTitle').focus();
            return;
        }
        
        var description = document.getElementById('editActivityDescription').value.trim();
        var type = document.getElementById('editActivityType').value;
        var date = document.getElementById('editActivityDate').value;
        var period = document.getElementById('editActivityPeriod').value;
        var status = document.getElementById('editActivityStatus').value;
        
        var self = this;
        window.DB.deleteActivity(clubId, activityId).then(function() {
            return window.DB.addActivity(clubId, {
                title: title,
                description: description,
                type: type,
                date: date,
                period: period,
                status: status
            });
        }).then(function() {
            self.closeModal('editActivityModal');
            self.loadData();
        }).catch(function(error) {
            console.error("❌ Error updating activity:", error);
            alert('Error updating activity: ' + error.message);
        });
    },

    // ============================================================
    // TEMPLATES MODAL
    // ============================================================
    loadTemplates: function() {
        var self = this;
        window.DB.getTemplates().then(function(templates) {
            var list = document.getElementById('templatesList');
            if (!list) return;
            
            if (!templates || templates.length === 0) {
                list.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--gray);">No templates saved yet. Create one from an activity!</div>';
                return;
            }
            
            var html = '';
            for (var i = 0; i < templates.length; i++) {
                var t = templates[i];
                html += '<div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #E8ECF1;">' +
                    '<div><strong>' + t.name + '</strong><br><small style="color: var(--gray);">' + t.type + ' · ' + t.period + '</small></div>' +
                    '<div style="display: flex; gap: 8px;">' +
                        '<button class="btn-outline" onclick="window.TrackerPage.useTemplate(\'' + (t.id || t._id) + '\')" style="padding: 4px 12px; font-size: 0.8rem;">Use</button>' +
                        '<button class="delete-btn" onclick="window.TrackerPage.deleteTemplate(\'' + (t.id || t._id) + '\')" style="padding: 4px 8px;"><i class="fas fa-trash"></i></button>' +
                    '</div>' +
                '</div>';
            }
            list.innerHTML = html;
        });
    },

    useTemplate: function(templateId) {
        var self = this;
        window.DB.useTemplate(templateId).then(function(template) {
            if (template) {
                self.showAddActivityModal(template);
                self.closeModal('templatesModal');
            }
        });
    },

    deleteTemplate: function(templateId) {
        if (confirm('Delete this template?')) {
            window.DB.deleteTemplate(templateId).then(function() {
                window.TrackerPage.loadTemplates();
            });
        }
    },

    saveCurrentAsTemplate: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        var templateName = document.getElementById('templateNameInput').value.trim();
        if (!templateName) {
            alert('Please enter a template name');
            return;
        }
        
        var type = document.getElementById('activityType').value;
        var period = document.getElementById('activityPeriod').value;
        var status = document.getElementById('activityStatus').value;
        
        window.DB.saveTemplate({
            name: templateName,
            type: type,
            period: period,
            status: status,
            clubId: clubId
        }).then(function() {
            alert('✅ Template saved!');
            document.getElementById('templateNameInput').value = '';
            window.TrackerPage.loadTemplates();
        });
    },

    // ============================================================
    // CHECK-IN MODAL
    // ============================================================
    showCheckInModal: function(activityId) {
        var self = this;
        var clubId = document.getElementById('trackerClubSelect').value;
        
        this.renderModals();
        
        window.DB.getActivityById(clubId, activityId).then(function(activity) {
            if (!activity) {
                alert('Activity not found');
                return;
            }
            
            document.getElementById('checkInActivityTitle').textContent = 'Checking in for: ' + activity.title;
            
            window.DB.getStudents().then(function(students) {
                var list = document.getElementById('checkInStudentsList');
                if (!list) return;
                
                var checkedIn = activity.checkedIn || [];
                
                var html = '';
                for (var i = 0; i < students.length; i++) {
                    var isChecked = checkedIn.indexOf(students[i]) !== -1;
                    html += '<div style="display: flex; align-items: center; padding: 8px 12px; border-bottom: 1px solid #E8ECF1;">' +
                        '<input type="checkbox" class="checkin-student" data-name="' + students[i] + '" ' + (isChecked ? 'checked' : '') + ' style="margin-right: 12px; width: 18px; height: 18px; accent-color: var(--primary);">' +
                        '<span>' + students[i] + '</span>' +
                        (isChecked ? '<span style="margin-left: auto; font-size: 0.8rem; color: var(--success);"><i class="fas fa-check-circle"></i> Checked In</span>' : '') +
                    '</div>';
                }
                list.innerHTML = html;
                list.dataset.activityId = activityId;
            });
        });
        
        this.showModal('checkInModal');
    },

    saveCheckIns: function() {
        var list = document.getElementById('checkInStudentsList');
        if (!list) return;
        
        var activityId = list.dataset.activityId;
        var clubId = document.getElementById('trackerClubSelect').value;
        
        var checkedIn = [];
        document.querySelectorAll('.checkin-student:checked').forEach(function(cb) {
            checkedIn.push(cb.dataset.name);
        });
        
        window.DB.updateCheckIns(clubId, activityId, checkedIn).then(function() {
            alert('✅ Check-ins saved!');
            window.TrackerPage.closeModal('checkInModal');
            window.TrackerPage.loadData();
        });
    },

    // ============================================================
    // EXPORT MODAL
    // ============================================================
    exportCSV: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        var clubName = document.getElementById('trackerClubSelect').options[document.getElementById('trackerClubSelect').selectedIndex]?.text || 'Club';
        var periodTab = document.querySelector('.period-tab.active');
        var period = periodTab ? periodTab.dataset.period : 'weekly';
        
        var self = this;
        window.DB.getActivities(clubId, period).then(function(activities) {
            var rows = [];
            rows.push('"Date","Activity","Type","Status","Description","Students"');
            
            for (var i = 0; i < activities.length; i++) {
                var a = activities[i];
                var students = a.students ? a.students.join('; ') : '';
                rows.push('"' + (a.date || '') + '","' + (a.title || '') + '","' + (a.type || '') + '","' + (a.status || '') + '","' + (a.description || '') + '","' + students + '"');
            }
            
            var csvContent = rows.join('\n');
            var blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'activities_' + clubName + '_' + period + '.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            self.closeModal('exportModal');
        });
    },

    exportJSON: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        var clubName = document.getElementById('trackerClubSelect').options[document.getElementById('trackerClubSelect').selectedIndex]?.text || 'Club';
        var periodTab = document.querySelector('.period-tab.active');
        var period = periodTab ? periodTab.dataset.period : 'weekly';
        
        var self = this;
        window.DB.getActivities(clubId, period).then(function(activities) {
            var data = {
                club: clubName,
                period: period,
                exportDate: new Date().toISOString(),
                activities: activities
            };
            
            var jsonContent = JSON.stringify(data, null, 2);
            var blob = new Blob([jsonContent], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'activities_' + clubName + '_' + period + '.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            self.closeModal('exportModal');
        });
    },

    // ============================================================
    // LOAD DATA
    // ============================================================
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
        
        window.DB.getActivities(clubId, period).then(function(activities) {
            console.log("📋 Activities loaded:", activities ? activities.length : 0);
            self.cachedActivities = activities;
            
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
        
        window.DB.getTasks(clubId).then(function(tasks) {
            self.renderTasks(tasks);
        }).catch(function(error) {
            console.error("❌ Error loading tasks:", error);
        });
        
        window.DB.getMedia(clubId).then(function(media) {
            self.renderMedia(media);
        }).catch(function(error) {
            console.error("❌ Error loading media:", error);
        });
        
        window.DB.getStudents().then(function(students) {
            var studentCount = document.getElementById('studentCount');
            if (studentCount) studentCount.textContent = students.length || 0;
        }).catch(function(error) {
            console.error("❌ Error loading students:", error);
        });
        
        if (document.getElementById('calendarView').style.display !== 'none') {
            self.renderCalendar();
        }
    },

    // ----- SHOW GETTING STARTED GUIDE -----
    showGettingStarted: function() {
        var tbody = document.getElementById('trackerActivitiesBody');
        if (!tbody) return;
        
        tbody.innerHTML = `
        <tr>
            <td colspan="8" style="padding: 40px; text-align: center;">
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
            'Volunteer': '#4ECDC4',
            'Other': '#6C7A89'
        };
        
        var today = new Date().toISOString().slice(0, 10);
        
        for (var i = 0; i < activities.length; i++) {
            var a = activities[i];
            var typeColor = typeColors[a.type] || '#6C7A89';
            
            var isUpcoming = a.date && a.date > today && a.status !== 'completed';
            var isOverdue = a.date && a.date < today && a.status !== 'completed';
            var isToday = a.date === today;
            
            var checkInCount = a.checkedIn ? a.checkedIn.length : 0;
            
            html += '<tr>' +
                '<td style="text-align:center;"><input type="checkbox" class="activity-checkbox" data-id="' + (a.id || a._id) + '"></td>' +
                '<td>' + (a.date || '') + (isToday ? ' <span style="font-size: 0.7rem; background: var(--primary); color: white; padding: 2px 8px; border-radius: 40px;">Today</span>' : '') + (isOverdue ? ' <span style="font-size: 0.7rem; background: var(--danger); color: white; padding: 2px 8px; border-radius: 40px;">Overdue</span>' : '') + '</td>' +
                '<td><strong>' + (a.title || 'Untitled') + '</strong>' +
                    (a.description ? '<br><small style="color: var(--gray);">' + a.description + '</small>' : '') +
                    (a.students && a.students.length > 0 ? '<br><small style="color: var(--primary);"><i class="fas fa-user"></i> ' + a.students.join(', ') + '</small>' : '') +
                '</td>' +
                '<td><span style="background: ' + typeColor + '; color: white; padding: 4px 12px; border-radius: 40px; font-size: 0.8rem; font-weight: 600;">' + (a.type || 'General') + '</span></td>' +
                '<td>' + (a.status || 'pending') + '</td>' +
                '<td style="text-align:center;">' +
                    '<button onclick="window.TrackerPage.showCheckInModal(\'' + (a.id || a._id) + '\')" style="background: none; border: none; color: var(--primary); cursor: pointer; font-size: 1.1rem;" title="Check-in students">' +
                        '<i class="fas fa-clipboard-check"></i> ' + checkInCount +
                    '</button>' +
                '</td>' +
                '<td style="text-align:center;">' + (a.reminder ? '🔔' : '') + '</td>' +
                '<td>' +
                    '<button class="btn-outline" onclick="window.TrackerPage.editActivity(\'' + (a.id || a._id) + '\')" style="padding: 2px 8px; font-size: 0.8rem;"><i class="fas fa-edit"></i></button> ' +
                    '<button class="delete-btn delete-activity" data-id="' + (a.id || a._id) + '" style="background: none; border: none; color: var(--gray); cursor: pointer; padding: 2px 8px; font-size: 0.8rem;"><i class="fas fa-trash"></i></button>' +
                '</td>' +
            '</tr>';
        }
        tbody.innerHTML = html;
        
        var self = this;
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
        
        var selectAll = document.getElementById('selectAllActivities');
        if (selectAll) {
            selectAll.addEventListener('change', function() {
                document.querySelectorAll('.activity-checkbox').forEach(function(cb) {
                    cb.checked = this.checked;
                }, this);
            });
        }
    },

    // ----- RENDER TASKS -----
    renderTasks: function(tasks) {
        var tbody = document.getElementById('trackerTasksBody');
        if (!tbody) return;
        
        if (!tasks || tasks.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 30px; color: var(--gray);">' +
                '<i class="fas fa-check-circle" style="font-size: 2rem; display: block; margin-bottom: 8px; color: var(--primary); opacity: 0.6;"></i>' +
                '<h4 style="color: var(--dark); margin-bottom: 4px;">No Tasks Yet</h4>' +
                '<p style="font-size: 0.9rem;">Click "Add New Task" to create one!</p>' +
            '</td></tr>';
            return;
        }
        
        var html = '';
        var priorityColors = {
            'high': '#FF6B6B',
            'medium': '#FFB84D',
            'low': '#00D2A0'
        };
        
        var today = new Date().toISOString().slice(0, 10);
        
        for (var i = 0; i < tasks.length; i++) {
            var t = tasks[i];
            var checked = t.completed ? 'checked' : '';
            var doneStyle = t.completed ? 'text-decoration: line-through; color: var(--gray);' : '';
            var priorityColor = priorityColors[t.priority] || '#6C7A89';
            var isOverdue = t.dueDate && t.dueDate < today && !t.completed;
            
            html += '<tr>' +
                '<td style="text-align:center;">' +
                    '<input type="checkbox" class="task-checkbox" data-id="' + (t.id || t._id) + '" ' + checked + ' style="width: 20px; height: 20px; cursor: pointer; accent-color: var(--primary);">' +
                '</td>' +
                '<td style="' + doneStyle + '">' + t.title + (isOverdue ? ' <span style="font-size: 0.7rem; background: var(--danger); color: white; padding: 2px 8px; border-radius: 40px;">Overdue</span>' : '') + '</td>' +
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
        var checkedIn = 0;
        
        if (activities) {
            for (var i = 0; i < activities.length; i++) {
                if (activities[i].status === 'completed') completed++;
                else if (activities[i].status === 'pending' || activities[i].status === 'in-progress') pending++;
                if (activities[i].checkedIn) checkedIn += activities[i].checkedIn.length;
            }
        }
        
        document.getElementById('totalActivities').textContent = total;
        document.getElementById('completedActivities').textContent = completed;
        document.getElementById('pendingActivities').textContent = pending;
        document.getElementById('checkInCount').textContent = checkedIn;
    },

    // ----- CALENDAR VIEW -----
    renderCalendar: function() {
        var self = this;
        var now = new Date();
        var currentMonth = self.calendarMonth !== undefined ? self.calendarMonth : now.getMonth();
        var currentYear = self.calendarYear !== undefined ? self.calendarYear : now.getFullYear();
        
        var monthYearEl = document.getElementById('calendarMonthYear');
        if (monthYearEl) {
            monthYearEl.textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
        
        var grid = document.getElementById('calendarGrid');
        if (!grid) return;
        
        var firstDay = new Date(currentYear, currentMonth, 1).getDay();
        var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        var today = new Date();
        
        var dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var html = '';
        for (var i = 0; i < dayHeaders.length; i++) {
            html += '<div style="padding: 8px; text-align: center; font-weight: 600; color: var(--dark); background: rgba(108,99,255,0.04); border-radius: 8px;">' + dayHeaders[i] + '</div>';
        }
        
        for (var i = 0; i < firstDay; i++) {
            html += '<div style="padding: 8px;"></div>';
        }
        
        var clubId = document.getElementById('trackerClubSelect').value;
        var activities = self.cachedActivities || [];
        
        for (var day = 1; day <= daysInMonth; day++) {
            var date = currentYear + '-' + String(currentMonth + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
            var isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day;
            var hasActivity = activities.some(function(a) { return a.date === date; });
            
            var style = 'padding: 8px; text-align: center; border-radius: 8px;';
            if (isToday) {
                style += 'background: var(--gradient-primary); color: white; font-weight: 600;';
            } else if (hasActivity) {
                style += 'background: rgba(0,210,160,0.1); border: 1px solid var(--success); cursor: pointer;';
            } else {
                style += 'color: var(--dark);';
            }
            
            html += '<div style="' + style + '">' + day + (hasActivity ? '<div style="font-size: 0.6rem; color: var(--success);">●</div>' : '') + '</div>';
        }
        
        grid.innerHTML = html;
    },

    // ----- LOAD SAMPLE DATA -----
    loadSampleData: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        var today = new Date().toISOString().slice(0, 10);
        var nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        var nextWeekStr = nextWeek.toISOString().slice(0, 10);
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        var lastWeekStr = lastWeek.toISOString().slice(0, 10);
        
        var activities = [
            {
                title: 'Weekly Planning Meeting',
                description: 'Plan next week\'s activities and assign roles',
                type: 'Meeting',
                date: today,
                period: 'weekly',
                status: 'completed',
                checkedIn: ['Emma Wilson', 'Liam Chen']
            },
            {
                title: 'Leadership Training',
                description: 'Train new members on leadership skills',
                type: 'Training',
                date: lastWeekStr,
                period: 'weekly',
                status: 'in-progress',
                checkedIn: ['Sophia Patel', 'Noah Kim']
            },
            {
                title: 'Community Service Event',
                description: 'Beach cleanup and environmental awareness',
                type: 'Volunteer',
                date: nextWeekStr,
                period: 'monthly',
                status: 'pending',
                reminder: true,
                reminderDays: 2,
                checkedIn: []
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
                    if (document.getElementById('calendarView').style.display !== 'none') {
                        self.renderCalendar();
                    }
                }
            }).catch(function(error) {
                console.error("❌ Error adding sample data:", error);
            });
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
                    <tr><td colspan="8" style="padding: 40px; text-align: center;">
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
        
        // Render modals once
        this.renderModals();
        
        var select = document.getElementById('trackerClubSelect');
        if (select) {
            select.addEventListener('change', function() {
                self.loadData();
                if (document.getElementById('calendarView').style.display !== 'none') {
                    self.renderCalendar();
                }
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
        
        var saveBtn = document.getElementById('saveActivityBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                self.saveActivityFromModal();
            });
        }
        
        // Add Task
        var addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', function() {
                self.showAddTaskModal();
            });
        }
        
        var saveTaskBtn = document.getElementById('saveTaskBtn');
        if (saveTaskBtn) {
            saveTaskBtn.addEventListener('click', function() {
                self.saveTaskFromModal();
            });
        }
        
        // Update Activity
        var updateBtn = document.getElementById('updateActivityBtn');
        if (updateBtn) {
            updateBtn.addEventListener('click', function() {
                self.updateActivityFromModal();
            });
        }
        
        // Templates
        var templateBtn = document.getElementById('templateBtn');
        if (templateBtn) {
            templateBtn.addEventListener('click', function() {
                self.showModal('templatesModal');
                self.loadTemplates();
            });
        }
        
        var saveTemplateBtn = document.getElementById('saveTemplateBtn');
        if (saveTemplateBtn) {
            saveTemplateBtn.addEventListener('click', function() {
                self.saveCurrentAsTemplate();
            });
        }
        
        // Check-in
        var saveCheckInBtn = document.getElementById('saveCheckInBtn');
        if (saveCheckInBtn) {
            saveCheckInBtn.addEventListener('click', function() {
                self.saveCheckIns();
            });
        }
        
        // Export
        var exportBtn = document.getElementById('exportDataBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', function() {
                self.showModal('exportModal');
            });
        }
        
        var exportCSVBtn = document.getElementById('exportCSVBtn');
        if (exportCSVBtn) {
            exportCSVBtn.addEventListener('click', function() {
                self.exportCSV();
            });
        }
        
        var exportJSONBtn = document.getElementById('exportJSONBtn');
        if (exportJSONBtn) {
            exportJSONBtn.addEventListener('click', function() {
                self.exportJSON();
            });
        }
        
        // Calendar Toggle
        var toggleViewBtn = document.getElementById('toggleViewBtn');
        if (toggleViewBtn) {
            toggleViewBtn.addEventListener('click', function() {
                var tableView = document.getElementById('tableView');
                var calendarView = document.getElementById('calendarView');
                
                if (tableView.style.display === 'none') {
                    tableView.style.display = 'block';
                    calendarView.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-calendar-alt"></i> Calendar';
                    self.calendarMonth = undefined;
                    self.calendarYear = undefined;
                } else {
                    tableView.style.display = 'none';
                    calendarView.style.display = 'block';
                    this.innerHTML = '<i class="fas fa-table"></i> Table';
                    var now = new Date();
                    self.calendarMonth = now.getMonth();
                    self.calendarYear = now.getFullYear();
                    self.renderCalendar();
                }
            });
        }
        
        // Calendar navigation
        var prevMonthBtn = document.getElementById('prevMonthBtn');
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', function() {
                self.calendarMonth--;
                if (self.calendarMonth < 0) {
                    self.calendarMonth = 11;
                    self.calendarYear--;
                }
                self.renderCalendar();
            });
        }
        
        var nextMonthBtn = document.getElementById('nextMonthBtn');
        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', function() {
                self.calendarMonth++;
                if (self.calendarMonth > 11) {
                    self.calendarMonth = 0;
                    self.calendarYear++;
                }
                self.renderCalendar();
            });
        }
        
        var todayBtn = document.getElementById('todayBtn');
        if (todayBtn) {
            todayBtn.addEventListener('click', function() {
                var now = new Date();
                self.calendarMonth = now.getMonth();
                self.calendarYear = now.getFullYear();
                self.renderCalendar();
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
        
        // Close modals on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                self.closeModal('addActivityModal');
                self.closeModal('addTaskModal');
                self.closeModal('editActivityModal');
                self.closeModal('templatesModal');
                self.closeModal('checkInModal');
                self.closeModal('exportModal');
            }
        });
        
        this.loadTeacherClubs();
    }
};

window.TrackerPage = TrackerPage;
console.log("✅ TrackerPage module loaded");
