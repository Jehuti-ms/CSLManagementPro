// ============================================================
// ATTENDANCE PAGE
// ============================================================

const AttendancePage = {
    render: async function() {
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
                        ${[1, 2, 3, 4, 5].map(n => 
                            `<option value="${n}" ${Number(r.engagement) === n ? 'selected' : ''}>${n}</option>`
                        ).join('')}
                    </select>
                </td>
            </tr>`;
        });
        
        document.getElementById('attendanceTableBody').innerHTML = html;
        
        // Enable/disable late time inputs
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
        alert('✅ Attendance saved successfully!');
    }
};

// Make available globally
window.AttendancePage = AttendancePage;
