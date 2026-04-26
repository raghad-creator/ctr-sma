// ==================== وظيفة فتح وإغلاق الأسئلة ====================
function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const header = button;
    const allHeaders = document.querySelectorAll('.accordion-header');
    const allContents = document.querySelectorAll('.accordion-content');
    
    // إغلاق جميع الأسئلة الأخرى (اختياري - إذا تبغين واحد فقط يفتح)
    allHeaders.forEach((item, index) => {
        if (item !== header) {
            item.classList.remove('active');
            allContents[index].classList.remove('show');
        }
    });
    
    // تبديل حالة السؤال الحالي
    header.classList.toggle('active');
    content.classList.toggle('show');
}

// ==================== الوضع الليلي ====================
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('sama-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('sama-theme', next);
        updateThemeIcon(next);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
});
