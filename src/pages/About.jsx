import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Eye, Target, Users, FileText, Award, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

/*
  About.refactor.jsx
  - Uses provided Tailwind tokens and existing global CSS (glass-card, animated-gradient, etc.)
  - No hardcoded colors: all visuals pull from CSS variables or utility classes.
  - Adds lightweight input sanitization helpers for any interactive elements.
  - Compact mobile layout included via responsive Tailwind utilities.
  - Focus on minimal copy, clear hierarchy, smooth 320ms transitions, and premium "liquid glass" treatment.
*/

// Basic sanitizers for any potential inputs used across pages/components
export const sanitizeText = (value = '') => {
    if (typeof value !== 'string') return '';
    // strip HTML tags
    let cleaned = value.replace(/<[^>]*>/g, '');
    // trim and limit length to avoid accidental payloads
    cleaned = cleaned.trim().slice(0, 800);
    // disallow javascript: links or data: blobs in user-provided text
    cleaned = cleaned.replace(/javascript:\S*/gi, '');
    cleaned = cleaned.replace(/data:\S*/gi, '');
    return cleaned;
};

export const isSafeUrl = (url = '') => {
    if (!url) return false;
    try {
        const u = new URL(url);
        // only allow http(s) and file for internal refs (file likely unused)
        return ['http:', 'https:'].includes(u.protocol);
    } catch (e) {
        return false;
    }
};

const About = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const handleFeatureClick = () => {
        toast({
            title: 'Fitur belum tersedia',
            description: t('featureNotImplemented') || 'Fitur akan segera hadir',
        });
    };

    const values = [
        {
            icon: Eye,
            title: 'Transparansi',
            description: 'Transparan di setiap penggunaan donasi dan laporan.',
        },
        {
            icon: Target,
            title: 'Profesionalisme',
            description: 'Program berjalan dengan standar akuntabilitas tinggi.',
        },
        {
            icon: Users,
            title: 'Kepedulian',
            description: 'Fokus pada kesejahteraan anak yatim dan dhuafa.',
        },
        {
            icon: Award,
            title: 'Kualitas',
            description: 'Layanan dan pembelajaran berkualitas berbasis minat.',
        },
    ];

    const leadership = [
        { name: 'Dr. Ahmad Syafii', position: 'Ketua Yayasan', image: '/images/lead-ahmad.jpg' },
        { name: 'Hj. Siti Nurhaliza, M.Pd', position: 'Direktur Program', image: '/images/lead-siti.jpg' },
        { name: 'Ustadz Muhammad Ridwan', position: 'Direktur Pendidikan', image: '/images/lead-ridwan.jpg' },
        { name: 'Dr. Fatimah Zahra, M.Kes', position: 'Direktur Kesehatan', image: '/images/lead-fatimah.jpg' },
    ];

    const docs = [
        { title: 'Akta Pendirian Yayasan', icon: FileText },
        { title: 'SK Kemenkumham', icon: Shield },
        { title: 'NPWP Yayasan', icon: FileText },
        { title: 'Laporan Audit', icon: FileText },
        { title: 'Sertifikat ISO', icon: Award },
        { title: 'Izin Operasional', icon: Shield },
    ];

    return (
        <>
            <Helmet>
                <title>Tentang Kami - Rumah Yatim Mizan</title>
                <meta
                    name="description"
                    content="Rumah Yatim Mizan — visi, misi, nilai, dan cara bergabung untuk mendukung anak yatim dan dhuafa."
                />
            </Helmet>

            {/* HERO */}
            <header className="relative overflow-hidden">
                {/* decorative blobs (token based) */}
                <div
                    aria-hidden
                    className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none"
                    style={{ background: 'var(--gradient-accent)', transition: 'transform 320ms ease' }}
                />
                <div
                    aria-hidden
                    className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-2xl opacity-30 pointer-events-none"
                    style={{ background: 'var(--gradient-primary)', transition: 'transform 320ms ease' }}
                />

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 sm:py-28">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading leading-tight tracking-tight glass-card inline-block p-4 px-6">
                            Tentang Rumah Yatim Mizan
                        </h1>

                        <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed text-muted-foreground">
                            Menyediakan pendidikan berbasis multimedia, tempat tumbuh kembang yang penuh kasih, dan
                            peluang mandiri bagi anak yatim & dhuafa.
                        </p>

                        <div className="mt-8 flex justify-center gap-3 flex-wrap">
                            <Button
                                size="lg"
                                className="btn-primary shadow-lg transition-all duration-[320ms] hover:scale-[1.02]"
                                onClick={handleFeatureClick}
                            >
                                Berdonasi
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="transition-all duration-[320ms] hover:bg-card/60"
                                onClick={handleFeatureClick}
                            >
                                Jadilah Relawan
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </header>

            <main className="space-y-12 px-4 sm:px-6 lg:px-8">
                {/* Vision & Mission compact duo cards */}
                <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="glass-card p-6 h-full border-0">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full glass-card">
                                        <Eye className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-lg">Visi</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed text-base text-text-secondary">
                                    Menjadi sekolah dan asrama Yatim/Dhuafa berbasis multimedia yang mengedepankan
                                    akhlakul karimah.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="glass-card p-6 h-full border-0">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full glass-card">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-lg">Misi</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed text-base text-text-secondary list-inside">
                                    <ul className="space-y-2">
                                        <li>Memberdayakan skill multimedia siswa.</li>
                                        <li>Memberikan pengasuhan & pendidikan berbasis teknologi.</li>
                                        <li>Membentuk pola asuh yang unggul & mandiri.</li>
                                        <li>Pembekalan minat & bakat dengan cinta kasih.</li>
                                    </ul>
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                </section>

                {/* Values grid (compact on mobile) */}
                <section className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-6"
                    >
                        <h2 className="text-2xl font-semibold">Nilai-Nilai Kami</h2>
                        <p className="mt-2 text-sm text-text-subtle max-w-2xl mx-auto">
                            Landasan kami dalam menjalankan program dan amanah donatur.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.06 }}
                            >
                                <Card className="glass-card h-full p-5 text-center transition-all duration-[320ms] hover:scale-[1.02]">
                                    <CardHeader className="items-center">
                                        <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center glass-card">
                                            <v.icon className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="mt-3 text-base">{v.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm text-text-secondary">{v.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Leadership */}
                <section className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-6"
                    >
                        <h2 className="text-2xl font-semibold">Tim Kepemimpinan</h2>
                        <p className="mt-2 text-sm text-text-subtle max-w-2xl mx-auto">
                            Profesional berkomitmen membimbing misi kami.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {leadership.map((l, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: idx * 0.06 }}
                            >
                                <Card className="glass-card h-full p-4 text-center">
                                    <div className="mx-auto w-28 h-28 rounded-full overflow-hidden mb-4">
                                        <img
                                            src={l.image}
                                            alt={`Portrait ${l.name}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // graceful fallback to avoid broken images
                                                e.currentTarget.src = "https://images.unsplash.com/photo-1595956553066-fe24a8c33395";
                                            }}
                                        />
                                    </div>
                                    <CardTitle className="text-base">{l.name}</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground mt-1">{l.position}</CardDescription>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Documents */}
                <section className="max-w-6xl mx-auto">
                    <motion.div className="text-center mb-6">
                        <h3 className="text-xl font-medium">Dokumen Legalitas</h3>
                        <p className="mt-2 text-sm text-text-subtle max-w-xl mx-auto">Dokumen yang mendukung transparansi kami.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {docs.map((d, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }}>
                                <Card
                                    className="glass-card p-4 h-full cursor-pointer transition-all duration-[320ms] hover:translate-y-[-4px]"
                                    onClick={handleFeatureClick}
                                    role="button"
                                    aria-label={`Buka dokumen ${d.title}`}
                                >
                                    <CardHeader className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center glass-card mb-2">
                                            <d.icon className="w-5 h-5" />
                                        </div>
                                        <CardTitle className="text-sm text-center">{d.title}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="max-w-6xl mx-auto text-center">
                    <div className="glass-card p-8 inline-block w-full sm:w-auto">
                        <h3 className="text-xl font-semibold">Bergabunglah dalam Misi Kami</h3>
                        <p className="mt-2 text-sm text-text-subtle max-w-2xl mx-auto">Dukunganmu langsung berdampak pada masa depan anak-anak.</p>

                        <div className="mt-6 flex justify-center gap-3 flex-wrap">
                            <Button className="btn-primary transition-all duration-[320ms]" onClick={handleFeatureClick}>
                                Donasi Sekarang
                            </Button>
                            <Button variant="outline" className="transition-all duration-[320ms]" onClick={handleFeatureClick}>
                                Pelajari Cara Berdonasi
                            </Button>
                        </div>
                    </div>
                </section>

                <footer className="max-w-6xl mx-auto text-center py-8 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Rumah Yatim Mizan — Semua hak dilindungi.</p>
                </footer>
            </main>
        </>
    );
};

export default About;
