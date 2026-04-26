document.addEventListener('DOMContentLoaded', () => {
    // === 1. الوضع الليلي/النهاري ===
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

    // === 2. تغيير اللغة (هيكلة جاهزة للترجمة الكاملة لاحقاً) ===
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('sama-lang') || 'ar';

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('sama-lang', currentLang);
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        langToggle.textContent = currentLang === 'ar' ? 'EN' : 'عربي';
        // سيتم ربطه بملف ترجمة منفصل في الخطوات القادمة
    });

    // === 3. ترحيب المعلمة (يُحفظ في المتصفح) ===
    const greetingEl = document.getElementById('teacher-greeting');
    let teacherName = localStorage.getItem('sama-teacher');

    if (!teacherName || teacherName.trim() === '') {
        teacherName = prompt('👋 أهلاً بكِ في سما!\nالرجاء إدخال اسم المعلمة:') || 'معلمة';
        localStorage.setItem('sama-teacher', teacherName.trim());
    }

    greetingEl.textContent = `أهلاً، ${teacherName} 👋`;

    // === 4. إدارة الحساب (تعديل الاسم) ===
    document.getElementById('account-btn').addEventListener('click', () => {
        const newName = prompt('✏️ تعديل اسم المعلمة:', localStorage.getItem('sama-teacher'));
        if (newName && newName.trim()) {
            localStorage.setItem('sama-teacher', newName.trim());
            greetingEl.textContent = `أهلاً، ${newName.trim()} 👋`;
        }
    });
});