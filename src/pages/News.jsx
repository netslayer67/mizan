import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const News = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const handleFeatureClick = () => {
        toast({
            title: "Fitur Belum Tersedia",
            description: "🚧 Fitur ini belum aktif. Nantikan update selanjutnya!",
        });
    };

    const featuredNews = {
        title: 'Rumah Yatim Mizan Raih Penghargaan Lembaga Sosial Terbaik 2024',
        excerpt: 'Atas dedikasi dan kontribusi nyata dalam pemberdayaan anak yatim, Rumah Yatim Mizan meraih penghargaan bergengsi dari Kementerian Sosial RI.',
        date: '2024-03-15',
        author: 'Tim Redaksi',
        category: 'Penghargaan',
        image: 'https://images.unsplash.com/photo-1484508665904-5b12a02c015d',
        readTime: '5 menit'
    };

    const newsCategories = [
        { name: 'Semua', count: 45, active: true },
        { name: 'Program', count: 18 },
        { name: 'Penghargaan', count: 8 },
        { name: 'Kegiatan', count: 12 },
        { name: 'Kemitraan', count: 7 }
    ];

    const newsList = [
        {
            title: 'Pembukaan Asrama Baru di Kota Palembang',
            excerpt: 'Asrama ke-26 Rumah Yatim Mizan resmi dibuka untuk menampung 80 anak yatim di Sumatera Selatan.',
            date: '2024-03-10',
            author: 'Ahmad Syafii',
            category: 'Program',
            image: 'https://images.unsplash.com/photo-1663124178598-71717cdea439',
            readTime: '4 menit'
        },
        {
            title: 'Kerjasama dengan Universitas Indonesia untuk Program Beasiswa',
            excerpt: 'MoU ditandatangani untuk memberikan beasiswa penuh bagi 50 anak yatim berprestasi.',
            date: '2024-03-08',
            author: 'Siti Nurhaliza',
            category: 'Kemitraan',
            image: 'https://images.unsplash.com/photo-1663124178598-71717cdea439',
            readTime: '3 menit'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Berita - Rumah Yatim Mizan</title>
                <meta
                    name="description"
                    content="Ikuti berita terbaru, kegiatan, dan pencapaian Rumah Yatim Mizan dalam membangun masa depan anak-anak yatim Indonesia."
                />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-primary/90 to-secondary overflow-hidden">
                <div className="absolute inset-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                        className="absolute w-96 h-96 bg-accent/40 rounded-full blur-3xl top-[-5rem] left-[-5rem]"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="absolute w-80 h-80 bg-primary/40 rounded-full blur-3xl bottom-[-4rem] right-[-4rem]"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-heading text-primary-foreground drop-shadow mb-4"
                    >
                        {t('news')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto"
                    >
                        Ikuti berita terbaru dan pencapaian kami dalam membangun masa depan anak-anak yatim Indonesia.
                    </motion.p>
                </div>
            </section>

            {/* Featured News */}
            <section className="py-16 bg-background">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card className="glass-card overflow-hidden">
                            <div className="grid lg:grid-cols-2">
                                <div className="relative h-64 lg:h-auto">
                                    <img
                                        src={featuredNews.image}
                                        alt={featuredNews.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <CardHeader className="p-0 mb-4">
                                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm mb-4 self-start">
                                            Berita Utama
                                        </span>
                                        <CardTitle className="text-2xl text-foreground mb-2">
                                            {featuredNews.title}
                                        </CardTitle>
                                        <CardDescription className="text-secondary/80">
                                            {featuredNews.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0 mt-4">
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {new Date(featuredNews.date).toLocaleDateString('id-ID')}
                                            </div>
                                            <div className="flex items-center">
                                                <User className="w-4 h-4 mr-2" />
                                                {featuredNews.author}
                                            </div>
                                        </div>
                                        <Button className="btn-primary" onClick={handleFeatureClick}>
                                            Baca Selengkapnya
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* News Categories */}
            <section className="bg-muted py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {newsCategories.map((category, i) => (
                            <Button
                                key={i}
                                variant="outline"
                                className={`transition-colors duration-300 ${category.active
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'bg-background hover:bg-muted'
                                    }`}
                                onClick={handleFeatureClick}
                            >
                                {category.name} ({category.count})
                            </Button>
                        ))}
                    </div>

                    {/* News Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsList.map((news, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="glass-card h-full overflow-hidden">
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                    <CardHeader className="p-4">
                                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                                            <Tag className="w-4 h-4 mr-2" /> {news.category}
                                        </div>
                                        <CardTitle className="text-lg text-foreground leading-tight">
                                            {news.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <CardDescription className="text-secondary/80 mb-4">
                                            {news.excerpt}
                                        </CardDescription>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {new Date(news.date).toLocaleDateString('id-ID')}
                                            </div>
                                            <span>{news.readTime} baca</span>
                                        </div>
                                        <Button
                                            variant="link"
                                            className="p-0 mt-3 text-primary hover:text-primary/80"
                                            onClick={handleFeatureClick}
                                        >
                                            Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-b from-secondary to-primary">
                <div className="max-w-3xl mx-auto text-center px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-heading text-primary-foreground mb-4"
                    >
                        Ikuti Perkembangan Kami
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg text-primary-foreground/90 mb-8"
                    >
                        Berlangganan newsletter untuk berita terbaru seputar kegiatan dan program donasi.
                    </motion.p>
                    <Button
                        size="lg"
                        className="bg-background text-primary hover:bg-muted transition-colors duration-300"
                        onClick={handleFeatureClick}
                    >
                        Berlangganan Sekarang
                    </Button>
                </div>
            </section>
        </>
    );
};

export default News;