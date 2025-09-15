import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

const translations = {
    id: {
        // Navigation
        home: 'Beranda',
        about: 'Tentang Kami',
        programs: 'Program',
        asrama: 'Asrama',
        publications: 'Publikasi',
        news: 'Berita',
        donation: 'Donasi',
        contact: 'Kontak',
        admin: 'Admin',

        // Home Page
        heroTitle: 'Membangun Masa Depan Cerah Anak Yatim Indonesia',
        heroSubtitle: 'Bergabunglah dengan misi mulia kami dalam memberikan pendidikan, kesehatan, dan kehidupan yang layak bagi anak-anak yatim di seluruh Indonesia.',
        donateNow: 'Donasi Sekarang',
        learnMore: 'Pelajari Lebih Lanjut',

        // Programs
        education: 'Pendidikan',
        health: 'Kesehatan',
        economy: 'Ekonomi',
        dawah: 'Dakwah',
        social: 'Sosial',

        // Common
        readMore: 'Baca Selengkapnya',
        viewAll: 'Lihat Semua',
        submit: 'Kirim',
        cancel: 'Batal',
        save: 'Simpan',
        edit: 'Edit',
        delete: 'Hapus',

        // Footer
        quickLinks: 'Tautan Cepat',
        followUs: 'Ikuti Kami',
        allRightsReserved: 'Hak Cipta Dilindungi',

        // Donation
        donationAmount: 'Jumlah Donasi',
        customAmount: 'Jumlah Lainnya',
        donorInfo: 'Informasi Donatur',
        fullName: 'Nama Lengkap',
        email: 'Email',
        phone: 'Nomor Telepon',
        message: 'Pesan (Opsional)',

        // About
        vision: 'Visi',
        mission: 'Misi',
        organizationalStructure: 'Struktur Organisasi',
        legalDocuments: 'Dokumen Legal',

        // Admin
        login: 'Masuk',
        logout: 'Keluar',
        dashboard: 'Dashboard',
        manageContent: 'Kelola Konten',
        manageDonations: 'Kelola Donasi',
        managePublications: 'Kelola Publikasi',

        // Notifications
        featureNotImplemented: '🚧 Fitur ini belum diimplementasikan—tapi jangan khawatir! Anda bisa memintanya di prompt berikutnya! 🚀'
    },

    en: {
        // Navigation
        home: 'Home',
        about: 'About Us',
        programs: 'Programs',
        asrama: 'Dormitories',
        publications: 'Publications',
        news: 'News',
        donation: 'Donation',
        contact: 'Contact',
        admin: 'Admin',

        // Home Page
        heroTitle: 'Building a Bright Future for Indonesian Orphans',
        heroSubtitle: 'Join our noble mission in providing education, healthcare, and a decent life for orphaned children across Indonesia.',
        donateNow: 'Donate Now',
        learnMore: 'Learn More',

        // Programs
        education: 'Education',
        health: 'Health',
        economy: 'Economy',
        dawah: 'Dawah',
        social: 'Social',

        // Common
        readMore: 'Read More',
        viewAll: 'View All',
        submit: 'Submit',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',

        // Footer
        quickLinks: 'Quick Links',
        followUs: 'Follow Us',
        allRightsReserved: 'All Rights Reserved',

        // Donation
        donationAmount: 'Donation Amount',
        customAmount: 'Custom Amount',
        donorInfo: 'Donor Information',
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone Number',
        message: 'Message (Optional)',

        // About
        vision: 'Vision',
        mission: 'Mission',
        organizationalStructure: 'Organizational Structure',
        legalDocuments: 'Legal Documents',

        // Admin
        login: 'Login',
        logout: 'Logout',
        dashboard: 'Dashboard',
        manageContent: 'Manage Content',
        manageDonations: 'Manage Donations',
        managePublications: 'Manage Publications',

        // Notifications
        featureNotImplemented: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀'
    },

    ar: {
        // Navigation
        home: 'الرئيسية',
        about: 'من نحن',
        programs: 'البرامج',
        asrama: 'المساكن',
        publications: 'المنشورات',
        news: 'الأخبار',
        donation: 'التبرع',
        contact: 'اتصل بنا',
        admin: 'الإدارة',

        // Home Page
        heroTitle: 'بناء مستقبل مشرق للأيتام الإندونيسيين',
        heroSubtitle: 'انضم إلى مهمتنا النبيلة في توفير التعليم والرعاية الصحية والحياة الكريمة للأطفال الأيتام في جميع أنحاء إندونيسيا.',
        donateNow: 'تبرع الآن',
        learnMore: 'اعرف المزيد',

        // Programs
        education: 'التعليم',
        health: 'الصحة',
        economy: 'الاقتصاد',
        dawah: 'الدعوة',
        social: 'الاجتماعي',

        // Common
        readMore: 'اقرأ المزيد',
        viewAll: 'عرض الكل',
        submit: 'إرسال',
        cancel: 'إلغاء',
        save: 'حفظ',
        edit: 'تحرير',
        delete: 'حذف',

        // Footer
        quickLinks: 'روابط سريعة',
        followUs: 'تابعنا',
        allRightsReserved: 'جميع الحقوق محفوظة',

        // Donation
        donationAmount: 'مبلغ التبرع',
        customAmount: 'مبلغ مخصص',
        donorInfo: 'معلومات المتبرع',
        fullName: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        message: 'رسالة (اختيارية)',

        // About
        vision: 'الرؤية',
        mission: 'المهمة',
        organizationalStructure: 'الهيكل التنظيمي',
        legalDocuments: 'الوثائق القانونية',

        // Admin
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
        dashboard: 'لوحة التحكم',
        manageContent: 'إدارة المحتوى',
        manageDonations: 'إدارة التبرعات',
        managePublications: 'إدارة المنشورات',

        // Notifications
        featureNotImplemented: '🚧 هذه الميزة غير مطبقة بعد - لكن لا تقلق! يمكنك طلبها في موجهك التالي! 🚀'
    }
};

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('id');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && translations[savedLanguage]) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    const changeLanguage = (language) => {
        if (translations[language]) {
            setCurrentLanguage(language);
            localStorage.setItem('language', language);
        }
    };

    const t = (key) => {
        return translations[currentLanguage][key] || key;
    };

    const value = {
        currentLanguage,
        changeLanguage,
        t,
        isRTL: currentLanguage === 'ar'
    };

    return (
        <LanguageContext.Provider value={value}>
            <div className={currentLanguage === 'ar' ? 'font-arabic' : ''} dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};