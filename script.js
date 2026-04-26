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

    // ========== 2. أسئلة صفحة المساعدة (فتح وإغلاق) ==========
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            accordionHeaders.forEach(h => {
                if (h !== header) {
                    h.classList.remove('active');
                    h.nextElementSibling.classList.remove('show');
                }
            });
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
            greeting: 'أهلاً،', question: 'ماذا تريد أن تفعل اليوم؟',
            newStudent: 'إنشاء سجل لطالب جديد', followStudents: 'متابعة سجل طلابي',
            uploadParents: 'رفع لأولياء الأمور', helpSupport: 'المساعدة والدعم',
            footer: '© 2026 سما - جميع الحقوق محفوظة | تطوير خاص للمعلمات',            helpTitle: 'المساعدة والدعم الفني', helpDesc: 'دليلك الشامل لاستخدام نظام سجلات الطلاب',
            faqTitle: 'الأسئلة الشائعة',
            q1: 'كيف أضيف طالب جديد؟', q2: 'كيف أعدل بيانات طالب؟',
            q3: 'كيف أطبع تقرير الطالب؟', q4: 'كيف أضيف ولي أمر جديد؟', q5: 'كيف أدخل التقييمات والمهارات؟',
            a1: '<ol><li>انتقل إلى القائمة الرئيسية واختر <strong>"طالب جديد"</strong></li><li>املأ جميع الحقول المطلوبة:<ul><li>اسم الطالب الرباعي</li><li>رقم الهوية الوطنية</li><li>رقم جوال ولي الأمر</li><li>البريد الإلكتروني</li></ul></li><li>ثم اضغط على زر <strong>"حفظ"</strong> لإتمام العملية</li></ol>',
            a2: '<p>اتبع الخطوات التالية:</p><ol><li>اذهب إلى صفحة <strong>"الطلاب"</strong> من القائمة الرئيسية</li><li>ابحث عن الطالب باستخدام خانة البحث في الأعلى</li><li>اضغط على اسم الطالب لفتح سجله</li><li>اضغط على زر <strong>"تعديل"</strong> في أعلى الصفحة</li><li>قم بالتعديلات المطلوبة ثم اضغط <strong>"حفظ التغييرات"</strong></li></ol>',
            a3: '<ol><li>من صفحة <strong>"سجل الطالب"</strong></li><li>اضغط على زر <strong>"طباعة"</strong> في الزاوية العلوية</li><li>ستفتح نافذة الطباعة تلقائياً</li><li>اختر الطابعة واضغط <strong>"طباعة"</strong></li></ol>',
            a4: '<p>انتقل إلى صفحة <strong>"أولياء الأمور"</strong> واضغط على زر <strong>"إضافة ولي أمر"</strong>. أدخل البيانات التالية:</p><ul><li>الاسم الكامل</li><li>رقم الهوية</li><li>رقم الجوال</li><li>البريد الإلكتروني</li></ul><p>ثم اربطه بأبنائه الطلاب واضغط <strong>"حفظ"</strong>.</p>',
            a5: '<ol><li>من سجل الطالب:</li><li>انتقل إلى تبويب <strong>"المهارات"</strong> أو <strong>"التقييمات"</strong></li><li>اختر المهارة أو التقييم المطلوب</li><li>أدخل الدرجة أو الملاحظة</li><li>اضغط <strong>"حفظ"</strong></li></ol>',
            contactTitle: 'تواصل معنا', contactDesc: 'إذا لم تجد إجابة لسؤالك، لا تتردد في التواصل معنا:',
            workHours: 'ساعات العمل: الأحد - الخميس 8 ص - 4 م',
            // === صفحة إنشاء طالب جديد ===
            ns_pageTitle: 'سما | إنشاء سجل طالب جديد', ns_siteName: 'سما',
            ns_siteSubtitle: 'إنشاء سجل طالب جديد', ns_formTitle: 'بيانات الطالب الجديد',
            ns_formDesc: 'يرجى تعبئة جميع الحقول المطلوبة بدقة', ns_successText: 'تم حفظ البيانات بنجاح!',
            ns_sectionStudent: 'بيانات الطالب', ns_labelStudentName: 'اسم الطالب الرباعي',
            ns_phStudentName: 'مثال: أحمد محمد علي عبدالله', ns_labelStudentId: 'رقم الهوية / الإقامة',
            ns_phStudentId: '1xxxxxxxxx', ns_labelGrade: 'المرحلة الدراسية',
            ns_optSelect: 'اختر المرحلة...', ns_optPrimary: 'ابتدائي', ns_optMiddle: 'متوسط',
            ns_optHigh: 'ثانوي', ns_labelClass: 'الصف والفصل', ns_phClass: 'مثال: الثالث أ',
            ns_sectionParent: 'بيانات ولي الأمر', ns_labelParentName: 'اسم ولي الأمر الرباعي',
            ns_phParentName: 'الاسم الرباعي لولي الأمر', ns_labelPhone: 'رقم الجوال',
            ns_phPhone: '05xxxxxxxx', ns_labelEmail: 'البريد الإلكتروني',
            ns_phEmail: 'example@email.com', ns_sectionNotes: 'معلومات إضافية',
            ns_labelNotes: 'ملاحظات', ns_phNotes: 'أي معلومات إضافية عن الطالب (حالة صحية، ظروف خاصة، إلخ...)',
            ns_btnSave: 'حفظ السجل', ns_btnReset: 'إعادة تعيين'
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
            a1: '<ol><li>Go to main menu and select <strong>"New Student"</strong></li><li>Fill all required fields:<ul><li>Student Full Name</li><li>National ID Number</li><li>Parent Mobile Number</li><li>Email Address</li></ul></li><li>Then click <strong>"Save"</strong> to complete</li></ol>',
            a2: '<p>Follow these steps:</p><ol><li>Go to <strong>"Students"</strong> page</li><li>Search for the student using the top search bar</li><li>Click on the student name to open record</li><li>Click <strong>"Edit"</strong> button at the top</li><li>Make changes and click <strong>"Save Changes"</strong></li></ol>',
            a3: '<ol><li>From <strong>"Student Record"</strong> page</li><li>Click <strong>"Print"</strong> button in top corner</li><li>Print window will open automatically</li><li>Select printer and click <strong>"Print"</strong></li></ol>',
            a4: '<p>Go to <strong>"Parents"</strong> page and click <strong>"Add Parent"</strong>. Enter details:</p><ul><li>Full Name</li><li>ID Number</li><li>Mobile Number</li><li>Email Address</li></ul><p>Then link to students and click <strong>"Save"</strong>.</p>',
            a5: '<ol><li>From student record:</li><li>Go to <strong>"Skills"</strong> or <strong>"Evaluations"</strong> tab</li><li>Select required skill or evaluation</li><li>Enter grade or note</li><li>Click <strong>"Save"</strong></li></ol>',
            contactTitle: 'Contact Us', contactDesc: 'If you can\'t find an answer, feel free to contact us:',
            workHours: 'Working Hours: Sun - Thu 8 AM - 4 PM',
            // === New Student Page ===
            ns_pageTitle: 'Sama | New Student Record', ns_siteName: 'Sama',
            ns_siteSubtitle: 'Create New Student', ns_formTitle: 'New Student Information',
            ns_formDesc: 'Please fill all required fields accurately', ns_successText: 'Data saved successfully!',
            ns_sectionStudent: 'Student Information', ns_labelStudentName: 'Student Full Name',
            ns_phStudentName: 'Example: Ahmed Mohammed Ali', ns_labelStudentId: 'National ID / Residence',
            ns_phStudentId: '1xxxxxxxxx', ns_labelGrade: 'Education Level',            ns_optSelect: 'Select level...', ns_optPrimary: 'Primary', ns_optMiddle: 'Middle',
            ns_optHigh: 'High School', ns_labelClass: 'Class & Section', ns_phClass: 'Example: Grade 3-A',
            ns_sectionParent: 'Parent Information', ns_labelParentName: 'Parent Full Name',
            ns_phParentName: 'Parent full name', ns_labelPhone: 'Mobile Number',
            ns_phPhone: '05xxxxxxxx', ns_labelEmail: 'Email Address',
            ns_phEmail: 'example@email.com', ns_sectionNotes: 'Additional Info',
            ns_labelNotes: 'Notes', ns_phNotes: 'Any additional info (health, special needs, etc.)',
            ns_btnSave: 'Save Record', ns_btnReset: 'Reset'
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
            a1: '<ol><li>Ana menüye gidin ve <strong>"Yeni Öğrenci"</strong> seçin</li><li>Tüm zorunlu alanları doldurun:<ul><li>Öğrenci Tam Adı</li><li>Ulusal Kimlik No</li><li>Veli Telefonu</li><li>E-posta</li></ul></li><li>İşlemi tamamlamak için <strong>"Kaydet"</strong> tıklayın</li></ol>',
            a2: '<p>Adımları takip edin:</p><ol><li><strong>"Öğrenciler"</strong> sayfasına gidin</li><li>Üstteki arama çubuğundan öğrenciyi bulun</li><li>Kaydı açmak için isme tıklayın</li><li>Üstteki <strong>"Düzenle"</strong> butonuna tıklayın</li><li>Değişiklikleri yapıp <strong>"Değişiklikleri Kaydet"</strong> tıklayın</li></ol>',
            a3: '<ol><li><strong>"Öğrenci Kaydı"</strong> sayfasından</li><li>Sağ üstteki <strong>"Yazdır"</strong> butonuna tıklayın</li><li>Yazdırma penceresi açılacaktır</li><li>Yazıcıyı seçip <strong>"Yazdır"</strong> tıklayın</li></ol>',
            a4: '<p><strong>"Veliler"</strong> sayfasına gidin ve <strong>"Veli Ekle"</strong> tıklayın. Bilgileri girin:</p><ul><li>Ad Soyad</li><li>Kimlik No</li><li>Telefon</li><li>E-posta</li></ul><p>Öğrencilerle ilişkilendirip <strong>"Kaydet"</strong> tıklayın.</p>',
            a5: '<ol><li>Öğrenci kaydından:</li><li><strong>"Beceriler"</strong> veya <strong>"Değerlendirmeler"</strong> sekmesine gidin</li><li>Gerekli beceriyi seçin</li><li>Notu girin</li><li><strong>"Kaydet"</strong> tıklayın</li></ol>',
            contactTitle: 'Bize Ulaşın', contactDesc: 'Cevap bulamazsanız iletişime geçin:',
            workHours: 'Çalışma Saatleri: Pazar - Perşembe 08:00 - 16:00',
            // === Yeni Öğrenci Sayfası ===
            ns_pageTitle: 'Sama | Yeni Öğrenci Kaydı', ns_siteName: 'Sama',
            ns_siteSubtitle: 'Yeni Öğrenci Oluştur', ns_formTitle: 'Yeni Öğrenci Bilgileri',
            ns_formDesc: 'Lütfen tüm zorunlu alanları doldurun', ns_successText: 'Veriler başarıyla kaydedildi!',
            ns_sectionStudent: 'Öğrenci Bilgileri', ns_labelStudentName: 'Öğrenci Tam Adı',
            ns_phStudentName: 'Örnek: Ahmet Mehmet Ali', ns_labelStudentId: 'TC Kimlik / İkamet',
            ns_phStudentId: '1xxxxxxxxx', ns_labelGrade: 'Eğitim Seviyesi',
            ns_optSelect: 'Seviye seçin...', ns_optPrimary: 'İlkokul', ns_optMiddle: 'Ortaokul',
            ns_optHigh: 'Lise', ns_labelClass: 'Sınıf ve Şube', ns_phClass: 'Örnek: 3-A',
            ns_sectionParent: 'Veli Bilgileri', ns_labelParentName: 'Veli Tam Adı',
            ns_phParentName: 'Velini tam adı', ns_labelPhone: 'Cep Telefonu',
            ns_phPhone: '05xxxxxxxx', ns_labelEmail: 'E-posta',
            ns_phEmail: 'ornek@email.com', ns_sectionNotes: 'Ek Bilgiler',
            ns_labelNotes: 'Notlar', ns_phNotes: 'Ek bilgiler (sağlık, özel durum, vb.)',
            ns_btnSave: 'Kaydı Kaydet', ns_btnReset: 'Sıfırla'
        },
        es: {
            greeting: 'Bienvenida,', question: '¿Qué te gustaría hacer?',
            newStudent: 'Nuevo Registro', followStudents: 'Seguir Estudiantes',
            uploadParents: 'Subir para Padres', helpSupport: 'Ayuda y Soporte',
            footer: '© 2026 Sama - Todos los Derechos Reservados',
            helpTitle: 'Ayuda y Soporte Técnico', helpDesc: 'Tu guía completa',
            faqTitle: 'Preguntas Frecuentes',
            q1: '¿Cómo agrego un estudiante?', q2: '¿Cómo edito datos?',
            q3: '¿Cómo imprimo un informe?', q4: '¿Cómo agrego un padre?', q5: '¿Cómo ingreso evaluaciones?',            a1: '<ol><li>Ve al menú principal y selecciona <strong>"Nuevo Estudiante"</strong></li><li>Llena todos los campos:<ul><li>Nombre Completo</li><li>ID Nacional</li><li>Teléfono del Padre</li><li>Email</li></ul></li><li>Clic en <strong>"Guardar"</strong> para completar</li></ol>',
            a2: '<p>Sigue estos pasos:</p><ol><li>Ve a la página <strong>"Estudiantes"</strong></li><li>Busca al estudiante arriba</li><li>Clic en el nombre para abrir registro</li><li>Clic en <strong>"Editar"</strong> arriba</li><li>Haz cambios y clic en <strong>"Guardar Cambios"</strong></li></ol>',
            a3: '<ol><li>Desde <strong>"Registro del Estudiante"</strong></li><li>Clic en <strong>"Imprimir"</strong> arriba</li><li>La ventana se abrirá sola</li><li>Selecciona impresora y clic <strong>"Imprimir"</strong></li></ol>',
            a4: '<p>Ve a <strong>"Padres"</strong> y clic <strong>"Agregar Padre"</strong>. Ingresa:</p><ul><li>Nombre Completo</li><li>ID</li><li>Teléfono</li><li>Email</li></ul><p>Vincula a estudiantes y clic <strong>"Guardar"</strong>.</p>',
            a5: '<ol><li>Desde el registro:</li><li>Ve a pestaña <strong>"Habilidades"</strong> o <strong>"Evaluaciones"</strong></li><li>Selecciona la habilidad</li><li>Ingresa la nota</li><li>Clic <strong>"Guardar"</strong></li></ol>',
            contactTitle: 'Contáctanos', contactDesc: 'Si no encuentras respuesta, contáctanos:',
            workHours: 'Horario: Dom - Jue 8 AM - 4 PM',
            // === Página Nuevo Estudiante ===
            ns_pageTitle: 'Sama | Nuevo Registro', ns_siteName: 'Sama',
            ns_siteSubtitle: 'Crear Nuevo Estudiante', ns_formTitle: 'Información del Estudiante',
            ns_formDesc: 'Completa todos los campos requeridos', ns_successText: '¡Datos guardados exitosamente!',
            ns_sectionStudent: 'Información del Estudiante', ns_labelStudentName: 'Nombre Completo',
            ns_phStudentName: 'Ejemplo: Ahmed Mohammed', ns_labelStudentId: 'ID Nacional',
            ns_phStudentId: '1xxxxxxxxx', ns_labelGrade: 'Nivel Educativo',
            ns_optSelect: 'Seleccionar...', ns_optPrimary: 'Primaria', ns_optMiddle: 'Secundaria',
            ns_optHigh: 'Preparatoria', ns_labelClass: 'Clase y Sección', ns_phClass: 'Ejemplo: 3-A',
            ns_sectionParent: 'Información del Padre', ns_labelParentName: 'Nombre del Padre',
            ns_phParentName: 'Nombre completo del padre', ns_labelPhone: 'Teléfono Móvil',
            ns_phPhone: '05xxxxxxxx', ns_labelEmail: 'Correo Electrónico',
            ns_phEmail: 'ejemplo@email.com', ns_sectionNotes: 'Información Adicional',
            ns_labelNotes: 'Notas', ns_phNotes: 'Información adicional (salud, necesidades especiales, etc.)',
            ns_btnSave: 'Guardar Registro', ns_btnReset: 'Reiniciar'
        },
        ko: {
            greeting: '안녕하세요,', question: '오늘 무엇을 하시겠습니까?',
            newStudent: '새 학생 기록', followStudents: '학생 따라가기',
            uploadParents: '학부모용 업로드', helpSupport: '도움말 및 지원',
            footer: '© 2026 Sama - 모든 권리 보유',
            helpTitle: '도움말 및 기술 지원', helpDesc: '종합 가이드',
            faqTitle: '자주 묻는 질문',
            q1: '새 학생을 어떻게 추가하나요?', q2: '학생 데이터를 어떻게 수정하나요?',
            q3: '보고서를 어떻게 인쇄하나요?', q4: '학부모를 어떻게 추가하나요?', q5: '평가를 어떻게 입력하나요?',
            a1: '<ol><li>메인 메뉴에서 <strong>"새 학생"</strong> 선택</li><li>모든 필드 입력:<ul><li>학생 전체 이름</li><li>주민등록번호</li><li>학부모 전화</li><li>이메일</li></ul></li><li><strong>"저장"</strong> 클릭하여 완료</li></ol>',
            a2: '<p>다음 단계:</p><ol><li><strong>"학생"</strong> 페이지 이동</li><li>상단 검색창에서 학생 검색</li><li>이름 클릭하여 기록 열기</li><li>상단 <strong>"편집"</strong> 클릭</li><li>변경 후 <strong>"변경 사항 저장"</strong> 클릭</li></ol>',
            a3: '<ol><li><strong>"학생 기록"</strong> 페이지에서</li><li>상단 <strong>"인쇄"</strong> 클릭</li><li>창이 자동으로 열림</li><li>프린터 선택 후 <strong>"인쇄"</strong> 클릭</li></ol>',
            a4: '<p><strong>"학부모"</strong> 페이지에서 <strong>"학부모 추가"</strong> 클릭. 정보 입력:</p><ul><li>전체 이름</li><li>ID 번호</li><li>전화번호</li><li>이메일</li></ul><p>학생과 연결 후 <strong>"저장"</strong> 클릭.</p>',
            a5: '<ol><li>학생 기록에서:</li><li><strong>"기술"</strong> 또는 <strong>"평가"</strong> 탭 이동</li><li>필요한 기술 선택</li><li>점수 입력</li><li><strong>"저장"</strong> 클릭</li></ol>',
            contactTitle: '문의하기', contactDesc: '답을 못 찾으시면 문의하세요:',
            workHours: '운영 시간: 일요일 - 목요일 오전 8시 - 오후 4시',
            // === 새 학생 페이지 ===
            ns_pageTitle: '사마 | 새 학생 기록', ns_siteName: '사마',
            ns_siteSubtitle: '새 학생 생성', ns_formTitle: '새 학생 정보',
            ns_formDesc: '모든 필수 필드를 입력하세요', ns_successText: '데이터가 저장되었습니다!',
            ns_sectionStudent: '학생 정보', ns_labelStudentName: '학생 전체 이름',
            ns_phStudentName: '예: 아흐메드 모하메드', ns_labelStudentId: '주민등록번호',
            ns_phStudentId: '1xxxxxxxxx', ns_labelGrade: '교육 단계',
            ns_optSelect: '단계 선택...', ns_optPrimary: '초등', ns_optMiddle: '중등',
            ns_optHigh: '고등', ns_labelClass: '학급 및 반', ns_phClass: '예: 3학년 가반',
            ns_sectionParent: '학부모 정보', ns_labelParentName: '학부모 이름',
            ns_phParentName: '학부모 전체 이름', ns_labelPhone: '휴대전화',            ns_phPhone: '05xxxxxxxx', ns_labelEmail: '이메일',
            ns_phEmail: 'example@email.com', ns_sectionNotes: '추가 정보',
            ns_labelNotes: '메모', ns_phNotes: '추가 정보 (건강, 특수 요구 등)',
            ns_btnSave: '기록 저장', ns_btnReset: '재설정'
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
            a1: '<ol><li>メインメニューで <strong>"新しい生徒"</strong> 選択</li><li>すべての項目を入力:<ul><li>生徒氏名</li><li>国民ID番号</li><li>保護者電話</li><li>メール</li></ul></li><li><strong>"保存"</strong> クリックで完了</li></ol>',
            a2: '<p>手順:</p><ol><li><strong>"生徒"</strong> ページへ移動</li><li>上部検索ボックスで検索</li><li>名前をクリックして記録を開く</li><li>上部 <strong>"編集"</strong> クリック</li><li>変更して <strong>"変更を保存"</strong> クリック</li></ol>',
            a3: '<ol><li><strong>"生徒記録"</strong> ページから</li><li>右上 <strong>"印刷"</strong> クリック</li><li>ウィンドウが自動で開く</li><li>プリンター選択し <strong>"印刷"</strong> クリック</li></ol>',
            a4: '<p><strong>"保護者"</strong> ページで <strong>"保護者追加"</strong> クリック。情報入力:</p><ul><li>氏名</li><li>ID番号</li><li>電話</li><li>メール</li></ul><p>生徒とリンクし <strong>"保存"</strong> クリック。</p>',
            a5: '<ol><li>生徒記録から:</li><li><strong>"スキル"</strong> または <strong>"評価"</strong> タブへ</li><li>必要なスキルを選択</li><li>点数を入力</li><li><strong>"保存"</strong> クリック</li></ol>',
            contactTitle: 'お問い合わせ', contactDesc: '回答が見つからない場合はお問い合わせください:',
            workHours: '営業時間: 日曜日～木曜日 午前8時～午後4時',
            // === 新しい生徒ページ ===
            ns_pageTitle: 'サマ | 新しい生徒記録', ns_siteName: 'サマ',
            ns_siteSubtitle: '新しい生徒を作成', ns_formTitle: '新しい生徒情報',
            ns_formDesc: '必須項目をすべて入力してください', ns_successText: 'データが保存されました！',
            ns_sectionStudent: '生徒情報', ns_labelStudentName: '生徒氏名',
            ns_phStudentName: '例: アフメド・モハメド', ns_labelStudentId: '国民ID',
            ns_phStudentId: '1xxxxxxxxx', ns_labelGrade: '教育段階',
            ns_optSelect: '選択...', ns_optPrimary: '小学校', ns_optMiddle: '中学校',
            ns_optHigh: '高校', ns_labelClass: 'クラス・組', ns_phClass: '例: 3年A組',
            ns_sectionParent: '保護者情報', ns_labelParentName: '保護者氏名',
            ns_phParentName: '保護者の氏名', ns_labelPhone: '携帯電話',
            ns_phPhone: '05xxxxxxxx', ns_labelEmail: 'メール',
            ns_phEmail: 'example@email.com', ns_sectionNotes: '追加情報',
            ns_labelNotes: 'メモ', ns_phNotes: '追加情報（健康、特別なニーズなど）',
            ns_btnSave: '記録を保存', ns_btnReset: 'リセット'
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
            a1: '<ol><li>मुख्य मेनू में जाएं और <strong>"नया छात्र"</strong> चुनें</li><li>सभी फ़ील्ड भरें:<ul><li>छात्र का पूरा नाम</li><li>राष्ट्रीय ID</li><li>अभिभावक फोन</li><li>ईमेल</li></ul></li><li>पूरा करने के लिए <strong>"सहेजें"</strong> दबाएं</li></ol>',
            a2: '<p>इन चरणों का पालन करें:</p><ol><li><strong>"छात्र"</strong> पेज पर जाएं</li><li>ऊपर सर्च बॉक्स में छात्र खोजें</li><li>रिकॉर्ड खोलने के लिए नाम पर क्लिक करें</li><li>ऊपर <strong>"संपादित करें"</strong> दबाएं</li><li>बदलाव करें और <strong>"बदलाव सहेजें"</strong> दबाएं</li></ol>',
            a3: '<ol><li><strong>"छात्र रिकॉर्ड"</strong> पेज से</li><li>ऊपरी कोने में <strong>"प्रिंट"</strong> दबाएं</li><li>विंडो अपने आप खुलेगी</li><li>प्रिंटर चुनें और <strong>"प्रिंट"</strong> दबाएं</li></ol>',
            a4: '<p><strong>"अभिभावक"</strong> पेज पर जाएं और <strong>"अभिभावक जोड़ें"</strong> दबाएं। जानकारी भरें:</p><ul><li>पूरा नाम</li><li>ID नंबर</li><li>फोन</li><li>ईमेल</li></ul><p>छात्रों से लिंक करें और <strong>"सहेजें"</strong> दबाएं।</p>',            a5: '<ol><li>छात्र रिकॉर्ड से:</li><li><strong>"कौशल"</strong> या <strong>"मूल्यांकन"</strong> टैब पर जाएं</li><li>आवश्यक कौशल चुनें</li><li>ग्रेड दर्ज करें</li><li><strong>"सहेजें"</strong> दबाएं</li></ol>',
            contactTitle: 'संपर्क करें', contactDesc: 'यदि उत्तर न मिले, तो संपर्क करें:',
            workHours: 'कार्य समय: रविवार - गुरुवार सुबह 8 बजे - शाम 4 बजे',
            // === नया छात्र पेज ===
            ns_pageTitle: 'समा | नया छात्र रिकॉर्ड', ns_siteName: 'समा',
            ns_siteSubtitle: 'नया छात्र बनाएं', ns_formTitle: 'नए छात्र की जानकारी',
            ns_formDesc: 'कृपया सभी आवश्यक फ़ील्ड भरें', ns_successText: 'डेटा सफलतापूर्वक सहेजा गया!',
            ns_sectionStudent: 'छात्र जानकारी', ns_labelStudentName: 'छात्र का पूरा नाम',
            ns_phStudentName: 'उदाहरण: अहमद मोहम्मद', ns_labelStudentId: 'राष्ट्रीय आईडी',
            ns_phStudentId: '1xxxxxxxxx', ns_labelGrade: 'शिक्षा स्तर',
            ns_optSelect: 'चुनें...', ns_optPrimary: 'प्राथमिक', ns_optMiddle: 'मध्य',
            ns_optHigh: 'माध्यमिक', ns_labelClass: 'कक्षा और अनुभाग', ns_phClass: 'उदाहरण: कक्षा 3-अ',
            ns_sectionParent: 'अभिभावक जानकारी', ns_labelParentName: 'अभिभावक का नाम',
            ns_phParentName: 'अभिभावक का पूरा नाम', ns_labelPhone: 'मोबाइल नंबर',
            ns_phPhone: '05xxxxxxxx', ns_labelEmail: 'ईमेल',
            ns_phEmail: 'example@email.com', ns_sectionNotes: 'अतिरिक्त जानकारी',
            ns_labelNotes: 'नोट्स', ns_phNotes: 'अतिरिक्त जानकारी (स्वास्थ्य, विशेष आवश्यकताएं, आदि)',
            ns_btnSave: 'रिकॉर्ड सहेजें', ns_btnReset: 'रीसेट'
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
            a1: '<ol><li>Pumunta sa main menu at piliin ang <strong>"Bagong Mag-aaral"</strong></li><li>Punan ang lahat ng fields:<ul><li>Buong Pangalan</li><li>National ID</li><li>Telepono ng Magulang</li><li>Email</li></ul></li><li>I-click ang <strong>"I-save"</strong> para matapos</li></ol>',
            a2: '<p>Sundin ang mga hakbang:</p><ol><li>Pumunta sa page ng <strong>"Mga Mag-aaral"</strong></li><li>Hanapin ang mag-aaral sa search bar</li><li>I-click ang pangalan para buksan ang record</li><li>I-click ang <strong>"I-edit"</strong> sa itaas</li><li>Gumawa ng pagbabago at i-click ang <strong>"I-save ang mga Pagbabago"</strong></li></ol>',
            a3: '<ol><li>Mula sa <strong>"Record ng Mag-aaral"</strong></li><li>I-click ang <strong>"I-print"</strong> sa itaas</li><li>Magbubukas ang print window</li><li>Pumili ng printer at i-click ang <strong>"I-print"</strong></li></ol>',
            a4: '<p>Pumunta sa <strong>"Mga Magulang"</strong> at i-click ang <strong>"Magdagdag ng Magulang"</strong>. Ilagay ang:</p><ul><li>Buong Pangalan</li><li>ID Number</li><li>Telepono</li><li>Email</li></ul><p>I-link sa mga anak at i-click ang <strong>"I-save"</strong>.</p>',
            a5: '<ol><li>Mula sa record ng mag-aaral:</li><li>Pumunta sa tab na <strong>"Mga Kasanayan"</strong> o <strong>"Mga Pagsusuri"</strong></li><li>Pumili ng kasanayan</li><li>Ilagay ang grado</li><li>I-click ang <strong>"I-save"</strong></li></ol>',
            contactTitle: 'Makipag-ugnayan', contactDesc: 'Kung walang sagot, makipag-ugnayan:',
            workHours: 'Oras ng Trabaho: Linggo - Huwebes 8 AM - 4 PM',
            // === Bagong Mag-aaral Page ===
            ns_pageTitle: 'Sama | Bagong Record', ns_siteName: 'Sama',
            ns_siteSubtitle: 'Gumawa ng Bagong Mag-aaral', ns_formTitle: 'Impormasyon ng Mag-aaral',
            ns_formDesc: 'Punan ang lahat ng required na fields', ns_successText: 'Nai-save ang data!',
            ns_sectionStudent: 'Impormasyon ng Mag-aaral', ns_labelStudentName: 'Buong Pangalan',
            ns_phStudentName: 'Hal: Ahmed Mohammed', ns_labelStudentId: 'National ID',
            ns_phStudentId: '1xxxxxxxxx', ns_labelGrade: 'Antas ng Edukasyon',
            ns_optSelect: 'Pumili...', ns_optPrimary: 'Elementarya', ns_optMiddle: 'Junior High',
            ns_optHigh: 'Senior High', ns_labelClass: 'Klase at Seksyon', ns_phClass: 'Hal: Grade 3-A',
            ns_sectionParent: 'Impormasyon ng Magulang', ns_labelParentName: 'Pangalan ng Magulang',
            ns_phParentName: 'Buong pangalan ng magulang', ns_labelPhone: 'Mobile Number',
            ns_phPhone: '05xxxxxxxx', ns_labelEmail: 'Email',
            ns_phEmail: 'example@email.com', ns_sectionNotes: 'Karagdagang Info',
            ns_labelNotes: 'Mga Tala', ns_phNotes: 'Karagdagang impormasyon (kalusugan, espesyal na pangangailangan, etc.)',
            ns_btnSave: 'I-save ang Record', ns_btnReset: 'I-reset'        },
        zh: {
            greeting: '您好，', question: '今天您想做什么？',
            newStudent: '新学生记录', followStudents: '跟进学生',
            uploadParents: '为家长上传', helpSupport: '帮助与支持',
            footer: '© 2026 Sama - 版权所有',
            helpTitle: '帮助与技术支持', helpDesc: '综合指南',
            faqTitle: '常见问题',
            q1: '如何添加新学生？', q2: '如何编辑学生数据？',
            q3: '如何打印报告？', q4: '如何添加家长？', q5: '如何输入评估？',
            a1: '<ol><li>转到主菜单并选择 <strong>"新学生"</strong></li><li>填写所有必填字段:<ul><li>学生全名</li><li>国民身份证号</li><li>家长电话</li><li>电子邮件</li></ul></li><li>点击 <strong>"保存"</strong> 完成</li></ol>',
            a2: '<p>按照以下步骤操作：</p><ol><li>进入 <strong>"学生"</strong> 页面</li><li>在顶部搜索栏查找学生</li><li>点击学生姓名打开记录</li><li>点击顶部的 <strong>"编辑"</strong></li><li>进行修改并点击 <strong>"保存更改"</strong></li></ol>',
            a3: '<ol><li>从 <strong>"学生记录"</strong> 页面</li><li>点击右上角 <strong>"打印"</strong></li><li>打印窗口将自动打开</li><li>选择打印机并点击 <strong>"打印"</strong></li></ol>',
            a4: '<p>进入 <strong>"家长"</strong> 页面并点击 <strong>"添加家长"</strong>。输入：</p><ul><li>全名</li><li>身份证号</li><li>电话</li><li>电子邮件</li></ul><p>与学生关联并点击 <strong>"保存"</strong>。</p>',
            a5: '<ol><li>从学生记录：</li><li>进入 <strong>"技能"</strong> 或 <strong>"评估"</strong> 标签</li><li>选择所需技能</li><li>输入成绩</li><li>点击 <strong>"保存"</strong></li></ol>',
            contactTitle: '联系我们', contactDesc: '如果找不到答案，请联系我们：',
            workHours: '工作时间：周日至周四 上午8点 - 下午4点',
            // === 新学生页面 ===
            ns_pageTitle: '萨玛 | 新学生记录', ns_siteName: '萨玛',
            ns_siteSubtitle: '创建新学生', ns_formTitle: '新学生信息',
            ns_formDesc: '请填写所有必填字段', ns_successText: '数据保存成功！',
            ns_sectionStudent: '学生信息', ns_labelStudentName: '学生全名',
            ns_phStudentName: '示例: 艾哈迈德·穆罕默德', ns_labelStudentId: '国民身份证号',
            ns_phStudentId: '1xxxxxxxxx', ns_labelGrade: '教育阶段',
            ns_optSelect: '选择阶段...', ns_optPrimary: '小学', ns_optMiddle: '初中',
            ns_optHigh: '高中', ns_labelClass: '班级', ns_phClass: '示例: 三年级一班',
            ns_sectionParent: '家长信息', ns_labelParentName: '家长姓名',
            ns_phParentName: '家长全名', ns_labelPhone: '手机号码',
            ns_phPhone: '05xxxxxxxx', ns_labelEmail: '电子邮件',
            ns_phEmail: 'example@email.com', ns_sectionNotes: '附加信息',
            ns_labelNotes: '备注', ns_phNotes: '附加信息（健康、特殊需求等）',
            ns_btnSave: '保存记录', ns_btnReset: '重置'
        }
    };

    const flags = { ar: '🇸🇦', en: '🇬🇧', tr: '🇹🇷', es: '🇪🇸', ko: '🇰🇷', ja: '🇯🇵', hi: '🇮🇳', fil: '🇵🇭', zh: '🇨🇳' };

    function applyTranslation(lang) {
        const t = translations[lang];
        if (!t) return;

        const teacherName = localStorage.getItem('sama-teacher') || 'معلمة';

        // خريطة العناصر الأساسية
        const elementsMap = {
            'teacher-greeting': t.greeting + ' ' + teacherName + ' 👋',
            'greeting': t.greeting + ' ' + teacherName + ' 👋',
            'question': t.question,
            'newStudent': t.newStudent, 'followStudents': t.followStudents,
            'uploadParents': t.uploadParents, 'helpSupport': t.helpSupport,            'footer': t.footer, 'footer-text': t.footer,
            'help-title': t.helpTitle, 'help-desc': t.helpDesc,
            'faq-title': t.faqTitle,
            'q1': t.q1, 'q2': t.q2, 'q3': t.q3, 'q4': t.q4, 'q5': t.q5,
            'contact-title': t.contactTitle, 'contact-desc': t.contactDesc,
            'work-hours': t.workHours,
            'a1': t.a1, 'a2': t.a2, 'a3': t.a3, 'a4': t.a4, 'a5': t.a5
        };

        for (const [id, text] of Object.entries(elementsMap)) {
            const el = document.getElementById(id);
            if (el) {
                if (id.startsWith('a')) {
                    el.innerHTML = text;
                } else {
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
        }

        // === تحديث صفحة إنشاء طالب جديد ===
        const nsPage = document.getElementById('new-student-form');
        if (nsPage && t.ns_pageTitle) {
            const nsTexts = {
                'ns-page-title': t.ns_pageTitle, 'ns-site-name': t.ns_siteName,
                'ns-site-subtitle': t.ns_siteSubtitle, 'ns-form-title': t.ns_formTitle,
                'ns-form-desc': t.ns_formDesc, 'ns-success-text': t.ns_successText,
                'ns-section-student': t.ns_sectionStudent, 'ns-label-student-name': t.ns_labelStudentName,
                'ns-label-student-id': t.ns_labelStudentId, 'ns-label-grade': t.ns_labelGrade,
                'ns-opt-select': t.ns_optSelect, 'ns-opt-primary': t.ns_optPrimary,
                'ns-opt-middle': t.ns_optMiddle, 'ns-opt-high': t.ns_optHigh,
                'ns-label-class': t.ns_labelClass, 'ns-section-parent': t.ns_sectionParent,
                'ns-label-parent-name': t.ns_labelParentName, 'ns-label-phone': t.ns_labelPhone,
                'ns-label-email': t.ns_labelEmail, 'ns-section-notes': t.ns_sectionNotes,
                'ns-label-notes': t.ns_labelNotes, 'ns-btn-save': t.ns_btnSave,
                'ns-btn-reset': t.ns_btnReset
            };
            for (const [id, text] of Object.entries(nsTexts)) {
                const el = document.getElementById(id);
                if (el && text) el.textContent = text;
            }
            // تحديث الـ Placeholders
            const placeholders = {                'student-name': t.ns_phStudentName, 'student-id': t.ns_phStudentId,
                'class-room': t.ns_phClass, 'parent-name': t.ns_phParentName,
                'parent-phone': t.ns_phPhone, 'parent-email': t.ns_phEmail,
                'notes': t.ns_phNotes
            };
            for (const [id, ph] of Object.entries(placeholders)) {
                const el = document.getElementById(id);
                if (el && ph) el.placeholder = ph;
            }
            // تحديث خيارات القائمة المنسدلة
            const opts = {
                'ns-opt-select': t.ns_optSelect, 'ns-opt-primary': t.ns_optPrimary,
                'ns-opt-middle': t.ns_optMiddle, 'ns-opt-high': t.ns_optHigh
            };
            for (const [id, text] of Object.entries(opts)) {
                const el = document.getElementById(id);
                if (el && text) el.textContent = text;
            }
        }

        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }

    if (langBtn) {
        langBtn.textContent = flags[currentLang] || '🇸🇦';
        langBtn.style.cursor = 'pointer';
        setTimeout(() => applyTranslation(currentLang), 100);

        langBtn.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            const existingMenu = document.querySelector('.lang-menu');
            if (existingMenu) { existingMenu.remove(); return; }

            const langs = [
                {code: 'ar', name: 'العربية', flag: '🇸🇦'}, {code: 'en', name: 'English', flag: '🇬🇧'},
                {code: 'tr', name: 'Türkçe', flag: '🇹🇷'}, {code: 'es', name: 'Español', flag: '🇪🇸'},
                {code: 'ko', name: '한국어', flag: '🇰🇷'}, {code: 'ja', name: '日本語', flag: '🇯🇵'},
                {code: 'hi', name: 'हिन्दी', flag: '🇮🇳'}, {code: 'fil', name: 'Filipino', flag: '🇵🇭'},
                {code: 'zh', name: '中文', flag: '🇨🇳'}
            ];

            const menu = document.createElement('div');
            menu.className = 'lang-menu';
            menu.style.cssText = `position: absolute; top: 100%; right: 0; background: white; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.3); padding: 10px; min-width: 180px; z-index: 10000; margin-top: 5px; border: 2px solid #1F6F6F;`;

            langs.forEach(l => {
                const btn = document.createElement('button');
                btn.textContent = l.flag + '  ' + l.name;
                btn.style.cssText = `width: 100%; padding: 10px 15px; margin: 3px 0; border: none; background: transparent; border-radius: 5px; cursor: pointer; text-align: right; font-family: 'Tajawal', sans-serif; font-size: 14px; transition: all 0.2s; display: flex; align-items: center; gap: 10px;`;                btn.onmouseover = () => { btn.style.background = '#1F6F6F'; btn.style.color = 'white'; };
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
