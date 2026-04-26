document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 الموقع بدأ التحميل...');
    
    // ========== 1. الوضع الليلي ==========
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('sama-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('sama-theme', next);
        updateThemeIcon(next);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
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
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
        { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
        { code: 'zh', name: '中文', flag: '🇨🇳' }
    ];
    
    // تطبيق الترجمة
    function translatePage(lang) {
        console.log(`🔄 جاري الترجمة إلى: ${lang}`);
        
        // التحقق من وجود ملف الترجمات
        if (typeof translations === 'undefined') {
            console.error('❌ ملف translations.js غير موجود!');
            alert('ملف الترجمات غير موجود. تأكد من رفع translations.js');
            return;
        }        
        if (!translations[lang]) {
            console.error(`❌ اللغة ${lang} غير موجودة في الترجمات!`);
            return;
        }
        
        // تحديث جميع العناصر
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = translations[lang][key];
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'IMG') {
                    element.alt = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // تحديث الترحيب
        const teacherName = localStorage.getItem('sama-teacher') || 'معلمة';
        const greetingEl = document.getElementById('teacher-greeting');
        if (greetingEl) {
            greetingEl.textContent = `${translations[lang].greeting || 'أهلاً،'} ${teacherName} 👋`;
        }
        
        // تحديث اتجاه الصفحة
        const rtlLangs = ['ar', 'he', 'fa', 'ur'];
        document.documentElement.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        console.log(`✅ تمت الترجمة إلى ${lang}`);
    }
    
    // إنشاء القائمة المنسدلة
    function showLanguageMenu() {
        // إزالة أي قائمة موجودة
        document.querySelector('.lang-menu')?.remove();
        
        const menu = document.createElement('div');
        menu.className = 'lang-menu';
        menu.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border-radius: 10px;            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            padding: 10px;
            min-width: 150px;
            z-index: 1000;
            margin-top: 5px;
        `;
        
        languages.forEach(lang => {
            const btn = document.createElement('button');
            btn.textContent = `${lang.flag} ${lang.name}`;
            btn.style.cssText = `
                width: 100%;
                padding: 8px 12px;
                margin: 3px 0;
                border: none;
                background: transparent;
                border-radius: 5px;
                cursor: pointer;
                text-align: right;
                font-family: 'Tajawal', sans-serif;
                transition: background 0.2s;
            `;
            btn.onmouseover = () => btn.style.background = '#f0f0f0';
            btn.onmouseout = () => btn.style.background = 'transparent';
            btn.onclick = () => {
                currentLang = lang.code;
                localStorage.setItem('sama-lang', currentLang);
                langToggle.textContent = lang.flag;
                translatePage(currentLang);
                menu.remove();
            };
            menu.appendChild(btn);
        });
        
        langToggle.parentElement.style.position = 'relative';
        langToggle.parentElement.appendChild(menu);
    }
    
    langToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        showLanguageMenu();
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', () => {
        document.querySelector('.lang-menu')?.remove();
    });
    
    // تحميل اللغة المحفوظة
    if (langToggle) {        const savedLang = languages.find(l => l.code === currentLang);
        if (savedLang) {
            langToggle.textContent = savedLang.flag;
        }
        translatePage(currentLang);
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
    
    // تعديل الاسم
    document.getElementById('account-btn')?.addEventListener('click', () => {
        const newName = prompt('✏️ تعديل اسم المعلمة:', localStorage.getItem('sama-teacher'));
        if (newName && newName.trim()) {
            localStorage.setItem('sama-teacher', newName.trim());
            if (greetingEl) {
                greetingEl.textContent = `أهلاً، ${newName.trim()} 👋`;
            }
        }
    });
    
    console.log('✅ الموقع جاهز!');
});
