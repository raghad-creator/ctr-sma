document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 سما - الموقع بدأ التحميل');
    
    // ========== 1. الوضع الليلي ==========
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('sama-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('sama-theme', next);
            icon.className = next === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }
    
    // ========== 2. اللغة ==========
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('sama-lang') || 'ar';
    
    const languages = [
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮' },
        { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
        { code: 'zh', name: '中文', flag: '🇨🇳' }
    ];
    
    // دالة الترجمة الرئيسية
    function translatePage(lang) {
        console.log(`🌐 الترجمة إلى: ${lang}`);
        
        // التحقق من وجود الترجمات
        if (typeof translations === 'undefined') {
            console.error('❌ ملف translation.js غير محمل!');
            return;
        }
        
        if (!translations[lang]) {
            console.error(`❌ اللغة ${lang} غير موجودة!`);
            return;        }
        
        const t = translations[lang];
        
        // تحديث العناصر باستخدام data-key
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (t[key]) {
                el.textContent = t[key];
            }
        });
        
        // تحديث الترحيب
        const teacherName = localStorage.getItem('sama-teacher') || 'معلمة';
        const greetingEl = document.getElementById('teacher-greeting');
        if (greetingEl && t.greeting) {
            greetingEl.textContent = `${t.greeting} ${teacherName} 👋`;
        }
        
        // تحديث السؤال
        const questionEl = document.querySelector('.question');
        if (questionEl && t.question) {
            questionEl.textContent = t.question;
        }
        
        // تحديث الفوتر
        const footerEl = document.querySelector('.main-footer p');
        if (footerEl && t.footer) {
            footerEl.textContent = t.footer;
        }
        
        // تحديث الاتجاه
        const rtlLangs = ['ar', 'he', 'fa', 'ur'];
        document.documentElement.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        console.log(`✅ تمت الترجمة بنجاح!`);
    }
    
    // إظهار قائمة اللغات
    function showLangMenu() {
        const existingMenu = document.querySelector('.lang-dropdown');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }
        
        const menu = document.createElement('div');
        menu.className = 'lang-dropdown';
        menu.style.cssText = `            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            padding: 10px;
            min-width: 180px;
            z-index: 1000;
            margin-top: 5px;
        `;
        
        languages.forEach(l => {
            const btn = document.createElement('button');
            btn.textContent = `${l.flag} ${l.name}`;
            btn.style.cssText = `
                width: 100%;
                padding: 10px;
                margin: 3px 0;
                border: none;
                background: transparent;
                border-radius: 5px;
                cursor: pointer;
                text-align: right;
                font-family: 'Tajawal', sans-serif;
            `;
            btn.onmouseover = () => btn.style.background = '#6FAFAF';
            btn.onmouseout = () => btn.style.background = 'transparent';
            btn.onclick = () => {
                currentLang = l.code;
                localStorage.setItem('sama-lang', currentLang);
                langToggle.textContent = l.flag;
                menu.remove();
                translatePage(currentLang);
            };
            menu.appendChild(btn);
        });
        
        langToggle.parentElement.style.position = 'relative';
        langToggle.parentElement.appendChild(menu);
    }
    
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            showLangMenu();
        });
        
        // تعيين العلم الحالي
        const current = languages.find(l => l.code === currentLang);        if (current) {
            langToggle.textContent = current.flag;
        }
        
        // تطبيق الترجمة عند التحميل
        setTimeout(() => translatePage(currentLang), 100);
    }
    
    // ========== 3. اسم المعلمة ==========
    let teacherName = localStorage.getItem('sama-teacher');
    if (!teacherName) {
        teacherName = prompt('👋 أهلاً بكِ في سما!\n\nالرجاء إدخال اسم المعلمة:') || 'معلمة';
        localStorage.setItem('sama-teacher', teacherName.trim());
    }
    
    const greetingEl = document.getElementById('teacher-greeting');
    if (greetingEl) {
        greetingEl.textContent = `أهلاً، ${teacherName} 👋`;
    }
    
    document.getElementById('account-btn')?.addEventListener('click', () => {
        const newName = prompt('✏️ تعديل اسم المعلمة:', teacherName);
        if (newName && newName.trim()) {
            teacherName = newName.trim();
            localStorage.setItem('sama-teacher', teacherName);
            greetingEl.textContent = `أهلاً، ${teacherName} 👋`;
        }
    });
    
    console.log('✅ سما جاهز!');
});
