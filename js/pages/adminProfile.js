// ============================================================
// ADMIN PROFILE PAGE - Manage Admin Accounts
// ============================================================

var AdminProfilePage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="adminProfilePage" class="page active-page">
            <div class="section-title">
                <i class="fas fa-user-cog"></i> Admin Profile
                <span style="font-size: 1rem; font-weight: 400; color: var(--gray);">manage your account settings</span>
            </div>
            
            <!-- ===== ADMIN BADGE ===== -->
            <div style="
                background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02));
                border: 1px solid rgba(201,168,76,0.15);
                border-radius: var(--radius-lg);
                padding: 16px 24px;
                margin-bottom: 24px;
                display: flex;
                align-items: center;
                gap: 16px;
                flex-wrap: wrap;
            ">
                <div style="
                    background: var(--secondary);
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
                    <i class="fas fa-crown"></i> Coordinator
                </div>
                <span style="color: var(--gray-600); font-size: 0.9rem;">
                    <i class="fas fa-shield-alt" style="color: var(--secondary);"></i>
                    You have full administrative access
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
                        background: linear-gradient(135deg, var(--primary), var(--secondary));
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2rem;
                        color: white;
                        font-weight: 700;
                        box-shadow: 0 8px 32px rgba(201, 168, 76, 0.2);
                    ">
                        <i class="fas fa-crown"></i>
                    </div>
                    <div>
                        <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--primary);">
                            <span id="adminDisplayName">Coordinator</span>
                        </h3>
                        <p style="color: var(--gray-500);" id="adminDisplayEmail">admin@csl.com</p>
                        <span style="
                            background: var(--secondary);
                            color: white;
                            padding: 2px 14px;
                            border-radius: var(--radius-full);
                            font-size: 0.65rem;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        ">Administrator</span>
                    </div>
                </div>
                
                <!-- ===== CHANGE PASSWORD ===== -->
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
                    <i class="fas fa-key" style="color: var(--secondary);"></i>
                    Change Password
                    <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray-500);">(required after first login)</span>
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
                        background: var(--secondary);
                        max-width: 200px;
                    ">
                        <i class="fas fa-save"></i> Update Password
                    </button>
                    
                    <div id="passwordStatus" style="font-size: 0.9rem; color: var(--gray-500);"></div>
                </div>
            </div>
            
            <!-- ===== ADMIN MANAGEMENT ===== -->
            <div style="
                background: var(--bg-primary);
                border: 1px solid var(--gray-100);
                border-radius: var(--radius-xl);
                padding: 32px;
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
                    Admin Management
                    <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray-500);">add or remove coordinators</span>
                </h4>
                
                <!-- Add Admin -->
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
                
                <!-- Admin List -->
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
                        <i class="fas fa-spinner fa-spin"></i> Loading admins...
                    </div>
                </div>
            </div>
        </div>`;
    },

    // ----- LOAD DATA -----
    loadData: function() {
        console.log("📊 Loading admin profile data...");
        
        var self = this;
        var currentUser = window.Auth.getCurrentUser();
        
        if (currentUser) {
            document.getElementById('adminDisplayName').textContent = currentUser.displayName || 'Coordinator';
            document.getElementById('adminDisplayEmail').textContent = currentUser.email || 'admin@csl.com';
        }
        
        this.loadAdmins();
    },

    // ----- LOAD ADMINS -----
    loadAdmins: function() {
        var container = document.getElementById('adminList');
        
        // Get admins from localStorage
        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
        
        if (admins.length === 0) {
            // Default admin
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

    // ----- RENDER ADMINS -----
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

    // ----- CHANGE PASSWORD -----
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
        var currentEmail = currentUser ? currentUser.email : 'admin@csl.com';
        
        // Update password in admin list
        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
        var found = false;
        
        for (var i = 0; i < admins.length; i++) {
            if (admins[i].email === currentEmail) {
                // Verify current password
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
        
        if (!found) {
            // Add new admin entry
            admins.push({
                id: 'admin-' + Date.now(),
                email: currentEmail,
                name: currentUser.displayName || 'Coordinator',
                password: newPassword,
                isPrimary: false
            });
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

    // ----- ADD ADMIN -----
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
            password: 'admin123', // Default password - should be changed on first login
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

    // ----- REMOVE ADMIN -----
    removeAdmin: function(adminId) {
        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
        admins = admins.filter(function(a) { return a.id !== adminId; });
        localStorage.setItem('admins', JSON.stringify(admins));
        this.loadAdmins();
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up admin profile events...");
        var self = this;
        
        // Change password
        var changeBtn = document.getElementById('changePasswordBtn');
        if (changeBtn) {
            changeBtn.addEventListener('click', function() {
                self.changePassword();
            });
        }
        
        // Add admin
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
