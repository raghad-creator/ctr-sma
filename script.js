// ==================== تهيئة الموقع عند التحميل ====================
document.addEventListener('DOMContentLoaded', () => {
    
    // ========== 1. الوضع الليلي/النهاري ==========
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // تحميل الوضع المحفوظ
    const savedTheme = localStorage.getItem('sama-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // تبديل الوضع عند الضغط
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('sama-theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // ========== 2. تغيير اللغة (يدعم 9 لغات) ==========
    const langToggle = document.getElementById('lang-toggle');
    
    // قائمة اللغات المدعومة
    const supportedLanguages = [
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
        { code: 'en', name: 'English', flag: '🇬' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
        { code: 'fil', name: 'Filipino', flag: '🇵' },
        { code: 'zh', name: '中文', flag: '🇨' }
    ];
    
    let currentLang = localStorage.getItem('sama-lang') || 'ar';    
    // إنشاء قائمة منسدلة للغات
    function createLanguageDropdown() {
        const dropdown = document.createElement('div');
        dropdown.className = 'lang-dropdown';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--card-bg);
            border-radius: 12px;
            box-shadow: 0 8px 25px var(--shadow);
            padding: 0.5rem;
            min-width: 180px;
            z-index: 1001;
            display: none;
            flex-direction: column;
            gap: 0.3rem;
            border: 1px solid var(--border-color);
            max-height: 300px;
            overflow-y: auto;
            margin-top: 5px;
        `;
        
        supportedLanguages.forEach(lang => {
            const btn = document.createElement('button');
            btn.textContent = `${lang.flag} ${lang.name}`;
            btn.style.cssText = `
                padding: 0.6rem 1rem;
                text-align: left;
                background: transparent;
                border: none;
                border-radius: 8px;
                color: var(--text);
                font-family: 'Tajawal', sans-serif;
                font-size: 0.9rem;
                cursor: pointer;
                transition: var(--transition);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            `;
            btn.onmouseenter = () => btn.style.background = 'var(--primary-light)';
            btn.onmouseleave = () => btn.style.background = 'transparent';
            btn.onclick = () => {
                currentLang = lang.code;
                localStorage.setItem('sama-lang', currentLang);
                applyLanguage(currentLang);
                dropdown.style.display = 'none';
                dropdown.remove();                if (langToggle) {
                    langToggle.innerHTML = `${lang.flag}`;
                }
            };
            dropdown.appendChild(btn);
        });
        
        return dropdown;
    }
    
    // تطبيق اللغة
    function applyLanguage(lang) {
        document.documentElement.lang = lang === 'ar' ? 'ar' : lang;
        document.documentElement.dir = lang === 'ar' || lang === 'he' || lang === 'fa' || lang === 'ur' ? 'rtl' : 'ltr';
        
        // تحديث زر اللغة
        const currentFlag = supportedLanguages.find(l => l.code === lang)?.flag || '🌐';
        if (langToggle) {
            langToggle.innerHTML = currentFlag;
        }
        
        // تحديث جميع العناصر القابلة للترجمة
        if (typeof translations !== 'undefined') {
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                if (translations[lang]?.[key]) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = translations[lang][key];
                    } else if (el.tagName === 'IMG') {
                        el.alt = translations[lang][key];
                    } else {
                        el.textContent = translations[lang][key];
                    }
                }
            });
            
            // تحديث عنوان الصفحة
            const pageTitle = document.querySelector('title[data-translate]');
            if (pageTitle) {
                const key = pageTitle.getAttribute('data-translate');
                if (translations[lang]?.[key]) {
                    document.title = translations[lang][key];
                }
            }
        }
        
        // تحديث الترحيب للمعلمة
        const teacherName = localStorage.getItem('sama-teacher') || 'معلمة';
        const greetingEl = document.getElementById('teacher-greeting');
        if (greetingEl && typeof translations !== 'undefined' && translations[lang]?.greeting) {            greetingEl.textContent = `${translations[lang].greeting} ${teacherName} 👋`;
        }
        
        // تحديث السؤال الرئيسي
        const questionEl = document.querySelector('.question');
        if (questionEl && typeof translations !== 'undefined' && translations[lang]?.question) {
            questionEl.textContent = translations[lang].question;
        }
    }
    
    // إعداد زر اللغة
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // إزالة أي قائمة مفتوحة مسبقاً
            document.querySelectorAll('.lang-dropdown').forEach(d => d.remove());
            
            // إنشاء وعرض القائمة
            const dropdown = createLanguageDropdown();
            langToggle.parentElement.style.position = 'relative';
            langToggle.parentElement.appendChild(dropdown);
            dropdown.style.display = 'flex';
            
            // إغلاق القائمة عند النقر خارجها
            setTimeout(() => {
                document.addEventListener('click', function closeDropdown(event) {
                    if (!dropdown.contains(event.target) && event.target !== langToggle) {
                        dropdown.remove();
                        document.removeEventListener('click', closeDropdown);
                    }
                });
            }, 0);
        });
        
        // تطبيق اللغة المحفوظة عند التحميل
        applyLanguage(currentLang);
    }
    
    // ========== 3. ترحيب المعلمة ==========
    const greetingElement = document.getElementById('teacher-greeting');
    let teacherName = localStorage.getItem('sama-teacher');
    
    if (!teacherName || teacherName.trim() === '') {
        // أول زيارة للموقع
        const welcomeMsg = (typeof translations !== 'undefined' && translations[currentLang]?.welcome) 
            ? translations[currentLang].welcome 
            : '👋 أهلاً بكِ في سما!\n\nالرجاء إدخال اسم المعلمة:';
        
        teacherName = prompt(welcomeMsg) || 'معلمة';        teacherName = teacherName.trim();
        localStorage.setItem('sama-teacher', teacherName);
    }
    
    // عرض الترحيب
    if (greetingElement) {
        updateGreeting(teacherName);
    }
    
    // ========== 4. إدارة الحساب (تعديل الاسم) ==========
    const accountBtn = document.getElementById('account-btn');
    accountBtn?.addEventListener('click', () => {
        const currentName = localStorage.getItem('sama-teacher') || 'معلمة';
        const editMsg = (typeof translations !== 'undefined' && translations[currentLang]?.editTeacherName)
            ? translations[currentLang].editTeacherName
            : '✏️ تعديل اسم المعلمة\n\nالاسم الحالي:';
        
        const newName = prompt(editMsg + ' ' + currentName, currentName);
        
        if (newName !== null && newName.trim() !== '') {
            const trimmedName = newName.trim();
            localStorage.setItem('sama-teacher', trimmedName);
            updateGreeting(trimmedName);
            
            // تحديث الترحيب إذا كانت اللغة موجودة
            if (typeof translations !== 'undefined' && translations[currentLang]?.greeting) {
                if (greetingElement) {
                    greetingElement.textContent = `${translations[currentLang].greeting} ${trimmedName} 👋`;
                }
            }
            
            showNotification((typeof translations !== 'undefined' && translations[currentLang]?.nameUpdated) 
                ? translations[currentLang].nameUpdated 
                : '✅ تم تحديث الاسم بنجاح');
        }
    });
    
    function updateGreeting(name) {
        if (!greetingElement) return;
        
        if (typeof translations !== 'undefined' && translations[currentLang]?.greeting) {
            greetingElement.textContent = `${translations[currentLang].greeting} ${name} 👋`;
        } else {
            greetingElement.textContent = `أهلاً، ${name} 👋`;
        }
    }
    
    // ========== 5. دالة إشعارات بسيطة ==========
    function showNotification(message) {
        // إنشاء عنصر الإشعار        const notification = document.createElement('div');
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
