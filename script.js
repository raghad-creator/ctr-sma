document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ سما بدأ التحميل - الصفحة:', window.location.pathname);
    
    // ========== الوضع الليلي ==========
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('sama-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('sama-theme', next);
            
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = next === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        });
    }
    
    // ========== اللغة - ترجمات كل الصفحات ==========
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('sama-lang') || 'ar';
    
    const translations = {
        ar: {
            // الصفحة الرئيسية
            greeting: 'أهلاً،',
            question: 'ماذا تريد أن تفعل اليوم؟',
            newStudent: 'إنشاء سجل لطالب جديد',
            followStudents: 'متابعة سجل طلابي',
            uploadParents: 'رفع لأولياء الأمور',
            helpSupport: 'المساعدة والدعم',
            footer: '© 2026 سما - جميع الحقوق محفوظة | تطوير خاص للمعلمات',
            
            // صفحة المساعدة
            helpTitle: 'المساعدة والدعم الفني',
            helpDesc: 'دليلك الشامل لاستخدام نظام سجلات الطلاب',
            faqTitle: 'الأسئلة الشائعة',
            q1: 'كيف أضيف طالب جديد؟',
            q2: 'كيف أعدل بيانات طالب؟',
            q3: 'كيف أطبع تقرير الطالب؟',
            q4: 'كيف أضيف ولي أمر جديد؟',
            q5: 'كيف أدخل التقييمات والمهارات؟',
            contactTitle: 'تواصل معنا',
            contactDesc: 'إذا لم تجد إجابة لسؤالك، لا تتردد في التواصل معنا:',
            workingHours: 'ساعات العمل: الأحد - الخميس 8 ص - 4 م',
                        // الصفحات الأخرى
            studentsPage: 'الطلاب',
            parentsPage: 'أولياء الأمور',
            newStudentPage: 'طالب جديد',
            studentRecord: 'سجل الطالب',
            save: 'حفظ',
            cancel: 'إلغاء',
            edit: 'تعديل',
            delete: 'حذف',
            search: 'بحث',
            add: 'إضافة',
            studentName: 'اسم الطالب',
            parentId: 'رقم هوية ولي الأمر',
            phone: 'رقم الجوال',
            email: 'البريد الإلكتروني',
            address: 'العنوان',
            grade: 'الصف',
            section: 'الشعبة'
        },
        en: {
            greeting: 'Welcome,',
            question: 'What would you like to do?',
            newStudent: 'New Student Record',
            followStudents: 'Follow Students',
            uploadParents: 'Upload for Parents',
            helpSupport: 'Help & Support',
            footer: '© 2026 Sama - All Rights Reserved',
            helpTitle: 'Help & Technical Support',
            helpDesc: 'Your comprehensive guide',
            faqTitle: 'Frequently Asked Questions',
            q1: 'How do I add a new student?',
            q2: 'How do I edit student data?',
            q3: 'How do I print a report?',
            q4: 'How do I add a parent?',
            q5: 'How do I enter evaluations?',
            contactTitle: 'Contact Us',
            contactDesc: 'Feel free to contact us:',
            workingHours: 'Working Hours: Sun - Thu 8 AM - 4 PM',
            studentsPage: 'Students',
            parentsPage: 'Parents',
            newStudentPage: 'New Student',
            studentRecord: 'Student Record',
            save: 'Save',
            cancel: 'Cancel',
            edit: 'Edit',
            delete: 'Delete',
            search: 'Search',
            add: 'Add',
            studentName: 'Student Name',
            parentId: 'Parent ID',            phone: 'Phone',
            email: 'Email',
            address: 'Address',
            grade: 'Grade',
            section: 'Section'
        },
        tr: {
            greeting: 'Merhaba,',
            question: 'Bugün ne yapmak istersiniz?',
            newStudent: 'Yeni Öğrenci Kaydı',
            followStudents: 'Öğrencileri Takip Et',
            uploadParents: 'Veliler İçin Yükle',
            helpSupport: 'Yardım ve Destek',
            footer: '© 2026 Sama - Tüm Hakları Saklıdır',
            helpTitle: 'Yardım ve Teknik Destek',
            helpDesc: 'Kapsamlı kılavuzunuz',
            faqTitle: 'Sıkça Sorulan Sorular',
            q1: 'Yeni öğrenci nasıl eklerim?',
            q2: 'Öğrenci verileri nasıl düzenlenir?',
            q3: 'Rapor nasıl yazdırılır?',
            q4: 'Veli nasıl eklerim?',
            q5: 'Değerlendirmeler nasıl girilir?',
            contactTitle: 'Bize Ulaşın',
            contactDesc: 'İletişime geçin:',
            workingHours: 'Çalışma Saatleri: Pazar - Perşembe 08:00 - 16:00',
            studentsPage: 'Öğrenciler',
            parentsPage: 'Veliler',
            newStudentPage: 'Yeni Öğrenci',
            studentRecord: 'Öğrenci Kaydı',
            save: 'Kaydet',
            cancel: 'İptal',
            edit: 'Düzenle',
            delete: 'Sil',
            search: 'Ara',
            add: 'Ekle',
            studentName: 'Öğrenci Adı',
            parentId: 'Veli Kimlik No',
            phone: 'Telefon',
            email: 'E-posta',
            address: 'Adres',
            grade: 'Sınıf',
            section: 'Şube'
        },
        es: {
            greeting: 'Bienvenida,',
            question: '¿Qué te gustaría hacer?',
            newStudent: 'Nuevo Registro',
            followStudents: 'Seguir Estudiantes',
            uploadParents: 'Subir para Padres',
            helpSupport: 'Ayuda y Soporte',            footer: '© 2026 Sama - Todos los Derechos Reservados',
            helpTitle: 'Ayuda y Soporte Técnico',
            helpDesc: 'Tu guía completa',
            faqTitle: 'Preguntas Frecuentes',
            q1: '¿Cómo agrego un estudiante?',
            q2: '¿Cómo edito datos?',
            q3: '¿Cómo imprimo un informe?',
            q4: '¿Cómo agrego un padre?',
            q5: '¿Cómo ingreso evaluaciones?',
            contactTitle: 'Contáctanos',
            contactDesc: 'No dudes en contactarnos:',
            workingHours: 'Horario: Dom - Jue 8 AM - 4 PM',
            studentsPage: 'Estudiantes',
            parentsPage: 'Padres',
            newStudentPage: 'Nuevo Estudiante',
            studentRecord: 'Registro del Estudiante',
            save: 'Guardar',
            cancel: 'Cancelar',
            edit: 'Editar',
            delete: 'Eliminar',
            search: 'Buscar',
            add: 'Agregar',
            studentName: 'Nombre del Estudiante',
            parentId: 'ID del Padre',
            phone: 'Teléfono',
            email: 'Correo',
            address: 'Dirección',
            grade: 'Grado',
            section: 'Sección'
        },
        ko: {
            greeting: '안녕하세요,',
            question: '오늘 무엇을 하시겠습니까?',
            newStudent: '새 학생 기록',
            followStudents: '학생 따라가기',
            uploadParents: '학부모용 업로드',
            helpSupport: '도움말 및 지원',
            footer: '© 2026 Sama - 모든 권리 보유',
            helpTitle: '도움말 및 기술 지원',
            helpDesc: '종합 가이드',
            faqTitle: '자주 묻는 질문',
            q1: '새 학생을 어떻게 추가하나요?',
            q2: '학생 데이터를 어떻게 수정하나요?',
            q3: '보고서를 어떻게 인쇄하나요?',
            q4: '학부모를 어떻게 추가하나요?',
            q5: '평가를 어떻게 입력하나요?',
            contactTitle: '문의하기',
            contactDesc: '언제든지 문의하세요:',
            workingHours: '운영 시간: 일요일 - 목요일 오전 8시 - 오후 4시',
            studentsPage: '학생들',            parentsPage: '학부모',
            newStudentPage: '새 학생',
            studentRecord: '학생 기록',
            save: '저장',
            cancel: '취소',
            edit: '편집',
            delete: '삭제',
            search: '검색',
            add: '추가',
            studentName: '학생 이름',
            parentId: '학부모 ID',
            phone: '전화번호',
            email: '이메일',
            address: '주소',
            grade: '학년',
            section: '반'
        },
        ja: {
            greeting: 'こんにちは、',
            question: '今日は何をしますか？',
            newStudent: '新しい生徒記録',
            followStudents: '生徒をフォロー',
            uploadParents: '保護者用アップロード',
            helpSupport: 'ヘルプ＆サポート',
            footer: '© 2026 Sama - 全著作権所有',
            helpTitle: 'ヘルプ＆技術サポート',
            helpDesc: '総合ガイド',
            faqTitle: 'よくある質問',
            q1: '新しい生徒を追加するには？',
            q2: '生徒データを編集するには？',
            q3: 'レポートを印刷するには？',
            q4: '保護者を追加するには？',
            q5: '評価を入力するには？',
            contactTitle: 'お問い合わせ',
            contactDesc: 'お気軽にお問い合わせください:',
            workingHours: '営業時間: 日曜日～木曜日 午前8時～午後4時',
            studentsPage: '生徒',
            parentsPage: '保護者',
            newStudentPage: '新しい生徒',
            studentRecord: '生徒記録',
            save: '保存',
            cancel: 'キャンセル',
            edit: '編集',
            delete: '削除',
            search: '検索',
            add: '追加',
            studentName: '生徒名',
            parentId: '保護者ID',
            phone: '電話',
            email: 'メール',            address: '住所',
            grade: '学年',
            section: '組'
        },
        hi: {
            greeting: 'नमस्ते,',
            question: 'आज आप क्या करना चाहेंगी?',
            newStudent: 'नया छात्र रिकॉर्ड',
            followStudents: 'छात्रों को फॉलो करें',
            uploadParents: 'अभिभावकों के लिए',
            helpSupport: 'सहायता और समर्थन',
            footer: '© 2026 Sama - सभी अधिकार सुरक्षित',
            helpTitle: 'सहायता और तकनीकी समर्थन',
            helpDesc: 'आपकी संपूर्ण गाइड',
            faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
            q1: 'मैं नया छात्र कैसे जोड़ूं?',
            q2: 'मैं छात्र डेटा कैसे संपादित करूं?',
            q3: 'मैं रिपोर्ट कैसे प्रिंट करूं?',
            q4: 'मैं अभिभावक कैसे जोड़ूं?',
            q5: 'मैं मूल्यांकन कैसे दर्ज करूं?',
            contactTitle: 'संपर्क करें',
            contactDesc: 'हमसे संपर्क करें:',
            workingHours: 'कार्य समय: रविवार - गुरुवार सुबह 8 बजे - शाम 4 बजे',
            studentsPage: 'छात्र',
            parentsPage: 'अभिभावक',
            newStudentPage: 'नया छात्र',
            studentRecord: 'छात्र रिकॉर्ड',
            save: 'सहेजें',
            cancel: 'रद्द करें',
            edit: 'संपादित करें',
            delete: 'हटाएं',
            search: 'खोजें',
            add: 'जोड़ें',
            studentName: 'छात्र का नाम',
            parentId: 'अभिभावक ID',
            phone: 'फोन',
            email: 'ईमेल',
            address: 'पता',
            grade: 'कक्षा',
            section: 'अनुभाग'
        },
        fil: {
            greeting: 'Kumusta,',
            question: 'Ano ang gusto mong gawin?',
            newStudent: 'Bagong Record',
            followStudents: 'Subaybayan',
            uploadParents: 'I-upload para sa Parents',
            helpSupport: 'Tulong at Suporta',
            footer: '© 2026 Sama - Lahat ng Karapatan ay Nakalaan',
            helpTitle: 'Tulong at Teknikal na Suporta',            helpDesc: 'Ang iyong kumpletong gabay',
            faqTitle: 'Mga Madalas Itanong',
            q1: 'Paano magdagdag ng bagong mag-aaral?',
            q2: 'Paano i-edit ang data?',
            q3: 'Paano i-print ang report?',
            q4: 'Paano magdagdag ng magulang?',
            q5: 'Paano maglagay ng evaluations?',
            contactTitle: 'Makipag-ugnayan',
            contactDesc: 'Makipag-ugnayan sa amin:',
            workingHours: 'Oras ng Trabaho: Linggo - Huwebes 8 AM - 4 PM',
            studentsPage: 'Mga Mag-aaral',
            parentsPage: 'Mga Magulang',
            newStudentPage: 'Bagong Mag-aaral',
            studentRecord: 'Record ng Mag-aaral',
            save: 'I-save',
            cancel: 'Kanselahin',
            edit: 'I-edit',
            delete: 'Tanggalin',
            search: 'Maghanap',
            add: 'Magdagdag',
            studentName: 'Pangalan ng Mag-aaral',
            parentId: 'ID ng Magulang',
            phone: 'Telepono',
            email: 'Email',
            address: 'Address',
            grade: 'Baitang',
            section: 'Seksyon'
        },
        zh: {
            greeting: '您好，',
            question: '今天您想做什么？',
            newStudent: '新学生记录',
            followStudents: '跟进学生',
            uploadParents: '为家长上传',
            helpSupport: '帮助与支持',
            footer: '© 2026 Sama - 版权所有',
            helpTitle: '帮助与技术支持',
            helpDesc: '综合指南',
            faqTitle: '常见问题',
            q1: '如何添加新学生？',
            q2: '如何编辑学生数据？',
            q3: '如何打印报告？',
            q4: '如何添加家长？',
            q5: '如何输入评估？',
            contactTitle: '联系我们',
            contactDesc: '请随时联系我们：',
            workingHours: '工作时间：周日至周四 上午8点 - 下午4点',
            studentsPage: '学生',
            parentsPage: '家长',
            newStudentPage: '新学生',            studentRecord: '学生记录',
            save: '保存',
            cancel: '取消',
            edit: '编辑',
            delete: '删除',
            search: '搜索',
            add: '添加',
            studentName: '学生姓名',
            parentId: '家长ID',
            phone: '电话',
            email: '电子邮件',
            address: '地址',
            grade: '年级',
            section: '班级'
        }
    };
    
    const flags = {
        ar: '🇸🇦', en: '🇬🇧', tr: '🇹🇷', es: '🇪🇸',
        ko: '🇰🇷', ja: '🇯🇵', hi: '🇮🇳', fil: '🇵🇭', zh: '🇨🇳'
    };
    
    // دالة تطبيق الترجمة الذكية
    function applyTranslation(lang) {
        const t = translations[lang];
        if (!t) {
            console.error('❌ اللغة غير موجودة:', lang);
            return;
        }
        
        console.log('🔄 تطبيق اللغة:', lang);
        
        const teacherName = localStorage.getItem('sama-teacher') || 'معلمة';
        
        // تحديث كل العناصر الممكنة
        const elementsMap = {
            'teacher-greeting': t.greeting + ' ' + teacherName + ' 👋',
            'greeting': t.greeting + ' ' + teacherName + ' 👋',
            'question': t.question,
            'newStudent': t.newStudent,
            'followStudents': t.followStudents,
            'uploadParents': t.uploadParents,
            'helpSupport': t.helpSupport,
            'helpTitle': t.helpTitle,
            'helpDesc': t.helpDesc,
            'faqTitle': t.faqTitle,
            'contactTitle': t.contactTitle,
            'contactDesc': t.contactDesc,
            'footer': t.footer,
            'footer-text': t.footer        };
        
        // تحديث العناصر بالـ ID
        for (const [id, text] of Object.entries(elementsMap)) {
            const el = document.getElementById(id);
            if (el && text) {
                el.textContent = text;
            }
        }
        
        // تحديث الأسئلة في صفحة المساعدة
        const questions = document.querySelectorAll('.question-text');
        const questionKeys = ['q1', 'q2', 'q3', 'q4', 'q5'];
        questions.forEach((q, index) => {
            if (t[questionKeys[index]]) {
                q.textContent = t[questionKeys[index]];
            }
        });
        
        // تحديث الفوتر
        const footerEl = document.querySelector('.main-footer p');
        if (footerEl && t.footer) {
            footerEl.textContent = t.footer;
        }
        
        // تحديث اتجاه الصفحة
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        console.log('✅ تمت الترجمة بنجاح');
    }
    
    // زر اللغة
    if (langBtn) {
        langBtn.textContent = flags[currentLang] || '🇸🇦';
        langBtn.style.cursor = 'pointer';
        langBtn.style.fontSize = '20px';
        langBtn.style.padding = '8px 12px';
        
        // تطبيق الترجمة الأولية
        setTimeout(() => applyTranslation(currentLang), 100);
        
        // حدث النقر
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🌐 نقر على زر اللغة');
            
            const langs = [                {code: 'ar', name: 'العربية', flag: '🇸🇦'},
                {code: 'en', name: 'English', flag: '🇬🇧'},
                {code: 'tr', name: 'Türkçe', flag: '🇹'},
                {code: 'es', name: 'Español', flag: '🇪🇸'},
                {code: 'ko', name: '한국어', flag: '🇰🇷'},
                {code: 'ja', name: '日本語', flag: '🇯'},
                {code: 'hi', name: 'हिन्दी', flag: '🇮🇳'},
                {code: 'fil', name: 'Filipino', flag: '🇵🇭'},
                {code: 'zh', name: '中文', flag: '🇨'}
            ];
            
            // إزالة أي قائمة موجودة
            const existingMenu = document.querySelector('.lang-menu');
            if (existingMenu) {
                existingMenu.remove();
                return;
            }
            
            // إنشاء القائمة
            const menu = document.createElement('div');
            menu.className = 'lang-menu';
            menu.style.cssText = `
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                padding: 10px;
                min-width: 180px;
                z-index: 10000;
                margin-top: 5px;
                border: 2px solid #1F6F6F;
            `;
            
            langs.forEach(l => {
                const btn = document.createElement('button');
                btn.textContent = l.flag + '  ' + l.name;
                btn.style.cssText = `
                    width: 100%;
                    padding: 10px 15px;
                    margin: 3px 0;
                    border: none;
                    background: transparent;
                    border-radius: 5px;
                    cursor: pointer;
                    text-align: right;
                    font-family: 'Tajawal', sans-serif;
                    font-size: 14px;
                    transition: all 0.2s;                    display: flex;
                    align-items: center;
                    gap: 10px;
                `;
                
                btn.onmouseover = () => {
                    btn.style.background = '#1F6F6F';
                    btn.style.color = 'white';
                };
                btn.onmouseout = () => {
                    btn.style.background = 'transparent';
                    btn.style.color = 'inherit';
                };
                
                btn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('✅ اختيار اللغة:', l.name);
                    
                    currentLang = l.code;
                    localStorage.setItem('sama-lang', currentLang);
                    langBtn.textContent = l.flag;
                    menu.remove();
                    applyTranslation(currentLang);
                };
                
                menu.appendChild(btn);
            });
            
            // إضافة القائمة
            if (langBtn.parentElement) {
                langBtn.parentElement.style.position = 'relative';
                langBtn.parentElement.appendChild(menu);
            }
            
            console.log('📋 القائمة ظهرت');
        });
    }
    
    // ========== اسم المعلمة ==========
    let teacherName = localStorage.getItem('sama-teacher');
    if (!teacherName) {
        teacherName = prompt('👋 أهلاً بكِ في سما!\n\nالرجاء إدخال اسم المعلمة:') || 'معلمة';
        localStorage.setItem('sama-teacher', teacherName.trim());
    }
    
    const greetingEl = document.getElementById('teacher-greeting') || document.getElementById('greeting');
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
    
    console.log('✅ سما جاهز تماماً!');
});
