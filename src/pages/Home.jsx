import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Users, GraduationCap, Building, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
    const { t } = useLanguage();

    const stats = [
        { icon: Users, value: "2,500+", label: "Anak Yatim Terlayani" },
        { icon: Building, value: "25+", label: "Asrama di Indonesia" },
        { icon: GraduationCap, value: "1,800+", label: "Lulusan Berprestasi" },
        { icon: Heart, value: "15+", label: "Tahun Pengabdian" },
    ];

    const programs = [
        {
            title: t("education"),
            description: "Pendidikan berkualitas dari tingkat dasar hingga perguruan tinggi",
            icon: GraduationCap,
            color: "bg-primary",
        },
        {
            title: t("health"),
            description: "Layanan kesehatan komprehensif untuk tumbuh kembang optimal",
            icon: Heart,
            color: "bg-success",
        },
        {
            title: t("economy"),
            description: "Pemberdayaan ekonomi melalui pelatihan keterampilan dan wirausaha",
            icon: Building,
            color: "bg-warning",
        },
        {
            title: t("social"),
            description: "Program sosial untuk membangun karakter & kepedulian",
            icon: Users,
            color: "bg-error",
        },
    ];

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
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-15"
                >
                    <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                </video>

                {/* Liquid Glass Blobs */}
                <div className="absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-primary/30 blur-3xl animate-pulse" />
                <div className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-secondary/20 blur-3xl animate-pulse" />

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-heading drop-shadow text-foreground">
                            {t("heroTitle")}
                        </h1>
                        <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                            {t("heroSubtitle")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/donation">
                                <Button
                                    size="lg"
                                    className="btn-primary text-lg px-8 py-4 transition-all duration-[320ms] hover:scale-105"
                                >
                                    <Heart className="w-5 h-5 mr-2" />
                                    {t("donateNow")}
                                </Button>
                            </Link>
                            <Link to="/about">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="glass-card text-foreground hover:bg-primary/10 transition-all duration-[320ms]"
                                >
                                    {t("learnMore")}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-20 bg-muted">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center glass-card p-6 shadow-sm hover:shadow-lg transition-shadow duration-[320ms]"
                        >
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/80 mx-auto mb-4">
                                <stat.icon className="w-7 h-7 text-primary-foreground" />
                            </div>
                            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* PROGRAMS SECTION */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-heading text-foreground mb-10"
                    >
                        Program Kami
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {programs.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="glass-card h-full transition-all duration-[320ms] hover:scale-105 hover:shadow-lg">
                                    <CardHeader className="text-center">
                                        <div
                                            className={`w-16 h-16 ${p.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        >
                                            <p.icon className="w-8 h-8 text-primary-foreground" />
                                        </div>
                                        <CardTitle className="text-xl text-foreground">{p.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-muted-foreground text-center">
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
                        className="mt-12"
                    >
                        <Link to="/programs">
                            <Button size="lg" className="btn-accent hover:scale-105 transition-all duration-[320ms]">
                                {t("viewAll")} Program
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 relative overflow-hidden bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                <div className="absolute inset-0 bg-overlay" />
                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-heading"
                    >
                        Mari Bersama Membangun Masa Depan
                    </motion.h2>
                    <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                        Setiap donasi adalah investasi masa depan anak yatim Indonesia
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/donation">
                            <Button className="bg-card text-primary hover:bg-card/90 transition-all duration-[320ms]">
                                <Heart className="w-5 h-5 mr-2" />
                                Mulai Berdonasi
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" className="glass-card text-card-foreground hover:bg-card/20 transition-all duration-[320ms]">
                                Hubungi Kami
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;