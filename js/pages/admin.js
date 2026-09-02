// ============================================================
// ADMIN PAGE
// ============================================================

const AdminPage = {
    render: async function() {
        const clubs = await window.DB.getClubs();
        const students = await window.DB.getStudents();
        
        document.getElementById('clubList').innerHTML = clubs.map(c =>
            `<li class="club-item">
                <span><i class="fas fa-users" style="margin-right:10px;color:#2a7de1;"></i>${c}</span>
                <button class="delete-btn delete-club" data-name="${c}">
                    <i class="fas fa-times"></i>
                </button>
            </li>`
        ).join('');
        
        document.getElementById('studentList').innerHTML = students.map(s =>
            `<li class="student-item">
                <span><i class="fas fa-user" style="margin-right:10px;color:#2a7de1;"></i>${s}</span>
                <button class="delete-btn delete-student" data-name="${s}">
                    <i class="fas fa-times"></i>
                </button>
            </li>`
        ).join('');
        
        // Delete handlers
        document.querySelectorAll('.delete-club').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm(`Delete club "${btn.dataset.name}"?`)) {
                    await window.DB.deleteClub(btn.dataset.name);
                    await this.render();
                }
            });
        });
        
        document.querySelectorAll('.delete-student').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm(`Delete student "${btn.dataset.name}"?`)) {
                    await window.DB.deleteStudent(btn.dataset.name);
                    await this.render();
                }
            });
        });
    },
    
    addClub: async function() {
        const name = document.getElementById('clubNameInput').value.trim();
        if (!name) return alert('Please enter a club name');
        await window.DB.addClub(name);
        document.getElementById('clubNameInput').value = '';
        await this.render();
    },
    
    addStudent: async function() {
        const name = document.getElementById('studentNameInput').value.trim();
        if (!name) return alert('Please enter a student name');
        await window.DB.addStudent(name);
        document.getElementById('studentNameInput').value = '';
        await this.render();
    }
};

window.AdminPage = AdminPage;
