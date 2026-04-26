window.addEventListener('load', () => {
    console.log('=== سما بدأ التحميل ===');
    
    // ========== 1. الوضع الليلي ==========
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('sama-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const icon = themeBtn.querySelector('i');
        if (icon) {
            icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        themeBtn.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('sama-theme', next);
            
            const ic = this.querySelector('i');
            if (ic) {
                ic.className = next === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        });
    }
    
    // ========== 2. اللغة ==========
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('sama-lang') || 'ar';
    
    const translations = {
        ar: {
            greeting: 'أهلاً،',
            question: 'ماذا تريد أن تفعل اليوم؟',
            newStudent: 'إنشاء سجل لطالب جديد',
            followStudents: 'متابعة سجل طلابي',
            uploadParents: 'رفع لأولياء الأمور',
            helpSupport: 'المساعدة والدعم',
            footer: '© 2026 سما - جميع الحقوق محفوظة | تطوير خاص للمعلمات'
        },
        en: {
            greeting: 'Welcome,',
            question: 'What would you like to do?',
            newStudent: 'New Student Record',
            followStudents: 'Follow Students',
            uploadParents: 'Upload for Parents',
            helpSupport: 'Help & Support',
            footer: '© 2026 Sama - All Rights Reserved'
        },
        tr: {
            greeting: 'Merhaba,',
            question: 'Bugün ne yapmak istersiniz?',
            newStudent: 'Yeni Öğrenci Kaydı',
            followStudents: 'Öğrencileri Takip Et',
            uploadParents: 'Veliler İçin Yükle',
            helpSupport: 'Yardım ve Destek',
            footer: '© 2026 Sama - Tüm Hakları Saklıdır'
        },
        es: {
            greeting: 'Bienvenida,',
            question: '¿Qué te gustaría hacer?',
            newStudent: 'Nuevo Registro',
            followStudents: 'Seguir Estudiantes',
            uploadParents: 'Subir para Padres',
            helpSupport: 'Ayuda y Soporte',
            footer: '© 2026 Sama - Todos los Derechos Reservados'
        },
        ko: {
            greeting: '안녕하세요,',
            question: '오늘 무엇을 하시겠습니까?',
            newStudent: '새 학생 기록',
            followStudents: '학생 따라가기',
            uploadParents: '학부모용 업로드',
            helpSupport: '도움말 및 지원',
            footer: '© 2026 Sama - 모든 권리 보유'
        },
        ja: {
            greeting: 'こんにちは、',
            question: '今日は何をしますか？',
            newStudent: '新しい生徒記録',
            followStudents: '生徒をフォロー',
            uploadParents: '保護者用アップロード',
            helpSupport: 'ヘルプ＆サポート',
            footer: '© 2026 Sama - 全著作権所有'
        },
        hi: {
            greeting: 'नमस्ते,',
            question: 'आज आप क्या करना चाहेंगी?',
            newStudent: 'नया छात्र रिकॉर्ड',
            followStudents: 'छात्रों को फॉलो करें',
            uploadParents: 'अभिभावकों के लिए',
            helpSupport: 'सहायता और समर्थन',
            footer: '© 2026 Sama - सभी अधिकार सुरक्षित'
        },
        fil: {
            greeting: 'Kumusta,',
            question: 'Ano ang gusto mong gawin?',
            newStudent: 'Bagong Record',
            followStudents: 'Subaybayan',
            uploadParents: 'I-upload para sa Parents',
            helpSupport: 'Tulong at Suporta',
            footer: '© 2026 Sama - Lahat ng Karapatan ay Nakalaan'
        },
        zh: {
            greeting: '您好，',
            question: '今天您想做什么？',
            newStudent: '新学生记录',
            followStudents: '跟进学生',
            uploadParents: '为家长上传',
            helpSupport: '帮助与支持',
            footer: '© 2026 Sama - 版权所有'
        }
    };
    
    const flags = {
        ar: '🇸🇦', en: '🇬🇧', tr: '🇹🇷', es: '🇪🇸',
        ko: '🇰🇷', ja: '🇯🇵', hi: '🇮🇳', fil: '🇵🇭', zh: '🇨🇳'
    };
    
    // دالة الترجمة
    function translatePage(lang) {
        console.log('🔄 الترجمة إلى:', lang);
        
        const t = translations[lang];
        if (!t) {
            console.error('❌ اللغة غير موجودة');
            return;
        }
        
        const teacherName = localStorage.getItem('sama-teacher') || 'معلمة';
        
        // العناصر
        const elements = {
            'teacher-greeting': t.greeting + ' ' + teacherName + ' 👋',
            'question': t.question,
            'newStudent': t.newStudent,
            'followStudents': t.followStudents,
            'uploadParents': t.uploadParents,
            'helpSupport': t.helpSupport,
            'footer-text': t.footer
        };
        
        // التطبيق
        let count = 0;
        for (const [id, text] of Object.entries(elements)) {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = text;
                count++;
                console.log('✓', id);
            } else {
                console.log('✗ لم يوجد:', id);
            }
        }
        
        console.log('✅ تم تحديث', count, 'عنصر');
        
        // الاتجاه
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }
    
    // زر اللغة
    if (langBtn) {
        // تعيين العلم
        langBtn.textContent = flags[currentLang] || '🇸';
        langBtn.style.cursor = 'pointer';
        langBtn.style.fontSize = '20px';
        
        // التطبيق الأولي
        setTimeout(() => translatePage(currentLang), 200);
        
        // النقر
        langBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(' نقر على اللغة');
            
            const langs = [
                {code: 'ar', name: 'العربية', flag: '🇸🇦'},
                {code: 'en', name: 'English', flag: '🇬🇧'},
                {code: 'tr', name: 'Türkçe', flag: '🇹'},
                {code: 'es', name: 'Español', flag: '🇪🇸'},
                {code: 'ko', name: '한국어', flag: '🇰🇷'},
                {code: 'ja', name: '日本語', flag: '🇯'},
                {code: 'hi', name: 'हिन्दी', flag: '🇮🇳'},
                {code: 'fil', name: 'Filipino', flag: '🇵🇭'},
                {code: 'zh', name: '中文', flag: '🇨🇳'}
            ];
            
            // إزالة القائمة القديمة
            const oldMenu = document.querySelector('.lang-dropdown');
            if (oldMenu) {
                oldMenu.remove();
            }
            
            // إنشاء القائمة
            const menu = document.createElement('div');
            menu.className = 'lang-dropdown';
            menu.style.cssText = 'position:absolute;top:100%;right:0;background:white;border-radius:10px;box-shadow:0 5px 20px rgba(0,0,0,0.3);padding:10px;min-width:180px;z-index:9999;margin-top:5px;border:2px solid #1F6F6F;';
            
            langs.forEach(l => {
                const btn = document.createElement('button');
                btn.textContent = l.flag + '  ' + l.name;
                btn.style.cssText = 'width:100%;padding:10px 15px;margin:3px 0;border:none;background:transparent;border-radius:5px;cursor:pointer;text-align:right;font-family:Tajawal,sans-serif;font-size:14px;transition:all 0.2s;';
                
                btn.onmouseover = () => {
                    btn.style.background = '#1F6F6F';
                    btn.style.color = 'white';
                };
                btn.onmouseout = () => {
                    btn.style.background = 'transparent';
                    btn.style.color = 'inherit';
                };
                
                btn.onclick = function(ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    
                    console.log('✅ اختيار:', l.name);
                    currentLang = l.code;
                    localStorage.setItem('sama-lang', currentLang);
                    langBtn.textContent = l.flag;
                    menu.remove();
                    translatePage(currentLang);
                };
                
                menu.appendChild(btn);
            });
            
            // إضافة القائمة
            this.parentElement.style.position = 'relative';
            this.parentElement.appendChild(menu);
            console.log('📋 القائمة ظهرت');
        });
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
    
    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            const newName = prompt('✏️ تعديل اسم المعلمة:', teacherName);
            if (newName && newName.trim()) {
                teacherName = newName.trim();
                localStorage.setItem('sama-teacher', teacherName);
                if (greetingEl) {
                    greetingEl.textContent = `أهلاً، ${teacherName} 👋`;
                }
            }
        });
    }
    
    console.log('=== سما جاهز ===');
});
