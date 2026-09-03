// ============================================================
// STUDENT PAGE - Dashboard for Students (Modal Position Fixed)
// ============================================================

var StudentPage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="studentPage" class="page active-page">
            <div class="section-title">
                <i class="fas fa-user-graduate"></i> Student Dashboard
                <span id="studentName" style="font-size: 1rem; font-weight: 400; color: var(--primary);"></span>
            </div>
            
            <!-- ===== CLUB SELECTOR ===== -->
            <div class="toolbar" style="margin-bottom: 16px;">
                <label style="font-weight: 600; color: var(--dark);">
                    <i class="fas fa-users"></i> My Club:
                </label>
                <select id="studentClubSelect" style="min-width: 200px; padding: 10px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; font-size: 0.95rem; cursor: pointer;">
                    <option value="">Loading clubs...</option>
                </select>
            </div>
            
            <!-- ===== MY TASKS ===== -->
            <div style="background: white; border-radius: var(--border-radius); padding: 20px; border: 1px solid var(--gray-light); margin-bottom: 24px;">
                <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <i class="fas fa-tasks" style="color: var(--primary);"></i> My Tasks
                    <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray);">tasks assigned to you</span>
                </h4>
                <div id="studentTasksList">
                    <div style="text-align:center; padding: 20px; color: var(--gray);">
                        <i class="fas fa-spinner fa-spin"></i> Loading tasks...
                    </div>
                </div>
            </div>
            
            <!-- ===== MY REFLECTIONS ===== -->
            <div style="background: white; border-radius: var(--border-radius); padding: 20px; border: 1px solid var(--gray-light); margin-bottom: 24px;">
                <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <i class="fas fa-pen-fancy" style="color: var(--primary);"></i> My Reflections
                    <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray);">record your progress</span>
                </h4>
                
                <!-- Add Reflection -->
                <div style="margin-bottom: 16px;">
                    <button class="btn-primary" id="addStudentReflectionBtn" style="padding: 8px 20px;">
                        <i class="fas fa-plus"></i> Add Reflection
                    </button>
                </div>
                
                <!-- Reflection List -->
                <div id="studentReflectionsList">
                    <div style="text-align:center; padding: 20px; color: var(--gray);">
                        <i class="fas fa-spinner fa-spin"></i> Loading reflections...
                    </div>
                </div>
            </div>
            
            <!-- ===== SET GOAL ===== -->
            <div style="background: white; border-radius: var(--border-radius); padding: 20px; border: 1px solid var(--gray-light);">
                <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <i class="fas fa-bullseye" style="color: var(--primary);"></i> My Goal
                    <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray);">set your HARD goal</span>
                </h4>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Skill Focus</label>
                    <select id="studentGoalSkill" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                        <option value="">Select skill...</option>
                        <option value="Leadership">🏆 Leadership</option>
                        <option value="Public Speaking">🎤 Public Speaking</option>
                        <option value="Teamwork">🤝 Teamwork</option>
                        <option value="Problem Solving">🧩 Problem Solving</option>
                        <option value="Communication">💬 Communication</option>
                        <option value="Creativity">🎨 Creativity</option>
                        <option value="Critical Thinking">🧠 Critical Thinking</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">HARD Goal</label>
                    <input type="text" id="studentGoalInput" placeholder="e.g., Lead a club meeting with confidence" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                </div>
                
                <button class="btn-primary" id="saveStudentGoalBtn" style="padding: 8px 20px;">
                    <i class="fas fa-save"></i> Save Goal
                </button>
                <span id="goalStatus" style="margin-left: 12px; font-size: 0.85rem; color: var(--gray);"></span>
                
                <div id="studentGoalDisplay" style="margin-top: 12px; padding: 12px; background: rgba(108, 99, 255, 0.04); border-radius: var(--border-radius-sm); display: none;">
                    <strong>Current Goal:</strong> <span id="currentGoalDisplay"></span>
                </div>
            </div>
        </div>`;
    },

    // ----- RENDER MODALS (FIXED - Same as Tracker pattern) -----
    renderModals: function() {
        if (document.getElementById('studentModalContainer')) return;
        
        var modalHTML = `
        <div id="studentModalContainer">
            <!-- ===== STUDENT REFLECTION MODAL ===== -->
            <div id="studentReflectionModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
                <div style="background: white; border-radius: 24px; padding: 40px; max-width: 550px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                        <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; margin: 0;">
                            <i class="fas fa-pen-fancy" style="color: #6C63FF;"></i> My Reflection
                        </h3>
                        <button onclick="window.StudentPage.closeModal('studentReflectionModal')" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Date</label>
                        <input type="date" id="studentRefDate" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">What did you work on today?</label>
                        <input type="text" id="studentRefWork" placeholder="Describe what you focused on..." style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Reflection</label>
                        <textarea id="studentRefText" placeholder="Write your reflection here..." rows="4" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">How do you feel about your progress?</label>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <button class="rating-btn-small" data-value="1" style="padding: 6px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; cursor: pointer; transition: var(--transition);">1</button>
                            <button class="rating-btn-small" data-value="2" style="padding: 6px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; cursor: pointer; transition: var(--transition);">2</button>
                            <button class="rating-btn-small" data-value="3" style="padding: 6px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; cursor: pointer; transition: var(--transition);">3</button>
                            <button class="rating-btn-small" data-value="4" style="padding: 6px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; cursor: pointer; transition: var(--transition);">4</button>
                            <button class="rating-btn-small" data-value="5" style="padding: 6px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); background: white; cursor: pointer; transition: var(--transition);">5</button>
                            <span id="studentRatingDisplay" style="margin-left: 8px; font-size: 0.9rem; color: var(--gray);">Not rated</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 12px; margin-top: 20px; padding-top: 15px; border-top: 2px solid #E8ECF1;">
                        <button class="btn-primary" id="saveStudentRefBtn" style="flex: 1; padding: 14px;">
                            <i class="fas fa-save"></i> Save Reflection
                        </button>
                        <button class="btn-outline" onclick="window.StudentPage.closeModal('studentReflectionModal')" style="flex: 0.5; padding: 14px;">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        
        var container = document.createElement('div');
        container.innerHTML = modalHTML;
        document.body.appendChild(container.firstElementChild);
    },

    // ----- SHOW MODAL (FIXED) -----
    showModal: function(modalId) {
        console.log("📝 Showing modal:", modalId);
        this.renderModals();
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log("✅ Modal shown:", modalId);
        } else {
            console.error("❌ Modal not found:", modalId);
        }
    },

    // ----- CLOSE MODAL (FIXED) -----
    closeModal: function(modalId) {
        console.log("📝 Closing modal:", modalId);
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log("✅ Modal closed:", modalId);
        }
    },

    // ----- LOAD DATA -----
    loadData: function() {
        console.log("📊 Loading student data...");
        var self = this;
        
        // Get current user
        var user = window.Auth.getCurrentUser();
        if (user) {
            document.getElementById('studentName').textContent = 'Welcome, ' + (user.displayName || user.email);
        }
        
        // Load clubs
        this.loadClubs();
    },

    loadClubs: function() {
        var self = this;
        if (window.DB && window.DB.getTeacherClubs) {
            window.DB.getTeacherClubs().then(function(clubs) {
                var select = document.getElementById('studentClubSelect');
                if (select) {
                    if (!clubs || clubs.length === 0) {
                        select.innerHTML = '<option value="">No clubs assigned</option>';
                        return;
                    }
                    
                    var options = '';
                    for (var i = 0; i < clubs.length; i++) {
                        options += '<option value="' + clubs[i].id + '">' + clubs[i].name + '</option>';
                    }
                    select.innerHTML = options;
                    
                    if (clubs.length > 0) {
                        select.value = clubs[0].id;
                        self.loadTasks();
                        self.loadReflections();
                        self.loadGoal();
                    }
                }
            }).catch(function(error) {
                console.warn("⚠️ Error loading clubs:", error);
            });
        }
        
        // Also load club selector change
        var select = document.getElementById('studentClubSelect');
        if (select) {
            select.addEventListener('change', function() {
                self.loadTasks();
                self.loadReflections();
                self.loadGoal();
            });
        }
    },

    // ----- LOAD TASKS -----
    loadTasks: function() {
        var clubId = document.getElementById('studentClubSelect').value;
        if (!clubId) return;
        
        var user = window.Auth.getCurrentUser();
        var userName = user ? user.displayName || user.email.split('@')[0] : '';
        
        var container = document.getElementById('studentTasksList');
        
        // Get tasks from localStorage
        var allTasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
        var myTasks = allTasks.filter(function(t) {
            return t.club === clubId && (t.assignedTo === userName || t.assignedTo === '');
        });
        
        if (!myTasks || myTasks.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--gray);">' +
                '<i class="fas fa-check-circle" style="display: block; font-size: 2rem; margin-bottom: 8px; color: var(--primary); opacity: 0.6;"></i>' +
                'No tasks assigned to you yet!' +
            '</div>';
            return;
        }
        
        var html = '';
        for (var i = 0; i < myTasks.length; i++) {
            var t = myTasks[i];
            var checked = t.completed ? 'checked' : '';
            var doneStyle = t.completed ? 'text-decoration: line-through; color: var(--gray);' : '';
            var priorityColor = t.priority === 'high' ? '#FF6B6B' : (t.priority === 'medium' ? '#FFB84D' : '#00D2A0');
            
            html += '<div style="display: flex; align-items: center; padding: 12px; border-bottom: 1px solid var(--gray-light);">' +
                '<input type="checkbox" class="student-task-checkbox" data-id="' + (t.id || t._id) + '" ' + checked + ' style="margin-right: 12px; width: 20px; height: 20px; accent-color: var(--primary); cursor: pointer;">' +
                '<span style="' + doneStyle + ' flex: 1;">' + t.title + '</span>' +
                '<span style="background: ' + priorityColor + '; color: white; padding: 2px 10px; border-radius: 40px; font-size: 0.7rem; font-weight: 600;">' + (t.priority || 'medium').toUpperCase() + '</span>' +
            '</div>';
        }
        container.innerHTML = html;
        
        // Task checkbox handlers
        document.querySelectorAll('.student-task-checkbox').forEach(function(cb) {
            cb.addEventListener('change', function() {
                var id = this.dataset.id;
                var completed = this.checked;
                var clubId = document.getElementById('studentClubSelect').value;
                
                // Update in localStorage
                var allTasks = JSON.parse(localStorage.getItem('mockTasks') || '[]');
                var idx = allTasks.findIndex(function(t) { return t.id === id; });
                if (idx !== -1) {
                    allTasks[idx].completed = completed;
                    localStorage.setItem('mockTasks', JSON.stringify(allTasks));
                }
                
                // Also update in DB if available
                if (window.DB && window.DB.updateTaskStatus) {
                    window.DB.updateTaskStatus(clubId, id, completed).catch(function(error) {
                        console.warn("⚠️ Firebase update failed:", error);
                    });
                }
                
                window.StudentPage.loadTasks();
            });
        });
    },

    // ----- LOAD REFLECTIONS -----
    loadReflections: function() {
        var clubId = document.getElementById('studentClubSelect').value;
        if (!clubId) return;
        
        var user = window.Auth.getCurrentUser();
        var userName = user ? user.displayName || user.email.split('@')[0] : '';
        
        var container = document.getElementById('studentReflectionsList');
        
        // Get reflections from localStorage
        var allReflections = JSON.parse(localStorage.getItem('studentReflections') || '[]');
        var myReflections = allReflections.filter(function(r) {
            return r.club === clubId && (r.student === userName || r.student === '');
        });
        
        if (!myReflections || myReflections.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--gray);">' +
                '<i class="fas fa-pen-fancy" style="display: block; font-size: 2rem; margin-bottom: 8px; color: var(--primary); opacity: 0.6;"></i>' +
                'No reflections yet. Add your first reflection!' +
            '</div>';
            return;
        }
        
        var html = '';
        for (var i = 0; i < myReflections.length; i++) {
            var r = myReflections[i];
            var date = r.date || 'No date';
            var work = r.work || '';
            var text = r.text || '';
            var rating = r.rating || 0;
            var stars = '⭐ '.repeat(Math.min(rating, 5));
            
            html += '<div style="background: rgba(108, 99, 255, 0.04); border-radius: var(--border-radius-sm); padding: 12px; margin-bottom: 8px; border-left: 3px solid var(--primary);">' +
                '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">' +
                    '<div><strong>' + date + '</strong></div>' +
                    '<div style="font-size: 0.85rem; color: var(--gray);">' + stars + '</div>' +
                '</div>' +
                (work ? '<div style="margin-top: 4px; font-size: 0.95rem;">📋 ' + work + '</div>' : '') +
                (text ? '<div style="margin-top: 4px; font-size: 0.9rem; color: var(--gray);">' + text + '</div>' : '') +
            '</div>';
        }
        container.innerHTML = html;
    },

    // ----- LOAD GOAL -----
    loadGoal: function() {
        var clubId = document.getElementById('studentClubSelect').value;
        if (!clubId) return;
        
        var user = window.Auth.getCurrentUser();
        var userName = user ? user.displayName || user.email.split('@')[0] : '';
        
        var goals = JSON.parse(localStorage.getItem('studentGoals') || '[]');
        var myGoal = goals.find(function(g) {
            return g.club === clubId && (g.student === userName || g.student === '');
        });
        
        var display = document.getElementById('studentGoalDisplay');
        var displayText = document.getElementById('currentGoalDisplay');
        
        if (myGoal) {
            display.style.display = 'block';
            displayText.textContent = myGoal.goal + ' (Focus: ' + myGoal.skill + ')';
            document.getElementById('studentGoalSkill').value = myGoal.skill || '';
            document.getElementById('studentGoalInput').value = myGoal.goal || '';
        } else {
            display.style.display = 'none';
        }
    },

    // ----- SHOW STUDENT REFLECTION MODAL (FIXED) -----
    showStudentReflectionModal: function() {
        var clubId = document.getElementById('studentClubSelect').value;
        if (!clubId) {
            alert('Please select a club first');
            return;
        }
        
        console.log("📝 Opening Student Reflection Modal");
        
        // Ensure modals are rendered
        this.renderModals();
        
        var today = new Date().toISOString().slice(0, 10);
        var dateInput = document.getElementById('studentRefDate');
        var workInput = document.getElementById('studentRefWork');
        var textInput = document.getElementById('studentRefText');
        var ratingDisplay = document.getElementById('studentRatingDisplay');
        
        if (dateInput) dateInput.value = today;
        if (workInput) workInput.value = '';
        if (textInput) textInput.value = '';
        if (ratingDisplay) ratingDisplay.textContent = 'Not rated';
        
        // Reset rating buttons
        document.querySelectorAll('.rating-btn-small').forEach(function(btn) {
            btn.style.background = 'white';
            btn.style.color = 'var(--dark)';
            btn.style.borderColor = 'var(--gray-light)';
            btn.classList.remove('selected');
        });
        
        this.showModal('studentReflectionModal');
    },

    // ----- SAVE STUDENT REFLECTION -----
    saveStudentReflection: function() {
        var clubId = document.getElementById('studentClubSelect').value;
        var date = document.getElementById('studentRefDate').value;
        var work = document.getElementById('studentRefWork').value.trim();
        var text = document.getElementById('studentRefText').value.trim();
        
        var user = window.Auth.getCurrentUser();
        var userName = user ? user.displayName || user.email.split('@')[0] : '';
        
        var rating = 0;
        var selected = document.querySelector('.rating-btn-small.selected');
        if (selected) {
            rating = parseInt(selected.dataset.value);
        }
        
        if (!clubId) {
            alert('Please select a club');
            return;
        }
        
        if (!work && !text) {
            alert('Please write something');
            return;
        }
        
        var reflectionData = {
            student: userName,
            club: clubId,
            date: date || new Date().toISOString().slice(0, 10),
            work: work,
            text: text,
            rating: rating,
            createdAt: new Date().toISOString()
        };
        
        var self = this;
        var saveBtn = document.getElementById('saveStudentRefBtn');
        var originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        // Save to localStorage
        var allReflections = JSON.parse(localStorage.getItem('studentReflections') || '[]');
        allReflections.unshift(reflectionData);
        localStorage.setItem('studentReflections', JSON.stringify(allReflections));
        
        saveBtn.innerHTML = '✅ Saved!';
        document.getElementById('studentReflectionStatus').textContent = '✅ Reflection saved!';
        setTimeout(function() {
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }, 1500);
        
        self.closeModal('studentReflectionModal');
        self.loadReflections();
    },

    // ----- SAVE GOAL -----
    saveGoal: function() {
        var clubId = document.getElementById('studentClubSelect').value;
        var skill = document.getElementById('studentGoalSkill').value;
        var goal = document.getElementById('studentGoalInput').value.trim();
        
        if (!clubId) {
            alert('Please select a club');
            return;
        }
        
        if (!goal) {
            alert('Please enter a HARD goal');
            return;
        }
        
        var user = window.Auth.getCurrentUser();
        var userName = user ? user.displayName || user.email.split('@')[0] : '';
        
        var goalData = {
            student: userName,
            club: clubId,
            skill: skill,
            goal: goal,
            createdAt: new Date().toISOString()
        };
        
        var goals = JSON.parse(localStorage.getItem('studentGoals') || '[]');
        var idx = goals.findIndex(function(g) {
            return g.club === clubId && (g.student === userName || g.student === '');
        });
        
        if (idx !== -1) {
            goals[idx] = goalData;
        } else {
            goals.push(goalData);
        }
        localStorage.setItem('studentGoals', JSON.stringify(goals));
        
        document.getElementById('goalStatus').textContent = '✅ Goal saved!';
        document.getElementById('goalStatus').style.color = 'var(--success)';
        setTimeout(function() {
            document.getElementById('goalStatus').textContent = '';
        }, 3000);
        
        this.loadGoal();
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up student events...");
        var self = this;
        
        // Rating buttons
        document.querySelectorAll('.rating-btn-small').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.rating-btn-small').forEach(function(b) {
                    b.style.background = 'white';
                    b.style.color = 'var(--dark)';
                    b.style.borderColor = 'var(--gray-light)';
                    b.classList.remove('selected');
                });
                this.style.background = 'var(--gradient-primary)';
                this.style.color = 'white';
                this.style.borderColor = 'var(--primary)';
                this.classList.add('selected');
                document.getElementById('studentRatingDisplay').textContent = '⭐ '.repeat(parseInt(this.dataset.value)) + this.dataset.value + '/5';
            });
        });
        
        // Add reflection button
        var addBtn = document.getElementById('addStudentReflectionBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                self.showStudentReflectionModal();
            });
        }
        
        // Save reflection
        var saveBtn = document.getElementById('saveStudentRefBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                self.saveStudentReflection();
            });
        }
        
        // Save goal
        var saveGoalBtn = document.getElementById('saveStudentGoalBtn');
        if (saveGoalBtn) {
            saveGoalBtn.addEventListener('click', function() {
                self.saveGoal();
            });
        }
        
        // Render modals once
        this.renderModals();
        this.loadData();
    }
};

window.StudentPage = StudentPage;
console.log("✅ StudentPage module loaded");
