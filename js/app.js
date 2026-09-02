navigateTo(pageId) {
    console.log(`🧭 Navigating to: ${pageId}`);
    this.currentPage = pageId;
    
    const container = document.getElementById('pageContainer');
    if (!container) {
        console.error("❌ pageContainer not found!");
        return;
    }
    
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.page === pageId);
    });
    
    // Render the page
    let html = '';
    try {
        switch (pageId) {
            case 'attendance':
                html = window.AttendancePage ? window.AttendancePage.render() : '<p>Attendance page not loaded</p>';
                break;
            case 'tracker':
                html = window.TrackerPage ? window.TrackerPage.render() : '<p>Tracker page not loaded</p>';
                break;
            case 'reflections':
                html = window.ReflectionsPage ? window.ReflectionsPage.render() : '<p>Reflections page not loaded</p>';
                break;
            case 'admin':
                html = window.AdminPage ? window.AdminPage.render() : '<p>Admin page not loaded</p>';
                break;
            default:
                html = '<p>Page not found</p>';
        }
    } catch (error) {
        console.error(`❌ Error rendering ${pageId}:`, error);
        html = `<p>Error: ${error.message}</p>`;
    }
    
    container.innerHTML = html;
    console.log(`✅ Page rendered: ${pageId}`);
    
    // Setup page events - WITH ERROR HANDLING
    setTimeout(() => {
        try {
            switch (pageId) {
                case 'attendance':
                    if (window.AttendancePage && typeof window.AttendancePage.setupEvents === 'function') {
                        window.AttendancePage.setupEvents();
                    }
                    break;
                case 'tracker':
                    if (window.TrackerPage && typeof window.TrackerPage.setupEvents === 'function') {
                        console.log("🔧 Setting up tracker events...");
                        window.TrackerPage.setupEvents();
                    }
                    break;
                case 'reflections':
                    if (window.ReflectionsPage && typeof window.ReflectionsPage.setupEvents === 'function') {
                        window.ReflectionsPage.setupEvents();
                    }
                    break;
                case 'admin':
                    if (window.AdminPage && typeof window.AdminPage.setupEvents === 'function') {
                        window.AdminPage.setupEvents();
                    }
                    break;
            }
        } catch (error) {
            console.error(`❌ Error setting up events for ${pageId}:`, error);
        }
    }, 200);
}
