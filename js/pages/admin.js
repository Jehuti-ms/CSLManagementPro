// ============================================================
// ADMIN PAGE
// ============================================================

const AdminPage = {
    // ----- RENDER HTML (synchronous) -----
    render: function() {
        return `
        <div id="adminPage" class="page">
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
                            <i class="fas fa-spinner fa-spin"></i> Loading...
                        </li>
                    </ul>
                </div>
                <div style="flex:2; min-width:280px;">
                    <h4 style="margin-bottom: 12px; color: var(--dark);"><i class="fas fa-user-graduate" style="color: var(--primary);"></i> Students</h4>
                    <ul id="studentList">
                        <li style="padding: 16px; text-align: center; color: var(--gray);">
                            <i class="fas fa-spinner fa-spin"></i> Loading...
                        </li>
                    </ul>
                </div>
            </div>
            <div class="admin-info">
                <i class="fas fa-info-circle"></i> Teacher allocation: <span id="teacherAllocationDisplay">All teachers are admins.</span>
            </div>
        </div>`;
    },

    // ----- LOAD DATA (async) -----
    loadData: async function() {
        console.log("📊 Loading admin data...");
        const clubs = await window.DB.getClubs();
        const students = await window.DB.getStudents();
        
        // Render clubs
        const clubList = document.getElementById('clubList');
        if (clubList) {
            if (clubs.length === 0) {
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
            if (students.length === 0) {
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
        
        // Delete handlers
        document.querySelectorAll('.delete-club').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('Delete this club?')) {
                    await window.DB.deleteClub(btn.dataset.name);
                    await this.loadData();
                }
            });
        });
        
        document.querySelectorAll('.delete-student').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('Delete this student?')) {
                    await window.DB.deleteStudent(btn.dataset.name);
                    await this.loadData();
                }
            });
        });
        
        console.log("✅ Admin data loaded");
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up admin events...");
        
        document.getElementById('addClubBtn')?.addEventListener('click', async () => {
            await this.addClub();
        });
        
        document.getElementById('addStudentBtn')?.addEventListener('click', async () => {
            await this.addStudent();
        });
        
        document.getElementById('clubNameInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('addClubBtn').click();
        });
        
        document.getElementById('studentNameInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('addStudentBtn').click();
        });
        
        this.loadData();
    },
    
    addClub: async function() {
        const name = document.getElementById('clubNameInput').value.trim();
        if (!name) return alert('Enter a club name');
        await window.DB.addClub(name);
        document.getElementById('clubNameInput').value = '';
        await this.loadData();
    },
    
    addStudent: async function() {
        const name = document.getElementById('studentNameInput').value.trim();
        if (!name) return alert('Enter a student name');
        await window.DB.addStudent(name);
        document.getElementById('studentNameInput').value = '';
        await this.loadData();
    }
};

window.AdminPage = AdminPage;
