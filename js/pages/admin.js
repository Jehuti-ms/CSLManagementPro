// ============================================================
// ADMIN PAGE - Complete Student Management with Modal
// ============================================================

var AdminPage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="adminPage" class="page active-page">
            <div class="section-title">
                <i class="fas fa-users-cog"></i> Admin Dashboard
                <span style="font-size: 1rem; font-weight: 400; color: var(--gray);">manage clubs, teachers, and students</span>
            </div>
            
            <!-- ===== STATS ===== -->
            <div class="tracker-stats" style="margin-bottom: 20px;">
                <div class="stat-box"><span id="adminTotalClubs">0</span> Clubs</div>
                <div class="stat-box"><span id="adminTotalTeachers">0</span> Teachers</div>
                <div class="stat-box"><span id="adminTotalStudents">0</span> Students</div>
                <div class="stat-box"><span id="adminTotalActivities">0</span> Activities</div>
            </div>
            
            <!-- ===== QUICK ADD SECTION ===== -->
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                <!-- Add Club -->
                <div style="background: white; border: 1px solid var(--gray-100); border-radius: var(--radius-lg); padding: 16px;">
                    <h4 style="font-weight: 600; color: var(--primary); margin-bottom: 10px; font-size: 0.95rem;">
                        <i class="fas fa-users" style="color: var(--secondary);"></i> Add Club
                    </h4>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="clubNameInput" placeholder="Club name..." style="flex: 1; padding: 8px 12px; border: 2px solid var(--gray-100); border-radius: var(--radius-md); font-size: 0.9rem;">
                        <button class="btn-primary" id="addClubBtn" style="padding: 8px 16px; font-size: 0.85rem;">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </div>
                    <div id="addClubStatus" style="margin-top: 6px; font-size: 0.8rem; color: var(--gray-500);"></div>
                </div>
                
                <!-- Add Teacher -->
                <div style="background: white; border: 1px solid var(--gray-100); border-radius: var(--radius-lg); padding: 16px;">
                    <h4 style="font-weight: 600; color: var(--primary); margin-bottom: 10px; font-size: 0.95rem;">
                        <i class="fas fa-chalkboard-teacher" style="color: var(--secondary);"></i> Add Teacher
                    </h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <input type="text" id="teacherNameInput" placeholder="Name..." style="flex: 1; min-width: 80px; padding: 8px 12px; border: 2px solid var(--gray-100); border-radius: var(--radius-md); font-size: 0.9rem;">
                        <input type="email" id="teacherEmailInput" placeholder="Email..." style="flex: 1; min-width: 100px; padding: 8px 12px; border: 2px solid var(--gray-100); border-radius: var(--radius-md); font-size: 0.9rem;">
                        <button class="btn-primary" id="addTeacherBtn" style="padding: 8px 16px; background: var(--secondary); font-size: 0.85rem;">
                            <i class="fas fa-user-plus"></i> Add
                        </button>
                    </div>
                    <div id="addTeacherStatus" style="margin-top: 6px; font-size: 0.8rem; color: var(--gray-500);"></div>
                </div>
                
                <!-- Add Student -->
                <div style="background: white; border: 1px solid var(--gray-100); border-radius: var(--radius-lg); padding: 16px;">
                    <h4 style="font-weight: 600; color: var(--primary); margin-bottom: 10px; font-size: 0.95rem;">
                        <i class="fas fa-user-graduate" style="color: var(--accent);"></i> Add Student
                    </h4>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn-primary" id="openAddStudentModalBtn" style="flex: 1; padding: 8px 16px; background: var(--accent); font-size: 0.85rem;">
                            <i class="fas fa-user-plus"></i> Add New Student
                        </button>
                    </div>
                    <div id="addStudentStatus" style="margin-top: 6px; font-size: 0.8rem; color: var(--gray-500);"></div>
                </div>
            </div>
            
            <!-- ===== CLUBS ===== -->
            <h3 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-users" style="color: var(--secondary);"></i> Clubs
                <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray-500);" id="clubCountBadge">(0)</span>
            </h3>
            <div id="clubGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 24px;">
                <div style="grid-column: 1 / -1; text-align:center; padding: 20px; color: var(--gray-500);">
                    <i class="fas fa-spinner fa-spin"></i> Loading clubs...
                </div>
            </div>
            
            <!-- ===== TEACHERS ===== -->
            <h3 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-chalkboard-teacher" style="color: var(--secondary);"></i> Teachers
                <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray-500);" id="teacherCountBadge">(0)</span>
            </h3>
            <div id="teacherGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; margin-bottom: 24px;">
                <div style="grid-column: 1 / -1; text-align:center; padding: 20px; color: var(--gray-500);">
                    <i class="fas fa-spinner fa-spin"></i> Loading teachers...
                </div>
            </div>
            
            // ... Continue with students and allocations
        </div>
        
        <!-- ===== ADD STUDENT MODAL ===== -->
        <div id="addStudentModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
            <div style="background: white; border-radius: 24px; padding: 32px 36px; max-width: 550px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                    <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 10px; font-size: 1.2rem; margin: 0;">
                        <i class="fas fa-user-graduate" style="color: var(--accent);"></i> Add New Student
                    </h3>
                    <button onclick="window.AdminPage.closeModal('addStudentModal')" style="background: none; border: none; font-size: 1.5rem; color: #6C7A89; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                    <!-- Left Column -->
                    <div>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.85rem;">Full Name <span style="color: var(--danger);">*</span></label>
                            <input type="text" id="studentFullName" placeholder="e.g., Emma Wilson" style="width: 100%; padding: 8px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.9rem;">
                        </div>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.85rem;">Form/Class <span style="color: var(--danger);">*</span></label>
                            <input type="text" id="studentForm" placeholder="e.g., 10A, 11B" style="width: 100%; padding: 8px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.9rem;">
                        </div>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.85rem;">Year Group <span style="color: var(--danger);">*</span></label>
                            <select id="studentYearGroup" style="width: 100%; padding: 8px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.9rem;">
                                <option value="">Select year...</option>
                                <option value="7">Year 7</option>
                                <option value="8">Year 8</option>
                                <option value="9">Year 9</option>
                                <option value="10">Year 10</option>
                                <option value="11">Year 11</option>
                                <option value="12">Year 12</option>
                                <option value="13">Year 13</option>
                            </select>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.85rem;">Club Allocation <span style="color: var(--danger);">*</span></label>
                            <select id="studentClubAllocation" style="width: 100%; padding: 8px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.9rem;">
                                <option value="">Select club...</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Right Column -->
                    <div>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.85rem;">Medical Info</label>
                            <textarea id="studentMedicalInfo" placeholder="Allergies, conditions, medications..." rows="3" style="width: 100%; padding: 8px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.9rem; font-family: var(--font-sans); resize: vertical;"></textarea>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.85rem;">Emergency Contact</label>
                            <input type="text" id="studentEmergencyContact" placeholder="Parent/Guardian name & phone" style="width: 100%; padding: 8px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.9rem;">
                        </div>
                        <div>
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.85rem;">Student Photo</label>
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <input type="file" id="studentPhotoInput" accept="image/*" style="display: none;">
                                <button class="btn-outline" id="uploadPhotoBtn" style="padding: 6px 14px; font-size: 0.8rem;">
                                    <i class="fas fa-camera"></i> Upload Photo
                                </button>
                                <span id="photoFileName" style="font-size: 0.8rem; color: var(--gray-500);">No photo selected</span>
                            </div>
                            <div id="photoPreview" style="margin-top: 8px; display: none;">
                                <img id="photoPreviewImg" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gray-light);">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 16px; padding-top: 14px; border-top: 2px solid #E8ECF1;">
                    <button class="btn-primary" id="saveStudentBtn" style="flex: 1; padding: 10px; background: var(--accent); font-size: 0.9rem;">
                        <i class="fas fa-save"></i> Add Student
                    </button>
                    <button class="btn-outline" onclick="window.AdminPage.closeModal('addStudentModal')" style="flex: 0.5; padding: 10px; font-size: 0.9rem;">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        
        <!-- ===== STUDENT DETAIL MODAL ===== -->
        <div id="studentDetailModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
            <div style="background: white; border-radius: 24px; padding: 32px 36px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                    <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 10px; font-size: 1.2rem; margin: 0;">
                        <i class="fas fa-user-graduate" style="color: var(--accent);"></i> Student Details
                    </h3>
                    <button onclick="window.AdminPage.closeModal('studentDetailModal')" style="background: none; border: none; font-size: 1.5rem; color: #6C7A89; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="studentDetailContent">
                    <div style="text-align:center; padding: 20px; color: var(--gray-500);">
                        <i class="fas fa-spinner fa-spin"></i> Loading...
                    </div>
                </div>
            </div>
        </div>
        
        <!-- ===== ASSIGN TEACHER MODAL ===== -->
        <div id="assignTeacherModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
            <div style="background: white; border-radius: 24px; padding: 28px 32px; max-width: 450px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                    <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 10px; font-size: 1.1rem; margin: 0;">
                        <i class="fas fa-user-tie" style="color: var(--secondary);"></i> Assign Teacher
                    </h3>
                    <button onclick="window.AdminPage.closeModal()" style="background: none; border: none; font-size: 1.4rem; color: #6C7A89; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.85rem;">Teacher</label>
                    <select id="assignTeacherSelect" style="width: 100%; padding: 8px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.9rem;">
                        <option value="">Select teacher...</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.85rem;">Club</label>
                    <select id="assignClubSelect" style="width: 100%; padding: 8px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.9rem;">
                        <option value="">Select club...</option>
                    </select>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 16px; padding-top: 12px; border-top: 2px solid #E8ECF1;">
                    <button class="btn-primary" id="saveAssignmentBtn" style="flex: 1; padding: 10px; background: var(--secondary); font-size: 0.9rem;">
                        <i class="fas fa-save"></i> Assign
                    </button>
                    <button class="btn-outline" onclick="window.AdminPage.closeModal()" style="flex: 0.5; padding: 10px; font-size: 0.9rem;">
                        Cancel
                    </button>
                </div>
            </div>
        </div>`;
    },

    // ... rest of the functions continue
