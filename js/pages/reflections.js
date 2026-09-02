// ============================================================
// REFLECTIONS PAGE
// ============================================================

const ReflectionsPage = {
    // ----- RENDER HTML (synchronous) -----
    render: function() {
        return `
        <div id="reflectionsPage" class="page">
            <div class="section-title"><i class="fas fa-comment-dots"></i> Reflections</div>
            <div class="grid-2col">
                <div class="reflection-card">
                    <h3><i class="fas fa-user-graduate" style="color: var(--primary);"></i> Student Reflection</h3>
                    <textarea id="studentReflection" placeholder="Write student reflection..."></textarea>
                    <button class="btn-primary" id="saveStudentReflection"><i class="fas fa-save"></i> Save student reflection</button>
                    <div class="reflection-display" id="studentRefDisplay">Loading...</div>
                </div>
                <div class="reflection-card">
                    <h3><i class="fas fa-chalkboard-user" style="color: var(--secondary);"></i> Teacher Reflection</h3>
                    <textarea id="teacherReflection" placeholder="Write teacher reflection..."></textarea>
                    <button class="btn-primary" id="saveTeacherReflection"><i class="fas fa-save"></i> Save teacher reflection</button>
                    <div class="reflection-display" id="teacherRefDisplay">Loading...</div>
                </div>
            </div>
        </div>`;
    },

    // ----- LOAD DATA (async) -----
    loadData: async function() {
        console.log("📊 Loading reflections...");
        const refs = await window.DB.getReflections();
        
        document.getElementById('studentReflection').value = refs.student || '';
        document.getElementById('teacherReflection').value = refs.teacher || '';
        document.getElementById('studentRefDisplay').textContent = refs.student || 'No student reflection yet.';
        document.getElementById('teacherRefDisplay').textContent = refs.teacher || 'No teacher reflection yet.';
        
        console.log("✅ Reflections loaded");
    },

    // ----- SETUP EVENTS -----
    setupEvents: function() {
        console.log("🔧 Setting up reflections events...");
        
        document.getElementById('saveStudentReflection')?.addEventListener('click', async () => {
            await this.save('student');
        });
        
        document.getElementById('saveTeacherReflection')?.addEventListener('click', async () => {
            await this.save('teacher');
        });
        
        this.loadData();
    },
    
    save: async function(type) {
        const content = type === 'student' ? 
            document.getElementById('studentReflection').value : 
            document.getElementById('teacherReflection').value;
        if (!content.trim()) return alert('Please write something.');
        await window.DB.saveReflection(type, content);
        await this.loadData();
        alert('✅ Reflection saved!');
    }
};

window.ReflectionsPage = ReflectionsPage;
