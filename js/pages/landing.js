// ============================================================
// LANDING PAGE - Premium Welcome Experience
// ============================================================

var LandingPage = {
    // ----- RENDER HTML -----
    render: function() {
        return `
        <div id="landingPage" class="page active-page" style="padding: 20px 0;">
            
            <!-- ===== HERO SECTION ===== -->
            <div style="
                text-align: center;
                padding: 60px 20px 40px;
                background: linear-gradient(135deg, rgba(26,26,46,0.03) 0%, rgba(201,168,76,0.03) 100%);
                border-radius: var(--radius-xl);
                margin-bottom: 40px;
                position: relative;
                overflow: hidden;
            ">
                <!-- Decorative Elements -->
                <div style="
                    position: absolute;
                    top: -100px;
                    right: -100px;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    background: rgba(201,168,76,0.05);
                    pointer-events: none;
                "></div>
                <div style="
                    position: absolute;
                    bottom: -80px;
                    left: -80px;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    background: rgba(74,108,247,0.04);
                    pointer-events: none;
                "></div>
                
                <div style="position: relative; z-index: 1;">
                    <div style="
                        display: inline-block;
                        background: rgba(201,168,76,0.12);
                        color: var(--secondary);
                        padding: 6px 20px;
                        border-radius: var(--radius-full);
                        font-size: 0.75rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 16px;
                    ">
                        <i class="fas fa-hands-helping"></i> CSL Management Pro
                    </div>
                    
                    <h1 style="
                        font-family: var(--font-serif);
                        font-size: 3.2rem;
                        font-weight: 700;
                        color: var(--primary);
                        margin-bottom: 16px;
                        line-height: 1.2;
                    ">
                        Empowering<br>Service Clubs
                    </h1>
                    
                    <p style="
                        font-size: 1.1rem;
                        color: var(--gray-500);
                        max-width: 500px;
                        margin: 0 auto 32px;
                        line-height: 1.6;
                    ">
                        Streamline club management, track activities, and foster growth 
                        with our comprehensive platform for service clubs.
                    </p>
                    
                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        <button class="btn-primary" onclick="window.app.navigateTo('student')" style="padding: 14px 32px; font-size: 1rem;">
                            <i class="fas fa-rocket"></i> Get Started
                        </button>
                        <button class="btn-glass" onclick="window.app.showLogin()" style="padding: 14px 32px; font-size: 1rem;">
                            <i class="fas fa-sign-in-alt"></i> Sign In
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- ===== FEATURES GRID ===== -->
            <h2 style="
                font-family: var(--font-serif);
                font-size: 1.8rem;
                color: var(--primary);
                text-align: center;
                margin-bottom: 24px;
            ">
                Everything You Need
            </h2>
            
            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 20px;
                margin-bottom: 40px;
            ">
                <!-- Feature 1 -->
                <div class="modern-card" style="
                    background: var(--bg-primary);
                    border: 1px solid var(--gray-100);
                    border-radius: var(--radius-lg);
                    padding: 24px;
                    text-align: center;
                    transition: all 0.2s ease;
                ">
                    <div style="
                        width: 56px;
                        height: 56px;
                        border-radius: var(--radius-md);
                        background: rgba(26,26,46,0.06);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 16px;
                        font-size: 1.4rem;
                        color: var(--primary);
                    ">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">Attendance</h4>
                    <p style="color: var(--gray-500); font-size: 0.9rem; line-height: 1.5;">
                        Track attendance with engagement ratings and late logging.
                    </p>
                </div>
                
                <!-- Feature 2 -->
                <div class="modern-card" style="
                    background: var(--bg-primary);
                    border: 1px solid var(--gray-100);
                    border-radius: var(--radius-lg);
                    padding: 24px;
                    text-align: center;
                    transition: all 0.2s ease;
                ">
                    <div style="
                        width: 56px;
                        height: 56px;
                        border-radius: var(--radius-md);
                        background: rgba(201,168,76,0.1);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 16px;
                        font-size: 1.4rem;
                        color: var(--secondary);
                    ">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">Club Tracker</h4>
                    <p style="color: var(--gray-500); font-size: 0.9rem; line-height: 1.5;">
                        Monitor activities, tasks, and progress weekly, monthly, yearly.
                    </p>
                </div>
                
                <!-- Feature 3 -->
                <div class="modern-card" style="
                    background: var(--bg-primary);
                    border: 1px solid var(--gray-100);
                    border-radius: var(--radius-lg);
                    padding: 24px;
                    text-align: center;
                    transition: all 0.2s ease;
                ">
                    <div style="
                        width: 56px;
                        height: 56px;
                        border-radius: var(--radius-md);
                        background: rgba(74,108,247,0.08);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 16px;
                        font-size: 1.4rem;
                        color: var(--accent);
                    ">
                        <i class="fas fa-comment-dots"></i>
                    </div>
                    <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">Reflections</h4>
                    <p style="color: var(--gray-500); font-size: 0.9rem; line-height: 1.5;">
                        Students reflect on growth; teachers track progress.
                    </p>
                </div>
                
                <!-- Feature 4 -->
                <div class="modern-card" style="
                    background: var(--bg-primary);
                    border: 1px solid var(--gray-100);
                    border-radius: var(--radius-lg);
                    padding: 24px;
                    text-align: center;
                    transition: all 0.2s ease;
                ">
                    <div style="
                        width: 56px;
                        height: 56px;
                        border-radius: var(--radius-md);
                        background: rgba(0,210,160,0.08);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 16px;
                        font-size: 1.4rem;
                        color: var(--success);
                    ">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                    <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 8px;">Student Portal</h4>
                    <p style="color: var(--gray-500); font-size: 0.9rem; line-height: 1.5;">
                        Students manage tasks and write reflections independently.
                    </p>
                </div>
            </div>
            
            <!-- ===== STATS SECTION ===== -->
            <div style="
                background: var(--bg-secondary);
                border-radius: var(--radius-xl);
                padding: 32px 24px;
                border: 1px solid var(--gray-100);
                margin-bottom: 40px;
            ">
                <div style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 20px;
                    text-align: center;
                ">
                    <div>
                        <div style="font-size: 2.4rem; font-weight: 800; color: var(--primary);">50+</div>
                        <div style="color: var(--gray-500); font-size: 0.85rem;">Active Clubs</div>
                    </div>
                    <div>
                        <div style="font-size: 2.4rem; font-weight: 800; color: var(--secondary);">200+</div>
                        <div style="color: var(--gray-500); font-size: 0.85rem;">Students</div>
                    </div>
                    <div>
                        <div style="font-size: 2.4rem; font-weight: 800; color: var(--accent);">1,000+</div>
                        <div style="color: var(--gray-500); font-size: 0.85rem;">Activities Logged</div>
                    </div>
                    <div>
                        <div style="font-size: 2.4rem; font-weight: 800; color: var(--success);">98%</div>
                        <div style="color: var(--gray-500); font-size: 0.85rem;">Satisfaction</div>
                    </div>
                </div>
            </div>
            
            <!-- ===== CTA SECTION ===== -->
            <div style="
                text-align: center;
                padding: 40px 20px;
                background: linear-gradient(135deg, var(--primary), var(--primary-light));
                border-radius: var(--radius-xl);
                color: white;
            ">
                <h2 style="
                    font-family: var(--font-serif);
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 12px;
                ">
                    Ready to Get Started?
                </h2>
                <p style="
                    opacity: 0.8;
                    max-width: 400px;
                    margin: 0 auto 24px;
                    line-height: 1.6;
                ">
                    Join the growing community of service clubs using our platform.
                </p>
                <button class="btn-glass" onclick="window.app.showLogin()" style="
                    padding: 14px 40px;
                    font-size: 1rem;
                    background: rgba(255,255,255,0.15);
                    color: white;
                    border: 1px solid rgba(255,255,255,0.2);
                ">
                    <i class="fas fa-arrow-right"></i> Login Now
                </button>
            </div>
            
            <!-- ===== FOOTER ===== -->
            <div style="
                text-align: center;
                padding: 24px 20px;
                color: var(--gray-500);
                font-size: 0.8rem;
                margin-top: 24px;
            ">
                <p>© 2026 CSL Management Pro. All rights reserved.</p>
                <p style="margin-top: 4px;">Made with <i class="fas fa-heart" style="color: var(--danger);"></i> for service clubs everywhere</p>
            </div>
        </div>`;
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up landing page events...");
        // No special events needed - buttons use inline onclick
    }
};

window.LandingPage = LandingPage;
console.log("✅ LandingPage module loaded");
