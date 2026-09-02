// ============================================================
// TRACKER PAGE - SIMPLIFIED MODAL (DIRECT DISPLAY)
// ============================================================

var TrackerPage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="trackerPage" class="page active-page">
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
                <button class="btn-primary" id="addActivityBtn">
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
                
                <div class="toolbar">
                    <button class="btn-primary" id="addTaskBtn">
                        <i class="fas fa-plus"></i> Add New Task
                    </button>
                    <span style="color: var(--gray); font-size: 0.9rem;">
                        <i class="fas fa-info-circle"></i> Click to create and assign tasks
                    </span>
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
        </div>
        
        <!-- ===== ADD ACTIVITY MODAL ===== -->
        <div id="addActivityModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
            <div style="background: white; border-radius: 24px; padding: 40px; max-width: 550px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                    <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; margin: 0;">
                        <i class="fas fa-plus-circle" style="color: #6C63FF;"></i> Add New Activity
                    </h3>
                    <button onclick="window.TrackerPage.closeModal('addActivityModal')" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Activity Title <span style="color: #FF6B6B;">*</span></label>
                        <input type="text" id="activityTitle" placeholder="e.g., Weekly Planning Meeting" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Description</label>
                        <textarea id="activityDescription" placeholder="What will the club do?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; font-family: Inter, sans-serif; resize: vertical; box-sizing: border-box;"></textarea>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Activity Type <span style="color: #FF6B6B;">*</span></label>
                            <select id="activityType" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                                <option value="Meeting">📋 Meeting</option>
                                <option value="Training">🏋️ Training</option>
                                <option value="Event">🎉 Event</option>
                                <option value="Planning">📝 Planning</option>
                                <option value="Volunteer">🤝 Volunteer</option>
                                <option value="Other">📌 Other</option>
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Date <span style="color: #FF6B6B;">*</span></label>
                            <input type="date" id="activityDate" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Period <span style="color: #FF6B6B;">*</span></label>
                            <select id="activityPeriod" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                                <option value="weekly">📅 Weekly</option>
                                <option value="monthly">📆 Monthly</option>
                                <option value="yearly">📊 Yearly</option>
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Status</label>
                            <select id="activityStatus" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                                <option value="pending">⏳ Pending</option>
                                <option value="in-progress">🔄 In Progress</option>
                                <option value="completed">✅ Completed</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Assign Students</label>
                        <select id="activityStudents" multiple style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; min-height: 80px; box-sizing: border-box;">
                            <option value="all">All Students</option>
                        </select>
                        <small style="color: #6C7A89; display: block; margin-top: 4px;">Hold Ctrl/Cmd to select multiple students</small>
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 20px; padding-top: 15px; border-top: 2px solid #E8ECF1;">
                    <button class="btn-primary" id="saveActivityBtn" style="flex: 1; padding: 14px; border: none; border-radius: 12px; background: linear-gradient(135deg, #6C63FF 0%, #5A52D5 100%); color: white; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-save"></i> Save Activity
                    </button>
                    <button class="btn-outline" onclick="window.TrackerPage.closeModal('addActivityModal')" style="flex: 0.5; padding: 14px; border: 2px solid #E8ECF1; border-radius: 12px; background: transparent; color: #6C7A89; font-weight: 600; cursor: pointer;">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        
        <!-- ===== ADD TASK MODAL ===== -->
        <div id="addTaskModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
            <div style="background: white; border-radius: 24px; padding: 40px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                    <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; margin: 0;">
                        <i class="fas fa-tasks" style="color: #6C63FF;"></i> Add New Task
                    </h3>
                    <button onclick="window.TrackerPage.closeModal('addTaskModal')" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Task Description <span style="color: #FF6B6B;">*</span></label>
                        <input type="text" id="taskTitle" placeholder="e.g., Prepare meeting agenda" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Priority</label>
                            <select id="taskPriorityModal" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                                <option value="low">🟢 Low</option>
                                <option value="medium" selected>🟡 Medium</option>
                                <option value="high">🔴 High</option>
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Assign To</label>
                            <select id="taskAssignedToModal" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                                <option value="">Unassigned</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 20px; padding-top: 15px; border-top: 2px solid #E8ECF1;">
                    <button class="btn-primary" id="saveTaskBtn" style="flex: 1; padding: 14px; border: none; border-radius: 12px; background: linear-gradient(135deg, #6C63FF 0%, #5A52D5 100%); color: white; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-save"></i> Save Task
                    </button>
                    <button class="btn-outline" onclick="window.TrackerPage.closeModal('addTaskModal')" style="flex: 0.5; padding: 14px; border: 2px solid #E8ECF1; border-radius: 12px; background: transparent; color: #6C7A89; font-weight: 600; cursor: pointer;">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        
        <!-- ===== EDIT ACTIVITY MODAL ===== -->
        <div id="editActivityModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
            <div style="background: white; border-radius: 24px; padding: 40px; max-width: 550px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                    <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; margin: 0;">
                        <i class="fas fa-edit" style="color: #6C63FF;"></i> Edit Activity
                    </h3>
                    <button onclick="window.TrackerPage.closeModal('editActivityModal')" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <input type="hidden" id="editActivityId">
                
                <div>
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Activity Title <span style="color: #FF6B6B;">*</span></label>
                        <input type="text" id="editActivityTitle" placeholder="e.g., Weekly Planning Meeting" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Description</label>
                        <textarea id="editActivityDescription" placeholder="What will the club do?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; font-family: Inter, sans-serif; resize: vertical; box-sizing: border-box;"></textarea>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Activity Type</label>
                            <select id="editActivityType" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                                <option value="Meeting">📋 Meeting</option>
                                <option value="Training">🏋️ Training</option>
                                <option value="Event">🎉 Event</option>
                                <option value="Planning">📝 Planning</option>
                                <option value="Volunteer">🤝 Volunteer</option>
                                <option value="Other">📌 Other</option>
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Date</label>
                            <input type="date" id="editActivityDate" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Period</label>
                            <select id="editActivityPeriod" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                                <option value="weekly">📅 Weekly</option>
                                <option value="monthly">📆 Monthly</option>
                                <option value="yearly">📊 Yearly</option>
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Status</label>
                            <select id="editActivityStatus" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                                <option value="pending">⏳ Pending</option>
                                <option value="in-progress">🔄 In Progress</option>
                                <option value="completed">✅ Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 20px; padding-top: 15px; border-top: 2px solid #E8ECF1;">
                    <button class="btn-primary" id="updateActivityBtn" style="flex: 1; padding: 14px; border: none; border-radius: 12px; background: linear-gradient(135deg, #6C63FF 0%, #5A52D5 100%); color: white; font-weight: 600; cursor: pointer;">
                        <i class="fas fa-save"></i> Update Activity
                    </button>
                    <button class="btn-outline" onclick="window.TrackerPage.closeModal('editActivityModal')" style="flex: 0.5; padding: 14px; border: 2px solid #E8ECF1; border-radius: 12px; background: transparent; color: #6C7A89; font-weight: 600; cursor: pointer;">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        `;
    },

    // ----- SHOW MODAL -----
    showModal: function(modalId) {
        console.log("📝 Showing modal:", modalId);
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log("✅ Modal shown:", modalId);
            console.log("✅ Modal display style:", modal.style.display);
        } else {
            console.error("❌ Modal not found:", modalId);
        }
    },

    // ----- CLOSE MODAL -----
    closeModal: function(modalId) {
        console.log("📝 Closing modal:", modalId);
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log("✅ Modal closed:", modalId);
        }
    },

    // ----- SHOW ADD ACTIVITY MODAL -----
    showAddActivityModal: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        console.log("📝 Opening Add Activity Modal");
        
        // Reset form
        document.getElementById('activityTitle').value = '';
        document.getElementById('activityDescription').value = '';
        document.getElementById('activityStatus').value = 'pending';
        document.getElementById('activityDate').value = new Date().toISOString().slice(0, 10);
        
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
        
        // Get selected students
        var studentSelect = document.getElementById('activityStudents');
        var selectedStudents = [];
        for (var i = 0; i < studentSelect.options.length; i++) {
            if (studentSelect.options[i].selected) {
                selectedStudents.push(studentSelect.options[i].value);
            }
        }
        
        // If "All Students" is selected, get all students
        if (selectedStudents.includes('all')) {
            var allStudents = [];
            for (var i = 0; i < studentSelect.options.length; i++) {
                var val = studentSelect.options[i].value;
                if (val !== 'all') allStudents.push(val);
            }
            selectedStudents = allStudents;
        }
        
        console.log("📋 Activity data:", { title, description, type, date, period, status, students: selectedStudents });
        
        var self = this;
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
            self.closeModal('addActivityModal');
            self.loadData();
        }).catch(function(error) {
            console.error("❌ Error adding activity:", error);
            alert('Error adding activity: ' + error.message);
        });
    },

    // ----- SHOW ADD TASK MODAL -----
    showAddTaskModal: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        console.log("📝 Opening Add Task Modal");
        
        // Reset form
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskPriorityModal').value = 'medium';
        
        // Load students into dropdown
        var self = this;
        window.DB.getStudents().then(function(students) {
            var taskAssign = document.getElementById('taskAssignedToModal');
            if (taskAssign) {
                taskAssign.innerHTML = '<option value="">Unassigned</option>';
                for (var i = 0; i < students.length; i++) {
                    taskAssign.innerHTML += '<option value="' + students[i] + '">' + students[i] + '</option>';
                }
            }
        }).catch(function(error) {
            console.error("❌ Error loading students:", error);
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
        
        var title = document.getElementById('taskTitle').value.trim();
        if (!title) {
            alert('Please enter a task description');
            document.getElementById('taskTitle').focus();
            return;
        }
        
        var priority = document.getElementById('taskPriorityModal').value;
        var assignedTo = document.getElementById('taskAssignedToModal').value;
        
        console.log("📋 Task data:", { title, priority, assignedTo });
        
        var self = this;
        window.DB.addTask(clubId, title, priority, assignedTo).then(function() {
            console.log("✅ Task added successfully!");
            self.closeModal('addTaskModal');
            self.loadData();
        }).catch(function(error) {
            console.error("❌ Error adding task:", error);
            alert('Error adding task: ' + error.message);
        });
    },

    // ----- SHOW EDIT ACTIVITY MODAL -----
    showEditActivityModal: function(activityId, activity) {
        console.log("📝 Opening Edit Activity Modal for:", activityId);
        
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
        
        console.log("📋 Update data:", { activityId, title, description, type, date, period, status });
        
        var self = this;
        // Delete old and add new (simplified update)
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
            console.log("✅ Activity updated successfully!");
            self.closeModal('editActivityModal');
            self.loadData();
        }).catch(function(error) {
            console.error("❌ Error updating activity:", error);
            alert('Error updating activity: ' + error.message);
        });
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
        }).catch(function(error) {
            console.error("❌ Error loading students:", error);
        });
    },

    // ----- SHOW GETTING STARTED GUIDE -----
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
        
        for (var i = 0; i < activities.length; i++) {
            var a = activities[i];
            var typeColor = typeColors[a.type] || '#6C7A89';
            
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
                    '<button class="edit-btn" onclick="window.TrackerPage.editActivity(\'' + (a.id || a._id) + '\')" style="background: none; border: none; color: var(--primary); cursor: pointer; padding: 4px 8px;">' +
                        '<i class="fas fa-edit"></i>' +
                    '</button>' +
                    '<button class="delete-btn delete-activity" data-id="' + (a.id || a._id) + '" style="background: none; border: none; color: var(--gray); cursor: pointer; padding: 4px 8px;">' +
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

    // ----- EDIT ACTIVITY -----
    editActivity: function(activityId) {
        var clubId = document.getElementById('trackerClubSelect').value;
        var self = this;
        
        // Get the activity data
        var periodTab = document.querySelector('.period-tab.active');
        var period = periodTab ? periodTab.dataset.period : 'weekly';
        
        window.DB.getActivities(clubId, period).then(function(activities) {
            var activity = null;
            for (var i = 0; i < activities.length; i++) {
                if ((activities[i].id || activities[i]._id) === activityId) {
                    activity = activities[i];
                    break;
                }
            }
            
            if (activity) {
                self.showEditActivityModal(activityId, activity);
            } else {
                alert('Activity not found');
            }
        }).catch(function(error) {
            console.error("❌ Error fetching activity:", error);
            alert('Error fetching activity data');
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
        
        var totalEl = document.getElementById('totalActivities');
        var completedEl = document.getElementById('completedActivities');
        var pendingEl = document.getElementById('pendingActivities');
        
        if (totalEl) totalEl.textContent = total;
        if (completedEl) completedEl.textContent = completed;
        if (pendingEl) pendingEl.textContent = pending;
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
        
        // Add Activity - opens modal
        var addBtn = document.getElementById('addActivityBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                console.log("🔘 Add Activity button clicked");
                self.showAddActivityModal();
            });
        }
        
        // Save Activity from modal
        var saveBtn = document.getElementById('saveActivityBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                console.log("🔘 Save Activity button clicked");
                self.saveActivityFromModal();
            });
        }
        
        // Add Task - opens modal
        var addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', function() {
                console.log("🔘 Add Task button clicked");
                self.showAddTaskModal();
            });
        }
        
        // Save Task from modal
        var saveTaskBtn = document.getElementById('saveTaskBtn');
        if (saveTaskBtn) {
            saveTaskBtn.addEventListener('click', function() {
                console.log("🔘 Save Task button clicked");
                self.saveTaskFromModal();
            });
        }
        
        // Update Activity from modal
        var updateBtn = document.getElementById('updateActivityBtn');
        if (updateBtn) {
            updateBtn.addEventListener('click', function() {
                console.log("🔘 Update Activity button clicked");
                self.updateActivityFromModal();
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
        
        // Close modals on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                self.closeModal('addActivityModal');
                self.closeModal('addTaskModal');
                self.closeModal('editActivityModal');
            }
        });
        
        this.loadTeacherClubs();
    }
};

window.TrackerPage = TrackerPage;
console.log("✅ TrackerPage module loaded");
