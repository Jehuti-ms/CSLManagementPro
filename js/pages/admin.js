// ============================================================
// ADMIN PAGE - FIXED (No Promise errors)
// ============================================================

const AdminPage = {
    // ----- RENDER HTML (synchronous - NO async) -----
    render: function() {
        return `
        <div id="adminPage" class="page active-page">
            <div class="section-title"><i class="fas fa-users-cog"></i> Admin · Allocations & Clubs</div>
            <div class="toolbar">
                <input type="text" id="clubNameInput" placeholder="Club name">
                <button class="btn-primary" id="addClubBtn"><i class="fas fa-plus-circle"></i> Add Club</button>
                <input type="text" id="studentNameInput" placeholder="Student name">
                <button class="btn-primary" id="addStudentBtn"><i class="fas fa-user-plus"></i> Add Student</button>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                <div style="flex:1; min-width:200px;">
                    <h4 style="margin-bottom: 12px; color: var(--dark);"><i class="fas fa-users" style="color: var(--primary);"></i> Clubs</h4>
                    <ul id="clubList">
                        <li style="padding: 16px; text-align: center; color: var(--gray);">
                            <i class="fas fa-spinner fa-spin"></i> Loading clubs...
                        </li>
                    </ul>
                </div>
                <div style="flex:2; min-width:280px;">
                    <h4 style="margin-bottom: 12px; color: var(--dark);"><i class="fas fa-user-graduate" style="color: var(--primary);"></i> Students</h4>
                    <ul id="studentList">
                        <li style="padding: 16px; text-align: center; color: var(--gray);">
                            <i class="fas fa-spinner fa-spin"></i> Loading students...
                        </li>
                    </ul>
                </div>
            </div>
            <div class="admin-info">
                <i class="fas fa-info-circle"></i> Teacher allocation: <span id="teacherAllocationDisplay">All teachers are admins.</span>
            </div>
        </div>`;
    },

    // ----- LOAD DATA (async - loads after render) -----
    loadData: async function() {
        console.log("📊 Loading admin data...");
        
        try {
            // Get clubs and students
            const clubs = await window.DB.getClubs();
            const students = await window.DB.getStudents();
            
            console.log(`📋 Loaded ${clubs.length} clubs and ${students.length} students`);
            
            // Render clubs
            const clubList = document.getElementById('clubList');
            if (clubList) {
                if (!clubs || clubs.length === 0) {
                    clubList.innerHTML = `<li style="padding: 16px; text-align: center; color: var(--gray);">
                        <i class="fas fa-plus-circle"></i> No clubs yet. Add one above!
                    </li>`;
                } else {
                    clubList.innerHTML = clubs.map(c =>
                        `<li class="club-item">
                            <span><i class="fas fa-users" style="margin-right:10px;color:var(--primary);"></i>${c}</span>
                            <button class="delete-btn delete-club" data-name="${c}"><i class="fas fa-times"></i></button>
                        </li>`
                    ).join('');
                }
            }
            
            // Render students
            const studentList = document.getElementById('studentList');
            if (studentList) {
                if (!students || students.length === 0) {
                    studentList.innerHTML = `<li style="padding: 16px; text-align: center; color: var(--gray);">
                        <i class="fas fa-user-plus"></i> No students yet. Add one above!
                    </li>`;
                } else {
                    studentList.innerHTML = students.map(s =>
                        `<li class="student-item">
                            <span><i class="fas fa-user" style="margin-right:10px;color:var(--primary);"></i>${s}</span>
                            <button class="delete-btn delete-student" data-name="${s}"><i class="fas fa-times"></i></button>
                        </li>`
                    ).join('');
                }
            }
            
            // Setup delete handlers
            this.setupDeleteHandlers();
            
            console.log("✅ Admin data loaded successfully");
        } catch (error) {
            console.error("❌ Error loading admin data:", error);
            
            // Show error in the lists
            const clubList = document.getElementById('clubList');
            if (clubList) {
                clubList.innerHTML = `<li style="padding: 16px; text-align: center; color: var(--danger);">
                    <i class="fas fa-exclamation-circle"></i> Error loading clubs
                </li>`;
            }
            
            const studentList = document.getElementById('studentList');
            if (studentList) {
                studentList.innerHTML = `<li style="padding: 16px; text-align: center; color: var(--danger);">
                    <i class="fas fa-exclamation-circle"></i> Error loading students
                </li>`;
            }
        }
    },

    // ----- SETUP DELETE HANDLERS -----
    setupDeleteHandlers: function() {
        // Club delete handlers
        document.querySelectorAll('.delete-club').forEach(btn => {
            // Remove old listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', async function() {
                const name = this.dataset.name;
                if (confirm(`Delete club "${name}"?`)) {
                    try {
                        await window.DB.deleteClub(name);
                        await window.AdminPage.loadData();
                    } catch (error) {
                        console.error("❌ Error deleting club:", error);
                        alert('Error deleting club: ' + error.message);
                    }
                }
            });
        });

        // Student delete handlers
        document.querySelectorAll('.delete-student').forEach(btn => {
            // Remove old listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', async function() {
                const name = this.dataset.name;
                if (confirm(`Delete student "${name}"?`)) {
                    try {
                        await window.DB.deleteStudent(name);
                        await window.AdminPage.loadData();
                    } catch (error) {
                        console.error("❌ Error deleting student:", error);
                        alert('Error deleting student: ' + error.message);
                    }
                }
            });
        });
    },

    // ----- SETUP EVENTS (called after render) -----
    setupEvents: function() {
        console.log("🔧 Setting up admin events...");
        
        // Add Club
        const addClubBtn = document.getElementById('addClubBtn');
        if (addClubBtn) {
            // Remove old listener by cloning
            const newBtn = addClubBtn.cloneNode(true);
            addClubBtn.parentNode.replaceChild(newBtn, addClubBtn);
            
            newBtn.addEventListener('click', async () => {
                await this.addClub();
            });
        }
        
        // Add Student
        const addStudentBtn = document.getElementById('addStudentBtn');
        if (addStudentBtn) {
            // Remove old listener by cloning
            const newBtn = addStudentBtn.cloneNode(true);
            addStudentBtn.parentNode.replaceChild(newBtn, addStudentBtn);
            
            newBtn.addEventListener('click', async () => {
                await this.addStudent();
            });
        }
        
        // Enter key shortcuts
        const clubInput = document.getElementById('clubNameInput');
        if (clubInput) {
            clubInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const btn = document.getElementById('addClubBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        const studentInput = document.getElementById('studentNameInput');
        if (studentInput) {
            studentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const btn = document.getElementById('addStudentBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        // Load data
        this.loadData();
    },
    
    // ----- ADD CLUB -----
    addClub: async function() {
        const input = document.getElementById('clubNameInput');
        const name = input.value.trim();
        
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
        const input = document.getElementById('studentNameInput');
        const name = input.value.trim();
        
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

// Make AdminPage globally available
window.AdminPage = AdminPage;
console.log("✅ AdminPage module loaded");
