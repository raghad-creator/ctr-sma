document.addEventListener('DOMContentLoaded', () => {
    // الوضع الليلي
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeBtn.querySelector('i').className = next === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
    
    // اللغة
    const langBtn = document.getElementById('lang-toggle');
    let lang = localStorage.getItem('lang') || 'ar';
    
    const texts = {
        ar: {
            greeting: 'أهلاً،',
            question: 'ماذا تريد أن تفعل اليوم؟',
            opt1: 'إنشاء سجل لطالب جديد',
            opt2: 'متابعة سجل طلابي',
            opt3: 'رفع لأولياء الأمور',
            opt4: 'المساعدة والدعم',
            footer: '© 2026 سما - جميع الحقوق محفوظة'
        },
        en: {
            greeting: 'Welcome,',
            question: 'What would you like to do?',
            opt1: 'New Student Record',
            opt2: 'Follow Students',
            opt3: 'Upload for Parents',
            opt4: 'Help & Support',
            footer: '© 2026 Sama - All Rights Reserved'
        },
        tr: {
            greeting: 'Merhaba,',
            question: 'Bugün ne yapmak istersiniz?',
            opt1: 'Yeni Öğrenci Kaydı',
            opt2: 'Öğrencileri Takip Et',
            opt3: 'Veliler İçin Yükle',
            opt4: 'Yardım ve Destek',
            footer: '© 2026 Sama - Tüm Hakları Saklıdır'
        },
        es: {
            greeting: 'Bienvenida,',
            question: '¿Qué te gustaría hacer?',
            opt1: 'Nuevo Registro',            opt2: 'Seguir Estudiantes',
            opt3: 'Subir para Padres',
            opt4: 'Ayuda y Soporte',
            footer: '© 2026 Sama - Todos los Derechos Reservados'
        },
        ko: {
            greeting: '안녕하세요,',
            question: '오늘 무엇을 하시겠습니까?',
            opt1: '새 학생 기록',
            opt2: '학생 따라가기',
            opt3: '학부모용 업로드',
            opt4: '도움말 및 지원',
            footer: '© 2026 Sama - 모든 권리 보유'
        },
        ja: {
            greeting: 'こんにちは、',
            question: '今日は何をしますか？',
            opt1: '新しい生徒記録',
            opt2: '生徒をフォロー',
            opt3: '保護者用アップロード',
            opt4: 'ヘルプ＆サポート',
            footer: '© 2026 Sama - 全著作権所有'
        },
        hi: {
            greeting: 'नमस्ते,',
            question: 'आज आप क्या करना चाहेंगी?',
            opt1: 'नया छात्र रिकॉर्ड',
            opt2: 'छात्रों को फॉलो करें',
            opt3: 'अभिभावकों के लिए',
            opt4: 'सहायता और समर्थन',
            footer: '© 2026 Sama - सभी अधिकार सुरक्षित'
        },
        fil: {
            greeting: 'Kumusta,',
            question: 'Ano ang gusto mong gawin?',
            opt1: 'Bagong Record',
            opt2: 'Subaybayan',
            opt3: 'I-upload para sa Parents',
            opt4: 'Tulong at Suporta',
            footer: '© 2026 Sama - Lahat ng Karapatan ay Nakalaan'
        },
        zh: {
            greeting: '您好，',
            question: '今天您想做什么？',
            opt1: '新学生记录',
            opt2: '跟进学生',
            opt3: '为家长上传',
            opt4: '帮助与支持',
            footer: '© 2026 Sama - 版权所有'
        }    };
    
    const flags = {
        ar: '🇸🇦', en: '🇬', tr: '🇷', es: '🇪🇸',
        ko: '🇰🇷', ja: '🇯', hi: '🇳', fil: '🇵🇭', zh: '🇨🇳'
    };
    
    function updateTexts() {
        const t = texts[lang];
        const name = localStorage.getItem('teacher') || '
