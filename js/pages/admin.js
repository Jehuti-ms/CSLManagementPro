// ============================================================
// ADMIN PAGE - Complete with Teacher Allocation & Email Upload
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
                
                <!-- Bulk Email Upload -->
                <div style="background: white; border: 1px solid var(--gray-100); border-radius: var(--radius-lg); padding: 16px;">
                    <h4 style="font-weight: 600; color: var(--primary); margin-bottom: 10px; font-size: 0.95rem;">
                        <i class="fas fa-file-upload" style="color: var(--accent);"></i> Bulk Upload
                    </h4>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <input type="file" id="bulkUploadInput" accept=".csv,.txt" style="display: none;">
                        <button class="btn-primary" id="bulkUploadBtn" style="flex: 1; padding: 8px 16px; background: var(--accent); font-size: 0.85rem;">
                            <i class="fas fa-upload"></i> Upload CSV
                        </button>
                        <button class="btn-outline" id="downloadTemplateBtn" style="padding: 8px 12px; font-size: 0.8rem;">
                            <i class="fas fa-download"></i> Template
                        </button>
                    </div>
                    <div id="bulkUploadStatus" style="margin-top: 6px; font-size: 0.8rem; color: var(--gray-500);"></div>
                </div>
            </div>
            
            <!-- ===== TEACHER ALLOCATION ===== -->
            <div style="background: white; border: 1px solid var(--gray-100); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 24px;">
                <h4 style="font-weight: 600; color: var(--primary); margin-bottom: 10px; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-user-tie" style="color: var(--secondary);"></i> Allocate Teachers to Clubs
                </h4>
                <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                    <select id="allocateTeacherSelect" style="flex: 1; min-width: 150px; padding: 8px 12px; border: 2px solid var(--gray-100); border-radius: var(--radius-md); font-size: 0.9rem;">
                        <option value="">Select teacher...</option>
                    </select>
                    <select id="allocateClubSelect" style="flex: 1; min-width: 150px; padding: 8px 12px; border: 2px solid var(--gray-100); border-radius: var(--radius-md); font-size: 0.9rem;">
                        <option value="">Select club...</option>
                    </select>
                    <button class="btn-primary" id="allocateTeacherBtn" style="padding: 8px 16px; background: var(--secondary); font-size: 0.85rem;">
                        <i class="fas fa-check"></i> Allocate
                    </button>
                </div>
                <div id="allocationStatus" style="margin-top: 6px; font-size: 0.8rem; color: var(--gray-500);"></div>
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
            
            <!-- ===== TEACHER ALLOCATIONS LIST ===== -->
            <h3 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-user-tie" style="color: var(--secondary);"></i> Teacher Allocations
                <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray-500);">assigned teachers</span>
            </h3>
            <div id="teacherAllocationGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; margin-bottom: 24px;">
                <div style="grid-column: 1 / -1; text-align:center; padding: 20px; color: var(--gray-500);">
                    <i class="fas fa-spinner fa-spin"></i> Loading allocations...
                </div>
            </div>
            
            <!-- ===== STUDENTS ===== -->
            <h3 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-user-graduate" style="color: var(--accent);"></i> Students
                <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray-500);" id="studentCountBadge">(0)</span>
            </h3>
            <div id="studentGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 24px;">
                <div style="grid-column: 1 / -1; text-align:center; padding: 20px; color: var(--gray-500);">
                    <i class="fas fa-spinner fa-spin"></i> Loading students...
                </div>
            </div>
            
            <!-- ===== FOOTER ===== -->
            <div style="background: linear-gradient(135deg, rgba(26,26,46,0.03), rgba(201,168,76,0.03)); border: 1px solid var(--gray-100); border-radius: var(--radius-lg); padding: 12px 16px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <i class="fas fa-info-circle" style="color: var(--secondary); font-size: 0.9rem;"></i>
                <span style="color: var(--gray-500); font-size: 0.8rem;">
                    <strong style="color: var(--primary);">Coordinator Access:</strong> 
                    Full control to manage all clubs, teachers, and students.
                </span>
            </div>
        </div>
        
        <!-- ===== ADD STUDENT MODAL ===== -->
        <div id="addStudentModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
            <div style="background: white; border-radius: 24px; padding: 32px 36px; max-width: 550px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                    <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 10px; font-size: 1.2rem; margin: 0;">
                        <i class="fas fa-user-graduate" style="color: var(--accent);"></i> Add New Student
                    </h3>
                    <button onclick="window.AdminPage.closeModal('addStudentModal')" style="background: none; border: none; font-size: 1.5rem; color: #6C7A89; cursor: pointer; padding: 4px;">
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
        </div>`;
    },

    // ============================================================
    // RENDER MODALS
    // ============================================================
    renderModals: function() {
        if (document.getElementById('adminModalContainer')) return;
        var modalHTML = document.querySelector('#addStudentModal').outerHTML;
        var container = document.createElement('div');
        container.id = 'adminModalContainer';
        container.innerHTML = modalHTML;
        document.body.appendChild(container.firstElementChild);
        var original = document.getElementById('addStudentModal');
        if (original) original.style.display = 'none';
    },

    // ----- SHOW MODAL -----
    showModal: function(modalId) {
        this.renderModals();
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    },

    // ----- CLOSE MODAL -----
    closeModal: function(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },

    // ============================================================
    // LOAD DATA
    // ============================================================
    loadData: function() {
        console.log("📊 Loading admin data...");
        var self = this;
        
        window.DB.getClubs().then(function(clubs) {
            window.DB.getStudents().then(function(students) {
                var teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
                var allocations = JSON.parse(localStorage.getItem('teacherAllocations') || '[]');
                
                document.getElementById('adminTotalClubs').textContent = clubs.length || 0;
                document.getElementById('adminTotalTeachers').textContent = teachers.length || 0;
                document.getElementById('adminTotalStudents').textContent = students.length || 0;
                document.getElementById('adminTotalActivities').textContent = '0';
                
                document.getElementById('clubCountBadge').textContent = '(' + clubs.length + ')';
                document.getElementById('teacherCountBadge').textContent = '(' + teachers.length + ')';
                document.getElementById('studentCountBadge').textContent = '(' + students.length + ')';
                
                self.renderClubs(clubs);
                self.renderTeachers(teachers);
                self.renderStudents(students);
                self.renderAllocations(allocations);
                self.populateAllocationDropdowns(teachers, clubs);
                self.setupDeleteHandlers();
                
                console.log("✅ Admin data loaded successfully");
            }).catch(function(error) {
                console.error("❌ Error loading students:", error);
            });
        }).catch(function(error) {
            console.error("❌ Error loading clubs:", error);
        });
    },

    // ============================================================
    // POPULATE ALLOCATION DROPDOWNS
    // ============================================================
    populateAllocationDropdowns: function(teachers, clubs) {
        var teacherSelect = document.getElementById('allocateTeacherSelect');
        var clubSelect = document.getElementById('allocateClubSelect');
        
        if (teacherSelect) {
            teacherSelect.innerHTML = '<option value="">Select teacher...</option>';
            for (var i = 0; i < teachers.length; i++) {
                teacherSelect.innerHTML += '<option value="' + teachers[i].email + '">' + teachers[i].name + ' (' + teachers[i].email + ')</option>';
            }
        }
        
        if (clubSelect) {
            clubSelect.innerHTML = '<option value="">Select club...</option>';
            for (var i = 0; i < clubs.length; i++) {
                clubSelect.innerHTML += '<option value="' + clubs[i] + '">' + clubs[i] + '</option>';
            }
        }
    },

    // ============================================================
    // RENDER FUNCTIONS
    // ============================================================
    renderClubs: function(clubs) {
        var grid = document.getElementById('clubGrid');
        if (!grid) return;
        if (!clubs || clubs.length === 0) {
            grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--gray-500);">
                <i class="fas fa-users" style="font-size:2rem;display:block;margin-bottom:8px;opacity:0.4;"></i>
                No clubs yet
            </div>`;
            return;
        }
        var html = '';
        var colors = ['#6C63FF','#FF6584','#00D2A0','#FFB84D','#4ECDC4','#FF6B6B'];
        for (var i = 0; i < clubs.length; i++) {
            var club = clubs[i];
            var color = colors[i % colors.length];
            var initials = club.split(' ').map(function(w){return w[0];}).join('').substring(0,2).toUpperCase();
            html += `<div style="background:white;border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:10px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:34px;height:34px;border-radius:var(--radius-md);background:${color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.75rem;flex-shrink:0;">${initials}</div>
                    <div><div style="font-weight:600;font-size:0.9rem;">${club}</div></div>
                </div>
                <button class="delete-club" data-name="${club}" style="background:none;border:none;color:var(--gray-300);cursor:pointer;padding:4px 6px;font-size:0.85rem;"><i class="fas fa-trash"></i></button>
            </div>`;
        }
        grid.innerHTML = html;
    },

    renderTeachers: function(teachers) {
        var grid = document.getElementById('teacherGrid');
        if (!grid) return;
        if (!teachers || teachers.length === 0) {
            grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--gray-500);">
                <i class="fas fa-chalkboard-teacher" style="font-size:2rem;display:block;margin-bottom:8px;opacity:0.4;"></i>
                No teachers yet
            </div>`;
            return;
        }
        var html = '';
        var colors = ['#6C63FF','#FF6584','#00D2A0','#FFB84D','#4ECDC4'];
        for (var i = 0; i < teachers.length; i++) {
            var t = teachers[i];
            var color = colors[i % colors.length];
            var initials = t.name.split(' ').map(function(w){return w[0];}).join('').substring(0,2).toUpperCase();
            html += `<div style="background:white;border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:10px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:34px;height:34px;border-radius:var(--radius-md);background:${color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.75rem;flex-shrink:0;">${initials}</div>
                    <div><div style="font-weight:600;font-size:0.9rem;">${t.name}</div><div style="font-size:0.65rem;color:var(--gray-500);">${t.email}</div></div>
                </div>
                <button class="delete-teacher" data-email="${t.email}" style="background:none;border:none;color:var(--gray-300);cursor:pointer;padding:4px 6px;font-size:0.85rem;"><i class="fas fa-trash"></i></button>
            </div>`;
        }
        grid.innerHTML = html;
    },

    renderStudents: function(students) {
        var grid = document.getElementById('studentGrid');
        if (!grid) return;
        if (!students || students.length === 0) {
            grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--gray-500);">
                <i class="fas fa-user-graduate" style="font-size:2rem;display:block;margin-bottom:8px;opacity:0.4;"></i>
                No students yet
            </div>`;
            return;
        }
        var html = '';
        var colors = ['#6C63FF','#FF6584','#00D2A0','#FFB84D','#4ECDC4','#FF6B6B'];
        for (var i = 0; i < students.length; i++) {
            var s = students[i];
            var color = colors[i % colors.length];
            var initials = s.split(' ').map(function(w){return w[0];}).join('').substring(0,2).toUpperCase();
            html += `<div style="background:white;border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:8px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                <div style="display:flex;align-items:center;gap:8px;">
                    <div style="width:30px;height:30px;border-radius:50%;background:${color};color:white;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:0.65rem;flex-shrink:0;">${initials}</div>
                    <span style="font-weight:500;font-size:0.9rem;">${s}</span>
                </div>
                <button class="delete-student" data-name="${s}" style="background:none;border:none;color:var(--gray-300);cursor:pointer;padding:4px 6px;font-size:0.85rem;"><i class="fas fa-times"></i></button>
            </div>`;
        }
        grid.innerHTML = html;
    },

    renderAllocations: function(allocations) {
        var grid = document.getElementById('teacherAllocationGrid');
        if (!grid) return;
        if (!allocations || allocations.length === 0) {
            grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--gray-500);">
                <i class="fas fa-user-tie" style="font-size:2rem;display:block;margin-bottom:8px;opacity:0.4;"></i>
                No allocations yet
            </div>`;
            return;
        }
        var html = '';
        for (var i = 0; i < allocations.length; i++) {
            var a = allocations[i];
            html += `<div style="background:white;border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:10px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                <div>
                    <div style="font-weight:600;font-size:0.9rem;">${a.teacherName}</div>
                    <div style="font-size:0.65rem;color:var(--gray-500);">${a.teacherEmail}</div>
                    <div style="font-size:0.7rem;color:var(--secondary);"><i class="fas fa-users"></i> ${a.club}</div>
                </div>
                <button class="delete-allocation" data-id="${a.id}" style="background:none;border:none;color:var(--gray-300);cursor:pointer;padding:4px 6px;font-size:0.85rem;"><i class="fas fa-trash"></i></button>
            </div>`;
        }
        grid.innerHTML = html;
    },

    // ============================================================
    // ALLOCATE TEACHER TO CLUB
    // ============================================================
    allocateTeacher: function() {
        var teacherEmail = document.getElementById('allocateTeacherSelect').value;
        var club = document.getElementById('allocateClubSelect').value;
        var statusEl = document.getElementById('allocationStatus');
        
        if (!teacherEmail) {
            statusEl.textContent = '⚠️ Please select a teacher';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        if (!club) {
            statusEl.textContent = '⚠️ Please select a club';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        
        var teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
        var teacher = teachers.find(function(t) { return t.email === teacherEmail; });
        if (!teacher) {
            statusEl.textContent = '⚠️ Teacher not found';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        
        var allocations = JSON.parse(localStorage.getItem('teacherAllocations') || '[]');
        var exists = allocations.some(function(a) { return a.teacherEmail === teacherEmail && a.club === club; });
        if (exists) {
            statusEl.textContent = '⚠️ This teacher is already allocated to this club';
            statusEl.style.color = 'var(--warning)';
            return;
        }
        
        allocations.push({
            id: 'alloc-' + Date.now(),
            teacherEmail: teacherEmail,
            teacherName: teacher.name,
            club: club,
            created: new Date().toISOString()
        });
        
        localStorage.setItem('teacherAllocations', JSON.stringify(allocations));
        statusEl.textContent = '✅ Teacher allocated to "' + club + '" successfully!';
        statusEl.style.color = 'var(--success)';
        this.loadData();
        setTimeout(function() { statusEl.textContent = ''; }, 3000);
    },

    // ============================================================
    // BULK EMAIL UPLOAD
    // ============================================================
    handleBulkUpload: function(file) {
        var self = this;
        var statusEl = document.getElementById('bulkUploadStatus');
        
        if (!file) {
            statusEl.textContent = '⚠️ No file selected';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        
        var reader = new FileReader();
        reader.onload = function(e) {
            var content = e.target.result;
            var lines = content.split('\n').filter(function(line) { return line.trim(); });
            var headers = lines[0].split(',').map(function(h) { return h.trim().toLowerCase(); });
            
            // Expected: Name,Email,Role (teacher/student)
            var nameIndex = headers.indexOf('name');
            var emailIndex = headers.indexOf('email');
            var roleIndex = headers.indexOf('role');
            
            if (nameIndex === -1 || emailIndex === -1) {
                statusEl.textContent = '⚠️ CSV must have "Name" and "Email" columns';
                statusEl.style.color = 'var(--danger)';
                return;
            }
            
            var teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
            var students = JSON.parse(localStorage.getItem('studentDetails') || '[]');
            var added = 0;
            var errors = 0;
            
            for (var i = 1; i < lines.length; i++) {
                var cols = lines[i].split(',').map(function(c) { return c.trim(); });
                var name = cols[nameIndex] || '';
                var email = cols[emailIndex] || '';
                var role = roleIndex !== -1 ? cols[roleIndex] : '';
                
                if (!name || !email) continue;
                
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    errors++;
                    continue;
                }
                
                if (role.toLowerCase() === 'teacher' || role === '') {
                    // Add as teacher
                    if (!teachers.some(function(t) { return t.email === email; })) {
                        teachers.push({ id: 't-' + Date.now(), name: name, email: email });
                        added++;
                    }
                } else if (role.toLowerCase() === 'student') {
                    // Add as student
                    if (!students.some(function(s) { return s.name === name && s.email === email; })) {
                        students.push({ id: 's-' + Date.now(), name: name, email: email, form: '', yearGroup: '', medicalInfo: '', emergencyContact: '' });
                        added++;
                    }
                }
            }
            
            localStorage.setItem('teachers', JSON.stringify(teachers));
            localStorage.setItem('studentDetails', JSON.stringify(students));
            
            statusEl.textContent = '✅ Uploaded ' + added + ' users (' + errors + ' errors)';
            statusEl.style.color = 'var(--success)';
            self.loadData();
            setTimeout(function() { statusEl.textContent = ''; }, 5000);
        };
        reader.readAsText(file);
    },

    // ============================================================
    // DOWNLOAD TEMPLATE
    // ============================================================
    downloadTemplate: function() {
        var csvContent = 'Name,Email,Role\nJohn Doe,john@school.com,teacher\nJane Smith,jane@school.com,student\nEmma Wilson,emma@school.com,student\n';
        var blob = new Blob([csvContent], { type: 'text/csv' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'user_upload_template.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // ============================================================
    // SHOW ADD STUDENT MODAL
    // ============================================================
    showAddStudentModal: function() {
        this.renderModals();
        
        document.getElementById('studentFullName').value = '';
        document.getElementById('studentForm').value = '';
        document.getElementById('studentYearGroup').value = '';
        document.getElementById('studentMedicalInfo').value = '';
        document.getElementById('studentEmergencyContact').value = '';
        document.getElementById('photoFileName').textContent = 'No photo selected';
        document.getElementById('photoPreview').style.display = 'none';
        document.getElementById('studentPhotoInput').value = '';
        
        var clubSelect = document.getElementById('studentClubAllocation');
        if (clubSelect) {
            window.DB.getClubs().then(function(clubs) {
                if (!clubs || clubs.length === 0) { clubs = ['4H Club']; }
                clubSelect.innerHTML = '<option value="">Select club...</option>';
                for (var i = 0; i < clubs.length; i++) {
                    clubSelect.innerHTML += '<option value="' + clubs[i] + '">' + clubs[i] + '</option>';
                }
            });
        }
        
        this.showModal('addStudentModal');
    },

    // ============================================================
    // SAVE STUDENT
    // ============================================================
    saveStudent: function() {
        var name = document.getElementById('studentFullName').value.trim();
        var form = document.getElementById('studentForm').value.trim();
        var yearGroup = document.getElementById('studentYearGroup').value;
        var club = document.getElementById('studentClubAllocation').value;
        var medicalInfo = document.getElementById('studentMedicalInfo').value.trim();
        var emergencyContact = document.getElementById('studentEmergencyContact').value.trim();
        
        if (!name) { alert('Please enter the student\'s full name'); return; }
        if (!form) { alert('Please enter the student\'s form/class'); return; }
        if (!yearGroup) { alert('Please select the year group'); return; }
        if (!club) { alert('Please select a club allocation'); return; }
        
        var studentData = {
            name: name,
            form: form,
            yearGroup: yearGroup,
            club: club,
            medicalInfo: medicalInfo || 'None provided',
            emergencyContact: emergencyContact || 'Not provided',
            createdAt: new Date().toISOString()
        };
        
        var self = this;
        var saveBtn = document.getElementById('saveStudentBtn');
        var originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        window.DB.addStudent(name).then(function() {
            var students = JSON.parse(localStorage.getItem('studentDetails') || '[]');
            students.push({ id: 's-' + Date.now(), ...studentData });
            localStorage.setItem('studentDetails', JSON.stringify(students));
            
            saveBtn.innerHTML = '✅ Saved!';
            document.getElementById('addStudentStatus').textContent = '✅ Student added successfully!';
            document.getElementById('addStudentStatus').style.color = 'var(--success)';
            
            setTimeout(function() {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
                self.closeModal('addStudentModal');
                self.loadData();
                setTimeout(function() { document.getElementById('addStudentStatus').textContent = ''; }, 3000);
            }, 1000);
        }).catch(function(error) {
            saveBtn.innerHTML = '❌ Error';
            document.getElementById('addStudentStatus').textContent = '❌ ' + error.message;
            document.getElementById('addStudentStatus').style.color = 'var(--danger)';
            setTimeout(function() {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }, 2000);
        });
    },

    // ============================================================
    // SETUP DELETE HANDLERS
    // ============================================================
    setupDeleteHandlers: function() {
        var self = this;
        
        document.querySelectorAll('.delete-club').forEach(function(btn) {
            var newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', function() {
                var name = this.dataset.name;
                if (confirm('Delete club "' + name + '"?')) {
                    window.DB.deleteClub(name).then(function() { self.loadData(); });
                }
            });
        });
        
        document.querySelectorAll('.delete-student').forEach(function(btn) {
            var newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', function() {
                var name = this.dataset.name;
                if (confirm('Delete student "' + name + '"?')) {
                    window.DB.deleteStudent(name).then(function() { self.loadData(); });
                }
            });
        });
        
        document.querySelectorAll('.delete-teacher').forEach(function(btn) {
            var newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', function() {
                var email = this.dataset.email;
                if (confirm('Remove teacher "' + email + '"?')) {
                    var teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
                    teachers = teachers.filter(function(t) { return t.email !== email; });
                    localStorage.setItem('teachers', JSON.stringify(teachers));
                    var allocations = JSON.parse(localStorage.getItem('teacherAllocations') || '[]');
                    allocations = allocations.filter(function(a) { return a.teacherEmail !== email; });
                    localStorage.setItem('teacherAllocations', JSON.stringify(allocations));
                    self.loadData();
                }
            });
        });
        
        document.querySelectorAll('.delete-allocation').forEach(function(btn) {
            var newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', function() {
                var id = this.dataset.id;
                if (confirm('Remove this allocation?')) {
                    var allocations = JSON.parse(localStorage.getItem('teacherAllocations') || '[]');
                    allocations = allocations.filter(function(a) { return a.id !== id; });
                    localStorage.setItem('teacherAllocations', JSON.stringify(allocations));
                    self.loadData();
                }
            });
        });
    },

    // ============================================================
    // SETUP EVENTS
    // ============================================================
    setupEvents: function() {
        console.log("🔧 Setting up admin events...");
        var self = this;
        
        this.renderModals();
        this.loadData();
        
        // Add Club
        document.getElementById('addClubBtn').addEventListener('click', function() {
            var input = document.getElementById('clubNameInput');
            var name = input.value.trim();
            var statusEl = document.getElementById('addClubStatus');
            if (!name) { statusEl.textContent = '⚠️ Enter a club name'; return; }
            window.DB.addClub(name).then(function() {
                input.value = '';
                statusEl.textContent = '✅ Club added!';
                statusEl.style.color = 'var(--success)';
                self.loadData();
                setTimeout(function() { statusEl.textContent = ''; }, 3000);
            }).catch(function(error) {
                statusEl.textContent = '❌ ' + error.message;
                statusEl.style.color = 'var(--danger)';
            });
        });
        
        // Add Teacher
        document.getElementById('addTeacherBtn').addEventListener('click', function() {
            var nameInput = document.getElementById('teacherNameInput');
            var emailInput = document.getElementById('teacherEmailInput');
            var statusEl = document.getElementById('addTeacherStatus');
            var name = nameInput.value.trim();
            var email = emailInput.value.trim();
            if (!name) { statusEl.textContent = '⚠️ Enter a name'; return; }
            if (!email) { statusEl.textContent = '⚠️ Enter an email'; return; }
            var teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
            if (teachers.some(function(t) { return t.email === email; })) {
                statusEl.textContent = '⚠️ Teacher exists';
                return;
            }
            teachers.push({ id: 't-' + Date.now(), name: name, email: email });
            localStorage.setItem('teachers', JSON.stringify(teachers));
            nameInput.value = '';
            emailInput.value = '';
            statusEl.textContent = '✅ Teacher added!';
            statusEl.style.color = 'var(--success)';
            self.loadData();
            setTimeout(function() { statusEl.textContent = ''; }, 3000);
        });
        
        // Allocate Teacher
        document.getElementById('allocateTeacherBtn').addEventListener('click', function() {
            self.allocateTeacher();
        });
        
        // Bulk Upload
        document.getElementById('bulkUploadBtn').addEventListener('click', function() {
            document.getElementById('bulkUploadInput').click();
        });
        document.getElementById('bulkUploadInput').addEventListener('change', function() {
            var file = this.files[0];
            if (file) {
                self.handleBulkUpload(file);
            }
            this.value = '';
        });
        
        // Download Template
        document.getElementById('downloadTemplateBtn').addEventListener('click', function() {
            self.downloadTemplate();
        });
        
        // Open Add Student Modal
        document.getElementById('openAddStudentModalBtn').addEventListener('click', function() {
            self.showAddStudentModal();
        });
        
        // Save Student
        document.getElementById('saveStudentBtn').addEventListener('click', function() {
            self.saveStudent();
        });
        
        // Upload Photo
        document.getElementById('uploadPhotoBtn').addEventListener('click', function() {
            document.getElementById('studentPhotoInput').click();
        });
        document.getElementById('studentPhotoInput').addEventListener('change', function() {
            var file = this.files[0];
            if (file) {
                document.getElementById('photoFileName').textContent = file.name;
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('photoPreview').style.display = 'block';
                    document.getElementById('photoPreviewImg').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Enter key shortcuts
        document.getElementById('clubNameInput').addEventListener('keypress', function(e) { 
            if (e.key === 'Enter') document.getElementById('addClubBtn').click(); 
        });
        document.getElementById('teacherNameInput').addEventListener('keypress', function(e) { 
            if (e.key === 'Enter') document.getElementById('addTeacherBtn').click(); 
        });
        document.getElementById('teacherEmailInput').addEventListener('keypress', function(e) { 
            if (e.key === 'Enter') document.getElementById('addTeacherBtn').click(); 
        });
        
        // Close modals on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                self.closeModal('addStudentModal');
            }
        });
    }
};

window.AdminPage = AdminPage;
console.log("✅ AdminPage module loaded");
