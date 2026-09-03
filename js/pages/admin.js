// ============================================================
// ADMIN PAGE - Premium Design with Role-Based Access
// ============================================================

var AdminPage = {
    // ----- RENDER HTML (synchronous - NO async) -----
    render: function() {
        return `
        <div id="adminPage" class="page active-page">
            <div class="section-title">
                <i class="fas fa-users-cog"></i> Admin Dashboard
                <span style="font-size: 1rem; font-weight: 400; color: var(--gray);">manage clubs, students, and teacher allocations</span>
            </div>
            
            <!-- ===== STATS ===== -->
            <div class="tracker-stats" style="margin-bottom: 20px;">
                <div class="stat-box"><span id="adminTotalClubs">0</span> Clubs</div>
                <div class="stat-box"><span id="adminTotalStudents">0</span> Students</div>
                <div class="stat-box"><span id="adminTotalTeachers">0</span> Teachers</div>
                <div class="stat-box"><span id="adminTotalActivities">0</span> Activities</div>
            </div>
            
            <!-- ===== ROLE BADGE ===== -->
            <div style="
                background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02));
                border: 1px solid rgba(201,168,76,0.15);
                border-radius: var(--radius-lg);
                padding: 12px 20px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                flex-wrap: wrap;
            ">
                <div style="
                    background: var(--secondary);
                    color: white;
                    padding: 4px 16px;
                    border-radius: var(--radius-full);
                    font-size: 0.7rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                ">
                    <i class="fas fa-crown"></i> Coordinator
                </div>
                <span style="color: var(--gray-700); font-size: 0.9rem;">
                    <i class="fas fa-shield-alt" style="color: var(--secondary);"></i>
                    You have full administrative access to manage all clubs, students, and teacher allocations.
                </span>
            </div>
            
            <!-- ===== QUICK ADD ===== -->
            <div style="
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
                margin-bottom: 24px;
            ">
                <!-- Add Club -->
                <div style="
                    background: var(--bg-primary);
                    border: 1px solid var(--gray-100);
                    border-radius: var(--radius-lg);
                    padding: 20px;
                ">
                    <h4 style="
                        font-weight: 600;
                        color: var(--primary);
                        margin-bottom: 12px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-users" style="color: var(--secondary);"></i> Add New Club
                    </h4>
                    <div style="display: flex; gap: 12px;">
                        <input type="text" id="clubNameInput" placeholder="Club name..." style="
                            flex: 1;
                            padding: 10px 16px;
                            border: 2px solid var(--gray-100);
                            border-radius: var(--radius-md);
                            font-size: 0.9rem;
                            transition: all 0.2s ease;
                            font-family: var(--font-sans);
                        ">
                        <button class="btn-primary" id="addClubBtn" style="
                            padding: 10px 20px;
                            white-space: nowrap;
                        ">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </div>
                </div>
                
                <!-- Add Student -->
                <div style="
                    background: var(--bg-primary);
                    border: 1px solid var(--gray-100);
                    border-radius: var(--radius-lg);
                    padding: 20px;
                ">
                    <h4 style="
                        font-weight: 600;
                        color: var(--primary);
                        margin-bottom: 12px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-user-graduate" style="color: var(--accent);"></i> Add New Student
                    </h4>
                    <div style="display: flex; gap: 12px;">
                        <input type="text" id="studentNameInput" placeholder="Student name..." style="
                            flex: 1;
                            padding: 10px 16px;
                            border: 2px solid var(--gray-100);
                            border-radius: var(--radius-md);
                            font-size: 0.9rem;
                            transition: all 0.2s ease;
                            font-family: var(--font-sans);
                        ">
                        <button class="btn-primary" id="addStudentBtn" style="
                            padding: 10px 20px;
                            white-space: nowrap;
                            background: var(--accent);
                        ">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- ===== CLUBS SECTION ===== -->
            <h3 style="
                font-family: var(--font-serif);
                font-size: 1.3rem;
                color: var(--primary);
                margin-bottom: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
            ">
                <i class="fas fa-users" style="color: var(--secondary);"></i>
                Clubs
                <span style="
                    font-size: 0.8rem;
                    font-weight: 400;
                    color: var(--gray-500);
                    font-family: var(--font-sans);
                " id="clubCountBadge">(0)</span>
            </h3>
            
            <!-- Clubs Grid -->
            <div id="clubGrid" style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                gap: 16px;
                margin-bottom: 32px;
            ">
                <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--gray-500);">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>
                    <br>Loading clubs...
                </div>
            </div>
            
            <!-- ===== TEACHER ALLOCATION SECTION ===== -->
            <h3 style="
                font-family: var(--font-serif);
                font-size: 1.3rem;
                color: var(--primary);
                margin-bottom: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
            ">
                <i class="fas fa-chalkboard-teacher" style="color: var(--secondary);"></i>
                Teacher Allocations
                <span style="
                    font-size: 0.8rem;
                    font-weight: 400;
                    color: var(--gray-500);
                    font-family: var(--font-sans);
                ">assign teachers to clubs</span>
            </h3>
            
            <!-- Teacher Allocation Cards -->
            <div id="teacherAllocationGrid" style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 16px;
                margin-bottom: 24px;
            ">
                <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--gray-500);">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>
                    <br>Loading teacher allocations...
                </div>
            </div>
            
            <!-- ===== STUDENTS SECTION ===== -->
            <h3 style="
                font-family: var(--font-serif);
                font-size: 1.3rem;
                color: var(--primary);
                margin-bottom: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
            ">
                <i class="fas fa-user-graduate" style="color: var(--accent);"></i>
                Students
                <span style="
                    font-size: 0.8rem;
                    font-weight: 400;
                    color: var(--gray-500);
                    font-family: var(--font-sans);
                " id="studentCountBadge">(0)</span>
            </h3>
            
            <!-- Students Grid -->
            <div id="studentGrid" style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 12px;
                margin-bottom: 24px;
            ">
                <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--gray-500);">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>
                    <br>Loading students...
                </div>
            </div>
            
            <!-- ===== FOOTER INFO ===== -->
            <div style="
                background: linear-gradient(135deg, rgba(26,26,46,0.03), rgba(201,168,76,0.03));
                border: 1px solid var(--gray-100);
                border-radius: var(--radius-lg);
                padding: 16px 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                flex-wrap: wrap;
            ">
                <i class="fas fa-info-circle" style="color: var(--secondary); font-size: 1.2rem;"></i>
                <span style="color: var(--gray-500); font-size: 0.85rem;">
                    <strong style="color: var(--primary);">Role-based access:</strong> 
                    Only the <span style="color: var(--secondary); font-weight: 600;">Club Coordinator</span> has full admin access. 
                    Teachers can only manage their assigned clubs.
                </span>
            </div>
        </div>`;
    },

    // ============================================================
    // RENDER MODALS (for teacher allocation)
    // ============================================================
    renderModals: function() {
        if (document.getElementById('adminModalContainer')) return;
        
        var modalHTML = `
        <div id="adminModalContainer">
            <!-- ===== ASSIGN TEACHER MODAL ===== -->
            <div id="assignTeacherModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
                <div style="background: white; border-radius: 24px; padding: 40px; max-width: 480px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                        <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.3rem; margin: 0;">
                            <i class="fas fa-chalkboard-teacher" style="color: var(--secondary);"></i> Assign Teacher to Club
                        </h3>
                        <button onclick="window.AdminPage.closeModal('assignTeacherModal')" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Teacher</label>
                        <select id="assignTeacherSelect" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                            <option value="">Select teacher...</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Club</label>
                        <select id="assignClubSelect" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                            <option value="">Select club...</option>
                        </select>
                    </div>
                    
                    <div style="display: flex; gap: 12px; margin-top: 20px; padding-top: 15px; border-top: 2px solid #E8ECF1;">
                        <button class="btn-primary" id="saveAssignmentBtn" style="flex: 1; padding: 14px; background: var(--secondary);">
                            <i class="fas fa-save"></i> Assign Teacher
                        </button>
                        <button class="btn-outline" onclick="window.AdminPage.closeModal('assignTeacherModal')" style="flex: 0.5; padding: 14px;">
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

    // ----- LOAD DATA (async - loads after render) -----
    loadData: async function() {
        console.log("📊 Loading admin data...");
        
        try {
            var clubs = await window.DB.getClubs();
            var students = await window.DB.getStudents();
            var teachers = await window.DB.getTeachers ? await window.DB.getTeachers() : ['dmoseley@gams.edu.bb (Coordinator)'];
            
            console.log("📋 Loaded " + clubs.length + " clubs, " + students.length + " students, " + teachers.length + " teachers");
            
            // Update stats
            document.getElementById('adminTotalClubs').textContent = clubs.length || 0;
            document.getElementById('adminTotalStudents').textContent = students.length || 0;
            document.getElementById('adminTotalTeachers').textContent = teachers.length || 0;
            document.getElementById('adminTotalActivities').textContent = '0';
            
            // Update badges
            document.getElementById('clubCountBadge').textContent = '(' + clubs.length + ')';
            document.getElementById('studentCountBadge').textContent = '(' + students.length + ')';
            
            // Render clubs
            this.renderClubs(clubs);
            
            // Render students
            this.renderStudents(students);
            
            // Render teacher allocations
            this.renderTeacherAllocations(teachers, clubs);
            
            // Setup delete handlers
            this.setupDeleteHandlers();
            
            console.log("✅ Admin data loaded successfully");
        } catch (error) {
            console.error("❌ Error loading admin data:", error);
        }
    },

    // ----- RENDER CLUBS (Card Grid) -----
    renderClubs: function(clubs) {
        var grid = document.getElementById('clubGrid');
        if (!grid) return;
        
        if (!clubs || clubs.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--gray-500);">
                    <i class="fas fa-users" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--secondary); opacity: 0.4;"></i>
                    <h4 style="color: var(--dark); margin-bottom: 4px;">No Clubs Yet</h4>
                    <p style="font-size: 0.9rem;">Add your first club using the form above!</p>
                </div>
            `;
            return;
        }
        
        var html = '';
        var colors = ['#6C63FF', '#FF6584', '#00D2A0', '#FFB84D', '#4ECDC4', '#FF6B6B', '#6C7A89'];
        
        for (var i = 0; i < clubs.length; i++) {
            var club = clubs[i];
            var color = colors[i % colors.length];
            var initials = club.split(' ').map(function(w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
            
            html += `
                <div class="club-card" style="
                    background: var(--bg-primary);
                    border: 1px solid var(--gray-100);
                    border-radius: var(--radius-lg);
                    padding: 16px 20px;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                ">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="
                            width: 44px;
                            height: 44px;
                            border-radius: var(--radius-md);
                            background: ${color};
                            color: white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 700;
                            font-size: 0.9rem;
                            flex-shrink: 0;
                        ">${initials}</div>
                        <div>
                            <div style="font-weight: 600; color: var(--gray-900);">${club}</div>
                            <div style="font-size: 0.75rem; color: var(--gray-500);">
                                <i class="fas fa-users"></i> 0 members
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 6px;">
                        <button class="btn-outline assign-teacher-btn" data-club="${club}" style="
                            padding: 4px 10px;
                            font-size: 0.7rem;
                            border-radius: var(--radius-sm);
                        ">
                            <i class="fas fa-user-plus"></i> Assign
                        </button>
                        <button class="delete-btn delete-club" data-name="${club}" style="
                            background: none;
                            border: none;
                            color: var(--gray-300);
                            cursor: pointer;
                            padding: 4px 8px;
                            border-radius: var(--radius-sm);
                            transition: all 0.2s ease;
                            font-size: 0.9rem;
                        ">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }
        
        grid.innerHTML = html;
        
        // Assign teacher button handlers
        var self = this;
        document.querySelectorAll('.assign-teacher-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var club = this.dataset.club;
                self.showAssignTeacherModal(club);
            });
        });
    },

    // ----- RENDER STUDENTS (Card Grid) -----
    renderStudents: function(students) {
        var grid = document.getElementById('studentGrid');
        if (!grid) return;
        
        if (!students || students.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--gray-500);">
                    <i class="fas fa-user-graduate" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--accent); opacity: 0.4;"></i>
                    <h4 style="color: var(--dark); margin-bottom: 4px;">No Students Yet</h4>
                    <p style="font-size: 0.9rem;">Add your first student using the form above!</p>
                </div>
            `;
            return;
        }
        
        var html = '';
        var colors = ['#6C63FF', '#FF6584', '#00D2A0', '#FFB84D', '#4ECDC4', '#FF6B6B'];
        
        for (var i = 0; i < students.length; i++) {
            var student = students[i];
            var color = colors[i % colors.length];
            var initials = student.split(' ').map(function(w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
            
            html += `
                <div class="student-card" style="
                    background: var(--bg-primary);
                    border: 1px solid var(--gray-100);
                    border-radius: var(--radius-lg);
                    padding: 14px 18px;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                ">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            background: ${color};
                            color: white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 600;
                            font-size: 0.8rem;
                            flex-shrink: 0;
                        ">${initials}</div>
                        <span style="font-weight: 500; color: var(--gray-900); font-size: 0.9rem;">${student}</span>
                    </div>
                    <button class="delete-btn delete-student" data-name="${student}" style="
                        background: none;
                        border: none;
                        color: var(--gray-300);
                        cursor: pointer;
                        padding: 4px 8px;
                        border-radius: var(--radius-sm);
                        transition: all 0.2s ease;
                        font-size: 0.8rem;
                    ">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }
        
        grid.innerHTML = html;
    },

    // ----- RENDER TEACHER ALLOCATIONS -----
    renderTeacherAllocations: function(teachers, clubs) {
        var grid = document.getElementById('teacherAllocationGrid');
        if (!grid) return;
        
        if (!teachers || teachers.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--gray-500);">
                    <i class="fas fa-chalkboard-teacher" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--secondary); opacity: 0.4;"></i>
                    <h4 style="color: var(--dark); margin-bottom: 4px;">No Teachers Found</h4>
                    <p style="font-size: 0.9rem;">Teachers will appear here once they register.</p>
                </div>
            `;
            return;
        }
        
        var html = '';
        for (var i = 0; i < teachers.length; i++) {
            var teacher = teachers[i];
            var isCoordinator = teacher.includes('Coordinator') || teacher.includes('dmoseley');
            var assignedClub = clubs && clubs.length > 0 ? clubs[i % clubs.length] : 'Not assigned';
            
            html += `
                <div style="
                    background: var(--bg-primary);
                    border: 1px solid var(--gray-100);
                    border-radius: var(--radius-lg);
                    padding: 16px 20px;
                    transition: all 0.2s ease;
                ">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="
                            width: 44px;
                            height: 44px;
                            border-radius: 50%;
                            background: ${isCoordinator ? 'var(--secondary)' : 'var(--accent)'};
                            color: white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 700;
                            font-size: 0.8rem;
                            flex-shrink: 0;
                        ">${teacher.charAt(0).toUpperCase()}</div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: var(--gray-900); font-size: 0.9rem;">
                                ${teacher}
                                ${isCoordinator ? '<span style="background: var(--secondary); color: white; padding: 1px 10px; border-radius: var(--radius-full); font-size: 0.6rem; font-weight: 700; margin-left: 8px;">COORDINATOR</span>' : ''}
                            </div>
                            <div style="font-size: 0.8rem; color: var(--gray-500);">
                                <i class="fas fa-users"></i> ${assignedClub}
                            </div>
                        </div>
                        ${!isCoordinator ? `
                            <button class="btn-outline" style="
                                padding: 4px 12px;
                                font-size: 0.7rem;
                                border-radius: var(--radius-sm);
                            " onclick="window.AdminPage.showAssignTeacherModal('${assignedClub}')">
                                <i class="fas fa-edit"></i> Assign
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }
        
        grid.innerHTML = html;
    },

    // ----- SHOW ASSIGN TEACHER MODAL -----
    showAssignTeacherModal: function(club) {
        this.renderModals();
        
        // Populate clubs
        var clubSelect = document.getElementById('assignClubSelect');
        if (clubSelect) {
            var clubs = ['4H Club', 'Community Service', 'Environmental', 'Tutoring'];
            clubSelect.innerHTML = '<option value="">Select club...</option>';
            for (var i = 0; i < clubs.length; i++) {
                var selected = clubs[i] === club ? 'selected' : '';
                clubSelect.innerHTML += '<option value="' + clubs[i] + '" ' + selected + '>' + clubs[i] + '</option>';
            }
        }
        
        // Populate teachers
        var teacherSelect = document.getElementById('assignTeacherSelect');
        if (teacherSelect) {
            var teachers = ['dmoseley@gams.edu.bb (Coordinator)', 'teacher1@gmail.com', 'teacher2@gmail.com'];
            teacherSelect.innerHTML = '<option value="">Select teacher...</option>';
            for (var i = 0; i < teachers.length; i++) {
                teacherSelect.innerHTML += '<option value="' + teachers[i] + '">' + teachers[i] + '</option>';
            }
        }
        
        this.showModal('assignTeacherModal');
    },

    // ----- SAVE ASSIGNMENT -----
    saveAssignment: function() {
        var teacher = document.getElementById('assignTeacherSelect').value;
        var club = document.getElementById('assignClubSelect').value;
        
        if (!teacher || !club) {
            alert('Please select both a teacher and a club');
            return;
        }
        
        alert('✅ Teacher "' + teacher + '" assigned to "' + club + '"!');
        this.closeModal('assignTeacherModal');
        this.loadData();
    },

    // ----- SETUP DELETE HANDLERS -----
    setupDeleteHandlers: function() {
        var self = this;
        
        // Club delete handlers
        document.querySelectorAll('.delete-club').forEach(function(btn) {
            var newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', async function() {
                var name = this.dataset.name;
                if (confirm('Delete club "' + name + '"?')) {
                    try {
                        await window.DB.deleteClub(name);
                        await self.loadData();
                    } catch (error) {
                        console.error("❌ Error deleting club:", error);
                        alert('Error deleting club: ' + error.message);
                    }
                }
            });
        });

        // Student delete handlers
        document.querySelectorAll('.delete-student').forEach(function(btn) {
            var newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', async function() {
                var name = this.dataset.name;
                if (confirm('Delete student "' + name + '"?')) {
                    try {
                        await window.DB.deleteStudent(name);
                        await self.loadData();
                    } catch (error) {
                        console.error("❌ Error deleting student:", error);
                        alert('Error deleting student: ' + error.message);
                    }
                }
            });
        });
        
        // Save assignment button
        var saveBtn = document.getElementById('saveAssignmentBtn');
        if (saveBtn) {
            var newSaveBtn = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
            
            newSaveBtn.addEventListener('click', function() {
                self.saveAssignment();
            });
        }
    },

    // ----- SETUP EVENTS (called after render) -----
    setupEvents: function() {
        console.log("🔧 Setting up admin events...");
        var self = this;
        
        // Add Club
        var addClubBtn = document.getElementById('addClubBtn');
        if (addClubBtn) {
            var newBtn = addClubBtn.cloneNode(true);
            addClubBtn.parentNode.replaceChild(newBtn, addClubBtn);
            
            newBtn.addEventListener('click', async function() {
                await self.addClub();
            });
        }
        
        // Add Student
        var addStudentBtn = document.getElementById('addStudentBtn');
        if (addStudentBtn) {
            var newBtn = addStudentBtn.cloneNode(true);
            addStudentBtn.parentNode.replaceChild(newBtn, addStudentBtn);
            
            newBtn.addEventListener('click', async function() {
                await self.addStudent();
            });
        }
        
        // Enter key shortcuts
        var clubInput = document.getElementById('clubNameInput');
        if (clubInput) {
            clubInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    var btn = document.getElementById('addClubBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        var studentInput = document.getElementById('studentNameInput');
        if (studentInput) {
            studentInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    var btn = document.getElementById('addStudentBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        // Load data
        this.loadData();
    },
    
    // ----- ADD CLUB -----
    addClub: async function() {
        var input = document.getElementById('clubNameInput');
        var name = input.value.trim();
        
        if (!name) {
            alert('Please enter a club name');
            return;
        }
        
        try {
            await window.DB.addClub(name);
            input.value = '';
            await this.loadData();
            console.log("✅ Club added:", name);
        } catch (error) {
            console.error("❌ Error adding club:", error);
            alert('Error adding club: ' + error.message);
        }
    },
    
    // ----- ADD STUDENT -----
    addStudent: async function() {
        var input = document.getElementById('studentNameInput');
        var name = input.value.trim();
        
        if (!name) {
            alert('Please enter a student name');
            return;
        }
        
        try {
            await window.DB.addStudent(name);
            input.value = '';
            await this.loadData();
            console.log("✅ Student added:", name);
        } catch (error) {
            console.error("❌ Error adding student:", error);
            alert('Error adding student: ' + error.message);
        }
    }
};

window.AdminPage = AdminPage;
console.log("✅ AdminPage module loaded");
