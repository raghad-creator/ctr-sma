document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ سما بدأ التحميل');

    // ========== 1. الوضع الليلي ==========
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('sama-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        const icon = themeBtn.querySelector('i');
        if(icon) icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('sama-theme', next);
            if(icon) icon.className = next === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }

    // ========== 2. أسئلة صفحة المساعدة (Accordion) ==========
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // إغلاق الأسئلة الأخرى (اختياري)
            accordionHeaders.forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.classList.remove('show');
                }
            });

            // تبديل حالة السؤال الحالي
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.classList.contains('show')) {
                content.classList.remove('show');
            } else {
                content.classList.add('show');
            }
        });
    });

    // ========== 3. اللغة (ترجمة كل الصفحات) ==========
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('sama-lang') || 'ar';

    const translations = {
        ar: {
            greeting: 'أهلاً،', question: 'ماذا تريد أن تفعل اليوم؟',            newStudent: 'إنشاء سجل لطالب جديد', followStudents: 'متابعة سجل طلابي',
            uploadParents: 'رفع لأولياء الأمور', helpSupport: 'المساعدة والدعم',
            footer: '© 2026 سما - جميع الحقوق محفوظة | تطوير خاص للمعلمات',
            helpTitle: 'المساعدة والدعم الفني', helpDesc: 'دليلك الشامل لاستخدام نظام سجلات الطلاب',
            faqTitle: 'الأسئلة الشائعة',
            q1: 'كيف أضيف طالب جديد؟', q2: 'كيف أعدل بيانات طالب؟',
            q3: 'كيف أطبع تقرير الطالب؟', q4: 'كيف أضيف ولي أمر جديد؟', q5: 'كيف أدخل التقييمات والمهارات؟',
            contactTitle: 'تواصل معنا', contactDesc: 'إذا لم تجد إجابة لسؤالك، لا تتردد في التواصل معنا:',
            workHours: 'ساعات العمل: الأحد - الخميس 8 ص - 4 م'
        },
        en: {
            greeting: 'Welcome,', question: 'What would you like to do?',
            newStudent: 'New Student Record', followStudents: 'Follow Students',
            uploadParents: 'Upload for Parents', helpSupport: 'Help & Support',
            footer: '© 2026 Sama - All Rights Reserved',
            helpTitle: 'Help & Technical Support', helpDesc: 'Your comprehensive guide',
            faqTitle: 'Frequently Asked Questions',
            q1: 'How do I add a new student?', q2: 'How do I edit student data?',
            q3: 'How do I print a report?', q4: 'How do I add a parent?', q5: 'How do I enter evaluations?',
            contactTitle: 'Contact Us', contactDesc: 'Feel free to contact us:',
            workHours: 'Working Hours: Sun - Thu 8 AM - 4 PM'
        },
        tr: {
            greeting: 'Merhaba,', question: 'Bugün ne yapmak istersiniz?',
            newStudent: 'Yeni Öğrenci Kaydı', followStudents: 'Öğrencileri Takip Et',
            uploadParents: 'Veliler İçin Yükle', helpSupport: 'Yardım ve Destek',
            footer: '© 2026 Sama - Tüm Hakları Saklıdır',
            helpTitle: 'Yardım ve Teknik Destek', helpDesc: 'Kapsamlı kılavuzunuz',
            faqTitle: 'Sıkça Sorulan Sorular',
            q1: 'Yeni öğrenci nasıl eklerim?', q2: 'Öğrenci verileri nasıl düzenlenir?',
            q3: 'Rapor nasıl yazdırılır?', q4: 'Veli nasıl eklerim?', q5: 'Değerlendirmeler nasıl girilir?',
            contactTitle: 'Bize Ulaşın', contactDesc: 'İletişime geçin:',
            workHours: 'Çalışma Saatleri: Pazar - Perşembe 08:00 - 16:00'
        },
        es: {
            greeting: 'Bienvenida,', question: '¿Qué te gustaría hacer?',
            newStudent: 'Nuevo Registro', followStudents: 'Seguir Estudiantes',
            uploadParents: 'Subir para Padres', helpSupport: 'Ayuda y Soporte',
            footer: '© 2026 Sama - Todos los Derechos Reservados',
            helpTitle: 'Ayuda y Soporte Técnico', helpDesc: 'Tu guía completa',
            faqTitle: 'Preguntas Frecuentes',
            q1: '¿Cómo agrego un estudiante?', q2: '¿Cómo edito datos?',
            q3: '¿Cómo imprimo un informe?', q4: '¿Cómo agrego un padre?', q5: '¿Cómo ingreso evaluaciones?',
            contactTitle: 'Contáctanos', contactDesc: 'No dudes en contactarnos:',
            workHours: 'Horario: Dom - Jue 8 AM - 4 PM'
        },
        ko: {
            greeting: '안녕하세요,', question: '오늘 무엇을 하시겠습니까?',
            newStudent: '새 학생 기록', followStudents: '학생 따라가기',
            uploadParents: '학부모용 업로드', helpSupport: '도움말 및 지원',            footer: '© 2026 Sama - 모든 권리 보유',
            helpTitle: '도움말 및 기술 지원', helpDesc: '종합 가이드',
            faqTitle: '자주 묻는 질문',
            q1: '새 학생을 어떻게 추가하나요?', q2: '학생 데이터를 어떻게 수정하나요?',
            q3: '보고서를 어떻게 인쇄하나요?', q4: '학부모를 어떻게 추가하나요?', q5: '평가를 어떻게 입력하나요?',
            contactTitle: '문의하기', contactDesc: '언제든지 문의하세요:',
            workHours: '운영 시간: 일요일 - 목요일 오전 8시 - 오후 4시'
        },
        ja: {
            greeting: 'こんにちは、', question: '今日は何をしますか？',
            newStudent: '新しい生徒記録', followStudents: '生徒をフォロー',
            uploadParents: '保護者用アップロード', helpSupport: 'ヘルプ＆サポート',
            footer: '© 2026 Sama - 全著作権所有',
            helpTitle: 'ヘルプ＆技術サポート', helpDesc: '総合ガイド',
            faqTitle: 'よくある質問',
            q1: '新しい生徒を追加するには？', q2: '生徒データを編集するには？',
            q3: 'レポートを印刷するには？', q4: '保護者を追加するには？', q5: '評価を入力するには？',
            contactTitle: 'お問い合わせ', contactDesc: 'お気軽にお問い合わせください:',
            workHours: '営業時間: 日曜日～木曜日 午前8時～午後4時'
        },
        hi: {
            greeting: 'नमस्ते,', question: 'आज आप क्या करना चाहेंगी?',
            newStudent: 'नया छात्र रिकॉर्ड', followStudents: 'छात्रों को फॉलो करें',
            uploadParents: 'अभिभावकों के लिए', helpSupport: 'सहायता और समर्थन',
            footer: '© 2026 Sama - सभी अधिकार सुरक्षित',
            helpTitle: 'सहायता और तकनीकी समर्थन', helpDesc: 'आपकी संपूर्ण गाइड',
            faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
            q1: 'मैं नया छात्र कैसे जोड़ूं?', q2: 'मैं छात्र डेटा कैसे संपादित करूं?',
            q3: 'मैं रिपोर्ट कैसे प्रिंट करूं?', q4: 'मैं अभिभावक कैसे जोड़ूं?', q5: 'मैं मूल्यांकन कैसे दर्ज करूं?',
            contactTitle: 'संपर्क करें', contactDesc: 'हमसे संपर्क करें:',
            workHours: 'कार्य समय: रविवार - गुरुवार सुबह 8 बजे - शाम 4 बजे'
        },
        fil: {
            greeting: 'Kumusta,', question: 'Ano ang gusto mong gawin?',
            newStudent: 'Bagong Record', followStudents: 'Subaybayan',
            uploadParents: 'I-upload para sa Parents', helpSupport: 'Tulong at Suporta',
            footer: '© 2026 Sama - Lahat ng Karapatan ay Nakalaan',
            helpTitle: 'Tulong at Teknikal na Suporta', helpDesc: 'Ang iyong kumpletong gabay',
            faqTitle: 'Mga Madalas Itanong',
            q1: 'Paano magdagdag ng bagong mag-aaral?', q2: 'Paano i-edit ang data?',
            q3: 'Paano i-print ang report?', q4: 'Paano magdagdag ng magulang?', q5: 'Paano maglagay ng evaluations?',
            contactTitle: 'Makipag-ugnayan', contactDesc: 'Makipag-ugnayan sa amin:',
            workHours: 'Oras ng Trabaho: Linggo - Huwebes 8 AM - 4 PM'
        },
        zh: {
            greeting: '您好，', question: '今天您想做什么？',
            newStudent: '新学生记录', followStudents: '跟进学生',
            uploadParents: '为家长上传', helpSupport: '帮助与支持',
            footer: '© 2026 Sama - 版权所有',
            helpTitle: '帮助与技术支持', helpDesc: '综合指南',            faqTitle: '常见问题',
            q1: '如何添加新学生？', q2: '如何编辑学生数据？',
            q3: '如何打印报告？', q4: '如何添加家长？', q5: '如何输入评估？',
            contactTitle: '联系我们', contactDesc: '请随时联系我们：',
            workHours: '工作时间：周日至周四 上午8点 - 下午4点'
        }
    };

    const flags = { ar: '🇸🇦', en: '🇬🇧', tr: '🇹🇷', es: '🇪🇸', ko: '🇰🇷', ja: '🇯🇵', hi: '🇮🇳', fil: '🇵🇭', zh: '🇨🇳' };

    function applyTranslation(lang) {
        const t = translations[lang];
        if (!t) return;

        const teacherName = localStorage.getItem('sama-teacher') || 'معلمة';

        // قائمة كل العناصر التي نريد ترجمتها (بالـ ID)
        const elementsMap = {
            'teacher-greeting': t.greeting + ' ' + teacherName + ' 👋',
            'greeting': t.greeting + ' ' + teacherName + ' 👋',
            'question': t.question,
            'newStudent': t.newStudent, 'followStudents': t.followStudents,
            'uploadParents': t.uploadParents, 'helpSupport': t.helpSupport,
            'footer': t.footer, 'footer-text': t.footer,
            'help-title': t.helpTitle, 'help-desc': t.helpDesc,
            'faq-title': t.faqTitle,
            'q1': t.q1, 'q2': t.q2, 'q3': t.q3, 'q4': t.q4, 'q5': t.q5,
            'contact-title': t.contactTitle, 'contact-desc': t.contactDesc,
            'work-hours': t.workHours
        };

        // تطبيق الترجمة
        for (const [id, text] of Object.entries(elementsMap)) {
            const el = document.getElementById(id);
            if (el) {
                // الحفاظ على الأيقونات داخل العناوين
                const icon = el.querySelector('i');
                if (icon && id.includes('title')) {
                    el.innerHTML = '';
                    el.appendChild(icon);
                    el.appendChild(document.createTextNode(' ' + text));
                } else {
                    el.textContent = text;
                }
            }
        }

        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }
    if (langBtn) {
        langBtn.textContent = flags[currentLang] || '🇸🇦';
        langBtn.style.cursor = 'pointer';
        
        // تطبيق الترجمة عند فتح الصفحة
        setTimeout(() => applyTranslation(currentLang), 100);

        langBtn.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            const existingMenu = document.querySelector('.lang-menu');
            if (existingMenu) { existingMenu.remove(); return; }

            const langs = [
                {code: 'ar', name: 'العربية', flag: '🇸🇦'}, {code: 'en', name: 'English', flag: '🇬🇧'},
                {code: 'tr', name: 'Türkçe', flag: '🇹🇷'}, {code: 'es', name: 'Español', flag: '🇪🇸'},
                {code: 'ko', name: '한국어', flag: '🇰🇷'}, {code: 'ja', name: '日本語', flag: '🇯🇵'},
                {code: 'hi', name: 'हिन्दी', flag: '🇮'}, {code: 'fil', name: 'Filipino', flag: '🇵🇭'},
                {code: 'zh', name: '中文', flag: '🇨🇳'}
            ];

            const menu = document.createElement('div');
            menu.className = 'lang-menu';
            menu.style.cssText = `position: absolute; top: 100%; right: 0; background: white; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.3); padding: 10px; min-width: 180px; z-index: 10000; margin-top: 5px; border: 2px solid #1F6F6F;`;

            langs.forEach(l => {
                const btn = document.createElement('button');
                btn.textContent = l.flag + '  ' + l.name;
                btn.style.cssText = `width: 100%; padding: 10px 15px; margin: 3px 0; border: none; background: transparent; border-radius: 5px; cursor: pointer; text-align: right; font-family: 'Tajawal', sans-serif; font-size: 14px; transition: all 0.2s; display: flex; align-items: center; gap: 10px;`;
                btn.onmouseover = () => { btn.style.background = '#1F6F6F'; btn.style.color = 'white'; };
                btn.onmouseout = () => { btn.style.background = 'transparent'; btn.style.color = 'inherit'; };
                btn.onclick = (ev) => {
                    ev.preventDefault(); ev.stopPropagation();
                    currentLang = l.code;
                    localStorage.setItem('sama-lang', currentLang);
                    langBtn.textContent = l.flag;
                    menu.remove();
                    applyTranslation(currentLang);
                };
                menu.appendChild(btn);
            });

            if (langBtn.parentElement) {
                langBtn.parentElement.style.position = 'relative';
                langBtn.parentElement.appendChild(menu);
            }
        });
    }

    // اسم المعلمة    let teacherName = localStorage.getItem('sama-teacher');
    if (!teacherName) {
        teacherName = prompt('👋 أهلاً بكِ في سما!\n\nالرجاء إدخال اسم المعلمة:') || 'معلمة';
        localStorage.setItem('sama-teacher', teacherName.trim());
    }
    const greetingEl = document.getElementById('teacher-greeting') || document.getElementById('greeting');
    if (greetingEl) greetingEl.textContent = `أهلاً، ${teacherName} 👋`;

    const accountBtn = document.getElementById('account-btn');
    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            const newName = prompt('✏️ تعديل اسم المعلمة:', teacherName);
            if (newName && newName.trim()) {
                teacherName = newName.trim();
                localStorage.setItem('sama-teacher', teacherName);
                if (greetingEl) greetingEl.textContent = `أهلاً، ${teacherName} 👋`;
            }
        });
    }
});
