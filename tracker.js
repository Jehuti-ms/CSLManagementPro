// ============================================================
// TRACKER PAGE
// ============================================================

const TrackerPage = {
    render: async function() {
        const projects = await window.DB.getProjects();
        let html = '';
        projects.forEach((p) => {
            html += `<tr>
                <td>${p.name}</td>
                <td><span class="badge">${p.period}</span></td>
                <td>${p.date || new Date().toISOString().slice(0, 10)}</td>
                <td>
                    <button class="delete-btn delete-project" data-name="${p.name}" data-period="${p.period}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>`;
        });
        
        document.getElementById('trackerTableBody').innerHTML = html;
        
        // Update stats
        const weekly = projects.filter(p => p.period === 'weekly').length;
        const monthly = projects.filter(p => p.period === 'monthly').length;
        const annual = projects.filter(p => p.period === 'annual').length;
        document.getElementById('weeklyCount').textContent = weekly;
        document.getElementById('monthlyCount').textContent = monthly;
        document.getElementById('annualCount').textContent = annual;
        
        // Delete handlers
        document.querySelectorAll('.delete-project').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm(`Delete project "${btn.dataset.name}"?`)) {
                    await window.DB.deleteProject(btn.dataset.name, btn.dataset.period);
                    await this.render();
                }
            });
        });
    },
    
    add: async function() {
        const name = document.getElementById('projectName').value.trim();
        if (!name) return alert('Please enter a project name');
        const period = document.getElementById('projectPeriod').value;
        await window.DB.addProject(name, period);
        document.getElementById('projectName').value = '';
        await this.render();
    }
};

window.TrackerPage = TrackerPage;