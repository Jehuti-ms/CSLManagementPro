// ============================================================
// TRACKER PAGE
// ============================================================

const TrackerPage = {
    // ----- RENDER HTML (synchronous) -----
    render: function() {
        return `
        <div id="trackerPage" class="page">
            <div class="section-title"><i class="fas fa-chart-simple"></i> Project Tracker</div>
            <div class="tracker-stats">
                <div class="stat-box"><span id="weeklyCount">0</span> Weekly</div>
                <div class="stat-box"><span id="monthlyCount">0</span> Monthly</div>
                <div class="stat-box"><span id="annualCount">0</span> Annual</div>
            </div>
            <div class="toolbar" style="margin-top: 18px;">
                <input type="text" id="projectName" placeholder="Project name" style="flex:1; min-width:180px;">
                <select id="projectPeriod">
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                </select>
                <button class="btn-primary" id="addProject"><i class="fas fa-plus"></i> Add project</button>
            </div>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Period</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="trackerTableBody">
                        <tr><td colspan="4" style="text-align:center; padding: 40px;">
                            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i>
                            <br>Loading projects...
                        </td></tr>
                    </tbody>
                </table>
            </div>
        </div>`;
    },

    // ----- LOAD DATA (async) -----
    loadData: async function() {
        console.log("📊 Loading tracker data...");
        const projects = await window.DB.getProjects();
        
        let html = '';
        if (projects.length === 0) {
            html = `<tr><td colspan="4" style="text-align:center; padding: 40px; color: var(--gray);">
                <i class="fas fa-folder-open" style="font-size: 2rem; display: block; margin-bottom: 8px;"></i>
                No projects yet. Add your first project above!
            </td></tr>`;
        } else {
            projects.forEach((p) => {
                html += `<tr>
                    <td><strong>${p.name}</strong></td>
                    <td><span class="badge" style="background:rgba(108,99,255,0.1);color:var(--primary);padding:4px 14px;border-radius:40px;font-size:0.8rem;font-weight:600;">${p.period}</span></td>
                    <td>${p.date || new Date().toISOString().slice(0, 10)}</td>
                    <td>
                        <button class="delete-btn delete-project" data-name="${p.name}" data-period="${p.period}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
            });
        }
        
        const tbody = document.getElementById('trackerTableBody');
        if (tbody) tbody.innerHTML = html;
        
        // Update stats
        document.getElementById('weeklyCount').textContent = projects.filter(p => p.period === 'weekly').length;
        document.getElementById('monthlyCount').textContent = projects.filter(p => p.period === 'monthly').length;
        document.getElementById('annualCount').textContent = projects.filter(p => p.period === 'annual').length;
        
        // Delete handlers
        document.querySelectorAll('.delete-project').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm('Delete this project?')) {
                    await window.DB.deleteProject(btn.dataset.name, btn.dataset.period);
                    await this.loadData();
                }
            });
        });
        
        console.log("✅ Tracker data loaded");
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up tracker events...");
        
        document.getElementById('addProject')?.addEventListener('click', async () => {
            await this.add();
        });
        
        document.getElementById('projectName')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('addProject').click();
        });
        
        this.loadData();
    },
    
    add: async function() {
        const name = document.getElementById('projectName').value.trim();
        if (!name) return alert('Enter a project name');
        const period = document.getElementById('projectPeriod').value;
        await window.DB.addProject(name, period);
        document.getElementById('projectName').value = '';
        await this.loadData();
    }
};

window.TrackerPage = TrackerPage;
