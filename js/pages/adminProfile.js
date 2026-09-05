// ============================================================
// PROFILE PAGE - Generic with Role-Based Coordinator Management
// ============================================================

var AdminProfilePage = {
    // ----- RENDER HTML -----
    render: function() {
        // Check if the user is a Coordinator first so we can conditionally render the management section
        var currentUser = (window.Auth && window.Auth.getCurrentUser) ? window.Auth.getCurrentUser() : null;
        var isCoordinator = currentUser && (currentUser.email === 'admin@csl.com' || currentUser.role === 'coordinator' || currentUser.role === 'admin');

        return `
        <div id="adminProfilePage" class="page active-page">
            <div class="section-title">
                <i class="fas fa-user-circle"></i> My Profile
                <span style="font-size: 1rem; font-weight: 400; color: var(--gray);">manage your account settings</span>
            </div>
            
            <!-- ===== ROLE BADGE (Dynamic based on user) ===== -->
            <div id="roleBadgeContainer" style="
                background: linear-gradient(135deg, rgba(108,99,255,0.08), rgba(108,99,255,0.02));
                border: 1px solid rgba(108,99,255,0.15);
                border-radius: var(--radius-lg);
                padding: 16px 24px;
                margin-bottom: 24px;
                display: flex;
                align-items: center;
                gap: 16px;
                flex-wrap: wrap;
            ">
                <div id="roleBadge" style="
                    background: var(--accent);
                    color: white;
                    padding: 6px 20px;
                    border-radius: var(--radius-full);
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <i class="fas fa-user"></i> User
                </div>
                <span style="color: var(--gray-600); font-size: 0.9rem;">
                    <i class="fas fa-info-circle" style="color: var(--accent);"></i>
                    Manage your personal details and security settings.
                </span>
            </div>
            
            <!-- ===== PROFILE CARD ===== -->
            <div style="
                background: var(--bg-primary);
                border: 1px solid var(--gray-100);
                border-radius: var(--radius-xl);
                padding: 32px;
                margin-bottom: 24px;
                box-shadow: var(--shadow-soft);
            ">
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 24px; flex-wrap: wrap;">
                    <div style="
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, var(--primary), var(--accent));
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2rem;
                        color: white;
                        font-weight: 700;
                        box-shadow: 0 8px 32px rgba(74, 108, 247, 0.2);
                    ">
                        <span id="profileAvatarLetter">U</span>
                    </div>
                    <div>
                        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--primary);">
                            <span id="profileDisplayName">User</span>
                        </h3>
                        <p style="color: var(--gray-500);" id="profileDisplayEmail">user@example.com</p>
                    </div>
                </div>
                
                <!-- ===== PROFILE INFORMATION ===== -->
                <h4 style="
                    font-weight: 600;
                    color: var(--primary);
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border-bottom: 1px solid var(--gray-100);
                    padding-bottom: 12px;
                ">
                    <i class="fas fa-id-card" style="color: var(--accent);"></i>
                    Profile Information
                </h4>
                
                <div style="display: grid; gap: 16px; max-width: 400px;">
                    <div>
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">
                            Display Name
                        </label>
                        <input type="text" id="profileNameInput" placeholder="Enter your name..." style="
                            width: 100%;
                            padding: 10px 16px;
                            border: 2px solid var(--gray-100);
                            border-radius: var(--radius-md);
                            font-size: 0.95rem;
                            transition: all 0.2s ease;
                            font-family: var(--font-sans);
                        ">
                    </div>
                    
                    <button class="btn-primary" id="updateProfileBtn" style="
                        padding: 12px 24px;
                        background: var(--accent);
                        max-width: 200px;
                    ">
                        <i class="fas fa-save"></i> Update Profile
                    </button>
                    
                    <div id="profileStatus" style="font-size: 0.9rem; color: var(--gray-500);"></div>
                </div>
            </div>
            
            <!-- ===== CHANGE PASSWORD (Universal) ===== -->
            <div style="
                background: var(--bg-primary);
                border: 1px solid var(--gray-100);
                border-radius: var(--radius-xl);
                padding: 32px;
                margin-bottom: 24px;
                box-shadow: var(--shadow-soft);
            ">
                <h4 style="
                    font-weight: 600;
                    color: var(--primary);
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border-bottom: 1px solid var(--gray-100);
                    padding-bottom: 12px;
                ">
                    <i class="fas fa-key" style="color: var(--accent);"></i>
                    Change Password
                </h4>
                
                <div style="display: grid; gap: 16px; max-width: 400px;">
                    <div>
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">
                            Current Password
                        </label>
                        <input type="password" id="currentPassword" placeholder="Enter current password..." style="
                            width: 100%;
                            padding: 10px 16px;
                            border: 2px solid var(--gray-100);
                            border-radius: var(--radius-md);
                            font-size: 0.95rem;
                            transition: all 0.2s ease;
                            font-family: var(--font-sans);
                        ">
                    </div>
                    <div>
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">
                            New Password
                            <span style="font-weight: 400; color: var(--gray-500); font-size: 0.8rem;">(min 8 characters)</span>
                        </label>
                        <input type="password" id="newPassword" placeholder="Enter new password..." style="
                            width: 100%;
                            padding: 10px 16px;
                            border: 2px solid var(--gray-100);
                            border-radius: var(--radius-md);
                            font-size: 0.95rem;
                            transition: all 0.2s ease;
                            font-family: var(--font-sans);
                        ">
                    </div>
                    <div>
                        <label style="display: block; font-weight: 600; color: var(--dark); margin-bottom: 4px; font-size: 0.9rem;">
                            Confirm New Password
                        </label>
                        <input type="password" id="confirmPassword" placeholder="Confirm new password..." style="
                            width: 100%;
                            padding: 10px 16px;
                            border: 2px solid var(--gray-100);
                            border-radius: var(--radius-md);
                            font-size: 0.95rem;
                            transition: all 0.2s ease;
                            font-family: var(--font-sans);
                        ">
                    </div>
                    
                    <button class="btn-primary" id="changePasswordBtn" style="
                        padding: 12px 24px;
                        background: var(--accent);
                        max-width: 200px;
                    ">
                        <i class="fas fa-save"></i> Update Password
                    </button>
                    
                    <div id="passwordStatus" style="font-size: 0.9rem; color: var(--gray-500);"></div>
                </div>
            </div>
            
            <!-- ===== COORDINATOR MANAGEMENT (ONLY FOR COORDINATORS) ===== -->
            ${isCoordinator ? `
            <div style="
                background: var(--bg-primary);
                border: 1px solid var(--gray-100);
                border-radius: var(--radius-xl);
                padding: 32px;
                margin-bottom: 24px;
                box-shadow: var(--shadow-soft);
            ">
                <h4 style="
                    font-weight: 600;
                    color: var(--primary);
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    border-bottom: 1px solid var(--gray-100);
                    padding-bottom: 12px;
                ">
                    <i class="fas fa-users-cog" style="color: var(--secondary);"></i>
                    Coordinator Management
                    <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray-500);">add or remove coordinators</span>
                </h4>
                
                <!-- Add Coordinator -->
                <div style="
                    background: var(--bg-secondary);
                    border-radius: var(--radius-lg);
                    padding: 16px 20px;
                    margin-bottom: 16px;
                ">
                    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                        <input type="email" id="newAdminEmail" placeholder="New coordinator email..." style="
                            flex: 1;
                            min-width: 200px;
                            padding: 10px 16px;
                            border: 2px solid var(--gray-100);
                            border-radius: var(--radius-md);
                            font-size: 0.95rem;
                            transition: all 0.2s ease;
                            font-family: var(--font-sans);
                        ">
                        <input type="text" id="newAdminName" placeholder="Full name..." style="
                            flex: 1;
                            min-width: 150px;
                            padding: 10px 16px;
                            border: 2px solid var(--gray-100);
                            border-radius: var(--radius-md);
                            font-size: 0.95rem;
                            transition: all 0.2s ease;
                            font-family: var(--font-sans);
                        ">
                        <button class="btn-primary" id="addAdminBtn" style="
                            padding: 10px 24px;
                            background: var(--secondary);
                            white-space: nowrap;
                        ">
                            <i class="fas fa-user-plus"></i> Add Coordinator
                        </button>
                    </div>
                    <div id="addAdminStatus" style="margin-top: 8px; font-size: 0.85rem; color: var(--gray-500);"></div>
                </div>
                
                <!-- Coordinator List -->
                <h5 style="
                    font-weight: 600;
                    color: var(--gray-700);
                    margin-bottom: 12px;
                    font-size: 0.9rem;
                ">
                    Current Coordinators
                </h5>
                <div id="adminList">
                    <div style="text-align:center; padding: 20px; color: var(--gray-500);">
                        <i class="fas fa-spinner fa-spin"></i> Loading coordinators...
                    </div>
                </div>
            </div>
            ` : ''}
        </div>`;
    },

    // ----- LOAD DATA -----
    loadData: function() {
        console.log("📊 Loading profile data...");
        
        var self = this;
        var currentUser = window.Auth.getCurrentUser();
        
        if (currentUser) {
            // Update UI
            document.getElementById('profileDisplayName').textContent = currentUser.displayName || currentUser.name || 'User';
            document.getElementById('profileDisplayEmail').textContent = currentUser.email || 'user@example.com';
            document.getElementById('profileNameInput').value = currentUser.displayName || currentUser.name || '';
            document.getElementById('profileAvatarLetter').textContent = (currentUser.displayName || currentUser.name || 'U').charAt(0).toUpperCase();
            
            // Update Role Badge dynamically
            this.updateRoleBadge(currentUser);
            
            // Only load admins if the coordinator section exists
            if (document.getElementById('adminList')) {
                this.loadAdmins();
            }
        }
    },

    // ----- UPDATE ROLE BADGE (Generic) -----
    updateRoleBadge: function(user) {
        var badge = document.getElementById('roleBadge');
        var badgeContainer = document.getElementById('roleBadgeContainer');
        if (!badge || !badgeContainer) return;

        var role = 'User';
        var icon = 'fas fa-user';

        if (user.email === 'admin@csl.com' || user.role === 'coordinator' || user.role === 'admin') {
            role = 'Coordinator';
            icon = 'fas fa-crown';
            badge.style.background = 'var(--secondary)';
            badgeContainer.style.borderColor = 'rgba(201,168,76,0.15)';
            badgeContainer.style.background = 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02))';
        } else if (user.role === 'student' || user.email === 'student@csl.com') {
            role = 'Student';
            icon = 'fas fa-user-graduate';
            badge.style.background = 'var(--success)';
            badgeContainer.style.borderColor = 'rgba(0, 210, 160, 0.15)';
            badgeContainer.style.background = 'linear-gradient(135deg, rgba(0, 210, 160, 0.08), rgba(0, 210, 160, 0.02))';
        } else {
            role = 'Teacher';
            icon = 'fas fa-chalkboard-teacher';
            badge.style.background = 'var(--accent)';
            badgeContainer.style.borderColor = 'rgba(74, 108, 247, 0.15)';
            badgeContainer.style.background = 'linear-gradient(135deg, rgba(74, 108, 247, 0.08), rgba(74, 108, 247, 0.02))';
        }

        badge.innerHTML = `<i class="${icon}"></i> ${role}`;
    },

    // ----- LOAD ADMINS (Coordinator Only) -----
    loadAdmins: function() {
        var container = document.getElementById('adminList');
        if (!container) return; // If teacher/student, don't load
        
        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
        
        if (admins.length === 0) {
            admins = [
                {
                    id: 'admin-1',
                    email: 'admin@csl.com',
                    name: 'Club Coordinator',
                    password: 'admin123',
                    isPrimary: true
                }
            ];
            localStorage.setItem('admins', JSON.stringify(admins));
        }
        
        this.renderAdmins(admins);
    },

    // ----- RENDER ADMINS (Coordinator Only) -----
    renderAdmins: function(admins) {
        var container = document.getElementById('adminList');
        if (!container) return;
        
        if (!admins || admins.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding: 20px; color: var(--gray-500);">
                    <i class="fas fa-users" style="font-size: 2rem; display: block; margin-bottom: 8px; color: var(--secondary); opacity: 0.4;"></i>
                    No coordinators found.
                </div>
            `;
            return;
        }
        
        var currentUser = window.Auth.getCurrentUser();
        var currentEmail = currentUser ? currentUser.email : '';
        
        var html = '';
        for (var i = 0; i < admins.length; i++) {
            var admin = admins[i];
            var isCurrentUser = admin.email === currentEmail;
            
            html += `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--gray-100);
                    ${isCurrentUser ? 'background: rgba(201,168,76,0.04); border-radius: var(--radius-md);' : ''}
                ">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            background: ${isCurrentUser ? 'var(--secondary)' : 'var(--accent)'};
                            color: white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 700;
                            font-size: 0.8rem;
                            flex-shrink: 0;
                        ">
                            ${admin.name ? admin.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                            <div style="font-weight: 600; color: var(--gray-900); font-size: 0.9rem;">
                                ${admin.name || 'Coordinator'}
                                ${admin.isPrimary ? '<span style="background: var(--secondary); color: white; padding: 1px 10px; border-radius: var(--radius-full); font-size: 0.6rem; font-weight: 700; margin-left: 8px;">PRIMARY</span>' : ''}
                                ${isCurrentUser ? '<span style="background: var(--accent); color: white; padding: 1px 10px; border-radius: var(--radius-full); font-size: 0.6rem; font-weight: 700; margin-left: 8px;">YOU</span>' : ''}
                            </div>
                            <div style="font-size: 0.8rem; color: var(--gray-500);">${admin.email}</div>
                        </div>
                    </div>
                    ${!admin.isPrimary && !isCurrentUser ? `
                        <button class="delete-btn remove-admin" data-id="${admin.id}" style="
                            background: none;
                            border: none;
                            color: var(--gray-300);
                            cursor: pointer;
                            padding: 4px 8px;
                            border-radius: var(--radius-sm);
                            transition: all 0.2s ease;
                            font-size: 0.9rem;
                        ">
                            <i class="fas fa-user-minus"></i>
                        </button>
                    ` : ''}
                    ${isCurrentUser ? `
                        <span style="font-size: 0.7rem; color: var(--gray-500);">
                            <i class="fas fa-check-circle" style="color: var(--success);"></i> Active Session
                        </span>
                    ` : ''}
                </div>
            `;
        }
        
        container.innerHTML = html;
        
        // Remove admin handlers
        document.querySelectorAll('.remove-admin').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = this.dataset.id;
                if (confirm('Remove this coordinator?')) {
                    self.removeAdmin(id);
                }
            });
        });
    },

    // ----- UPDATE PROFILE NAME -----
    updateProfile: function() {
        var newName = document.getElementById('profileNameInput').value.trim();
        var statusEl = document.getElementById('profileStatus');
        
        if (!newName) {
            statusEl.textContent = '⚠️ Please enter a name';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        
        var currentUser = window.Auth.getCurrentUser();
        var currentEmail = currentUser ? currentUser.email : '';
        
        // Update the mock/localStorage user
        if (window.__firebase && window.__firebase.useMock) {
            var mockUser = JSON.parse(localStorage.getItem('mockUser') || '{}');
            mockUser.displayName = newName;
            localStorage.setItem('mockUser', JSON.stringify(mockUser));
        }
        
        // If using admin storage
        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
        for (var i = 0; i < admins.length; i++) {
            if (admins[i].email === currentEmail) {
                admins[i].name = newName;
                break;
            }
        }
        localStorage.setItem('admins', JSON.stringify(admins));
        
        // Update UI
        document.getElementById('profileDisplayName').textContent = newName;
        document.getElementById('profileAvatarLetter').textContent = newName.charAt(0).toUpperCase();
        
        statusEl.textContent = '✅ Profile updated successfully!';
        statusEl.style.color = 'var(--success)';
        
        setTimeout(function() {
            statusEl.textContent = '';
        }, 3000);
    },

    // ----- CHANGE PASSWORD (Universal) -----
    changePassword: function() {
        var currentPassword = document.getElementById('currentPassword').value;
        var newPassword = document.getElementById('newPassword').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var statusEl = document.getElementById('passwordStatus');
        
        // Validate
        if (!currentPassword) {
            statusEl.textContent = '⚠️ Please enter your current password';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        
        if (!newPassword || newPassword.length < 8) {
            statusEl.textContent = '⚠️ New password must be at least 8 characters';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        
        if (newPassword !== confirmPassword) {
            statusEl.textContent = '⚠️ Passwords do not match';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        
        // Get current user
        var currentUser = window.Auth.getCurrentUser();
        var currentEmail = currentUser ? currentUser.email : '';
        
        // Update password in stored admins
        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
        var found = false;
        
        for (var i = 0; i < admins.length; i++) {
            if (admins[i].email === currentEmail) {
                if (admins[i].password !== currentPassword) {
                    statusEl.textContent = '❌ Current password is incorrect';
                    statusEl.style.color = 'var(--danger)';
                    return;
                }
                admins[i].password = newPassword;
                found = true;
                break;
            }
        }
        
        // Check teachers list if not found
        if (!found) {
            var teachers = JSON.parse(localStorage.getItem('teachers') || '[]');
            for (var i = 0; i < teachers.length; i++) {
                if (teachers[i].email === currentEmail) {
                    if (teachers[i].password !== currentPassword) {
                        statusEl.textContent = '❌ Current password is incorrect';
                        statusEl.style.color = 'var(--danger)';
                        return;
                    }
                    teachers[i].password = newPassword;
                    found = true;
                    break;
                }
            }
            localStorage.setItem('teachers', JSON.stringify(teachers));
        }
        
        // Check students list if not found
        if (!found) {
            var students = JSON.parse(localStorage.getItem('students') || '[]');
            for (var i = 0; i < students.length; i++) {
                if (students[i].email === currentEmail) {
                    if (students[i].password !== currentPassword) {
                        statusEl.textContent = '❌ Current password is incorrect';
                        statusEl.style.color = 'var(--danger)';
                        return;
                    }
                    students[i].password = newPassword;
                    found = true;
                    break;
                }
            }
            localStorage.setItem('students', JSON.stringify(students));
        }
        
        localStorage.setItem('admins', JSON.stringify(admins));
        
        statusEl.textContent = '✅ Password updated successfully!';
        statusEl.style.color = 'var(--success)';
        
        // Clear fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        
        setTimeout(function() {
            statusEl.textContent = '';
        }, 3000);
    },

    // ----- ADD ADMIN (Coordinator Only) -----
    addAdmin: function() {
        var email = document.getElementById('newAdminEmail').value.trim();
        var name = document.getElementById('newAdminName').value.trim();
        var statusEl = document.getElementById('addAdminStatus');
        
        if (!email) {
            statusEl.textContent = '⚠️ Please enter an email address';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        
        if (!name) {
            statusEl.textContent = '⚠️ Please enter a full name';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        
        // Check if admin already exists
        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
        var exists = admins.some(function(a) { return a.email === email; });
        
        if (exists) {
            statusEl.textContent = '⚠️ This coordinator already exists';
            statusEl.style.color = 'var(--danger)';
            return;
        }
        
        // Add new admin with default password
        var newAdmin = {
            id: 'admin-' + Date.now(),
            email: email,
            name: name,
            password: 'admin123',
            isPrimary: false,
            created: new Date().toISOString()
        };
        
        admins.push(newAdmin);
        localStorage.setItem('admins', JSON.stringify(admins));
        
        statusEl.textContent = '✅ Coordinator added successfully!';
        statusEl.style.color = 'var(--success)';
        
        // Clear fields
        document.getElementById('newAdminEmail').value = '';
        document.getElementById('newAdminName').value = '';
        
        // Reload admin list
        this.loadAdmins();
        
        setTimeout(function() {
            statusEl.textContent = '';
        }, 3000);
    },

    // ----- REMOVE ADMIN (Coordinator Only) -----
    removeAdmin: function(adminId) {
        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
        admins = admins.filter(function(a) { return a.id !== adminId; });
        localStorage.setItem('admins', JSON.stringify(admins));
        this.loadAdmins();
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up profile events...");
        var self = this;
        
        // Update Profile
        var updateProfileBtn = document.getElementById('updateProfileBtn');
        if (updateProfileBtn) {
            updateProfileBtn.addEventListener('click', function() {
                self.updateProfile();
            });
        }
        
        // Change password
        var changeBtn = document.getElementById('changePasswordBtn');
        if (changeBtn) {
            changeBtn.addEventListener('click', function() {
                self.changePassword();
            });
        }
        
        // Add Admin (Coordinator Only)
        var addBtn = document.getElementById('addAdminBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                self.addAdmin();
            });
        }
        
        // Enter key support for password fields
        var fields = ['currentPassword', 'newPassword', 'confirmPassword'];
        fields.forEach(function(id) {
            var input = document.getElementById(id);
            if (input) {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        var btn = document.getElementById('changePasswordBtn');
                        if (btn) btn.click();
                    }
                });
            }
        });
        
        // Enter key support for add admin
        var emailInput = document.getElementById('newAdminEmail');
        var nameInput = document.getElementById('newAdminName');
        
        if (emailInput) {
            emailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    var btn = document.getElementById('addAdminBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        if (nameInput) {
            nameInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    var btn = document.getElementById('addAdminBtn');
                    if (btn) btn.click();
                }
            });
        }
        
        // Load data
        this.loadData();
    }
};

window.AdminProfilePage = AdminProfilePage;
console.log("✅ AdminProfilePage module loaded");
