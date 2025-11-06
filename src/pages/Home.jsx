import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, GraduationCap, Building, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = React.memo(() => {
    const { t } = useLanguage();

    const stats = useMemo(() => [
        { icon: Users, value: "2,500+", label: "Anak Yatim Terlayani", ariaLabel: "Over 2,500 orphaned children served" },
        { icon: Building, value: "25+", label: "Asrama di Indonesia", ariaLabel: "25+ dormitories across Indonesia" },
        { icon: GraduationCap, value: "1,800+", label: "Lulusan Berprestasi", ariaLabel: "1,800+ successful graduates" },
        { icon: Heart, value: "15+", label: "Tahun Pengabdian", ariaLabel: "15+ years of service" },
    ], []);

    const programs = useMemo(() => [
        {
            title: t("education"),
            description: "Pendidikan berkualitas dari tingkat dasar hingga perguruan tinggi",
            icon: GraduationCap,
            color: "bg-primary",
            ariaLabel: "Education program details",
        },
        {
            title: t("health"),
            description: "Layanan kesehatan komprehensif untuk tumbuh kembang optimal",
            icon: Heart,
            color: "bg-success",
            ariaLabel: "Health program details",
        },
        {
            title: t("economy"),
            description: "Pemberdayaan ekonomi melalui pelatihan keterampilan dan wirausaha",
            icon: Building,
            color: "bg-warning",
            ariaLabel: "Economic empowerment program details",
        },
        {
            title: t("social"),
            description: "Program sosial untuk membangun karakter & kepedulian",
            icon: Users,
            color: "bg-error",
            ariaLabel: "Social program details",
        },
    ], [t]);

    return (
        <>
            <Helmet>
                <title>Rumah Yatim Mizan - Donasi & Masa Depan</title>
                <meta
                    name="description"
                    content="Bergabunglah dengan misi mulia untuk pendidikan, kesehatan, dan kehidupan layak anak yatim Indonesia."
                />
            </Helmet>

            {/* HERO SECTION */}
            <section
                className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
                aria-labelledby="hero-title"
                role="banner"
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-15"
                    aria-hidden="true"
                >
                    <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                </video>

                {/* Liquid Glass Blobs */}
                <div
                    className="absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-primary/30 blur-3xl animate-pulse"
                    aria-hidden="true"
                />
                <div
                    className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-secondary/20 blur-3xl animate-pulse"
                    aria-hidden="true"
                />

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h1
                            id="hero-title"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading drop-shadow text-foreground"
                        >
                            {t("heroTitle")}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-4">
                            {t("heroSubtitle")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4">
                            <Link to="/donation" aria-label="Go to donation page">
                                <Button
                                    size="lg"
                                    className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 transition-all duration-[320ms] hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    onClick={() => {
                                        // Security: Prevent rapid clicking to avoid potential abuse
                                        const now = Date.now();
                                        const lastClick = sessionStorage.getItem('lastDonationClick');
                                        if (lastClick && now - parseInt(lastClick) < 1000) return;
                                        sessionStorage.setItem('lastDonationClick', now.toString());
                                    }}
                                >
                                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                                    {t("donateNow")}
                                </Button>
                            </Link>
                            <Link to="/about" aria-label="Learn more about us">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="glass-card text-foreground hover:bg-primary/10 transition-all duration-[320ms] focus:ring-2 focus:ring-primary focus:ring-offset-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                                >
                                    {t("learnMore")}
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" aria-hidden="true" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-12 sm:py-16 lg:py-20 bg-muted" aria-labelledby="stats-heading">
                <h2 id="stats-heading" className="sr-only">Our Impact Statistics</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center glass-card p-4 sm:p-6 shadow-sm hover:shadow-lg transition-shadow duration-[320ms]"
                            role="region"
                            aria-labelledby={`stat-${i}-value`}
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-primary/80 mx-auto mb-3 sm:mb-4" aria-hidden="true">
                                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary-foreground" />
                            </div>
                            <div id={`stat-${i}-value`} className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{stat.value}</div>
                            <p className="text-xs sm:text-sm text-muted-foreground" aria-label={stat.ariaLabel}>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* PROGRAMS SECTION */}
            <section className="py-12 sm:py-16 lg:py-20 bg-background" aria-labelledby="programs-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <motion.h2
                        id="programs-heading"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl md:text-4xl font-heading text-foreground mb-6 sm:mb-8 lg:mb-10"
                    >
                        Program Kami
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" role="list" aria-label="Our programs">
                        {programs.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                role="listitem"
                            >
                                <Card className="glass-card h-full transition-all duration-[320ms] hover:scale-105 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                                    <CardHeader className="text-center">
                                        <div
                                            className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${p.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                                            aria-hidden="true"
                                        >
                                            <p.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-foreground" />
                                        </div>
                                        <CardTitle className="text-lg sm:text-xl text-foreground">{p.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-muted-foreground text-center text-sm sm:text-base" aria-label={p.ariaLabel}>
                                            {p.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-8 sm:mt-10 lg:mt-12"
                    >
                        <Link to="/programs" aria-label="View all programs">
                            <Button size="lg" className="btn-accent hover:scale-105 transition-all duration-[320ms] focus:ring-2 focus:ring-primary focus:ring-offset-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                                {t("viewAll")} Program
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" aria-hidden="true" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section
                className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                aria-labelledby="cta-heading"
            >
                <div className="absolute inset-0 bg-overlay" aria-hidden="true" />
                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 px-4 sm:px-6">
                    <motion.h2
                        id="cta-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading"
                    >
                        Mari Bersama Membangun Masa Depan
                    </motion.h2>
                    <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                        Setiap donasi adalah investasi masa depan anak yatim Indonesia
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link to="/donation" aria-label="Start donating now">
                            <Button
                                size="lg"
                                className="bg-card text-primary hover:bg-card/90 transition-all duration-[320ms] focus:ring-2 focus:ring-card focus:ring-offset-2 focus:ring-offset-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                                onClick={() => {
                                    // Security: Rate limiting for donation button
                                    const now = Date.now();
                                    const lastClick = sessionStorage.getItem('ctaDonationClick');
                                    if (lastClick && now - parseInt(lastClick) < 2000) return;
                                    sessionStorage.setItem('ctaDonationClick', now.toString());
                                }}
                            >
                                <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" aria-hidden="true" />
                                Mulai Berdonasi
                            </Button>
                        </Link>
                        <Link to="/contact" aria-label="Contact us">
                            <Button
                                size="lg"
                                variant="outline"
                                className="glass-card text-card-foreground hover:bg-card/20 transition-all duration-[320ms] focus:ring-2 focus:ring-card focus:ring-offset-2 focus:ring-offset-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                            >
                                Hubungi Kami
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
});

Home.displayName = 'Home';

export default Home;