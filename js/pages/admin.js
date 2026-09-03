// ============================================================
// ADMIN PAGE - Complete Working Version
// ============================================================

var AdminPage = {
    // ----- RENDER HTML (synchronous) -----
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
            
            <!-- ===== ADD FORMS ===== -->
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
                        <input type="text" id="studentNameInput" placeholder="Student name..." style="flex: 1; padding: 8px 12px; border: 2px solid var(--gray-100); border-radius: var(--radius-md); font-size: 0.9rem;">
                        <button class="btn-primary" id="addStudentBtn" style="padding: 8px 16px; background: var(--accent); font-size: 0.85rem;">
                            <i class="fas fa-user-plus"></i> Add
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
            
            <!-- ===== STUDENTS ===== -->
            <h3 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-user-graduate" style="color: var(--accent);"></i> Students
                <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray-500);" id="studentCountBadge">(0)</span>
            </h3>
            <div id="studentGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; margin-bottom: 24px;">
                <div style="grid-column: 1 / -1; text-align:center; padding: 20px; color: var(--gray-500);">
                    <i class="fas fa-spinner fa-spin"></i> Loading students...
                </div>
            </div>
            
            <!-- ===== TEACHER ALLOCATIONS ===== -->
            <h3 style="font-size: 1.1rem; color: var(--primary); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-user-tie" style="color: var(--secondary);"></i> Teacher Allocations
                <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray-500);">assign teachers to clubs</span>
            </h3>
            <div id="teacherAllocationGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; margin-bottom: 24px;">
                <div style="grid-column: 1 / -1; text-align:center; padding: 20px; color: var(--gray-500);">
                    <i class="fas fa-spinner fa-spin"></i> Loading allocations...
                </div>
            </div>
            
            <!-- ===== FOOTER ===== -->
            <div style="
                background: linear-gradient(135deg, rgba(26,26,46,0.03), rgba(201,168,76,0.03));
                border: 1px solid var(--gray-100);
                border-radius: var(--radius-lg);
                padding: 12px 16px;
                display: flex;
                align-items: center;
                gap: 10px;
                flex-wrap: wrap;
            ">
                <i class="fas fa-info-circle" style="color: var(--secondary); font-size: 0.9rem;"></i>
                <span style="color: var(--gray-500); font-size: 0.8rem;">
                    <strong style="color: var(--primary);">Coordinator Access:</strong> 
                    Full control to manage all clubs, teachers, and students.
                </span>
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

    // ============================================================
    // RENDER MODALS
    // ============================================================
    renderModals: function() {
        if (document.getElementById('adminModalContainer')) return;
        var modalHTML = document.querySelector('#assignTeacherModal').outerHTML;
        var container = document.createElement('div');
        container.id = 'adminModalContainer';
        container.innerHTML = modalHTML;
        document.body.appendChild(container.firstElementChild);
        var original = document.getElementById('assignTeacherModal');
        if (original) original.style.display = 'none';
    },

    showModal: function() {
        this.renderModals();
        var modal = document.getElementById('assignTeacherModal');
        if (modal) { 
            modal.style.display = 'flex'; 
            document.body.style.overflow = 'hidden'; 
        }
    },

    closeModal: function() {
        var modal = document.getElementById('assignTeacherModal');
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
                
                // Update stats
                document.getElementById('adminTotalClubs').textContent = clubs.length || 0;
                document.getElementById('adminTotalTeachers').textContent = teachers.length || 0;
                document.getElementById('adminTotalStudents').textContent = students.length || 0;
                document.getElementById('adminTotalActivities').textContent = '0';
                
                document.getElementById('clubCountBadge').textContent = '(' + clubs.length + ')';
                document.getElementById('teacherCountBadge').textContent = '(' + teachers.length + ')';
                document.getElementById('studentCountBadge').textContent = '(' + students.length + ')';
                
                // Render all sections
                self.renderClubs(clubs);
                self.renderTeachers(teachers);
                self.renderStudents(students);
                self.renderAllocations(allocations);
                self.setupDeleteHandlers();
                self.setupAssignHandlers();
                
                console.log("✅ Admin data loaded successfully");
            }).catch(function(error) {
                console.error("❌ Error loading students:", error);
            });
        }).catch(function(error) {
            console.error("❌ Error loading clubs:", error);
        });
    },

    // ============================================================
    // RENDER CLUBS
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

    // ============================================================
    // RENDER TEACHERS
    // ============================================================
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

    // ============================================================
    // RENDER STUDENTS
    // ============================================================
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

    // ============================================================
    // RENDER ALLOCATIONS
    // ============================================================
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
    // SETUP ASSIGN HANDLERS
    // ============================================================
    setupAssignHandlers: function() {
        var self = this;
        document.querySelectorAll('.assign-teacher-btn').forEach(function(btn) {
            var newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', function() {
                var club = this.dataset.club || '';
                var teacherEmail = this.dataset.teacherEmail || '';
                self.showAssignTeacherModal(club, teacherEmail);
            });
        });
    },

    showAssignTeacherModal: function(club, teacherEmail) {
        var self = this;
        this.renderModals();
        
        var teacherSelect = document.getElementById('assignTeacherSelect');
        if (teacherSelect) {
            var teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
            teacherSelect.innerHTML = '<option value="">Select teacher...</option>';
            for (var i = 0; i < teachers.length; i++) {
                var selected = teachers[i].email === teacherEmail ? 'selected' : '';
                teacherSelect.innerHTML += '<option value="' + teachers[i].email + '" ' + selected + '>' + teachers[i].name + ' (' + teachers[i].email + ')</option>';
            }
        }
        
        var clubSelect = document.getElementById('assignClubSelect');
        if (clubSelect) {
            window.DB.getClubs().then(function(clubs) {
                if (!clubs || clubs.length === 0) {
                    clubs = ['4H Club', 'Community Service', 'Environmental', 'Tutoring'];
                }
                clubSelect.innerHTML = '<option value="">Select club...</option>';
                for (var i = 0; i < clubs.length; i++) {
                    var selected = clubs[i] === club ? 'selected' : '';
                    clubSelect.innerHTML += '<option value="' + clubs[i] + '" ' + selected + '>' + clubs[i] + '</option>';
                }
            });
        }
        
        this.showModal();
    },

    saveAssignment: function() {
        var teacherEmail = document.getElementById('assignTeacherSelect').value;
        var club = document.getElementById('assignClubSelect').value;
        if (!teacherEmail || !club) {
            alert('Please select both a teacher and a club');
            return;
        }
        var allocations = JSON.parse(localStorage.getItem('teacherAllocations') || '[]');
        var exists = allocations.some(function(a) { return a.teacherEmail === teacherEmail && a.club === club; });
        if (exists) {
            alert('This teacher is already assigned to this club');
            return;
        }
        var teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
        var teacher = teachers.find(function(t) { return t.email === teacherEmail; });
        allocations.push({ 
            id: 'alloc-' + Date.now(), 
            teacherEmail: teacherEmail, 
            teacherName: teacher ? teacher.name : teacherEmail.split('@')[0], 
            club: club, 
            created: new Date().toISOString() 
        });
        localStorage.setItem('teacherAllocations', JSON.stringify(allocations));
        alert('✅ Teacher assigned to "' + club + '" successfully!');
        this.closeModal();
        this.loadData();
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
        
        // Load data
        this.loadData();
        
        // Add Club
        var addClubBtn = document.getElementById('addClubBtn');
        if (addClubBtn) {
            addClubBtn.addEventListener('click', function() {
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
        }
        
        // Add Teacher
        var addTeacherBtn = document.getElementById('addTeacherBtn');
        if (addTeacherBtn) {
            addTeacherBtn.addEventListener('click', function() {
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
        }
        
        // Add Student
        var addStudentBtn = document.getElementById('addStudentBtn');
        if (addStudentBtn) {
            addStudentBtn.addEventListener('click', function() {
                var input = document.getElementById('studentNameInput');
                var name = input.value.trim();
                var statusEl = document.getElementById('addStudentStatus');
                if (!name) { statusEl.textContent = '⚠️ Enter a name'; return; }
                window.DB.addStudent(name).then(function() {
                    input.value = '';
                    statusEl.textContent = '✅ Student added!';
                    statusEl.style.color = 'var(--success)';
                    self.loadData();
                    setTimeout(function() { statusEl.textContent = ''; }, 3000);
                }).catch(function(error) {
                    statusEl.textContent = '❌ ' + error.message;
                    statusEl.style.color = 'var(--danger)';
                });
            });
        }
        
        // Save Assignment
        var saveBtn = document.getElementById('saveAssignmentBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() { 
                self.saveAssignment(); 
            });
        }
        
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
        document.getElementById('studentNameInput').addEventListener('keypress', function(e) { 
            if (e.key === 'Enter') document.getElementById('addStudentBtn').click(); 
        });
    }
};

window.AdminPage = AdminPage;
console.log("✅ AdminPage module loaded");
