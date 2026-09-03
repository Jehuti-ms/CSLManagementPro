// ============================================================
// REFLECTIONS PAGE - Working Version
// ============================================================

var ReflectionsPage = {
    // ----- RENDER HTML (synchronous) -----
    render: function() {
        console.log("📄 ReflectionsPage.render() called");
        return `
        <div id="reflectionsPage" class="page active-page">
            <div class="section-title">
                <i class="fas fa-comment-dots"></i> Reflections
                <span style="font-size: 1rem; font-weight: 400; color: var(--gray);">track growth and progress</span>
            </div>
            
            <!-- ===== STUDENT REFLECTION ===== -->
            <div style="background: white; border-radius: var(--border-radius); padding: 20px; border: 1px solid var(--gray-light); margin-bottom: 24px;">
                <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <i class="fas fa-user-graduate" style="color: var(--primary);"></i> Student Reflection
                </h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 12px;">
                    <div>
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Club</label>
                        <select id="reflectionClub" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                            <option value="">Select club...</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Date</label>
                        <input type="date" id="reflectionDate" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                    </div>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.95rem;">
                        <i class="fas fa-tasks" style="color: var(--primary);"></i> What did you work on today?
                    </label>
                    <input type="text" id="reflectionWork" placeholder="Describe what you focused on during this session..." style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.95rem;">
                        <i class="fas fa-question-circle" style="color: var(--primary);"></i> Reflection
                    </label>
                    <textarea id="reflectionText" placeholder="Write your reflection here..." rows="4" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                </div>
                
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <button class="btn-primary" id="saveStudentReflectionBtn">
                        <i class="fas fa-save"></i> Save Reflection
                    </button>
                    <button class="btn-outline" id="clearStudentReflectionBtn">
                        <i class="fas fa-undo-alt"></i> Clear
                    </button>
                </div>
                <div id="studentReflectionStatus" style="margin-top: 8px; font-size: 0.9rem; color: var(--gray);"></div>
            </div>
            
            <!-- ===== TEACHER REFLECTION ===== -->
            <div style="background: white; border-radius: var(--border-radius); padding: 20px; border: 1px solid var(--gray-light); margin-bottom: 24px;">
                <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <i class="fas fa-chalkboard-teacher" style="color: var(--secondary);"></i> Teacher Reflection
                </h4>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 12px;">
                    <div>
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Club</label>
                        <select id="teacherReflectionClub" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                            <option value="">Select club...</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Date</label>
                        <input type="date" id="teacherReflectionDate" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                    </div>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.95rem;">
                        <i class="fas fa-check-circle" style="color: var(--success);"></i> What went well?
                    </label>
                    <textarea id="teacherWentWell" placeholder="What aspects of the session were successful?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.95rem;">
                        <i class="fas fa-tools" style="color: var(--warning);"></i> What could be improved?
                    </label>
                    <textarea id="teacherImprove" placeholder="What would you do differently next time?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                    </div>
                
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <button class="btn-primary" id="saveTeacherReflectionBtn" style="background: var(--gradient-secondary);">
                        <i class="fas fa-save"></i> Save Teacher Reflection
                    </button>
                    <button class="btn-outline" id="clearTeacherReflectionBtn">
                        <i class="fas fa-undo-alt"></i> Clear
                    </button>
                </div>
                <div id="teacherReflectionStatus" style="margin-top: 8px; font-size: 0.9rem; color: var(--gray);"></div>
            </div>
            
            <!-- ===== RECENT REFLECTIONS ===== -->
            <div style="margin-top: 12px;">
                <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <i class="fas fa-clock" style="color: var(--primary);"></i> Recent Reflections
                </h4>
                <div id="reflectionList">
                    <div style="text-align:center; padding: 20px; color: var(--gray);">
                        <i class="fas fa-spinner fa-spin"></i> Loading reflections...
                    </div>
                </div>
            </div>
        </div>`;
    },

    // ----- LOAD DATA (async) -----
    loadData: function() {
        console.log("📊 Loading reflections data...");
        
        // Set default date
        var today = new Date().toISOString().slice(0, 10);
        var dateInput = document.getElementById('reflectionDate');
        var teacherDateInput = document.getElementById('teacherReflectionDate');
        if (dateInput) dateInput.value = today;
        if (teacherDateInput) teacherDateInput.value = today;
        
        // Load clubs
        var self = this;
        window.DB.getClubs().then(function(clubs) {
            var selects = ['reflectionClub', 'teacherReflectionClub'];
            selects.forEach(function(id) {
                var select = document.getElementById(id);
                if (select) {
                    select.innerHTML = '<option value="">Select club...</option>';
                    for (var i = 0; i < clubs.length; i++) {
                        select.innerHTML += '<option value="' + clubs[i] + '">' + clubs[i] + '</option>';
                    }
                }
            });
        }).catch(function(error) {
            console.warn("⚠️ Error loading clubs:", error);
        });
        
        // Load recent reflections
        this.loadRecentReflections();
    },

    // ----- LOAD RECENT REFLECTIONS -----
    loadRecentReflections: function() {
        var self = this;
        var container = document.getElementById('reflectionList');
        if (!container) return;
        
        // Try to get from localStorage first (mock mode)
        var mockReflections = JSON.parse(localStorage.getItem('mockReflections') || '[]');
        
        if (mockReflections.length > 0) {
            self.renderReflections(mockReflections);
            return;
        }
        
        // If no mock data, try Firebase
        if (window.__firebase && !window.__firebase.useMock) {
            window.DB.getStudentReflections().then(function(reflections) {
                self.renderReflections(reflections || []);
            }).catch(function(error) {
                console.warn("⚠️ Error loading reflections:", error);
                self.renderReflections([]);
            });
        } else {
            self.renderReflections([]);
        }
    },

    // ----- RENDER REFLECTIONS -----
    renderReflections: function(reflections) {
        var container = document.getElementById('reflectionList');
        if (!container) return;
        
        if (!reflections || reflections.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--gray);">' +
                '<i class="fas fa-pen-fancy" style="display: block; font-size: 2rem; margin-bottom: 8px; color: var(--primary); opacity: 0.6;"></i>' +
                'No reflections yet. Start your first reflection above!' +
            '</div>';
            return;
        }
        
        var html = '';
        var recent = reflections.slice(0, 5);
        for (var i = 0; i < recent.length; i++) {
            var r = recent[i];
            var date = r.date || 'No date';
            var club = r.club || 'General';
            var work = r.work || '';
            var text = r.text || '';
            
            html += '<div style="background: rgba(108, 99, 255, 0.04); border-radius: var(--border-radius-sm); padding: 16px; margin-bottom: 12px; border-left: 4px solid var(--primary);">' +
                '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">' +
                    '<div><strong>' + date + '</strong> · ' + club + '</div>' +
                    (r.rating ? '<div style="font-size: 0.85rem; color: var(--gray);">⭐ '.repeat(Math.min(r.rating, 5)) + '</div>' : '') +
                '</div>' +
                (work ? '<div style="margin-top: 4px; font-size: 0.95rem;">📋 ' + work + '</div>' : '') +
                (text ? '<div style="margin-top: 4px; font-size: 0.9rem; color: var(--gray);">' + text.substring(0, 150) + (text.length > 150 ? '...' : '') + '</div>' : '') +
            '</div>';
        }
        container.innerHTML = html;
    },

    // ----- SAVE STUDENT REFLECTION -----
    saveStudentReflection: function() {
        console.log("📝 Saving student reflection...");
        
        var club = document.getElementById('reflectionClub').value;
        var date = document.getElementById('reflectionDate').value;
        var work = document.getElementById('reflectionWork').value.trim();
        var text = document.getElementById('reflectionText').value.trim();
        
        if (!club) {
            alert('Please select a club');
            return;
        }
        
        if (!work && !text) {
            alert('Please write something about what you worked on or your reflection');
            return;
        }
        
        var reflectionData = {
            type: 'student',
            club: club,
            date: date || new Date().toISOString().slice(0, 10),
            work: work,
            text: text,
            createdAt: new Date().toISOString()
        };
        
        var self = this;
        var saveBtn = document.getElementById('saveStudentReflectionBtn');
        var originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        // Save to localStorage for mock mode
        var mockReflections = JSON.parse(localStorage.getItem('mockReflections') || '[]');
        mockReflections.push({ id: 'mock-' + Date.now(), ...reflectionData });
        localStorage.setItem('mockReflections', JSON.stringify(mockReflections));
        
        // Also try Firebase if available
        if (window.__firebase && !window.__firebase.useMock) {
            window.DB.saveStudentReflection(reflectionData).then(function() {
                saveBtn.innerHTML = '✅ Saved!';
                document.getElementById('studentReflectionStatus').textContent = '✅ Reflection saved successfully!';
                document.getElementById('studentReflectionStatus').style.color = 'var(--success)';
                setTimeout(function() {
                    saveBtn.innerHTML = originalText;
                    saveBtn.disabled = false;
                }, 2000);
                self.loadRecentReflections();
                self.clearStudentForm();
            }).catch(function(error) {
                console.warn("⚠️ Firebase save failed, but data saved locally:", error);
                // Still show success since we saved locally
            });
        }
        
        // Always show success for mock mode
        saveBtn.innerHTML = '✅ Saved!';
        document.getElementById('studentReflectionStatus').textContent = '✅ Reflection saved successfully!';
        document.getElementById('studentReflectionStatus').style.color = 'var(--success)';
        setTimeout(function() {
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }, 2000);
        self.loadRecentReflections();
        self.clearStudentForm();
    },

    // ----- SAVE TEACHER REFLECTION -----
    saveTeacherReflection: function() {
        console.log("📝 Saving teacher reflection...");
        
        var club = document.getElementById('teacherReflectionClub').value;
        var date = document.getElementById('teacherReflectionDate').value;
        var wentWell = document.getElementById('teacherWentWell').value.trim();
        var improve = document.getElementById('teacherImprove').value.trim();
        
        if (!club) {
            alert('Please select a club');
            return;
        }
        
        if (!wentWell && !improve) {
            alert('Please write something about what went well or what could be improved');
            return;
        }
        
        var reflectionData = {
            type: 'teacher',
            club: club,
            date: date || new Date().toISOString().slice(0, 10),
            wentWell: wentWell,
            improve: improve,
            createdAt: new Date().toISOString()
        };
        
        var self = this;
        var saveBtn = document.getElementById('saveTeacherReflectionBtn');
        var originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        // Save to localStorage for mock mode
        var mockReflections = JSON.parse(localStorage.getItem('mockReflections') || '[]');
        mockReflections.push({ id: 'mock-teacher-' + Date.now(), ...reflectionData });
        localStorage.setItem('mockReflections', JSON.stringify(mockReflections));
        
        // Also try Firebase if available
        if (window.__firebase && !window.__firebase.useMock) {
            window.DB.saveTeacherReflection(reflectionData).then(function() {
                saveBtn.innerHTML = '✅ Saved!';
                document.getElementById('teacherReflectionStatus').textContent = '✅ Teacher reflection saved successfully!';
                document.getElementById('teacherReflectionStatus').style.color = 'var(--success)';
                setTimeout(function() {
                    saveBtn.innerHTML = originalText;
                    saveBtn.disabled = false;
                }, 2000);
                self.loadRecentReflections();
                self.clearTeacherForm();
            }).catch(function(error) {
                console.warn("⚠️ Firebase save failed, but data saved locally:", error);
            });
        }
        
        // Always show success for mock mode
        saveBtn.innerHTML = '✅ Saved!';
        document.getElementById('teacherReflectionStatus').textContent = '✅ Teacher reflection saved successfully!';
        document.getElementById('teacherReflectionStatus').style.color = 'var(--success)';
        setTimeout(function() {
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }, 2000);
        self.loadRecentReflections();
        self.clearTeacherForm();
    },

    // ----- CLEAR FORMS -----
    clearStudentForm: function() {
        document.getElementById('reflectionWork').value = '';
        document.getElementById('reflectionText').value = '';
    },

    clearTeacherForm: function() {
        document.getElementById('teacherWentWell').value = '';
        document.getElementById('teacherImprove').value = '';
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up reflections events...");
        var self = this;
        
        // Save student reflection
        var saveStudentBtn = document.getElementById('saveStudentReflectionBtn');
        if (saveStudentBtn) {
            saveStudentBtn.addEventListener('click', function() {
                self.saveStudentReflection();
            });
        }
        
        // Save teacher reflection
        var saveTeacherBtn = document.getElementById('saveTeacherReflectionBtn');
        if (saveTeacherBtn) {
            saveTeacherBtn.addEventListener('click', function() {
                self.saveTeacherReflection();
            });
        }
        
        // Clear forms
        var clearStudentBtn = document.getElementById('clearStudentReflectionBtn');
        if (clearStudentBtn) {
            clearStudentBtn.addEventListener('click', function() {
                self.clearStudentForm();
            });
        }
        
        var clearTeacherBtn = document.getElementById('clearTeacherReflectionBtn');
        if (clearTeacherBtn) {
            clearTeacherBtn.addEventListener('click', function() {
                self.clearTeacherForm();
            });
        }
        
        // Load data
        this.loadData();
    }
};

window.ReflectionsPage = ReflectionsPage;
console.log("✅ ReflectionsPage module loaded");
