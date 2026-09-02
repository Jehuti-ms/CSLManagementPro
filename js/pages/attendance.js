// ============================================================
// ATTENDANCE PAGE
// ============================================================

const AttendancePage = {
    // ----- RENDER HTML (synchronous) -----
    render: function() {
        return `
        <div id="attendancePage" class="page active-page">
            <div class="section-title">
                <i class="fas fa-calendar-check"></i> Attendance 
                <span>Excel-style with engagement ratings</span>
            </div>
            <div class="toolbar">
                <input type="date" id="attendanceDate">
                <input type="time" id="attendanceTime" value="09:30">
                <button class="btn-primary" id="markAllPresent"><i class="fas fa-user-check"></i> Mark all present</button>
                <button class="btn-outline" id="resetAttendance"><i class="fas fa-undo-alt"></i> Reset</button>
            </div>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Status</th>
                            <th>Late time</th>
                            <th>Engagement (1-5)</th>
                        </tr>
                    </thead>
                    <tbody id="attendanceTableBody">
                        <tr><td colspan="4" style="text-align:center; padding: 40px;">
                            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i>
                            <br>Loading students...
                        </td></tr>
                    </tbody>
                </table>
            </div>
            <div class="toolbar" style="margin-top: 16px; justify-content: flex-end;">
                <button class="btn-primary" id="saveAttendance"><i class="fas fa-save"></i> Save attendance</button>
            </div>
        </div>`;
    },

    // ----- LOAD DATA (async) -----
    loadData: async function() {
        console.log("📊 Loading attendance data...");
        const date = document.getElementById('attendanceDate').value;
        const students = await window.DB.getStudents();
        const records = await window.DB.getAttendance(date);
        
        let html = '';
        students.forEach(name => {
            const key = `${date}_${name}`;
            const r = records[key] || { status: 'present', lateTime: '', engagement: '3' };
            const disabled = r.status !== 'late' ? 'disabled' : '';
            html += `<tr>
                <td><strong>${name}</strong></td>
                <td>
                    <select class="status-select" data-name="${name}">
                        <option value="present" ${r.status === 'present' ? 'selected' : ''}>Present</option>
                        <option value="absent" ${r.status === 'absent' ? 'selected' : ''}>Absent</option>
                        <option value="late" ${r.status === 'late' ? 'selected' : ''}>Late</option>
                    </select>
                </td>
                <td>
                    <input type="time" class="late-time-input" data-name="${name}" value="${r.lateTime}" ${disabled}>
                </td>
                <td>
                    <select class="engagement-select" data-name="${name}">
                        ${[1,2,3,4,5].map(n => `<option value="${n}" ${Number(r.engagement) === n ? 'selected' : ''}>${n}</option>`).join('')}
                    </select>
                </td>
            </tr>`;
        });
        
        const tbody = document.getElementById('attendanceTableBody');
        if (tbody) tbody.innerHTML = html;
        
        // Enable/disable late inputs
        document.querySelectorAll('.status-select').forEach(sel => {
            sel.addEventListener('change', function() {
                const name = this.dataset.name;
                const timeInput = document.querySelector(`.late-time-input[data-name="${name}"]`);
                if (this.value === 'late') {
                    timeInput.disabled = false;
                } else {
                    timeInput.disabled = true;
                    timeInput.value = '';
                }
            });
        });
        
        console.log("✅ Attendance data loaded");
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up attendance events...");
        
        // Set default date
        const dateInput = document.getElementById('attendanceDate');
        if (dateInput) {
            const today = new Date().toISOString().slice(0, 10);
            dateInput.value = today;
            dateInput.addEventListener('change', () => this.loadData());
        }
        
        // Mark all present
        document.getElementById('markAllPresent')?.addEventListener('click', () => {
            this.markAllPresent();
        });
        
        // Reset
        document.getElementById('resetAttendance')?.addEventListener('click', () => {
            this.reset();
        });
        
        // Save
        document.getElementById('saveAttendance')?.addEventListener('click', () => {
            this.save();
        });
        
        // Load initial data
        this.loadData();
    },
    
    markAllPresent: function() {
        document.querySelectorAll('.status-select').forEach(sel => sel.value = 'present');
        document.querySelectorAll('.late-time-input').forEach(inp => {
            inp.disabled = true;
            inp.value = '';
        });
        document.querySelectorAll('.engagement-select').forEach(sel => sel.value = '3');
    },
    
    reset: function() {
        this.markAllPresent();
    },
    
    save: async function() {
        const date = document.getElementById('attendanceDate').value;
        const records = {};
        document.querySelectorAll('#attendanceTableBody tr').forEach(row => {
            const name = row.querySelector('.status-select')?.dataset.name;
            if (!name) return;
            records[`${date}_${name}`] = {
                status: row.querySelector('.status-select').value,
                lateTime: row.querySelector('.late-time-input').value,
                engagement: row.querySelector('.engagement-select').value
            };
        });
        await window.DB.saveAttendance(date, records);
        alert('✅ Attendance saved!');
    }
};

window.AttendancePage = AttendancePage;
