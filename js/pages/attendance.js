// ============================================================
// ATTENDANCE PAGE - Complete with Excel-style features
// ============================================================

var AttendancePage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="attendancePage" class="page active-page">
            <div class="section-title">
                <i class="fas fa-clipboard-list"></i> Attendance
                <span style="font-size: 1rem; font-weight: 400; color: var(--gray);">Excel-style with engagement ratings</span>
            </div>
            
            <!-- ===== TOOLBAR ===== -->
            <div class="toolbar">
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                    <label style="font-weight: 600; color: var(--dark);">
                        <i class="fas fa-calendar-day"></i> Date:
                    </label>
                    <input type="date" id="attendanceDate" style="padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem;">
                    
                    <label style="font-weight: 600; color: var(--dark); margin-left: 8px;">
                        <i class="fas fa-clock"></i> Time:
                    </label>
                    <input type="time" id="attendanceTime" value="09:30" style="padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem;">
                    
                    <label style="font-weight: 600; color: var(--dark); margin-left: 8px;">
                        <i class="fas fa-users"></i> Club:
                    </label>
                    <select id="attendanceClubSelect" style="padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem; min-width: 180px;">
                        <option value="">Select club...</option>
                    </select>
                </div>
                <div style="flex:1;"></div>
                <button class="btn-primary" id="markAllPresent" style="background: var(--gradient-primary); border: none; padding: 10px 20px; border-radius: var(--border-radius-sm); color: white; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                    <i class="fas fa-user-check"></i> Mark All Present
                </button>
                <button class="btn-outline" id="resetAttendance" style="padding: 10px 20px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: transparent; color: var(--gray); font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                    <i class="fas fa-undo-alt"></i> Reset
                </button>
            </div>
            
            <!-- ===== ATTENDANCE TABLE ===== -->
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th style="width: 5%;">#</th>
                            <th style="width: 25%;">Student</th>
                            <th style="width: 20%;">Status</th>
                            <th style="width: 20%;">Late Time</th>
                            <th style="width: 20%;">Engagement (1-5)</th>
                            <th style="width: 10%;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="attendanceTableBody">
                        <tr>
                            <td colspan="6" style="text-align:center; padding: 60px 20px; color: var(--gray);">
                                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; display: block; margin-bottom: 12px; color: var(--primary);"></i>
                                <h4 style="color: var(--dark); margin-bottom: 4px;">Loading students...</h4>
                                <p style="font-size: 0.9rem;">Please select a club and date</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- ===== STATS ===== -->
            <div class="tracker-stats" style="margin-top: 20px;">
                <div class="stat-box"><span id="totalStudents">0</span> Total Students</div>
                <div class="stat-box"><span id="presentCount">0</span> Present</div>
                <div class="stat-box"><span id="absentCount">0</span> Absent</div>
                <div class="stat-box"><span id="lateCount">0</span> Late</div>
                <div class="stat-box"><span id="avgEngagement">0</span> Avg Engagement</div>
            </div>
            
            <!-- ===== SAVE BUTTON ===== -->
            <div class="toolbar" style="margin-top: 16px; justify-content: flex-end; background: rgba(108, 99, 255, 0.04);">
                <button class="btn-primary" id="saveAttendance" style="padding: 12px 32px; font-size: 1rem;">
                    <i class="fas fa-save"></i> Save Attendance
                </button>
                <button class="btn-outline" id="exportAttendance" style="padding: 12px 24px;">
                    <i class="fas fa-file-export"></i> Export CSV
                </button>
            </div>
        </div>
        
        <!-- ===== CONFIRM MODAL ===== -->
        <div id="confirmModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
            <div style="background: white; border-radius: 24px; padding: 40px; max-width: 400px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto; text-align: center;">
                <div style="margin-bottom: 16px;">
                    <i class="fas fa-question-circle" style="font-size: 3rem; color: var(--warning);"></i>
                </div>
                <h3 style="color: var(--dark); margin-bottom: 8px;" id="confirmTitle">Confirm Action</h3>
                <p style="color: var(--gray); margin-bottom: 24px;" id="confirmMessage">Are you sure?</p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button class="btn-primary" id="confirmYesBtn" style="padding: 10px 32px;">
                        <i class="fas fa-check"></i> Yes
                    </button>
                    <button class="btn-outline" id="confirmNoBtn" style="padding: 10px 32px;">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        `;
    },

    // ----- LOAD CLUBS FOR ATTENDANCE -----
    loadClubs: function() {
        console.log("📋 Loading clubs for attendance...");
        var select = document.getElementById('attendanceClubSelect');
        if (!select) return;
        
        window.DB.getClubs().then(function(clubs) {
            console.log("📋 Clubs loaded:", clubs);
            
            select.innerHTML = '<option value="">Select club...</option>';
            for (var i = 0; i < clubs.length; i++) {
                select.innerHTML += '<option value="' + clubs[i] + '">' + clubs[i] + '</option>';
            }
        }).catch(function(error) {
            console.error("❌ Error loading clubs:", error);
        });
    },

    // ----- LOAD ATTENDANCE DATA -----
    loadData: function() {
        console.log("📊 Loading attendance data...");
        
        var date = document.getElementById('attendanceDate').value;
        var club = document.getElementById('attendanceClubSelect').value;
        
        if (!date || !club) {
            var tbody = document.getElementById('attendanceTableBody');
            if (tbody) {
                tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; padding: 60px 20px; color: var(--gray);">
                        <i class="fas fa-info-circle" style="font-size: 2rem; display: block; margin-bottom: 12px; color: var(--primary); opacity: 0.6;"></i>
                        <h4 style="color: var(--dark); margin-bottom: 4px;">${!date ? 'Select a date' : 'Select a club'}</h4>
                        <p style="font-size: 0.9rem;">${!date ? 'Choose a date above to view attendance' : 'Choose a club from the dropdown above'}</p>
                    </td>
                </tr>`;
            }
            this.updateStats([]);
            return;
        }
        
        // Load students for the club
        var self = this;
        window.DB.getStudents().then(function(students) {
            // For now, use all students. In the future, filter by club
            var clubStudents = students;
            self.renderAttendance(clubStudents, date);
        }).catch(function(error) {
            console.error("❌ Error loading students:", error);
        });
    },

    // ----- RENDER ATTENDANCE TABLE -----
    renderAttendance: function(students, date) {
        var tbody = document.getElementById('attendanceTableBody');
        if (!tbody) return;
        
        if (!students || students.length === 0) {
            tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding: 60px 20px; color: var(--gray);">
                    <i class="fas fa-user-plus" style="font-size: 2rem; display: block; margin-bottom: 12px; color: var(--primary); opacity: 0.6;"></i>
                    <h4 style="color: var(--dark); margin-bottom: 4px;">No students found</h4>
                    <p style="font-size: 0.9rem;">Add students in the Admin panel first.</p>
                </td>
            </tr>`;
            this.updateStats([]);
            return;
        }
        
        // Get existing attendance records for this date
        var self = this;
        window.DB.getAttendance(date).then(function(records) {
            var html = '';
            var statusOptions = {
                'present': 'Present',
                'absent': 'Absent',
                'late': 'Late'
            };
            
            for (var i = 0; i < students.length; i++) {
                var name = students[i];
                var key = date + '_' + name;
                var record = records[key] || { status: 'present', lateTime: '', engagement: '3' };
                var disabled = record.status !== 'late' ? 'disabled' : '';
                
                html += '<tr>' +
                    '<td style="text-align:center;">' + (i + 1) + '</td>' +
                    '<td><strong>' + name + '</strong></td>' +
                    '<td>' +
                        '<select class="status-select" data-name="' + name + '" data-date="' + date + '" style="padding: 6px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.85rem; cursor: pointer;">' +
                            '<option value="present" ' + (record.status === 'present' ? 'selected' : '') + '>✅ Present</option>' +
                            '<option value="absent" ' + (record.status === 'absent' ? 'selected' : '') + '>❌ Absent</option>' +
                            '<option value="late" ' + (record.status === 'late' ? 'selected' : '') + '>⏰ Late</option>' +
                        '</select>' +
                    '</td>' +
                    '<td>' +
                        '<input type="time" class="late-time-input" data-name="' + name + '" value="' + record.lateTime + '" ' + disabled + ' style="padding: 6px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.85rem;">' +
                    '</td>' +
                    '<td>' +
                        '<select class="engagement-select" data-name="' + name + '" style="padding: 6px 12px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.85rem; cursor: pointer; min-width: 80px;">';
                
                for (var j = 1; j <= 5; j++) {
                    html += '<option value="' + j + '" ' + (Number(record.engagement) === j ? 'selected' : '') + '>' + j + ' ⭐</option>';
                }
                
                html += '</select>' +
                    '</td>' +
                    '<td>' +
                        '<button class="btn-outline reset-student" data-name="' + name + '" style="padding: 4px 10px; font-size: 0.8rem;">' +
                            '<i class="fas fa-undo-alt"></i>' +
                        '</button>' +
                    '</td>' +
                '</tr>';
            }
            
            tbody.innerHTML = html;
            self.updateStats(students, records, date);
            self.setupEventHandlers(students, date);
            
        }).catch(function(error) {
            console.error("❌ Error loading attendance records:", error);
        });
    },

    // ----- SETUP EVENT HANDLERS -----
    setupEventHandlers: function(students, date) {
        var self = this;
        
        // Status change handlers
        document.querySelectorAll('.status-select').forEach(function(sel) {
            // Remove old listeners
            var newSel = sel.cloneNode(true);
            sel.parentNode.replaceChild(newSel, sel);
            
            newSel.addEventListener('change', function() {
                var name = this.dataset.name;
                var timeInput = document.querySelector('.late-time-input[data-name="' + name + '"]');
                if (this.value === 'late') {
                    timeInput.disabled = false;
                    timeInput.value = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
                } else {
                    timeInput.disabled = true;
                    timeInput.value = '';
                }
                self.updateStatsFromTable();
            });
        });
        
        // Late time input handlers
        document.querySelectorAll('.late-time-input').forEach(function(inp) {
            var newInp = inp.cloneNode(true);
            inp.parentNode.replaceChild(newInp, inp);
            
            newInp.addEventListener('change', function() {
                self.updateStatsFromTable();
            });
        });
        
        // Engagement select handlers
        document.querySelectorAll('.engagement-select').forEach(function(sel) {
            var newSel = sel.cloneNode(true);
            sel.parentNode.replaceChild(newSel, sel);
            
            newSel.addEventListener('change', function() {
                self.updateStatsFromTable();
            });
        });
        
        // Reset student handlers
        document.querySelectorAll('.reset-student').forEach(function(btn) {
            var newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function() {
                var name = this.dataset.name;
                var statusSelect = document.querySelector('.status-select[data-name="' + name + '"]');
                var timeInput = document.querySelector('.late-time-input[data-name="' + name + '"]');
                var engagementSelect = document.querySelector('.engagement-select[data-name="' + name + '"]');
                
                if (statusSelect) {
                    statusSelect.value = 'present';
                    if (timeInput) {
                        timeInput.disabled = true;
                        timeInput.value = '';
                    }
                }
                if (engagementSelect) {
                    engagementSelect.value = '3';
                }
                self.updateStatsFromTable();
            });
        });
        
        // Mark all present
        var markAllBtn = document.getElementById('markAllPresent');
        if (markAllBtn) {
            var newMarkAll = markAllBtn.cloneNode(true);
            markAllBtn.parentNode.replaceChild(newMarkAll, markAllBtn);
            
            newMarkAll.addEventListener('click', function() {
                document.querySelectorAll('.status-select').forEach(function(sel) {
                    sel.value = 'present';
                    var name = sel.dataset.name;
                    var timeInput = document.querySelector('.late-time-input[data-name="' + name + '"]');
                    if (timeInput) {
                        timeInput.disabled = true;
                        timeInput.value = '';
                    }
                });
                self.updateStatsFromTable();
            });
        }
        
        // Reset all
        var resetBtn = document.getElementById('resetAttendance');
        if (resetBtn) {
            var newReset = resetBtn.cloneNode(true);
            resetBtn.parentNode.replaceChild(newReset, resetBtn);
            
            newReset.addEventListener('click', function() {
                if (confirm('Reset all attendance entries to "Present"?')) {
                    document.querySelectorAll('.status-select').forEach(function(sel) {
                        sel.value = 'present';
                        var name = sel.dataset.name;
                        var timeInput = document.querySelector('.late-time-input[data-name="' + name + '"]');
                        if (timeInput) {
                            timeInput.disabled = true;
                            timeInput.value = '';
                        }
                    });
                    document.querySelectorAll('.engagement-select').forEach(function(sel) {
                        sel.value = '3';
                    });
                    self.updateStatsFromTable();
                }
            });
        }
        
        // Save attendance
        var saveBtn = document.getElementById('saveAttendance');
        if (saveBtn) {
            var newSave = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newSave, saveBtn);
            
            newSave.addEventListener('click', function() {
                self.saveAttendance();
            });
        }
        
        // Export CSV
        var exportBtn = document.getElementById('exportAttendance');
        if (exportBtn) {
            var newExport = exportBtn.cloneNode(true);
            exportBtn.parentNode.replaceChild(newExport, exportBtn);
            
            newExport.addEventListener('click', function() {
                self.exportCSV();
            });
        }
    },

    // ----- UPDATE STATS FROM TABLE -----
    updateStatsFromTable: function() {
        var students = [];
        var statuses = [];
        var engagements = [];
        var lateTimes = [];
        
        document.querySelectorAll('.status-select').forEach(function(sel) {
            var name = sel.dataset.name;
            students.push(name);
            statuses.push(sel.value);
            
            var timeInput = document.querySelector('.late-time-input[data-name="' + name + '"]');
            lateTimes.push(timeInput ? timeInput.value : '');
            
            var engagementSelect = document.querySelector('.engagement-select[data-name="' + name + '"]');
            engagements.push(engagementSelect ? Number(engagementSelect.value) : 3);
        });
        
        var total = students.length;
        var present = 0;
        var absent = 0;
        var late = 0;
        var totalEngagement = 0;
        
        for (var i = 0; i < statuses.length; i++) {
            if (statuses[i] === 'present') present++;
            else if (statuses[i] === 'absent') absent++;
            else if (statuses[i] === 'late') late++;
            totalEngagement += engagements[i] || 0;
        }
        
        document.getElementById('totalStudents').textContent = total;
        document.getElementById('presentCount').textContent = present;
        document.getElementById('absentCount').textContent = absent;
        document.getElementById('lateCount').textContent = late;
        document.getElementById('avgEngagement').textContent = total > 0 ? (totalEngagement / total).toFixed(1) : '0';
    },

    // ----- UPDATE STATS -----
    updateStats: function(students, records, date) {
        if (!students || students.length === 0) {
            document.getElementById('totalStudents').textContent = '0';
            document.getElementById('presentCount').textContent = '0';
            document.getElementById('absentCount').textContent = '0';
            document.getElementById('lateCount').textContent = '0';
            document.getElementById('avgEngagement').textContent = '0';
            return;
        }
        
        var total = students.length;
        var present = 0;
        var absent = 0;
        var late = 0;
        var totalEngagement = 0;
        
        for (var i = 0; i < students.length; i++) {
            var name = students[i];
            var key = date + '_' + name;
            var record = records[key] || { status: 'present', engagement: '3' };
            
            if (record.status === 'present') present++;
            else if (record.status === 'absent') absent++;
            else if (record.status === 'late') late++;
            totalEngagement += Number(record.engagement) || 0;
        }
        
        document.getElementById('totalStudents').textContent = total;
        document.getElementById('presentCount').textContent = present;
        document.getElementById('absentCount').textContent = absent;
        document.getElementById('lateCount').textContent = late;
        document.getElementById('avgEngagement').textContent = total > 0 ? (totalEngagement / total).toFixed(1) : '0';
    },

    // ----- SAVE ATTENDANCE -----
    saveAttendance: function() {
        var date = document.getElementById('attendanceDate').value;
        var club = document.getElementById('attendanceClubSelect').value;
        
        if (!date || !club) {
            alert('Please select a date and club first');
            return;
        }
        
        var records = {};
        var students = [];
        
        document.querySelectorAll('#attendanceTableBody tr').forEach(function(row) {
            var name = row.querySelector('.status-select')?.dataset.name;
            if (!name) return;
            
            students.push(name);
            var status = row.querySelector('.status-select').value;
            var lateTime = row.querySelector('.late-time-input').value;
            var engagement = row.querySelector('.engagement-select').value;
            
            records[date + '_' + name] = {
                status: status,
                lateTime: lateTime || '',
                engagement: engagement || '3'
            };
        });
        
        // Show saving indicator
        var saveBtn = document.getElementById('saveAttendance');
        var originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        var self = this;
        window.DB.saveAttendance(date, records).then(function() {
            saveBtn.innerHTML = '✅ Saved!';
            setTimeout(function() {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }, 1500);
            
            console.log("✅ Attendance saved for:", date);
            alert('✅ Attendance saved successfully!');
        }).catch(function(error) {
            console.error("❌ Error saving attendance:", error);
            saveBtn.innerHTML = '❌ Error';
            setTimeout(function() {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }, 2000);
            alert('❌ Error saving attendance: ' + error.message);
        });
    },

    // ----- EXPORT CSV -----
    exportCSV: function() {
        var date = document.getElementById('attendanceDate').value;
        var club = document.getElementById('attendanceClubSelect').value;
        
        if (!date || !club) {
            alert('Please select a date and club first');
            return;
        }
        
        // Build CSV data
        var rows = [];
        var header = ['Student', 'Status', 'Late Time', 'Engagement (1-5)'];
        rows.push(header.join(','));
        
        document.querySelectorAll('#attendanceTableBody tr').forEach(function(row) {
            var name = row.querySelector('.status-select')?.dataset.name;
            if (!name) return;
            
            var status = row.querySelector('.status-select').value;
            var lateTime = row.querySelector('.late-time-input').value;
            var engagement = row.querySelector('.engagement-select').value;
            
            var rowData = [name, status, lateTime || '', engagement || '3'];
            rows.push(rowData.join(','));
        });
        
        var csvContent = rows.join('\n');
        var blob = new Blob([csvContent], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'attendance_' + date + '_' + club + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up attendance events...");
        
        // Set default date
        var dateInput = document.getElementById('attendanceDate');
        if (dateInput) {
            var today = new Date().toISOString().slice(0, 10);
            dateInput.value = today;
            
            var self = this;
            dateInput.addEventListener('change', function() {
                self.loadData();
            });
        }
        
        // Club selector change
        var clubSelect = document.getElementById('attendanceClubSelect');
        if (clubSelect) {
            var self = this;
            clubSelect.addEventListener('change', function() {
                self.loadData();
            });
        }
        
        // Load clubs
        this.loadClubs();
        
        // Initial load
        this.loadData();
    }
};

window.AttendancePage = AttendancePage;
console.log("✅ AttendancePage module loaded");
