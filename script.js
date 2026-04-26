// ==================== تهيئة الموقع عند التحميل ====================
document.addEventListener('DOMContentLoaded', () => {
    
    // ========== 1. الوضع الليلي/النهاري ==========
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // تحميل الوضع المحفوظ
    const savedTheme = localStorage.getItem('sama-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // تبديل الوضع عند الضغط
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('sama-theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // ========== 2. تغيير اللغة ==========
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('sama-lang') || 'ar';
    
    // تطبيق اللغة المحفوظة
    applyLanguage(currentLang);
    
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('sama-lang', currentLang);
        applyLanguage(currentLang);
    });
    
    function applyLanguage(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        langToggle.textContent = lang === 'ar' ? 'EN' : 'عربي';
        
        // هنا سيتم إضافة الترجمات الكاملة لاحقاً
        if (lang === 'en') {
            document.getElementById('teacher-greeting').textContent = 
                `Welcome, ${localStorage.getItem('sama-teacher') || 'Teacher'} 👋`;
            document.querySelector('.question').textContent = 'What would you like to do today?';
        } else {
            const teacherName = localStorage.getItem('sama-teacher') || 'معلمة';
            document.getElementById('teacher-greeting').textContent = `أهلاً، ${teacherName} 👋`;
            document.querySelector('.question').textContent = 'ماذا تريد أن تفعل اليوم؟';
        }
    }
    
    // ========== 3. ترحيب المعلمة ==========
    const greetingElement = document.getElementById('teacher-greeting');
    let teacherName = localStorage.getItem('sama-teacher');
    
    if (!teacherName || teacherName.trim() === '') {
        // أول زيارة للموقع
        teacherName = prompt('👋 أهلاً بكِ في سما!\n\nالرجاء إدخال اسم المعلمة:') || 'معلمة';
        teacherName = teacherName.trim();
        localStorage.setItem('sama-teacher', teacherName);
    }
    
    // عرض الترحيب
    updateGreeting(teacherName);
    
    // ========== 4. إدارة الحساب (تعديل الاسم) ==========
    const accountBtn = document.getElementById('account-btn');
    accountBtn.addEventListener('click', () => {
        const currentName = localStorage.getItem('sama-teacher') || 'معلمة';
        const newName = prompt('✏️ تعديل اسم المعلمة\n\nالاسم الحالي: ' + currentName, currentName);
        
        if (newName !== null && newName.trim() !== '') {
            const trimmedName = newName.trim();
            localStorage.setItem('sama-teacher', trimmedName);
            updateGreeting(trimmedName);
            
            // تحديث الترحيب إذا كانت اللغة إنجليزي
            if (currentLang === 'en') {
                greetingElement.textContent = `Welcome, ${trimmedName} 👋`;
            }
            
            showNotification('✅ تم تحديث الاسم بنجاح');
        }
    });
    
    function updateGreeting(name) {
        if (currentLang === 'ar') {
            greetingElement.textContent = `أهلاً، ${name} 👋`;
        } else {
            greetingElement.textContent = `Welcome, ${name} 👋`;
        }
    }
    
    // ========== 5. دالة إشعارات بسيطة ==========
    function showNotification(message) {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-dark);
            color: #fff;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 500;
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // إزالة الإشعار بعد 3 ثواني
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // إضافة أنيميشن للإشعارات
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translate(-50%, -20px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translate(-50%, 0); opacity: 1; }
            to { transform: translate(-50%, -20px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // ========== 6. التحقق من وجود بيانات تجريبية (للتطوير) ==========
    if (!localStorage.getItem('sama-students')) {
        localStorage.setItem('sama-students', JSON.stringify([]));
        console.log('✅ تم إنشاء قاعدة بيانات الطلاب الفارغة');
    }
    
    console.log('🌟 موقع سما جاهز للاستخدام!');
});
