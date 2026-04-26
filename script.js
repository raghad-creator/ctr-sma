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
        { code: 'tr', name: 'Türkçe', flag: '🇹' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
        { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
        { code: 'zh', name: '中文', flag: '🇨' }
    ];
    
    // تطبيق الترجمة - الدالة الرئيسية
    function translatePage(lang) {
        console.log(`🔄 جاري الترجمة إلى: ${lang}`);
        console.log('📦 ملف الترجمات:', typeof translations);
        
        // التحقق من وجود ملف الترجمات
        if (typeof translations === 'undefined') {
            console.error('❌ ملف translations.js غير موجود!');
            return;
        }        
        if (!translations[lang]) {
            console.error(`❌ اللغة ${lang} غير موجودة!`);
            return;
        }
        
        const langData = translations[lang];
        console.log('📝 بيانات اللغة:', langData);
        
        // تحديث جميع العناصر التي لها data-translate
        const elements = document.querySelectorAll('[data-translate]');
        console.log(`🔍 عدد العناصر للترجمة: ${elements.length}`);
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = langData[key];
            
            console.log(`  - ${key}: ${translation ? '✓' : '✗'}`);
            
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
        
        // تحديث الترحيب بشكل خاص
        const teacherName = localStorage.getItem('sama-teacher') || 'معلمة';
        const greetingEl = document.getElementById('teacher-greeting');
        if (greetingEl && langData.greeting) {
            greetingEl.textContent = `${langData.greeting} ${teacherName} 👋`;
        }
        
        // تحديث اتجاه الصفحة
        const rtlLangs = ['ar', 'he', 'fa', 'ur'];
        document.documentElement.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        console.log(`✅ تمت الترجمة إلى ${lang} بنجاح!`);
    }
    
    // إنشاء القائمة المنسدلة
    function showLanguageMenu() {
        // إزالة أي قائمة موجودة
        const existingMenu = document.querySelector('.lang-menu');
        if (existingMenu) {            existingMenu.remove();
            return;
        }
        
        const menu = document.createElement('div');
        menu.className = 'lang-menu';
        menu.style.cssText = `
            position: absolute;
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
        
        languages.forEach(lang => {
            const btn = document.createElement('button');
            btn.textContent = `${lang.flag} ${lang.name}`;
            btn.style.cssText = `
                width: 100%;
                padding: 10px 12px;
                margin: 3px 0;
                border: none;
                background: transparent;
                border-radius: 5px;
                cursor: pointer;
                text-align: right;
                font-family: 'Tajawal', sans-serif;
                font-size: 14px;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 8px;
            `;
            
            btn.onmouseover = () => {
                btn.style.background = 'var(--primary-light)';
                btn.style.color = 'white';
            };
            btn.onmouseout = () => {
                btn.style.background = 'transparent';
                btn.style.color = 'inherit';
            };
            
            btn.onclick = (e) => {
                e.stopPropagation();                console.log(`🌐 اختيار اللغة: ${lang.name}`);
                currentLang = lang.code;
                localStorage.setItem('sama-lang', currentLang);
                langToggle.textContent = lang.flag;
                menu.remove();
                
                // تطبيق الترجمة فوراً
                translatePage(currentLang);
            };
            
            menu.appendChild(btn);
        });
        
        langToggle.parentElement.style.position = 'relative';
        langToggle.parentElement.appendChild(menu);
    }
    
    // حدث النقر على زر اللغة
    langToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        showLanguageMenu();
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', () => {
        document.querySelector('.lang-menu')?.remove();
    });
    
    // تحميل اللغة المحفوظة عند البدء
    if (langToggle) {
        const savedLang = languages.find(l => l.code === currentLang);
        if (savedLang) {
            langToggle.textContent = savedLang.flag;
        }
        
        // تطبيق الترجمة بعد تأخير بسيط للتأكد من تحميل كل شيء
        setTimeout(() => {
            translatePage(currentLang);
        }, 100);
    }
    
    // ========== 3. اسم المعلمة ==========
    let teacherName = localStorage.getItem('sama-teacher');
    
    if (!teacherName) {
        teacherName = prompt('👋 أهلاً بكِ في سما!\n\nالرجاء إدخال اسم المعلمة:') || 'معلمة';
        localStorage.setItem('sama-teacher', teacherName.trim());
    }
    
    const greetingEl = document.getElementById('teacher-greeting');    if (greetingEl) {
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
