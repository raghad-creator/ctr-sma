// دالة الترجمة العالمية
function translatePage(lang) {
    console.log('🔄 جاري الترجمة إلى:', lang);
    
    const translations = {
        ar: {
            ns_pageTitle: 'سما | إنشاء سجل طالب جديد',
            ns_siteName: 'سما',
            ns_siteSubtitle: 'إنشاء سجل طالب جديد',
            ns_formTitle: 'بيانات الطالب الجديد',
            ns_formDesc: 'يرجى تعبئة جميع الحقول المطلوبة بدقة',
            ns_sectionStudent: 'بيانات الطالب',
            ns_labelStudentName: 'اسم الطالب الرباعي',
            ns_phStudentName: 'مثال: أحمد محمد علي عبدالله',
            ns_labelStudentId: 'رقم الهوية / الإقامة',
            ns_phStudentId: '1xxxxxxxxx',
            ns_labelGrade: 'المرحلة الدراسية',
            ns_optSelect: 'اختر المرحلة...',
            ns_optPrimary: 'ابتدائي',
            ns_optMiddle: 'متوسط',
            ns_optHigh: 'ثانوي',
            ns_labelClass: 'الصف والفصل',
            ns_phClass: 'مثال: الثالث أ',
            ns_sectionParent: 'بيانات ولي الأمر',
            ns_labelParentName: 'اسم ولي الأمر الرباعي',
            ns_phParentName: 'الاسم الرباعي لولي الأمر',
            ns_labelPhone: 'رقم الجوال',
            ns_phPhone: '05xxxxxxxx',
            ns_labelEmail: 'البريد الإلكتروني',
            ns_phEmail: 'example@email.com',
            ns_sectionNotes: 'معلومات إضافية',
            ns_labelNotes: 'ملاحظات',
            ns_phNotes: 'أي معلومات إضافية عن الطالب (حالة صحية، ظروف خاصة، إلخ...)',
            ns_btnSave: 'حفظ السجل',
            ns_btnReset: 'إعادة تعيين'
        },
        en: {
            ns_pageTitle: 'Sama | New Student Record',
            ns_siteName: 'Sama',
            ns_siteSubtitle: 'Create New Student',
            ns_formTitle: 'New Student Information',
            ns_formDesc: 'Please fill all required fields accurately',
            ns_sectionStudent: 'Student Information',
            ns_labelStudentName: 'Student Full Name',
            ns_phStudentName: 'Example: Ahmed Mohammed Ali',
            ns_labelStudentId: 'National ID / Residence',
            ns_phStudentId: '1xxxxxxxxx',
            ns_labelGrade: 'Education Level',
            ns_optSelect: 'Select level...',
            ns_optPrimary: 'Primary',            ns_optMiddle: 'Middle',
            ns_optHigh: 'High School',
            ns_labelClass: 'Class & Section',
            ns_phClass: 'Example: Grade 3-A',
            ns_sectionParent: 'Parent Information',
            ns_labelParentName: 'Parent Full Name',
            ns_phParentName: 'Parent full name',
            ns_labelPhone: 'Mobile Number',
            ns_phPhone: '05xxxxxxxx',
            ns_labelEmail: 'Email Address',
            ns_phEmail: 'example@email.com',
            ns_sectionNotes: 'Additional Info',
            ns_labelNotes: 'Notes',
            ns_phNotes: 'Any additional info (health, special needs, etc.)',
            ns_btnSave: 'Save Record',
            ns_btnReset: 'Reset'
        },
        tr: {
            ns_pageTitle: 'Sama | Yeni Öğrenci Kaydı',
            ns_siteName: 'Sama',
            ns_siteSubtitle: 'Yeni Öğrenci Oluştur',
            ns_formTitle: 'Yeni Öğrenci Bilgileri',
            ns_formDesc: 'Lütfen tüm zorunlu alanları doldurun',
            ns_sectionStudent: 'Öğrenci Bilgileri',
            ns_labelStudentName: 'Öğrenci Tam Adı',
            ns_phStudentName: 'Örnek: Ahmet Mehmet Ali',
            ns_labelStudentId: 'TC Kimlik / İkamet',
            ns_phStudentId: '1xxxxxxxxx',
            ns_labelGrade: 'Eğitim Seviyesi',
            ns_optSelect: 'Seviye seçin...',
            ns_optPrimary: 'İlkokul',
            ns_optMiddle: 'Ortaokul',
            ns_optHigh: 'Lise',
            ns_labelClass: 'Sınıf ve Şube',
            ns_phClass: 'Örnek: 3-A',
            ns_sectionParent: 'Veli Bilgileri',
            ns_labelParentName: 'Veli Tam Adı',
            ns_phParentName: 'Velini tam adı',
            ns_labelPhone: 'Cep Telefonu',
            ns_phPhone: '05xxxxxxxx',
            ns_labelEmail: 'E-posta',
            ns_phEmail: 'ornek@email.com',
            ns_sectionNotes: 'Ek Bilgiler',
            ns_labelNotes: 'Notlar',
            ns_phNotes: 'Ek bilgiler (sağlık, özel durum, vb.)',
            ns_btnSave: 'Kaydı Kaydet',
            ns_btnReset: 'Sıfırla'
        },
        es: {
            ns_pageTitle: 'Sama | Nuevo Registro',            ns_siteName: 'Sama',
            ns_siteSubtitle: 'Crear Nuevo Estudiante',
            ns_formTitle: 'Información del Estudiante',
            ns_formDesc: 'Completa todos los campos requeridos',
            ns_sectionStudent: 'Información del Estudiante',
            ns_labelStudentName: 'Nombre Completo',
            ns_phStudentName: 'Ejemplo: Ahmed Mohammed',
            ns_labelStudentId: 'ID Nacional',
            ns_phStudentId: '1xxxxxxxxx',
            ns_labelGrade: 'Nivel Educativo',
            ns_optSelect: 'Seleccionar...',
            ns_optPrimary: 'Primaria',
            ns_optMiddle: 'Secundaria',
            ns_optHigh: 'Preparatoria',
            ns_labelClass: 'Clase y Sección',
            ns_phClass: 'Ejemplo: 3-A',
            ns_sectionParent: 'Información del Padre',
            ns_labelParentName: 'Nombre del Padre',
            ns_phParentName: 'Nombre completo del padre',
            ns_labelPhone: 'Teléfono Móvil',
            ns_phPhone: '05xxxxxxxx',
            ns_labelEmail: 'Correo Electrónico',
            ns_phEmail: 'ejemplo@email.com',
            ns_sectionNotes: 'Información Adicional',
            ns_labelNotes: 'Notas',
            ns_phNotes: 'Información adicional (salud, necesidades especiales, etc.)',
            ns_btnSave: 'Guardar Registro',
            ns_btnReset: 'Reiniciar'
        },
        ko: {
            ns_pageTitle: '사마 | 새 학생 기록',
            ns_siteName: '사마',
            ns_siteSubtitle: '새 학생 생성',
            ns_formTitle: '새 학생 정보',
            ns_formDesc: '모든 필수 필드를 입력하세요',
            ns_sectionStudent: '학생 정보',
            ns_labelStudentName: '학생 전체 이름',
            ns_phStudentName: '예: 아흐메드 모하메드',
            ns_labelStudentId: '주민등록번호',
            ns_phStudentId: '1xxxxxxxxx',
            ns_labelGrade: '교육 단계',
            ns_optSelect: '단계 선택...',
            ns_optPrimary: '초등',
            ns_optMiddle: '중등',
            ns_optHigh: '고등',
            ns_labelClass: '학급 및 반',
            ns_phClass: '예: 3학년 가반',
            ns_sectionParent: '학부모 정보',
            ns_labelParentName: '학부모 이름',
            ns_phParentName: '학부모 전체 이름',            ns_labelPhone: '휴대전화',
            ns_phPhone: '05xxxxxxxx',
            ns_labelEmail: '이메일',
            ns_phEmail: 'example@email.com',
            ns_sectionNotes: '추가 정보',
            ns_labelNotes: '메모',
            ns_phNotes: '추가 정보 (건강, 특수 요구 등)',
            ns_btnSave: '기록 저장',
            ns_btnReset: '재설정'
        },
        ja: {
            ns_pageTitle: 'サマ | 新しい生徒記録',
            ns_siteName: 'サマ',
            ns_siteSubtitle: '新しい生徒を作成',
            ns_formTitle: '新しい生徒情報',
            ns_formDesc: '必須項目をすべて入力してください',
            ns_sectionStudent: '生徒情報',
            ns_labelStudentName: '生徒氏名',
            ns_phStudentName: '例: アフメド・モハメド',
            ns_labelStudentId: '国民ID',
            ns_phStudentId: '1xxxxxxxxx',
            ns_labelGrade: '教育段階',
            ns_optSelect: '選択...',
            ns_optPrimary: '小学校',
            ns_optMiddle: '中学校',
            ns_optHigh: '高校',
            ns_labelClass: 'クラス・組',
            ns_phClass: '例: 3年A組',
            ns_sectionParent: '保護者情報',
            ns_labelParentName: '保護者氏名',
            ns_phParentName: '保護者の氏名',
            ns_labelPhone: '携帯電話',
            ns_phPhone: '05xxxxxxxx',
            ns_labelEmail: 'メール',
            ns_phEmail: 'example@email.com',
            ns_sectionNotes: '追加情報',
            ns_labelNotes: 'メモ',
            ns_phNotes: '追加情報（健康、特別なニーズなど）',
            ns_btnSave: '記録を保存',
            ns_btnReset: 'リセット'
        },
        hi: {
            ns_pageTitle: 'समा | नया छात्र रिकॉर्ड',
            ns_siteName: 'समा',
            ns_siteSubtitle: 'नया छात्र बनाएं',
            ns_formTitle: 'नए छात्र की जानकारी',
            ns_formDesc: 'कृपया सभी आवश्यक फ़ील्ड भरें',
            ns_sectionStudent: 'छात्र जानकारी',
            ns_labelStudentName: 'छात्र का पूरा नाम',
            ns_phStudentName: 'उदाहरण: अहमद मोहम्मद',            ns_labelStudentId: 'राष्ट्रीय आईडी',
            ns_phStudentId: '1xxxxxxxxx',
            ns_labelGrade: 'शिक्षा स्तर',
            ns_optSelect: 'चुनें...',
            ns_optPrimary: 'प्राथमिक',
            ns_optMiddle: 'मध्य',
            ns_optHigh: 'माध्यमिक',
            ns_labelClass: 'कक्षा और अनुभाग',
            ns_phClass: 'उदाहरण: कक्षा 3-अ',
            ns_sectionParent: 'अभिभावक जानकारी',
            ns_labelParentName: 'अभिभावक का नाम',
            ns_phParentName: 'अभिभावक का पूरा नाम',
            ns_labelPhone: 'मोबाइल नंबर',
            ns_phPhone: '05xxxxxxxx',
            ns_labelEmail: 'ईमेल',
            ns_phEmail: 'example@email.com',
            ns_sectionNotes: 'अतिरिक्त जानकारी',
            ns_labelNotes: 'नोट्स',
            ns_phNotes: 'अतिरिक्त जानकारी (स्वास्थ्य, विशेष आवश्यकताएं, आदि)',
            ns_btnSave: 'रिकॉर्ड सहेजें',
            ns_btnReset: 'रीसेट'
        },
        fil: {
            ns_pageTitle: 'Sama | Bagong Record',
            ns_siteName: 'Sama',
            ns_siteSubtitle: 'Gumawa ng Bagong Mag-aaral',
            ns_formTitle: 'Impormasyon ng Mag-aaral',
            ns_formDesc: 'Punan ang lahat ng required na fields',
            ns_sectionStudent: 'Impormasyon ng Mag-aaral',
            ns_labelStudentName: 'Buong Pangalan',
            ns_phStudentName: 'Hal: Ahmed Mohammed',
            ns_labelStudentId: 'National ID',
            ns_phStudentId: '1xxxxxxxxx',
            ns_labelGrade: 'Antas ng Edukasyon',
            ns_optSelect: 'Pumili...',
            ns_optPrimary: 'Elementarya',
            ns_optMiddle: 'Junior High',
            ns_optHigh: 'Senior High',
            ns_labelClass: 'Klase at Seksyon',
            ns_phClass: 'Hal: Grade 3-A',
            ns_sectionParent: 'Impormasyon ng Magulang',
            ns_labelParentName: 'Pangalan ng Magulang',
            ns_phParentName: 'Buong pangalan ng magulang',
            ns_labelPhone: 'Mobile Number',
            ns_phPhone: '05xxxxxxxx',
            ns_labelEmail: 'Email',
            ns_phEmail: 'example@email.com',
            ns_sectionNotes: 'Karagdagang Info',
            ns_labelNotes: 'Mga Tala',
            ns_phNotes: 'Karagdagang impormasyon (kalusugan, espesyal na pangangailangan, etc.)',            ns_btnSave: 'I-save ang Record',
            ns_btnReset: 'I-reset'
        },
        zh: {
            ns_pageTitle: '萨玛 | 新学生记录',
            ns_siteName: '萨玛',
            ns_siteSubtitle: '创建新学生',
            ns_formTitle: '新学生信息',
            ns_formDesc: '请填写所有必填字段',
            ns_sectionStudent: '学生信息',
            ns_labelStudentName: '学生全名',
            ns_phStudentName: '示例: 艾哈迈德·穆罕默德',
            ns_labelStudentId: '国民身份证号',
            ns_phStudentId: '1xxxxxxxxx',
            ns_labelGrade: '教育阶段',
            ns_optSelect: '选择阶段...',
            ns_optPrimary: '小学',
            ns_optMiddle: '初中',
            ns_optHigh: '高中',
            ns_labelClass: '班级',
            ns_phClass: '示例: 三年级一班',
            ns_sectionParent: '家长信息',
            ns_labelParentName: '家长姓名',
            ns_phParentName: '家长全名',
            ns_labelPhone: '手机号码',
            ns_phPhone: '05xxxxxxxx',
            ns_labelEmail: '电子邮件',
            ns_phEmail: 'example@email.com',
            ns_sectionNotes: '附加信息',
            ns_labelNotes: '备注',
            ns_phNotes: '附加信息（健康、特殊需求等）',
            ns_btnSave: '保存记录',
            ns_btnReset: '重置'
        }
    };

    const t = translations[lang];
    if (!t) return;

    // تحديث كل العناصر
    const elements = {
        'ns-page-title': t.ns_pageTitle,
        'ns-site-name': t.ns_siteName,
        'ns-site-subtitle': t.ns_siteSubtitle,
        'ns-form-title': t.ns_formTitle,
        'ns-form-desc': t.ns_formDesc,
        'ns-section-student': t.ns_sectionStudent,
        'ns-label-student-name': t.ns_labelStudentName,
        'ns-label-student-id': t.ns_labelStudentId,
        'ns-label-grade': t.ns_labelGrade,        'ns-opt-select': t.ns_optSelect,
        'ns-opt-primary': t.ns_optPrimary,
        'ns-opt-middle': t.ns_optMiddle,
        'ns-opt-high': t.ns_optHigh,
        'ns-label-class': t.ns_labelClass,
        'ns-section-parent': t.ns_sectionParent,
        'ns-label-parent-name': t.ns_labelParentName,
        'ns-label-phone': t.ns_labelPhone,
        'ns-label-email': t.ns_labelEmail,
        'ns-section-notes': t.ns_sectionNotes,
        'ns-label-notes': t.ns_labelNotes,
        'ns-btn-save': t.ns_btnSave,
        'ns-btn-reset': t.ns_btnReset
    };

    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el && text) {
            el.textContent = text;
        }
    }

    // تحديث الـ placeholders
    const placeholders = {
        'student-name': t.ns_phStudentName,
        'student-id': t.ns_phStudentId,
        'class-room': t.ns_phClass,
        'parent-name': t.ns_phParentName,
        'parent-phone': t.ns_phPhone,
        'parent-email': t.ns_phEmail,
        'notes': t.ns_phNotes
    };

    for (const [id, ph] of Object.entries(placeholders)) {
        const el = document.getElementById(id);
        if (el && ph) {
            el.placeholder = ph;
        }
    }

    // تحديث الاتجاه
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    console.log('✅ تمت الترجمة بنجاح');
}

// ========== الآن باقي الكود الأصلي ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ سما بدأ التحميل');
    // الوضع الليلي
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

    // اللغة
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('sama-lang') || 'ar';

    const flags = { ar: '🇸🇦', en: '🇬🇧', tr: '🇹🇷', es: '🇪🇸', ko: '🇰🇷', ja: '🇯🇵', hi: '🇮🇳', fil: '🇵🇭', zh: '🇨🇳' };

    if (langBtn) {
        langBtn.textContent = flags[currentLang] || '🇸🇦';
        langBtn.style.cursor = 'pointer';
        
        // تطبيق الترجمة فوراً
        setTimeout(() => translatePage(currentLang), 100);
        setTimeout(() => translatePage(currentLang), 500); // محاولة ثانية للتأكد

        langBtn.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            
            const langs = [
                {code: 'ar', name: 'العربية', flag: '🇸🇦'}, {code: 'en', name: 'English', flag: '🇬'},
                {code: 'tr', name: 'Türkçe', flag: '🇹🇷'}, {code: 'es', name: 'Español', flag: '🇪🇸'},
                {code: 'ko', name: '한국어', flag: '🇰🇷'}, {code: 'ja', name: '日本語', flag: '🇯🇵'},
                {code: 'hi', name: 'हिन्दी', flag: '🇮🇳'}, {code: 'fil', name: 'Filipino', flag: '🇵🇭'},
                {code: 'zh', name: '中文', flag: '🇨'}
            ];

            const existingMenu = document.querySelector('.lang-menu');
            if (existingMenu) { existingMenu.remove(); return; }

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
                    translatePage(currentLang);
                };
                menu.appendChild(btn);
            });

            if (langBtn.parentElement) {
                langBtn.parentElement.style.position = 'relative';
                langBtn.parentElement.appendChild(menu);
            }
        });
    }

    // اسم المعلمة
    let teacherName = localStorage.getItem('sama-teacher');
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
