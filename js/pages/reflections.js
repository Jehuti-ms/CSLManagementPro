// ============================================================
// REFLECTIONS PAGE - Following Working Pattern
// ============================================================

var ReflectionsPage = {
    // ----- RENDER HTML (synchronous) -----
    render: function() {
        return `
        <div id="reflectionsPage" class="page">
            <div class="section-title">
                <i class="fas fa-comment-dots"></i> Reflections
                <span style="font-size: 1rem; font-weight: 400; color: var(--gray);">track growth and progress</span>
            </div>
            
            <!-- ===== TAB NAVIGATION ===== -->
            <div class="toolbar" style="background: rgba(108, 99, 255, 0.04); margin-bottom: 20px;">
                <button class="reflection-tab active" data-tab="student">
                    <i class="fas fa-user-graduate"></i> Student Reflection
                </button>
                <button class="reflection-tab" data-tab="teacher">
                    <i class="fas fa-chalkboard-user"></i> Teacher Reflection
                </button>
                <div style="flex:1;"></div>
                <button class="btn-outline" id="viewHistoryBtn" style="padding: 6px 16px; font-size: 0.85rem;">
                    <i class="fas fa-history"></i> View History
                </button>
            </div>
            
            <!-- ===== STUDENT REFLECTION TAB ===== -->
            <div id="studentReflectionTab" class="reflection-tab-content active">
                <!-- Goal Setting Section -->
                <div style="background: rgba(108, 99, 255, 0.04); border-radius: var(--border-radius); padding: 20px; margin-bottom: 24px;">
                    <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <i class="fas fa-bullseye" style="color: var(--primary);"></i> Goal Setting
                        <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray);">set your HARD goal for this club</span>
                    </h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div>
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Club</label>
                            <select id="studentGoalClub" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                                <option value="">Select club...</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Skill Focus</label>
                            <select id="studentSkillFocus" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                                <option value="">Select skill...</option>
                                <option value="Leadership">🏆 Leadership</option>
                                <option value="Public Speaking">🎤 Public Speaking</option>
                                <option value="Teamwork">🤝 Teamwork</option>
                                <option value="Problem Solving">🧩 Problem Solving</option>
                                <option value="Communication">💬 Communication</option>
                                <option value="Creativity">🎨 Creativity</option>
                                <option value="Critical Thinking">🧠 Critical Thinking</option>
                                <option value="Organization">📋 Organization</option>
                                <option value="Time Management">⏰ Time Management</option>
                                <option value="Conflict Resolution">🤝 Conflict Resolution</option>
                            </select>
                        </div>
                    </div>
                    <div style="margin-top: 12px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">
                            HARD Goal <span style="font-weight: 400; color: var(--gray); font-size: 0.8rem;">(Heartfelt, Animated, Required, Deadline)</span>
                        </label>
                        <input type="text" id="studentGoal" placeholder="e.g., Lead a club meeting with confidence by the end of the term" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                        <button class="btn-primary" id="saveGoalBtn" style="margin-top: 8px; padding: 6px 16px; font-size: 0.85rem;">
                            <i class="fas fa-save"></i> Save Goal
                        </button>
                        <span id="goalStatus" style="margin-left: 12px; font-size: 0.85rem; color: var(--gray);"></span>
                    </div>
                </div>
                
                <!-- Weekly Reflection Entry -->
                <div style="background: white; border-radius: var(--border-radius); padding: 20px; border: 1px solid var(--gray-light);">
                    <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <i class="fas fa-pen-fancy" style="color: var(--primary);"></i> Weekly Reflection
                        <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray);">enter your reflection for this session</span>
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                        <div>
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Date</label>
                            <input type="date" id="reflectionDate" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                        </div>
                        <div>
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Club</label>
                            <select id="reflectionClub" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                                <option value="">Select club...</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Session Type</label>
                            <select id="reflectionSessionType" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                                <option value="regular">📋 Regular Session</option>
                                <option value="special">⭐ Special Event</option>
                                <option value="training">🏋️ Training Session</option>
                                <option value="meeting">📝 Meeting</option>
                                <option value="volunteer">🤝 Volunteer</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- What are you working on? -->
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.95rem;">
                            <i class="fas fa-tasks" style="color: var(--primary);"></i> What did you work on today?
                        </label>
                        <input type="text" id="reflectionWork" placeholder="Describe what you focused on during this session..." style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                    </div>
                    
                    <!-- Rating Scale -->
                    <div style="margin-bottom: 16px; background: rgba(108, 99, 255, 0.04); padding: 16px; border-radius: var(--border-radius-sm);">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 8px; font-size: 0.95rem;">
                            <i class="fas fa-chart-line" style="color: var(--primary);"></i> How do you feel about your progress?
                        </label>
                        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                            <span style="font-size: 0.8rem; color: var(--gray);">1 (Needs Work)</span>
                            <div style="display: flex; gap: 8px;" id="progressRating">
                                <button class="rating-btn" data-value="1" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--gray-light); background: white; cursor: pointer; font-weight: 600; transition: var(--transition);">1</button>
                                <button class="rating-btn" data-value="2" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--gray-light); background: white; cursor: pointer; font-weight: 600; transition: var(--transition);">2</button>
                                <button class="rating-btn" data-value="3" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--gray-light); background: white; cursor: pointer; font-weight: 600; transition: var(--transition);">3</button>
                                <button class="rating-btn" data-value="4" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--gray-light); background: white; cursor: pointer; font-weight: 600; transition: var(--transition);">4</button>
                                <button class="rating-btn" data-value="5" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--gray-light); background: white; cursor: pointer; font-weight: 600; transition: var(--transition);">5</button>
                            </div>
                            <span style="font-size: 0.8rem; color: var(--gray);">5 (Excellent)</span>
                            <span id="selectedRating" style="font-weight: 600; color: var(--primary); margin-left: 8px;">Not rated</span>
                        </div>
                    </div>
                    
                    <!-- Guided Prompt -->
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.95rem;">
                            <i class="fas fa-question-circle" style="color: var(--primary);"></i> Reflection Prompt
                        </label>
                        <select id="reflectionPrompt" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; margin-bottom: 8px;">
                            <option value="what">❓ What? So What? Now What?</option>
                            <option value="glow">🌟 Glow and Grow (What went well? What could improve?)</option>
                            <option value="muddy">🧩 Muddiest Point (What was most confusing?)</option>
                            <option value="sixword">📝 Six Word Memoirs (Describe your experience in 6 words)</option>
                            <option value="free">✍️ Free Journal (Write whatever you'd like)</option>
                            <option value="challenge">🏔️ Challenge & Success (What was hard? What went well?)</option>
                            <option value="learn">📚 I Learned That... (Complete the sentence)</option>
                            <option value="future">🚀 Future Me (What will you do differently next time?)</option>
                        </select>
                        <textarea id="reflectionText" placeholder="Write your reflection here..." rows="5" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                    </div>
                    
                    <!-- Action Buttons -->
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
                
                <!-- Recent Student Reflections -->
                <div style="margin-top: 24px;">
                    <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <i class="fas fa-clock" style="color: var(--primary);"></i> Recent Reflections
                    </h4>
                    <div id="studentReflectionList">
                        <div style="text-align:center; padding: 20px; color: var(--gray);">
                            <i class="fas fa-spinner fa-spin"></i> Loading reflections...
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- ===== TEACHER REFLECTION TAB ===== -->
            <div id="teacherReflectionTab" class="reflection-tab-content" style="display: none;">
                <!-- Teacher Reflection Form -->
                <div style="background: white; border-radius: var(--border-radius); padding: 20px; border: 1px solid var(--gray-light);">
                    <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <i class="fas fa-chalkboard-teacher" style="color: var(--secondary);"></i> Teacher Session Log
                        <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray);">reflect on your club session</span>
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                        <div>
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Date</label>
                            <input type="date" id="teacherReflectionDate" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                        </div>
                        <div>
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Club</label>
                            <select id="teacherReflectionClub" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                                <option value="">Select club...</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">Session Rating</label>
                            <select id="teacherSessionRating" style="width: 100%; padding: 10px 14px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem;">
                                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                                <option value="4">⭐⭐⭐⭐ Good</option>
                                <option value="3">⭐⭐⭐ Average</option>
                                <option value="2">⭐⭐ Below Average</option>
                                <option value="1">⭐ Needs Improvement</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.95rem;">
                            <i class="fas fa-check-circle" style="color: var(--success);"></i> What went well?
                        </label>
                        <textarea id="teacherWentWell" placeholder="What aspects of the session were successful?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.95rem;">
                            <i class="fas fa-tools" style="color: var(--warning);"></i> What could be improved?
                        </label>
                        <textarea id="teacherImprove" placeholder="What would you do differently next time?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.95rem;">
                            <i class="fas fa-users" style="color: var(--primary);"></i> Notes on Student Engagement
                        </label>
                        <textarea id="teacherEngagement" placeholder="How engaged were students? Any notable moments?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.95rem;">
                            <i class="fas fa-lightbulb" style="color: var(--secondary);"></i> Key Feedback for Students
                        </label>
                        <textarea id="teacherFeedback" placeholder="What feedback do you want to share with your students?" rows="3" style="width: 100%; padding: 12px 16px; border: 2px solid var(--gray-light); border-radius: var(--border-radius-sm); font-size: 0.95rem; font-family: Inter, sans-serif; resize: vertical;"></textarea>
                    </div>
                    
                    <!-- Action Buttons -->
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
                
                <!-- Recent Teacher Reflections -->
                <div style="margin-top: 24px;">
                    <h4 style="color: var(--dark); display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <i class="fas fa-clock" style="color: var(--secondary);"></i> Recent Teacher Reflections
                    </h4>
                    <div id="teacherReflectionList">
                        <div style="text-align:center; padding: 20px; color: var(--gray);">
                            <i class="fas fa-spinner fa-spin"></i> Loading reflections...
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- ===== HISTORY MODAL ===== -->
        <div id="historyModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
            <div style="background: white; border-radius: 24px; padding: 40px; max-width: 700px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                    <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; margin: 0;">
                        <i class="fas fa-history" style="color: #6C63FF;"></i> Reflection History
                        <span id="historyType" style="font-size: 0.9rem; font-weight: 400; color: var(--gray);">(Student)</span>
                    </h3>
                    <button onclick="window.ReflectionsPage.closeModal('historyModal')" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="historyContent">
                    <div style="text-align:center; padding: 20px; color: var(--gray);">
                        <i class="fas fa-spinner fa-spin"></i> Loading history...
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    // ----- RENDER MODALS (following working pattern) -----
    renderModals: function() {
        if (document.getElementById('reflectionsModalContainer')) return;
        
        var modalHTML = `
        <div id="reflectionsModalContainer">
            <!-- History Modal -->
            <div id="historyModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99999; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
                <div style="background: white; border-radius: 24px; padding: 40px; max-width: 700px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3); position: relative; margin: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 2px solid #E8ECF1;">
                        <h3 style="color: #1A1A2E; display: flex; align-items: center; gap: 12px; font-size: 1.5rem; margin: 0;">
                            <i class="fas fa-history" style="color: #6C63FF;"></i> Reflection History
                            <span id="historyType" style="font-size: 0.9rem; font-weight: 400; color: var(--gray);">(Student)</span>
                        </h3>
                        <button onclick="window.ReflectionsPage.closeModal('historyModal')" style="background: none; border: none; font-size: 1.8rem; color: #6C7A89; cursor: pointer; padding: 4px 8px;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div id="historyContent">
                        <div style="text-align:center; padding: 20px; color: var(--gray);">
                            <i class="fas fa-spinner fa-spin"></i> Loading history...
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        
        var container = document.createElement('div');
        container.innerHTML = modalHTML;
        document.body.appendChild(container.firstElementChild);
    },

    // ----- SHOW MODAL (following working pattern) -----
    showModal: function(modalId) {
        console.log("📝 Showing modal:", modalId);
        this.renderModals();
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    },

    // ----- CLOSE MODAL (following working pattern) -----
    closeModal: function(modalId) {
        console.log("📝 Closing modal:", modalId);
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },

    // ----- RATING BUTTONS -----
    setupRatingButtons: function() {
        var buttons = document.querySelectorAll('.rating-btn');
        var self = this;
        buttons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                buttons.forEach(function(b) {
                    b.style.background = 'white';
                    b.style.color = 'var(--dark)';
                    b.style.borderColor = 'var(--gray-light)';
                    b.classList.remove('selected');
                });
                this.style.background = 'var(--gradient-primary)';
                this.style.color = 'white';
                this.style.borderColor = 'var(--primary)';
                this.classList.add('selected');
                var stars = '⭐ '.repeat(parseInt(this.dataset.value));
                document.getElementById('selectedRating').textContent = stars + this.dataset.value + '/5';
            });
        });
    },

    // ----- LOAD DATA (async) -----
    loadData: function() {
        console.log("📊 Loading reflections data...");
        var self = this;
        
        var today = new Date().toISOString().slice(0, 10);
        var dateInput = document.getElementById('reflectionDate');
        var teacherDateInput = document.getElementById('teacherReflectionDate');
        if (dateInput) dateInput.value = today;
        if (teacherDateInput) teacherDateInput.value = today;
        
        // Load clubs
        window.DB.getClubs().then(function(clubs) {
            var selects = ['studentGoalClub', 'reflectionClub', 'teacherReflectionClub'];
            selects.forEach(function(id) {
                var select = document.getElementById(id);
                if (select) {
                    select.innerHTML = '<option value="">Select club...</option>';
                    for (var i = 0; i < clubs.length; i++) {
                        select.innerHTML += '<option value="' + clubs[i] + '">' + clubs[i] + '</option>';
                    }
                }
            });
        });
        
        // Load recent reflections
        this.loadRecentReflections();
    },

    // ----- LOAD RECENT REFLECTIONS -----
    loadRecentReflections: function() {
        var self = this;
        
        // Student reflections - using mock data for now
        if (window.__firebase.useMock) {
            var mockStudentReflections = [
                { id: '1', date: new Date().toISOString().slice(0, 10), club: '4H Club', work: 'Worked on leadership skills', text: 'I feel more confident leading the group', rating: 4 },
                { id: '2', date: new Date().toISOString().slice(0, 10), club: '4H Club', work: 'Planned the community service event', text: 'The team worked well together', rating: 5 }
            ];
            self.renderStudentReflections(mockStudentReflections);
            self.renderTeacherReflections([]);
            return;
        }
        
        window.DB.getStudentReflections().then(function(reflections) {
            self.renderStudentReflections(reflections);
        }).catch(function(error) {
            console.warn("⚠️ Using mock student reflections:", error);
            self.renderStudentReflections([]);
        });
        
        window.DB.getTeacherReflections().then(function(reflections) {
            self.renderTeacherReflections(reflections);
        }).catch(function(error) {
            console.warn("⚠️ Using mock teacher reflections:", error);
            self.renderTeacherReflections([]);
        });
    },

    // ----- RENDER STUDENT REFLECTIONS -----
    renderStudentReflections: function(reflections) {
        var container = document.getElementById('studentReflectionList');
        if (!container) return;
        
        if (!reflections || reflections.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--gray);">' +
                '<i class="fas fa-pen-fancy" style="display: block; font-size: 2rem; margin-bottom: 8px; color: var(--primary); opacity: 0.6;"></i>' +
                'No student reflections yet. Start your first reflection above!' +
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
            var rating = r.rating || 0;
            var stars = '⭐ '.repeat(Math.min(rating, 5));
            
            html += '<div style="background: rgba(108, 99, 255, 0.04); border-radius: var(--border-radius-sm); padding: 16px; margin-bottom: 12px; border-left: 4px solid var(--primary);">' +
                '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">' +
                    '<div><strong>' + date + '</strong> · ' + club + '</div>' +
                    '<div style="font-size: 0.85rem; color: var(--gray);">' + stars + '</div>' +
                '</div>' +
                (work ? '<div style="margin-top: 4px; font-size: 0.95rem;">' + work + '</div>' : '') +
                (r.text ? '<div style="margin-top: 4px; font-size: 0.9rem; color: var(--gray);">' + r.text.substring(0, 150) + (r.text.length > 150 ? '...' : '') + '</div>' : '') +
            '</div>';
        }
        container.innerHTML = html;
    },

    // ----- RENDER TEACHER REFLECTIONS -----
    renderTeacherReflections: function(reflections) {
        var container = document.getElementById('teacherReflectionList');
        if (!container) return;
        
        if (!reflections || reflections.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--gray);">' +
                '<i class="fas fa-chalkboard-teacher" style="display: block; font-size: 2rem; margin-bottom: 8px; color: var(--secondary); opacity: 0.6;"></i>' +
                'No teacher reflections yet. Log your first session above!' +
            '</div>';
            return;
        }
        
        var html = '';
        var recent = reflections.slice(0, 5);
        for (var i = 0; i < recent.length; i++) {
            var r = recent[i];
            var date = r.date || 'No date';
            var club = r.club || 'General';
            var rating = r.rating || 0;
            var stars = '⭐ '.repeat(Math.min(rating, 5));
            var wentWell = r.wentWell || '';
            
            html += '<div style="background: rgba(255, 101, 132, 0.04); border-radius: var(--border-radius-sm); padding: 16px; margin-bottom: 12px; border-left: 4px solid var(--secondary);">' +
                '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">' +
                    '<div><strong>' + date + '</strong> · ' + club + '</div>' +
                    '<div style="font-size: 0.85rem; color: var(--gray);">' + stars + '</div>' +
                '</div>' +
                (wentWell ? '<div style="margin-top: 4px; font-size: 0.95rem;">✅ ' + wentWell.substring(0, 100) + (wentWell.length > 100 ? '...' : '') + '</div>' : '') +
            '</div>';
        }
        container.innerHTML = html;
    },

    // ----- SAVE STUDENT REFLECTION -----
    saveStudentReflection: function() {
        console.log("📝 Saving student reflection...");
        
        var club = document.getElementById('reflectionClub').value;
        var date = document.getElementById('reflectionDate').value;
        var sessionType = document.getElementById('reflectionSessionType').value;
        var work = document.getElementById('reflectionWork').value.trim();
        var prompt = document.getElementById('reflectionPrompt').value;
        var text = document.getElementById('reflectionText').value.trim();
        var rating = 0;
        
        var selectedBtn = document.querySelector('.rating-btn.selected');
        if (selectedBtn) {
            rating = parseInt(selectedBtn.dataset.value);
        }
        
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
            sessionType: sessionType || 'regular',
            work: work,
            prompt: prompt || 'free',
            text: text,
            rating: rating,
            createdAt: new Date().toISOString()
        };
        
        var self = this;
        var saveBtn = document.getElementById('saveStudentReflectionBtn');
        var originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        if (window.__firebase.useMock) {
            // Mock save
            var mockReflections = JSON.parse(localStorage.getItem('mockStudentReflections') || '[]');
            mockReflections.push({ id: 'mock-' + Date.now(), ...reflectionData });
            localStorage.setItem('mockStudentReflections', JSON.stringify(mockReflections));
            
            saveBtn.innerHTML = '✅ Saved!';
            document.getElementById('studentReflectionStatus').textContent = '✅ Reflection saved successfully! (Mock mode)';
            document.getElementById('studentReflectionStatus').style.color = 'var(--success)';
            setTimeout(function() {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }, 2000);
            self.loadRecentReflections();
            self.clearStudentForm();
            return;
        }
        
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
            console.error("❌ Error saving reflection:", error);
            saveBtn.innerHTML = '❌ Error';
            document.getElementById('studentReflectionStatus').textContent = '❌ Error saving: ' + error.message;
            document.getElementById('studentReflectionStatus').style.color = 'var(--danger)';
            setTimeout(function() {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }, 2000);
        });
    },

    // ----- SAVE TEACHER REFLECTION -----
    saveTeacherReflection: function() {
        console.log("📝 Saving teacher reflection...");
        
        var club = document.getElementById('teacherReflectionClub').value;
        var date = document.getElementById('teacherReflectionDate').value;
        var rating = parseInt(document.getElementById('teacherSessionRating').value) || 3;
        var wentWell = document.getElementById('teacherWentWell').value.trim();
        var improve = document.getElementById('teacherImprove').value.trim();
        var engagement = document.getElementById('teacherEngagement').value.trim();
        var feedback = document.getElementById('teacherFeedback').value.trim();
        
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
            rating: rating,
            wentWell: wentWell,
            improve: improve,
            engagement: engagement,
            feedback: feedback,
            createdAt: new Date().toISOString()
        };
        
        var self = this;
        var saveBtn = document.getElementById('saveTeacherReflectionBtn');
        var originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        if (window.__firebase.useMock) {
            var mockReflections = JSON.parse(localStorage.getItem('mockTeacherReflections') || '[]');
            mockReflections.push({ id: 'mock-' + Date.now(), ...reflectionData });
            localStorage.setItem('mockTeacherReflections', JSON.stringify(mockReflections));
            
            saveBtn.innerHTML = '✅ Saved!';
            document.getElementById('teacherReflectionStatus').textContent = '✅ Teacher reflection saved successfully! (Mock mode)';
            document.getElementById('teacherReflectionStatus').style.color = 'var(--success)';
            setTimeout(function() {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }, 2000);
            self.loadRecentReflections();
            self.clearTeacherForm();
            return;
        }
        
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
            console.error("❌ Error saving teacher reflection:", error);
            saveBtn.innerHTML = '❌ Error';
            document.getElementById('teacherReflectionStatus').textContent = '❌ Error saving: ' + error.message;
            document.getElementById('teacherReflectionStatus').style.color = 'var(--danger)';
            setTimeout(function() {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }, 2000);
        });
    },

    // ----- SAVE GOAL -----
    saveGoal: function() {
        var goal = document.getElementById('studentGoal').value.trim();
        var skillFocus = document.getElementById('studentSkillFocus').value;
        var club = document.getElementById('studentGoalClub').value;
        
        if (!club) {
            alert('Please select a club');
            return;
        }
        
        if (!goal) {
            alert('Please enter a HARD goal');
            return;
        }
        
        var self = this;
        var goalData = {
            club: club,
            skillFocus: skillFocus,
            goal: goal,
            createdAt: new Date().toISOString()
        };
        
        if (window.__firebase.useMock) {
            var goals = JSON.parse(localStorage.getItem('mockStudentGoals') || '[]');
            goals.push({ id: 'mock-' + Date.now(), ...goalData });
            localStorage.setItem('mockStudentGoals', JSON.stringify(goals));
            document.getElementById('goalStatus').textContent = '✅ Goal saved! (Mock mode)';
            document.getElementById('goalStatus').style.color = 'var(--success)';
            setTimeout(function() {
                document.getElementById('goalStatus').textContent = '';
            }, 3000);
            return;
        }
        
        window.DB.saveStudentGoal(goalData).then(function() {
            document.getElementById('goalStatus').textContent = '✅ Goal saved!';
            document.getElementById('goalStatus').style.color = 'var(--success)';
            setTimeout(function() {
                document.getElementById('goalStatus').textContent = '';
            }, 3000);
        }).catch(function(error) {
            document.getElementById('goalStatus').textContent = '❌ Error saving goal';
            document.getElementById('goalStatus').style.color = 'var(--danger)';
        });
    },

    // ----- VIEW HISTORY -----
    viewHistory: function(type) {
        var self = this;
        this.showModal('historyModal');
        
        var typeLabel = type === 'student' ? 'Student' : 'Teacher';
        document.getElementById('historyType').textContent = '(' + typeLabel + ')';
        
        var content = document.getElementById('historyContent');
        content.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--gray);"><i class="fas fa-spinner fa-spin"></i> Loading history...</div>';
        
        var mockData = type === 'student' ? 
            JSON.parse(localStorage.getItem('mockStudentReflections') || '[]') :
            JSON.parse(localStorage.getItem('mockTeacherReflections') || '[]');
        
        if (window.__firebase.useMock || mockData.length > 0) {
            self.renderHistoryContent(content, mockData, type);
            return;
        }
        
        var promise = type === 'student' ? window.DB.getStudentReflections() : window.DB.getTeacherReflections();
        promise.then(function(reflections) {
            self.renderHistoryContent(content, reflections, type);
        }).catch(function(error) {
            content.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--danger);">' +
                '<i class="fas fa-exclamation-circle" style="font-size: 3rem; display: block; margin-bottom: 12px;"></i>' +
                'Error loading history: ' + error.message +
            '</div>';
        });
    },

    renderHistoryContent: function(content, reflections, type) {
        if (!reflections || reflections.length === 0) {
            content.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--gray);">' +
                '<i class="fas fa-book-open" style="font-size: 3rem; display: block; margin-bottom: 12px; color: var(--primary); opacity: 0.6;"></i>' +
                'No ' + (type === 'student' ? 'student' : 'teacher') + ' reflections found.' +
            '</div>';
            return;
        }
        
        var html = '';
        for (var i = 0; i < reflections.length; i++) {
            var r = reflections[i];
            var date = r.date || 'No date';
            var club = r.club || 'General';
            
            html += '<div class="history-item" style="padding: 16px; border-bottom: 1px solid #E8ECF1;">' +
                '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">' +
                    '<div><strong>' + date + '</strong> · ' + club + '</div>';
            
            if (r.rating) {
                html += '<div style="font-size: 0.85rem; color: var(--gray);">⭐ '.repeat(Math.min(r.rating, 5)) + '</div>';
            }
            
            html += '</div>';
            
            if (type === 'student') {
                if (r.work) html += '<div style="margin-top: 4px; font-size: 0.95rem;">📋 ' + r.work + '</div>';
                if (r.text) html += '<div style="margin-top: 4px; font-size: 0.9rem; color: var(--gray);">' + r.text + '</div>';
            } else {
                if (r.wentWell) html += '<div style="margin-top: 4px; font-size: 0.95rem;">✅ ' + r.wentWell + '</div>';
                if (r.improve) html += '<div style="margin-top: 4px; font-size: 0.9rem; color: var(--gray);">🔧 ' + r.improve + '</div>';
            }
            
            html += '</div>';
        }
        content.innerHTML = html;
    },

    // ----- CLEAR FORMS -----
    clearStudentForm: function() {
        document.getElementById('reflectionWork').value = '';
        document.getElementById('reflectionText').value = '';
        document.querySelectorAll('.rating-btn').forEach(function(b) {
            b.style.background = 'white';
            b.style.color = 'var(--dark)';
            b.style.borderColor = 'var(--gray-light)';
            b.classList.remove('selected');
        });
        document.getElementById('selectedRating').textContent = 'Not rated';
    },

    clearTeacherForm: function() {
        document.getElementById('teacherWentWell').value = '';
        document.getElementById('teacherImprove').value = '';
        document.getElementById('teacherEngagement').value = '';
        document.getElementById('teacherFeedback').value = '';
    },

    // ----- SETUP EVENTS (following working pattern) -----
    setupEvents: function() {
        console.log("🔧 Setting up reflections events...");
        var self = this;
        
        // Tab switching
        var tabs = document.querySelectorAll('.reflection-tab');
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                tabs.forEach(function(t) { t.classList.remove('active'); });
                this.classList.add('active');
                var tabName = this.dataset.tab;
                document.getElementById('studentReflectionTab').style.display = tabName === 'student' ? 'block' : 'none';
                document.getElementById('teacherReflectionTab').style.display = tabName === 'teacher' ? 'block' : 'none';
            });
        });
        
        // Rating buttons
        this.setupRatingButtons();
        
        // Save student reflection
        document.getElementById('saveStudentReflectionBtn').addEventListener('click', function() {
            self.saveStudentReflection();
        });
        
        // Save teacher reflection
        document.getElementById('saveTeacherReflectionBtn').addEventListener('click', function() {
            self.saveTeacherReflection();
        });
        
        // Save goal
        document.getElementById('saveGoalBtn').addEventListener('click', function() {
            self.saveGoal();
        });
        
        // Clear forms
        document.getElementById('clearStudentReflectionBtn').addEventListener('click', function() {
            self.clearStudentForm();
        });
        
        document.getElementById('clearTeacherReflectionBtn').addEventListener('click', function() {
            self.clearTeacherForm();
        });
        
        // View history
        document.getElementById('viewHistoryBtn').addEventListener('click', function() {
            var activeTab = document.querySelector('.reflection-tab.active');
            var type = activeTab ? activeTab.dataset.tab : 'student';
            self.viewHistory(type);
        });
        
        // Load data
        this.loadData();
    }
};

window.ReflectionsPage = ReflectionsPage;
console.log("✅ ReflectionsPage module loaded");
