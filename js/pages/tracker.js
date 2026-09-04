// ============================================================
// TRACKER PAGE - Complete with All Features
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
            
            <!-- ===== TOP ROW: CLUB SELECTOR + ACTION BUTTONS ===== -->
            <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 250px;">
                    <label style="font-weight: 600; color: var(--dark); white-space: nowrap;">
                        <i class="fas fa-users"></i> Club:
                    </label>
                    <select id="trackerClubSelect" style="flex: 1; min-width: 150px; padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem; cursor: pointer;">
                        <option value="">Loading clubs...</option>
                    </select>
                </div>
                
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn-primary" id="addActivityBtn" style="padding: 10px 20px;">
                        <i class="fas fa-plus"></i> Add Activity
                    </button>
                    <button class="btn-outline" id="exportDataBtn" style="padding: 10px 18px;">
                        <i class="fas fa-file-export"></i> Export
                    </button>
                    <button class="btn-outline" id="toggleViewBtn" style="padding: 10px 18px;">
                        <i class="fas fa-calendar-alt"></i> Calendar
                    </button>
                </div>
            </div>
            
            <!-- ===== PERIOD TABS ===== -->
            <div class="toolbar" style="background: rgba(108, 99, 255, 0.04); margin-bottom: 16px;">
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
                <button class="btn-outline" id="templateBtn" style="padding: 6px 16px; font-size: 0.85rem;">
                    <i class="fas fa-copy"></i> Templates
                </button>
            </div>
            
            <!-- ===== VIEW CONTAINER ===== -->
            <div id="viewContainer">
                <!-- TABLE VIEW -->
                <div id="tableView">
                    <div class="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th style="width: 5%;"><input type="checkbox" id="selectAllActivities"></th>
                                    <th style="width: 12%;">Date</th>
                                    <th style="width: 25%;">Activity</th>
                                    <th style="width: 15%;">Type</th>
                                    <th style="width: 10%;">Status</th>
                                    <th style="width: 10%;">Check-in</th>
                                    <th style="width: 8%;">Reminder</th>
                                    <th style="width: 15%;">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="trackerActivitiesBody">
                                <tr><td colspan="8" style="text-align:center; padding: 40px; color: var(--gray);">
                                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>
                                    <br>Loading activities...
                                </td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="tracker-stats" style="margin-top: 20px;">
                        <div class="stat-box"><span id="totalActivities">0</span> Total</div>
                        <div class="stat-box"><span id="completedActivities">0</span> Completed</div>
                        <div class="stat-box"><span id="pendingActivities">0</span> Pending</div>
                        <div class="stat-box"><span id="studentCount">0</span> Students</div>
                        <div class="stat-box"><span id="checkInCount">0</span> Checked In</div>
                    </div>
                </div>
                
                <!-- CALENDAR VIEW -->
                <div id="calendarView" style="display: none;">
                    <div class="toolbar" style="background: rgba(108, 99, 255, 0.04); justify-content: center;">
                        <button class="btn-outline" id="prevMonthBtn"><i class="fas fa-chevron-left"></i></button>
                        <span id="calendarMonthYear" style="font-weight: 600; font-size: 1.1rem; min-width: 200px; text-align: center;"></span>
                        <button class="btn-outline" id="nextMonthBtn"><i class="fas fa-chevron-right"></i></button>
                        <button class="btn-outline" id="todayBtn" style="padding: 4px 16px;">Today</button>
                    </div>
                    <div id="calendarGrid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 12px;"></div>
                </div>
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
        </div>`;
    },

    // ============================================================
    // RENDER MODALS
    // ============================================================
    renderModals: function() {
        if (document.getElementById('modalContainer')) return;
        
        var modalHTML = `
        <div id="modalContainer">
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
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Set Reminder</label>
                            <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
                                <label style="font-weight: 400; font-size: 0.9rem; color: var(--gray); display: flex; align-items: center; gap: 6px;">
                                    <input type="checkbox" id="activityReminder" style="width: 18px; height: 18px; accent-color: var(--primary);"> Enable Reminder
                                </label>
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <input type="number" id="reminderDays" value="1" min="0" max="7" style="width: 60px; padding: 6px 10px; border: 2px solid #E8ECF1; border-radius: 8px; font-size: 0.9rem;">
                                    <span style="font-size: 0.9rem; color: var(--gray);">days before</span>
                                </div>
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
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-weight: 600; color: #1A1A2E; margin-bottom: 6px;">Due Date</label>
                            <input type="date" id="taskDueDate" style="width: 100%; padding: 12px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
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
            
            <!-- ===== TEMPLATES MODAL ===== -->
            <div id="templatesModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
                <div style="background: white; border-radius: 24px; padding: 40px; max-width: 550px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                        <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; margin: 0;">
                            <i class="fas fa-copy" style="color: #6C63FF;"></i> Activity Templates
                        </h3>
                        <button onclick="window.TrackerPage.closeModal('templatesModal')" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div id="templatesList">
                        <div style="text-align:center; padding: 20px; color: var(--gray);">
                            <i class="fas fa-spinner fa-spin"></i> Loading templates...
                        </div>
                    </div>
                    
                    <div style="margin-top: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
                        <input type="text" id="templateNameInput" placeholder="Template name..." style="flex: 1; min-width: 150px; padding: 10px 16px; border: 2px solid #E8ECF1; border-radius: 12px; font-size: 1rem; box-sizing: border-box;">
                        <button class="btn-primary" id="saveTemplateBtn" style="padding: 10px 20px; white-space: nowrap;">
                            <i class="fas fa-save"></i> Save as Template
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- ===== CHECK-IN MODAL ===== -->
            <div id="checkInModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
                <div style="background: white; border-radius: 24px; padding: 40px; max-width: 450px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                        <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; margin: 0;">
                            <i class="fas fa-clipboard-check" style="color: #6C63FF;"></i> Student Check-In
                        </h3>
                        <button onclick="window.TrackerPage.closeModal('checkInModal')" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <p style="color: var(--gray); margin-bottom: 16px;" id="checkInActivityTitle">Checking in for: Activity Name</p>
                    
                    <div id="checkInStudentsList">
                        <div style="text-align:center; padding: 20px; color: var(--gray);">
                            <i class="fas fa-spinner fa-spin"></i> Loading students...
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 12px; margin-top: 20px; padding-top: 15px; border-top: 2px solid #E8ECF1;">
                        <button class="btn-primary" id="saveCheckInBtn" style="flex: 1; padding: 14px; border: none; border-radius: 12px; background: linear-gradient(135deg, #6C63FF 0%, #5A52D5 100%); color: white; font-weight: 600; cursor: pointer;">
                            <i class="fas fa-save"></i> Save Check-Ins
                        </button>
                        <button class="btn-outline" onclick="window.TrackerPage.closeModal('checkInModal')" style="flex: 0.5; padding: 14px; border: 2px solid #E8ECF1; border-radius: 12px; background: transparent; color: #6C7A89; font-weight: 600; cursor: pointer;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- ===== EXPORT MODAL ===== -->
            <div id="exportModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
                <div style="background: white; border-radius: 24px; padding: 40px; max-width: 400px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                        <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; margin: 0;">
                            <i class="fas fa-file-export" style="color: #6C63FF;"></i> Export Data
                        </h3>
                        <button onclick="window.TrackerPage.closeModal('exportModal')" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <button class="btn-primary" id="exportCSVBtn" style="padding: 12px;">
                            <i class="fas fa-file-csv"></i> Export as CSV
                        </button>
                        <button class="btn-primary" id="exportJSONBtn" style="padding: 12px; background: var(--gradient-secondary);">
                            <i class="fas fa-file-code"></i> Export as JSON
                        </button>
                        <button class="btn-outline" onclick="window.TrackerPage.closeModal('exportModal')" style="padding: 12px;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        
        var container = document.createElement('div');
        container.innerHTML = modalHTML;
        document.body.appendChild(container.firstElementChild);
    },

    // ============================================================
    // MODAL FUNCTIONS
    // ============================================================
    showModal: function(modalId) {
        console.log("📝 Showing modal:", modalId);
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
    // ADD ACTIVITY
    // ============================================================
    showAddActivityModal: function(templateData) {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        this.renderModals();
        
        document.getElementById('activityTitle').value = templateData ? templateData.name : '';
        document.getElementById('activityDescription').value = '';
        document.getElementById('activityType').value = templateData ? templateData.type : 'Meeting';
        document.getElementById('activityPeriod').value = templateData ? templateData.period : 'weekly';
        document.getElementById('activityStatus').value = templateData ? templateData.status : 'pending';
        document.getElementById('activityDate').value = new Date().toISOString().slice(0, 10);
        document.getElementById('activityReminder').checked = false;
        document.getElementById('reminderDays').value = 1;
        
        var self = this;
        window.DB.getStudents().then(function(students) {
            var studentSelect = document.getElementById('activityStudents');
            if (studentSelect) {
                studentSelect.innerHTML = '<option value="all">All Students</option>';
                for (var i = 0; i < students.length; i++) {
                    studentSelect.innerHTML += '<option value="' + students[i] + '">' + students[i] + '</option>';
                }
            }
        });
        
        this.showModal('addActivityModal');
    },

    saveActivityFromModal: function() {
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
        var reminder = document.getElementById('activityReminder').checked;
        var reminderDays = parseInt(document.getElementById('reminderDays').value) || 1;
        
        var studentSelect = document.getElementById('activityStudents');
        var selectedStudents = [];
        for (var i = 0; i < studentSelect.options.length; i++) {
            if (studentSelect.options[i].selected) {
                selectedStudents.push(studentSelect.options[i].value);
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
            reminderDays: reminderDays,
            checkedIn: []
        }).then(function() {
            self.closeModal('addActivityModal');
            self.loadData();
        });
    },

    // ============================================================
    // ADD TASK
    // ============================================================
    showAddTaskModal: function() {
        var clubId = document.getElementById('trackerClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        this.renderModals();
        
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskPriorityModal').value = 'medium';
        document.getElementById('taskDueDate').value = '';
        
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

    saveTaskFromModal: function() {
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
        var dueDate = document.getElementById('taskDueDate').value;
        
        var self = this;
        window.DB.addTask(clubId, title, priority, assignedTo, dueDate).then(function() {
            self.closeModal('addTaskModal');
            self.loadData();
        });
    },

    // ============================================================
    // EDIT ACTIVITY
    // ============================================================
    showEditActivityModal: function(activityId, activity) {
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

    updateActivityFromModal: function() {
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
        });
    },

    // ============================================================
    // EDIT ACTIVITY HELPER
    // ============================================================
    editActivity: function(activityId) {
        var clubId = document.getElementById('trackerClubSelect').value;
        var self = this;
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
        });
    },

    // ============================================================
    // TEMPLATES
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
        var templateName = document.getElementById('templateNameInput').value.trim();
        if (!templateName) {
            alert('Please enter a template name');
            return;
        }
        
        var type = document.getElementById('activityType').value;
        var period = document.getElementById('activityPeriod').value;
        var status = document.getElementById('activityStatus').value;
        var clubId = document.getElementById('trackerClubSelect').value;
        
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
    // CHECK-IN
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
    // EXPORT
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
        });
        
        window.DB.getTasks(clubId).then(function(tasks) {
            self.renderTasks(tasks);
        });
        
        window.DB.getMedia(clubId).then(function(media) {
            self.renderMedia(media);
        });
        
        window.DB.getStudents().then(function(students) {
            var studentCount = document.getElementById('studentCount');
            if (studentCount) studentCount.textContent = students.length || 0;
        });
        
        if (document.getElementById('calendarView').style.display !== 'none') {
            self.renderCalendar();
        }
    },

    // ============================================================
    // RENDER ACTIVITIES
    // ============================================================
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
            var isToday = a.date === today;
            var isOverdue = a.date && a.date < today && a.status !== 'completed';
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

    // ============================================================
    // RENDER TASKS
    // ============================================================
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
                    });
                }
            });
        });
    },

    // ============================================================
    // RENDER MEDIA
    // ============================================================
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
                    });
                }
            });
        });
    },

    // ============================================================
    // UPDATE STATS
    // ============================================================
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

    // ============================================================
    // CALENDAR VIEW
    // ============================================================
    renderCalendar: function() {
        var self = this;
        var now = new Date();
        var currentMonth = self.calendarMonth !== undefined ? self.calendarMonth : now.getMonth();
        var currentYear = self.calendarYear !== undefined ? self.calendarYear : now.getFullYear();
        
        document.getElementById('calendarMonthYear').textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
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

    // ============================================================
    // LOAD SAMPLE DATA
    // ============================================================
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
            });
        });
    },

    // ============================================================
    // LOAD TEACHER CLUBS
    // ============================================================
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
        });
    },

    // ============================================================
    // SETUP EVENTS (SAFETY CHECKS ADDED)
    // ============================================================
    setupEvents: function() {
        console.log("🔧 Setting up tracker events...");
        var self = this;
        
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
        
        var addActivityBtn = document.getElementById('addActivityBtn');
        if (addActivityBtn) addActivityBtn.addEventListener('click', function() { self.showAddActivityModal(); });
        
        var saveActivityBtn = document.getElementById('saveActivityBtn');
        if (saveActivityBtn) saveActivityBtn.addEventListener('click', function() { self.saveActivityFromModal(); });
        
        var addTaskBtn = document.getElementById('addTaskBtn');
        if (addTaskBtn) addTaskBtn.addEventListener('click', function() { self.showAddTaskModal(); });
        
        var saveTaskBtn = document.getElementById('saveTaskBtn');
        if (saveTaskBtn) saveTaskBtn.addEventListener('click', function() { self.saveTaskFromModal(); });
        
        var updateActivityBtn = document.getElementById('updateActivityBtn');
        if (updateActivityBtn) updateActivityBtn.addEventListener('click', function() { self.updateActivityFromModal(); });
        
        var templateBtn = document.getElementById('templateBtn');
        if (templateBtn) templateBtn.addEventListener('click', function() { self.showModal('templatesModal'); self.loadTemplates(); });
        
        var saveTemplateBtn = document.getElementById('saveTemplateBtn');
        if (saveTemplateBtn) saveTemplateBtn.addEventListener('click', function() { self.saveCurrentAsTemplate(); });
        
        var saveCheckInBtn = document.getElementById('saveCheckInBtn');
        if (saveCheckInBtn) saveCheckInBtn.addEventListener('click', function() { self.saveCheckIns(); });
        
        var exportDataBtn = document.getElementById('exportDataBtn');
        if (exportDataBtn) exportDataBtn.addEventListener('click', function() { self.showModal('exportModal'); });
        
        var exportCSVBtn = document.getElementById('exportCSVBtn');
        if (exportCSVBtn) exportCSVBtn.addEventListener('click', function() { self.exportCSV(); });
        
        var exportJSONBtn = document.getElementById('exportJSONBtn');
        if (exportJSONBtn) exportJSONBtn.addEventListener('click', function() { self.exportJSON(); });
        
        var toggleViewBtn = document.getElementById('toggleViewBtn');
        if (toggleViewBtn) toggleViewBtn.addEventListener('click', function() {
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
        
        var prevMonthBtn = document.getElementById('prevMonthBtn');
        if (prevMonthBtn) prevMonthBtn.addEventListener('click', function() {
            self.calendarMonth--;
            if (self.calendarMonth < 0) {
                self.calendarMonth = 11;
                self.calendarYear--;
            }
            self.renderCalendar();
        });
        
        var nextMonthBtn = document.getElementById('nextMonthBtn');
        if (nextMonthBtn) nextMonthBtn.addEventListener('click', function() {
            self.calendarMonth++;
            if (self.calendarMonth > 11) {
                self.calendarMonth = 0;
                self.calendarYear++;
            }
            self.renderCalendar();
        });
        
        var todayBtn = document.getElementById('todayBtn');
        if (todayBtn) todayBtn.addEventListener('click', function() {
            var now = new Date();
            self.calendarMonth = now.getMonth();
            self.calendarYear = now.getFullYear();
            self.renderCalendar();
        });
        
        var mediaUploadBtn = document.getElementById('mediaUploadBtn');
        if (mediaUploadBtn) mediaUploadBtn.addEventListener('click', function() {
            document.getElementById('mediaUploadInput').click();
        });
        
        var mediaUploadInput = document.getElementById('mediaUploadInput');
        if (mediaUploadInput) mediaUploadInput.addEventListener('change', function() {
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
                                statusEl.textContent = '';
                            }, 3000);
                        }
                    });
                })(files[i], i);
            }
            this.value = '';
        });
        
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
