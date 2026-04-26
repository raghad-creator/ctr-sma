// ========== الوضع الليلي للصفحات الداخلية ==========
document.addEventListener('DOMContentLoaded', () => {
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
            icon.className = next === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        });
    }
    
    // ========== اللغة للصفحات الداخلية ==========
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('sama-lang') || 'ar';
    
    const translations = {
        ar: {
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
            supportPhone: 'الدعم الفني',
            supportEmail: 'البريد الإلكتروني',
            workingHours: 'ساعات العمل: الأحد - الخميس 8 ص - 4 م',
            footer: '© 2026 سما - جميع الحقوق محفوظة'
        },
        en: {
            helpTitle: 'Help & Technical Support',
            helpDesc: 'Your comprehensive guide to using the student records system',
            faqTitle: 'Frequently Asked Questions',
            q1: 'How do I add a new student?',
            q2: 'How do I edit student data?',
            q3: 'How do I print a student report?',
            q4: 'How do I add a new parent?',
            q5: 'How do I enter evaluations and skills?',
            contactTitle: 'Contact Us',
            contactDesc: 'If you can\'t find an answer to your question, feel free to contact us:',            supportPhone: 'Technical Support',
            supportEmail: 'Email',
            workingHours: 'Working Hours: Sunday - Thursday 8 AM - 4 PM',
            footer: '© 2026 Sama - All Rights Reserved'
        },
        tr: {
            helpTitle: 'Yardım ve Teknik Destek',
            helpDesc: 'Öğrenci kayıt sistemini kullanma kılavuzunuz',
            faqTitle: 'Sıkça Sorulan Sorular',
            q1: 'Yeni bir öğrenci nasıl eklerim?',
            q2: 'Öğrenci verilerini nasıl düzenlerim?',
            q3: 'Öğrenci raporu nasıl yazdırılır?',
            q4: 'Yeni bir veli nasıl eklerim?',
            q5: 'Değerlendirmeler ve beceriler nasıl girilir?',
            contactTitle: 'Bize Ulaşın',
            contactDesc: 'Sorunuzun cevabını bulamazsanız, bizimle iletişime geçin:',
            supportPhone: 'Teknik Destek',
            supportEmail: 'E-posta',
            workingHours: 'Çalışma Saatleri: Pazar - Perşembe 08:00 - 16:00',
            footer: '© 2026 Sama - Tüm Hakları Saklıdır'
        },
        es: {
            helpTitle: 'Ayuda y Soporte Técnico',
            helpDesc: 'Tu guía completa para usar el sistema de registros estudiantiles',
            faqTitle: 'Preguntas Frecuentes',
            q1: '¿Cómo agrego un nuevo estudiante?',
            q2: '¿Cómo edito los datos de un estudiante?',
            q3: '¿Cómo imprimo un informe del estudiante?',
            q4: '¿Cómo agrego un nuevo padre/tutor?',
            q5: '¿Cómo ingreso evaluaciones y habilidades?',
            contactTitle: 'Contáctanos',
            contactDesc: 'Si no encuentras respuesta a tu pregunta, no dudes en contactarnos:',
            supportPhone: 'Soporte Técnico',
            supportEmail: 'Correo Electrónico',
            workingHours: 'Horario de Atención: Domingo - Jueves 8 AM - 4 PM',
            footer: '© 2026 Sama - Todos los Derechos Reservados'
        },
        ko: {
            helpTitle: '도움말 및 기술 지원',
            helpDesc: '학생 기록 시스템 사용 종합 가이드',
            faqTitle: '자주 묻는 질문',
            q1: '새 학생을 어떻게 추가하나요?',
            q2: '학생 데이터를 어떻게 수정하나요?',
            q3: '학생 보고서를 어떻게 인쇄하나요?',
            q4: '새 학부모를 어떻게 추가하나요?',
            q5: '평가와 기술을 어떻게 입력하나요?',
            contactTitle: '문의하기',
            contactDesc: '질문에 대한 답변을 찾을 수 없다면 언제든지 문의하세요:',
            supportPhone: '기술 지원',
            supportEmail: '이메일',            workingHours: '운영 시간: 일요일 - 목요일 오전 8시 - 오후 4시',
            footer: '© 2026 Sama - 모든 권리 보유'
        },
        ja: {
            helpTitle: 'ヘルプ＆技術サポート',
            helpDesc: '生徒記録システム使用の総合ガイド',
            faqTitle: 'よくある質問',
            q1: '新しい生徒を追加するには？',
            q2: '生徒データを編集するには？',
            q3: '生徒レポートを印刷するには？',
            q4: '新しい保護者を追加するには？',
            q5: '評価とスキルを入力するには？',
            contactTitle: 'お問い合わせ',
            contactDesc: '質問の回答が見つからない場合は、お気軽にお問い合わせください:',
            supportPhone: '技術サポート',
            supportEmail: 'メール',
            workingHours: '営業時間: 日曜日～木曜日 午前8時～午後4時',
            footer: '© 2026 Sama - 全著作権所有'
        },
        hi: {
            helpTitle: 'सहायता और तकनीकी समर्थन',
            helpDesc: 'छात्र रिकॉर्ड सिस्टम उपयोग के लिए आपकी संपूर्ण गाइड',
            faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
            q1: 'मैं नया छात्र कैसे जोड़ूं?',
            q2: 'मैं छात्र डेटा कैसे संपादित करूं?',
            q3: 'मैं छात्र रिपोर्ट कैसे प्रिंट करूं?',
            q4: 'मैं नया अभिभावक कैसे जोड़ूं?',
            q5: 'मैं मूल्यांकन और कौशल कैसे दर्ज करूं?',
            contactTitle: 'संपर्क करें',
            contactDesc: 'यदि आपको अपने प्रश्न का उत्तर नहीं मिलता, तो हमसे संपर्क करें:',
            supportPhone: 'तकनीकी समर्थन',
            supportEmail: 'ईमेल',
            workingHours: 'कार्य समय: रविवार - गुरुवार सुबह 8 बजे - शाम 4 बजे',
            footer: '© 2026 Sama - सभी अधिकार सुरक्षित'
        },
        fil: {
            helpTitle: 'Tulong at Teknikal na Suporta',
            helpDesc: 'Ang iyong kumpletong gabay sa paggamit ng systema ng mga record ng mag-aaral',
            faqTitle: 'Mga Madalas Itanong',
            q1: 'Paano ako magdadagdag ng bagong mag-aaral?',
            q2: 'Paano ko i-e-edit ang data ng mag-aaral?',
            q3: 'Paano ko i-print ang report ng mag-aaral?',
            q4: 'Paano ako magdadagdag ng bagong magulang?',
            q5: 'Paano ako maglalagay ng evaluations at skills?',
            contactTitle: 'Makipag-ugnayan',
            contactDesc: 'Kung hindi mo mahanap ang sagot sa iyong tanong, huwag mag-atubiling makipag-ugnayan sa amin:',
            supportPhone: 'Teknikal na Suporta',
            supportEmail: 'Email',
            workingHours: 'Oras ng Trabaho: Linggo - Huwebes 8 AM - 4 PM',
            footer: '© 2026 Sama - Lahat ng Karapatan ay Nakalaan'        },
        zh: {
            helpTitle: '帮助与技术支持',
            helpDesc: '使用学生记录系统的综合指南',
            faqTitle: '常见问题',
            q1: '如何添加新学生？',
            q2: '如何编辑学生数据？',
            q3: '如何打印学生报告？',
            q4: '如何添加新家长？',
            q5: '如何输入评估和技能？',
            contactTitle: '联系我们',
            contactDesc: '如果您找不到问题的答案，请随时联系我们：',
            supportPhone: '技术支持',
            supportEmail: '电子邮件',
            workingHours: '工作时间：周日至周四 上午8点 - 下午4点',
            footer: '© 2026 Sama - 版权所有'
        }
    };
    
    const flags = {
        ar: '🇸🇦', en: '🇬🇧', tr: '🇹🇷', es: '🇪🇸',
        ko: '🇰🇷', ja: '🇯🇵', hi: '🇮🇳', fil: '🇵', zh: '🇨🇳'
    };
    
    function applyTranslation(lang) {
        const t = translations[lang];
        if (!t) return;
        
        // تحديث العناوين
        const elements = {
            'helpTitle': document.querySelector('.help-header h1'),
            'helpDesc': document.querySelector('.help-header p'),
            'faqTitle': document.querySelector('.faq-title'),
            'q1': document.querySelectorAll('.question-text')[0],
            'q2': document.querySelectorAll('.question-text')[1],
            'q3': document.querySelectorAll('.question-text')[2],
            'q4': document.querySelectorAll('.question-text')[3],
            'q5': document.querySelectorAll('.question-text')[4],
            'contactTitle': document.querySelector('.contact-section h2'),
            'contactDesc': document.querySelector('.contact-section > p'),
            'footer': document.querySelector('.main-footer p')
        };
        
        for (const [key, el] of Object.entries(elements)) {
            if (el && t[key]) {
                if (key.includes('q')) {
                    el.textContent = t[key];
                } else {
                    // الحفاظ على الأيقونات
                    const icon = el.querySelector('i');                    if (icon) {
                        el.innerHTML = `<i class="${icon.className}"></i> ${t[key]}`;
                    } else {
                        el.textContent = t[key];
                    }
                }
            }
        }
        
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }
    
    if (langBtn) {
        langBtn.textContent = flags[currentLang] || '🇸🇦';
        langBtn.style.cursor = 'pointer';
        
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const langs = [
                {code: 'ar', name: 'العربية', flag: '🇸🇦'},
                {code: 'en', name: 'English', flag: '🇬🇧'},
                {code: 'tr', name: 'Türkçe', flag: '🇹🇷'},
                {code: 'es', name: 'Español', flag: '🇪'},
                {code: 'ko', name: '한국어', flag: '🇰'},
                {code: 'ja', name: '日本語', flag: '🇯🇵'},
                {code: 'hi', name: 'हिन्दी', flag: '🇮🇳'},
                {code: 'fil', name: 'Filipino', flag: '🇵🇭'},
                {code: 'zh', name: '中文', flag: '🇨'}
            ];
            
            const existingMenu = document.querySelector('.lang-menu');
            if (existingMenu) {
                existingMenu.remove();
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
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                padding: 10px;
                min-width: 180px;                z-index: 10000;
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
                    transition: all 0.2s;
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
                    
                    currentLang = l.code;
                    localStorage.setItem('sama-lang', currentLang);
                    langBtn.textContent = l.flag;
                    menu.remove();
                    applyTranslation(currentLang);
                };
                
                menu.appendChild(btn);
            });
            
            langBtn.parentElement.style.position = 'relative';
            langBtn.parentElement.appendChild(menu);
        });
        
        applyTranslation(currentLang);    }
});
