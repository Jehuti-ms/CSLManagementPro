// ============================================================
// REFLECTIONS PAGE - Teacher Dashboard with Student Reflections
// ============================================================

var ReflectionsPage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="reflectionsPage" class="page active-page">
            <div class="section-title">
                <i class="fas fa-comment-dots"></i> Reflections Dashboard
                <span style="font-size: 1rem; font-weight: 400; color: var(--gray);">view and manage student reflections</span>
            </div>
            
            <!-- ===== CLUB SELECTOR ===== -->
            <div class="toolbar" style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 200px;">
                    <label style="font-weight: 600; color: var(--dark); white-space: nowrap;">
                        <i class="fas fa-users"></i> Club:
                    </label>
                    <select id="reflectionClubSelect" style="flex: 1; min-width: 150px; padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem; cursor: pointer;">
                        <option value="">Loading clubs...</option>
                    </select>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn-primary" id="addTeacherReflectionBtn" style="padding: 10px 20px; background: var(--gradient-secondary);">
                        <i class="fas fa-chalkboard-teacher"></i> Teacher Reflection
                    </button>
                    <button class="btn-outline" id="refreshBtn" style="padding: 10px 18px;">
                        <i class="fas fa-sync-alt"></i> Refresh
                    </button>
                </div>
            </div>
            
            <!-- ===== STATS ===== -->
            <div class="tracker-stats" style="margin-bottom: 20px;">
                <div class="stat-box"><span id="totalStudents">0</span> Total Students</div>
                <div class="stat-box"><span id="totalReflections">0</span> Total Reflections</div>
                <div class="stat-box"><span id="avgRating">0</span> Avg Rating</div>
                <div class="stat-box"><span id="thisWeek">0</span> This Week</div>
            </div>
            
            <!-- ===== STUDENT REFLECTIONS GRID ===== -->
            <div id="reflectionsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-top: 12px;">
                <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--gray);">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i>
                    <br>Loading reflections...
                </div>
            </div>
        </div>
        
        <!-- ===== TEACHER REFLECTION MODAL ===== -->
        <div id="teacherReflectionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
            <div style="background: white; border-radius: 24px; padding: 40px; max-width: 550px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                    <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; margin: 0;">
                        <i class="fas fa-chalkboard-teacher" style="color: #FF6584;"></i> Teacher Reflection
                        <span id="teacherRefClubName" style="font-size: 0.9rem; font-weight: 400; color: var(--gray);"></span>
                    </h3>
                    <button onclick="window.ReflectionsPage.closeModal()" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Date</label>
                    <input type="date" id="teacherRefDate" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                </div>
                
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">
                        <i class="fas fa-check-circle" style="color: var(--success);"></i> What went well?
                    </label>
                    <textarea id="teacherRefWentWell" placeholder="What aspects of the session were successful?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">
                        <i class="fas fa-tools" style="color: var(--warning);"></i> What could be improved?
                    </label>
                    <textarea id="teacherRefImprove" placeholder="What would you do differently next time?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">
                        <i class="fas fa-users" style="color: var(--primary);"></i> Notes on Student Engagement
                    </label>
                    <textarea id="teacherRefEngagement" placeholder="How engaged were students? Any notable moments?" rows="2" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                </div>
                
                <div style="display: flex; gap: 12px; margin-top: 20px; padding-top: 15px; border-top: 2px solid #E8ECF1;">
                    <button class="btn-primary" id="saveTeacherRefBtn" style="flex: 1; padding: 14px; background: var(--gradient-secondary);">
                        <i class="fas fa-save"></i> Save Reflection
                    </button>
                    <button class="btn-outline" onclick="window.ReflectionsPage.closeModal()" style="flex: 0.5; padding: 14px;">
                        Cancel
                    </button>
                </div>
            </div>
        </div>`;
    },

    // ============================================================
    // RENDER MODALS
    // ============================================================
    renderModals: function() {
        if (document.getElementById('reflectionsModalContainer')) return;
        
        var modalHTML = document.querySelector('#teacherReflectionModal').outerHTML;
        var container = document.createElement('div');
        container.id = 'reflectionsModalContainer';
        container.innerHTML = modalHTML;
        document.body.appendChild(container.firstElementChild);
        
        // Hide original
        var original = document.getElementById('teacherReflectionModal');
        if (original) original.style.display = 'none';
    },

    // ----- SHOW MODAL -----
    showModal: function() {
        this.renderModals();
        var modal = document.getElementById('teacherReflectionModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    },

    // ----- CLOSE MODAL -----
    closeModal: function() {
        var modal = document.getElementById('teacherReflectionModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },

    // ----- LOAD DATA -----
    loadData: function() {
        console.log("📊 Loading reflections data...");
        var self = this;
        
        // Load clubs
        if (window.DB && window.DB.getTeacherClubs) {
            window.DB.getTeacherClubs().then(function(clubs) {
                var select = document.getElementById('reflectionClubSelect');
                if (select) {
                    if (!clubs || clubs.length === 0) {
                        select.innerHTML = '<option value="">No clubs assigned</option>';
                        document.getElementById('reflectionsGrid').innerHTML = `
                            <div style="grid-column: 1 / -1; text-align:center; padding: 60px 20px; color: var(--gray);">
                                <i class="fas fa-users-slash" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--danger); opacity: 0.5;"></i>
                                <h3 style="color: var(--dark);">No Clubs Assigned</h3>
                                <p>You haven't been assigned to any clubs yet.<br>Contact your administrator to get started.</p>
                            </div>
                        `;
                        return;
                    }
                    
                    var options = '';
                    for (var i = 0; i < clubs.length; i++) {
                        options += '<option value="' + clubs[i].id + '">' + clubs[i].name + '</option>';
                    }
                    select.innerHTML = options;
                    
                    if (clubs.length > 0) {
                        select.value = clubs[0].id;
                        self.loadReflections();
                    }
                }
            }).catch(function(error) {
                console.warn("⚠️ Error loading clubs:", error);
            });
        }
        
        // Club selector change
        var select = document.getElementById('reflectionClubSelect');
        if (select) {
            select.addEventListener('change', function() {
                self.loadReflections();
            });
        }
        
        // Set default date for teacher reflection
        var today = new Date().toISOString().slice(0, 10);
        var dateInput = document.getElementById('teacherRefDate');
        if (dateInput) dateInput.value = today;
    },

    // ----- LOAD REFLECTIONS -----
    loadReflections: function() {
        var clubId = document.getElementById('reflectionClubSelect').value;
        if (!clubId) return;
        
        var self = this;
        var container = document.getElementById('reflectionsGrid');
        container.innerHTML = '<div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--gray);"><i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i><br>Loading reflections...</div>';
        
        // Get student reflections from localStorage
        var studentReflections = JSON.parse(localStorage.getItem('studentReflections') || '[]');
        var clubReflections = studentReflections.filter(function(r) {
            return r.club === clubId;
        });
        
        // Also get teacher reflections
        var teacherReflections = JSON.parse(localStorage.getItem('teacherReflections') || '[]');
        var clubTeacherReflections = teacherReflections.filter(function(r) {
            return r.club === clubId;
        });
        
        self.renderReflections(clubReflections, clubTeacherReflections);
        
        // Try Firebase if available
        if (window.__firebase && !window.__firebase.useMock) {
            window.DB.getStudentReflections().then(function(reflections) {
                if (reflections && reflections.length > 0) {
                    var filtered = reflections.filter(function(r) { return r.club === clubId; });
                    self.renderReflections(filtered, clubTeacherReflections);
                }
            }).catch(function(error) {
                console.warn("⚠️ Error loading from Firebase:", error);
            });
        }
    },

    // ----- RENDER REFLECTIONS (TILES) -----
    renderReflections: function(studentReflections, teacherReflections) {
        var container = document.getElementById('reflectionsGrid');
        
        // Calculate stats
        var totalStudents = new Set();
        studentReflections.forEach(function(r) { if (r.student) totalStudents.add(r.student); });
        
        var totalReflections = studentReflections.length;
        var totalRating = 0;
        var ratedCount = 0;
        studentReflections.forEach(function(r) {
            if (r.rating && r.rating > 0) {
                totalRating += r.rating;
                ratedCount++;
            }
        });
        var avgRating = ratedCount > 0 ? (totalRating / ratedCount).toFixed(1) : 'N/A';
        
        // This week
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        var thisWeek = studentReflections.filter(function(r) {
            var d = new Date(r.createdAt || r.date);
            return d >= oneWeekAgo;
        }).length;
        
        document.getElementById('totalStudents').textContent = totalStudents.size;
        document.getElementById('totalReflections').textContent = totalReflections;
        document.getElementById('avgRating').textContent = avgRating;
        document.getElementById('thisWeek').textContent = thisWeek;
        
        // If no reflections
        if (studentReflections.length === 0 && (!teacherReflections || teacherReflections.length === 0)) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align:center; padding: 60px 20px; color: var(--gray);">
                    <i class="fas fa-pen-fancy" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--primary); opacity: 0.6;"></i>
                    <h3 style="color: var(--dark);">No Reflections Yet</h3>
                    <p>Students haven't submitted any reflections for this club yet.</p>
                    <button class="btn-primary" onclick="document.getElementById('addTeacherReflectionBtn').click()" style="margin-top: 12px;">
                        <i class="fas fa-chalkboard-teacher"></i> Add Teacher Reflection
                    </button>
                </div>
            `;
            return;
        }
        
        // Build tiles
        var html = '';
        
        // First, show teacher reflections
        if (teacherReflections && teacherReflections.length > 0) {
            html += `
                <div style="grid-column: 1 / -1; margin-bottom: 4px;">
                    <h4 style="color: var(--secondary); display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-chalkboard-teacher"></i> Teacher Reflections
                        <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray);">(${teacherReflections.length})</span>
                    </h4>
                </div>
            `;
            
            var sortedTeacher = teacherReflections.slice().sort(function(a, b) {
                return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
            });
            
            for (var i = 0; i < sortedTeacher.length; i++) {
                var r = sortedTeacher[i];
                var date = r.date || 'No date';
                var wentWell = r.wentWell || '';
                var improve = r.improve || '';
                var engagement = r.engagement || '';
                
                html += `
                    <div class="reflection-tile teacher-tile" style="background: rgba(255, 101, 132, 0.06); border-radius: var(--border-radius); padding: 20px; border: 1px solid rgba(255, 101, 132, 0.15); transition: var(--transition);">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-chalkboard-teacher" style="color: var(--secondary);"></i>
                                <span style="font-weight: 600; color: var(--dark);">Teacher Reflection</span>
                                <span style="font-size: 0.75rem; color: var(--gray);">${date}</span>
                            </div>
                            <span style="font-size: 0.7rem; background: var(--secondary); color: white; padding: 2px 10px; border-radius: 40px;">Teacher</span>
                        </div>
                        ${wentWell ? `<div style="margin-top: 8px; font-size: 0.95rem;"><span style="color: var(--success);">✅</span> ${wentWell}</div>` : ''}
                        ${improve ? `<div style="margin-top: 4px; font-size: 0.9rem; color: var(--gray);"><span style="color: var(--warning);">🔧</span> ${improve}</div>` : ''}
                        ${engagement ? `<div style="margin-top: 4px; font-size: 0.9rem; color: var(--gray);"><i class="fas fa-users" style="color: var(--primary);"></i> ${engagement}</div>` : ''}
                    </div>
                `;
            }
        }
        
        // Then student reflections - grouped by student
        var grouped = {};
        studentReflections.forEach(function(r) {
            var student = r.student || 'Anonymous';
            if (!grouped[student]) grouped[student] = [];
            grouped[student].push(r);
        });
        
        // Sort students by latest reflection
        var studentNames = Object.keys(grouped);
        studentNames.sort(function(a, b) {
            var aLatest = grouped[a].reduce(function(latest, r) {
                var d = new Date(r.createdAt || r.date);
                return d > latest ? d : latest;
            }, new Date(0));
            var bLatest = grouped[b].reduce(function(latest, r) {
                var d = new Date(r.createdAt || r.date);
                return d > latest ? d : latest;
            }, new Date(0));
            return bLatest - aLatest;
        });
        
        if (studentNames.length > 0) {
            html += `
                <div style="grid-column: 1 / -1; margin-top: 16px; margin-bottom: 4px;">
                    <h4 style="color: var(--primary); display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-user-graduate"></i> Student Reflections
                        <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray);">(${studentReflections.length})</span>
                    </h4>
                </div>
            `;
            
            for (var s = 0; s < studentNames.length; s++) {
                var student = studentNames[s];
                var refs = grouped[student];
                var sortedRefs = refs.slice().sort(function(a, b) {
                    return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
                });
                var latest = sortedRefs[0];
                var count = sortedRefs.length;
                var avg = 0;
                var rated = refs.filter(function(r) { return r.rating && r.rating > 0; });
                if (rated.length > 0) {
                    var total = rated.reduce(function(sum, r) { return sum + r.rating; }, 0);
                    avg = (total / rated.length).toFixed(1);
                }
                
                var stars = '';
                if (latest.rating && latest.rating > 0) {
                    stars = '⭐ '.repeat(Math.min(latest.rating, 5));
                }
                
                html += `
                    <div class="reflection-tile student-tile" style="background: rgba(108, 99, 255, 0.04); border-radius: var(--border-radius); padding: 20px; border: 1px solid rgba(108, 99, 255, 0.08); transition: var(--transition);">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
                            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                <i class="fas fa-user-graduate" style="color: var(--primary);"></i>
                                <span style="font-weight: 600; color: var(--dark);">${student}</span>
                                <span style="font-size: 0.75rem; color: var(--gray);">${count} reflection${count > 1 ? 's' : ''}</span>
                                ${avg > 0 ? `<span style="font-size: 0.75rem; color: var(--gray);">Avg: ${avg} ⭐</span>` : ''}
                            </div>
                            <div style="font-size: 0.85rem; color: var(--gray);">${stars} ${latest.date || ''}</div>
                        </div>
                        
                        <div style="margin-top: 8px;">
                            ${latest.work ? `<div style="font-size: 0.95rem;"><strong>📋 ${latest.work}</strong></div>` : ''}
                            ${latest.text ? `<div style="margin-top: 4px; font-size: 0.9rem; color: var(--gray);">${latest.text}</div>` : ''}
                        </div>
                        
                        ${sortedRefs.length > 1 ? `
                            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(108, 99, 255, 0.08);">
                                <span style="font-size: 0.8rem; color: var(--gray);">
                                    <i class="fas fa-history"></i> ${sortedRefs.length - 1} more reflection${sortedRefs.length - 1 > 1 ? 's' : ''}
                                </span>
                                <span style="font-size: 0.8rem; color: var(--gray); margin-left: 8px;">
                                    <button onclick="window.ReflectionsPage.viewStudentHistory('${student}')" style="background: none; border: none; color: var(--primary); cursor: pointer; text-decoration: underline;">
                                        View all
                                    </button>
                                </span>
                            </div>
                        ` : ''}
                    </div>
                `;
            }
        }
        
        container.innerHTML = html;
    },

    // ----- VIEW STUDENT HISTORY -----
    viewStudentHistory: function(studentName) {
        var clubId = document.getElementById('reflectionClubSelect').value;
        var allReflections = JSON.parse(localStorage.getItem('studentReflections') || '[]');
        var studentRefs = allReflections.filter(function(r) {
            return r.club === clubId && r.student === studentName;
        });
        
        var sorted = studentRefs.slice().sort(function(a, b) {
            return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
        });
        
        var message = '📋 ' + studentName + '\'s Reflections\n' + '='.repeat(40) + '\n\n';
        sorted.forEach(function(r, i) {
            var date = r.date || 'No date';
            var work = r.work || '';
            var text = r.text || '';
            var rating = r.rating || 0;
            var stars = '⭐ '.repeat(Math.min(rating, 5));
            message += (i + 1) + '. ' + date + ' ' + stars + '\n';
            if (work) message += '   📋 ' + work + '\n';
            if (text) message += '   💭 ' + text + '\n';
            message += '\n';
        });
        
        alert(message);
    },

    // ----- SHOW TEACHER REFLECTION MODAL -----
    showTeacherReflectionModal: function() {
        var clubId = document.getElementById('reflectionClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        this.renderModals();
        
        var today = new Date().toISOString().slice(0, 10);
        var dateInput = document.getElementById('teacherRefDate');
        if (dateInput) dateInput.value = today;
        
        document.getElementById('teacherRefWentWell').value = '';
        document.getElementById('teacherRefImprove').value = '';
        document.getElementById('teacherRefEngagement').value = '';
        
        var clubName = document.getElementById('reflectionClubSelect').options[document.getElementById('reflectionClubSelect').selectedIndex]?.text || '';
        document.getElementById('teacherRefClubName').textContent = ' - ' + clubName;
        
        this.showModal();
    },

    // ----- SAVE TEACHER REFLECTION -----
    saveTeacherReflection: function() {
        var clubId = document.getElementById('reflectionClubSelect').value;
        var date = document.getElementById('teacherRefDate').value;
        var wentWell = document.getElementById('teacherRefWentWell').value.trim();
        var improve = document.getElementById('teacherRefImprove').value.trim();
        var engagement = document.getElementById('teacherRefEngagement').value.trim();
        
        if (!clubId) {
            alert('Please select a club');
            return;
        }
        
        if (!wentWell && !improve) {
            alert('Please write something about what went well or what could be improved');
            return;
        }
        
        var reflectionData = {
            type: 'teacher',
            club: clubId,
            date: date || new Date().toISOString().slice(0, 10),
            wentWell: wentWell,
            improve: improve,
            engagement: engagement,
            createdAt: new Date().toISOString()
        };
        
        var self = this;
        var saveBtn = document.getElementById('saveTeacherRefBtn');
        var originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        // Save to localStorage
        var teacherReflections = JSON.parse(localStorage.getItem('teacherReflections') || '[]');
        teacherReflections.unshift(reflectionData);
        localStorage.setItem('teacherReflections', JSON.stringify(teacherReflections));
        
        saveBtn.innerHTML = '✅ Saved!';
        setTimeout(function() {
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }, 1500);
        
        self.closeModal();
        self.loadReflections();
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up reflections events...");
        var self = this;
        
        // Add teacher reflection button
        var addBtn = document.getElementById('addTeacherReflectionBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                self.showTeacherReflectionModal();
            });
        }
        
        // Save teacher reflection
        var saveBtn = document.getElementById('saveTeacherRefBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                self.saveTeacherReflection();
            });
        }
        
        // Refresh button
        var refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                self.loadReflections();
            });
        }
        
        // Render modals
        this.renderModals();
        this.loadData();
    }
};

window.ReflectionsPage = ReflectionsPage;
console.log("✅ ReflectionsPage module loaded");
