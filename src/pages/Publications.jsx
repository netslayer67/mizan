import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Eye, BookOpen, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Publications = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const handleFeatureClick = () => {
        toast({
            title: "Fitur Belum Tersedia",
            description: t('featureNotImplemented'),
        });
    };

    const categories = [
        { title: 'Laporan Keuangan', desc: 'Laporan tahunan terverifikasi', icon: FileText, count: 8 },
        { title: 'Laporan Audit', desc: 'Hasil audit independen', icon: Shield, count: 5 },
        { title: 'Majalah Mizan', desc: 'Publikasi kegiatan & program', icon: BookOpen, count: 24 },
        { title: 'Brand Guidelines', desc: 'Panduan visual resmi', icon: Eye, count: 3 }
    ];

    const publications = [
        {
            title: 'Laporan Keuangan Tahunan 2023',
            category: 'Laporan Keuangan',
            date: '2024-03-15',
            size: '2.5 MB',
            downloads: 1250,
            desc: 'Laporan lengkap hasil audit independen',
            img: 'https://images.unsplash.com/photo-1683701844845-114d77be00ef'
        },
        {
            title: 'Hasil Audit Eksternal 2023',
            category: 'Laporan Audit',
            date: '2024-02-28',
            size: '1.8 MB',
            downloads: 890,
            desc: 'Audit eksternal sebagai bukti transparansi',
            img: 'https://images.unsplash.com/photo-1683701844845-114d77be00ef'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Publikasi - Rumah Yatim Mizan</title>
                <meta name="description" content="Laporan dan publikasi resmi Rumah Yatim Mizan" />
            </Helmet>

            <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary to-secondary">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-4xl md:text-6xl font-heading text-primary-foreground drop-shadow">
                            {t('publications')}
                        </h1>
                        <p className="mt-4 text-lg text-primary-foreground/80">
                            Akses laporan dan publikasi kami secara terbuka & transparan
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 bg-background">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl font-heading text-foreground">Kategori Publikasi</h2>
                        <p className="mt-2 text-muted-foreground">Berbagai jenis publikasi resmi kami</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((cat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                <Card className="glass-card p-6 hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={handleFeatureClick}>
                                    <div className="w-12 h-12 mx-auto rounded-full bg-primary flex items-center justify-center mb-4">
                                        <cat.icon className="text-primary-foreground" />
                                    </div>
                                    <CardTitle className="text-center text-lg">{cat.title}</CardTitle>
                                    <CardDescription className="text-center mt-1 text-sm">{cat.desc}</CardDescription>
                                    <div className="mt-4 text-center text-primary font-bold text-xl">{cat.count}</div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-muted">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl font-heading text-foreground">Publikasi Terbaru</h2>
                        <p className="mt-2 text-muted-foreground">Unduh laporan terbaru kami</p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {publications.map((pub, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                <Card className="glass-card overflow-hidden">
                                    <div className="flex">
                                        <img src={pub.img} alt={pub.title} className="w-32 h-32 object-cover rounded-l-2xl" />
                                        <div className="p-4 flex-1">
                                            <CardTitle className="text-lg text-foreground">{pub.title}</CardTitle>
                                            <CardDescription className="text-sm text-muted-foreground mb-2">{pub.desc}</CardDescription>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                                                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{new Date(pub.date).toLocaleDateString('id-ID')}</span>
                                                <span className="flex items-center"><Download className="w-4 h-4 mr-1" />{pub.downloads}</span>
                                            </div>
                                            <Button className="w-full btn-primary transition-colors duration-300" onClick={handleFeatureClick}>
                                                <Download className="w-4 h-4 mr-2" /> Unduh PDF
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-background">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <Card className="glass-card p-8 text-center">
                            <div className="w-14 h-14 mx-auto rounded-full bg-success flex items-center justify-center mb-4">
                                <Shield className="text-success-foreground" />
                            </div>
                            <CardTitle className="text-2xl text-foreground mb-2">Komitmen Transparansi</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Semua laporan kami diaudit independen dan terbuka untuk publik. Donasi dikelola amanah dan dilaporkan berkala.
                            </CardDescription>
                            <Button className="mt-6 btn-primary" onClick={handleFeatureClick}>Lihat Sertifikat Audit</Button>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Publications;
