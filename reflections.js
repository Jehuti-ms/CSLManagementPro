// ============================================================
// REFLECTIONS PAGE
// ============================================================

const ReflectionsPage = {
    render: async function() {
        const refs = await window.DB.getReflections();
        document.getElementById('studentReflection').value = refs.student || '';
        document.getElementById('teacherReflection').value = refs.teacher || '';
        document.getElementById('studentRefDisplay').textContent = refs.student || 'No student reflection yet.';
        document.getElementById('teacherRefDisplay').textContent = refs.teacher || 'No teacher reflection yet.';
    },
    
    save: async function(type) {
        const content = type === 'student' ? 
            document.getElementById('studentReflection').value : 
            document.getElementById('teacherReflection').value;
        if (!content.trim()) {
            return alert('Please write something before saving.');
        }
        await window.DB.saveReflection(type, content);
        await this.render();
        alert('✅ Reflection saved!');
    }
};

window.ReflectionsPage = ReflectionsPage;