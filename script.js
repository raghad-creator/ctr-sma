window.addEventListener('load', () => {
    console.log('=== سما بدأ التحميل ===');
    
    // فحص العناصر الموجودة
    console.log('teacher-greeting:', document.getElementById('teacher-greeting'));
    console.log('question:', document.getElementById('question'));
    console.log('newStudent:', document.getElementById('newStudent'));
    console.log('followStudents:', document.getElementById('followStudents'));
    console.log('uploadParents:', document.getElementById('uploadParents'));
    console.log('helpSupport:', document.getElementById('helpSupport'));
    console.log('footer-text:', document.getElementById('footer-text'));
    
    // ========== الوضع الليلي ==========
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('sama-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        themeBtn.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('sama-theme', next);
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = next === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        });
    }
    
    // ========== اللغة ==========
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
        ko: '🇰🇷', ja: '🇯🇵', hi: '🇮🇳', fil: '🇵', zh: '🇨🇳'
    };
    
    // دالة الترجمة
    function translatePage(lang) {
        console.log('🔄 الترجمة إلى:', lang);
        
        const t = translations[lang];
        if (!t) {
            alert('❌ اللغة غير موجودة!');
            return;
        }
        
        const teacherName = localStorage.getItem('sama-teacher') || 'معلمة';
        
        // تحديث كل عنصر
        const el1 = document.getElementById('teacher-greeting');
        if (el1) {
            el1.textContent = t.greeting + ' ' + teacherName + ' 👋';
            console.log('✓ تم تحديث الترحيب');
        } else {
            console.error('✗ لم أجد teacher-greeting');
        }
        
        const el2 = document.getElementById('question');
        if (el2) {
            el2.textContent = t.question;
            console.log('✓ تم تحديث السؤال');
        } else {
            console.error('✗ لم أجد question');
        }
        
        const el3 = document.getElementById('newStudent');
        if (el3) {
            el3.textContent = t.newStudent;
            console.log('✓ تم تحديث newStudent');
        }
        
        const el4 = document.getElementById('followStudents');
        if (el4) {
            el4.textContent = t.followStudents;
            console.log('✓ تم تحديث followStudents');
        }
        
        const el5 = document.getElementById('uploadParents');
        if (el5) {
            el5.textContent = t.uploadParents;
            console.log('✓ تم تحديث uploadParents');
        }
        
        const el6 = document.getElementById('helpSupport');
        if (el6) {
            el6.textContent = t.helpSupport;
            console.log('✓ تم تحديث helpSupport');
        }
        
        const el7 = document.getElementById('footer-text');
        if (el7) {
            el7.textContent = t.footer;
            console.log('✓ تم تحديث footer');
        }
        
        // الاتجاه
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        console.log('✅ اكتملت الترجمة!');
    }
    
    // زر اللغة
    if (langBtn) {
        langBtn.textContent = flags[currentLang] || '🇸🇦';
        langBtn.style.cursor = 'pointer';
        
        // التطبيق الأولي
        setTimeout(() => translatePage(currentLang), 300);
        
        // النقر
        langBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🌐 نقر على زر اللغة');
            
            const langs = [
                {code: 'ar', name: 'العربية', flag: '🇸🇦'},
                {code: 'en', name: 'English', flag: '🇬'},
                {code: 'tr', name: 'Türkçe', flag: '🇹🇷'},
                {code: 'es', name: 'Español', flag: '🇪🇸'},
                {code: 'ko', name: '한국어', flag: '🇰'},
                {code: 'ja', name: '日本語', flag: '🇯🇵'},
                {code: 'hi', name: 'हिन्दी', flag: '🇮🇳'},
                {code: 'fil', name: 'Filipino', flag: '🇵🇭'},
                {code: 'zh', name: '中文', flag: '🇨'}
            ];
            
            // إزالة القائمة القديمة
            const oldMenu = document.querySelector('.lang-menu');
            if (oldMenu) oldMenu.remove();
            
            // إنشاء القائمة
            const menu = document.createElement('div');
            menu.className = 'lang-menu';
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
                    
                    console.log('✅ اختيار اللغة:', l.name);
                    currentLang = l.code;
                    localStorage.setItem('sama-lang', currentLang);
                    langBtn.textContent = l.flag;
                    menu.remove();
                    translatePage(currentLang);
                };
                
                menu.appendChild(btn);
            });
            
            this.parentElement.style.position = 'relative';
            this.parentElement.appendChild(menu);
            console.log('📋 القائمة ظهرت');
        });
    }
    
    // ========== اسم المعلمة ==========
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
