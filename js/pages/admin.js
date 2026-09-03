// ============================================================
// ADMIN PAGE - Simplified Working Version
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
            
            // ... continue with students and allocations
        </div>`;
    },

    // ----- SETUP EVENTS -----
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
    },
    
    // ----- LOAD DATA (async) -----
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
                
                // Render
                self.renderClubs(clubs);
                self.renderTeachers(teachers);
                self.renderStudents(students);
                self.renderAllocations(allocations);
            }).catch(function(error) {
                console.error("❌ Error loading students:", error);
            });
        }).catch(function(error) {
            console.error("❌ Error loading clubs:", error);
        });
    },

    // ----- RENDER CLUBS -----
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
            html += `<div style="background:white;border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:36px;height:36px;border-radius:var(--radius-md);background:${color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;">${initials}</div>
                    <div><div style="font-weight:600;font-size:0.9rem;">${club}</div></div>
                </div>
                <button class="delete-club" data-name="${club}" style="background:none;border:none;color:var(--gray-300);cursor:pointer;padding:4px 6px;font-size:0.9rem;"><i class="fas fa-trash"></i></button>
            </div>`;
        }
        grid.innerHTML = html;
        this.setupDeleteHandlers();
    },

    // ----- RENDER TEACHERS -----
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
            html += `<div style="background:white;border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:36px;height:36px;border-radius:var(--radius-md);background:${color};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;flex-shrink:0;">${initials}</div>
                    <div><div style="font-weight:600;font-size:0.9rem;">${t.name}</div><div style="font-size:0.7rem;color:var(--gray-500);">${t.email}</div></div>
                </div>
                <button class="delete-teacher" data-email="${t.email}" style="background:none;border:none;color:var(--gray-300);cursor:pointer;padding:4px 6px;font-size:0.9rem;"><i class="fas fa-trash"></i></button>
            </div>`;
        }
        grid.innerHTML = html;
    },

    // ----- RENDER STUDENTS -----
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
            html += `<div style="background:white;border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:10px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:32px;height:32px;border-radius:50%;background:${color};color:white;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:0.7rem;flex-shrink:0;">${initials}</div>
                    <span style="font-weight:500;font-size:0.9rem;">${s}</span>
                </div>
                <button class="delete-student" data-name="${s}" style="background:none;border:none;color:var(--gray-300);cursor:pointer;padding:4px 6px;font-size:0.9rem;"><i class="fas fa-times"></i></button>
            </div>`;
        }
        grid.innerHTML = html;
    },

    // ----- RENDER ALLOCATIONS -----
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
            html += `<div style="background:white;border:1px solid var(--gray-100);border-radius:var(--radius-lg);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;">
                <div><div style="font-weight:600;font-size:0.9rem;">${a.teacherName}</div><div style="font-size:0.7rem;color:var(--gray-500);">${a.teacherEmail}</div><div style="font-size:0.7rem;color:var(--secondary);">${a.club}</div></div>
                <button class="delete-allocation" data-id="${a.id}" style="background:none;border:none;color:var(--gray-300);cursor:pointer;padding:4px 6px;font-size:0.9rem;"><i class="fas fa-trash"></i></button>
            </div>`;
        }
        grid.innerHTML = html;
    },

    // ----- SETUP DELETE HANDLERS -----
    setupDeleteHandlers: function() {
        var self = this;
        
        document.querySelectorAll('.delete-club').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var name = this.dataset.name;
                if (confirm('Delete club "' + name + '"?')) {
                    window.DB.deleteClub(name).then(function() { self.loadData(); });
                }
            });
        });
        
        document.querySelectorAll('.delete-student').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var name = this.dataset.name;
                if (confirm('Delete student "' + name + '"?')) {
                    window.DB.deleteStudent(name).then(function() { self.loadData(); });
                }
            });
        });
        
        document.querySelectorAll('.delete-teacher').forEach(function(btn) {
            btn.addEventListener('click', function() {
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
            btn.addEventListener('click', function() {
                var id = this.dataset.id;
                if (confirm('Remove this allocation?')) {
                    var allocations = JSON.parse(localStorage.getItem('teacherAllocations') || '[]');
                    allocations = allocations.filter(function(a) { return a.id !== id; });
                    localStorage.setItem('teacherAllocations', JSON.stringify(allocations));
                    self.loadData();
                }
            });
        });
    }
};

window.AdminPage = AdminPage;
console.log("✅ AdminPage module loaded");
