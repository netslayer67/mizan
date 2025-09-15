import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LayoutDashboard, Newspaper, FolderHeart as HandHeart, BookOpen, User, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
    const { t } = useLanguage();
    const { toast } = useToast();

    const handleFeatureClick = () => {
        toast({
            title: "Fitur Belum Tersedia",
            description: t('featureNotImplemented'),
        });
    };

    const dashboardCards = [
        { title: "Total Donasi", value: "Rp 1.2M", icon: HandHeart, color: 'text-primary' },
        { title: "Berita Dipublikasi", value: "45", icon: Newspaper, color: 'text-accent' },
        { title: "Anak Yatim", value: "2,500", icon: User, color: 'text-secondary' },
        { title: "Publikasi", value: "35", icon: BookOpen, color: 'text-info' },
    ];

    return (
        <>
            <Helmet>
                <title>Admin Dashboard - Rumah Yatim Mizan</title>
            </Helmet>
            <div className="min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-between items-center mb-8"
                    >
                        <h1 className="text-4xl font-heading text-foreground tracking-wide">Admin Dashboard</h1>
                        <Button variant="destructive">Logout</Button>
                    </motion.div>

                    {/* Dashboard Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {dashboardCards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="glass-card transition-all duration-[320ms] hover:shadow-lg hover:scale-[1.02]">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium text-foreground">{card.title}</CardTitle>
                                        <card.icon className={`h-5 w-5 ${card.color}`} />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-foreground">{card.value}</div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tabs Section */}
                    <Tabs defaultValue="donations">
                        <TabsList className="grid w-full grid-cols-4 bg-card rounded-xl">
                            <TabsTrigger value="donations" className="transition-colors duration-[320ms] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                <HandHeart className="w-4 h-4 mr-2" />Donasi
                            </TabsTrigger>
                            <TabsTrigger value="news" className="transition-colors duration-[320ms] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                <Newspaper className="w-4 h-4 mr-2" />Berita
                            </TabsTrigger>
                            <TabsTrigger value="publications" className="transition-colors duration-[320ms] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                <BookOpen className="w-4 h-4 mr-2" />Publikasi
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="transition-colors duration-[320ms] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                <Settings className="w-4 h-4 mr-2" />Pengaturan
                            </TabsTrigger>
                        </TabsList>

                        {['donations', 'news', 'publications', 'settings'].map((tab) => (
                            <TabsContent key={tab} value={tab} className="mt-8">
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-medium text-foreground">
                                            {tab === 'donations' && 'Kelola Donasi'}
                                            {tab === 'news' && 'Kelola Berita'}
                                            {tab === 'publications' && 'Kelola Publikasi'}
                                            {tab === 'settings' && 'Pengaturan Admin'}
                                        </CardTitle>
                                        <CardDescription className="text-muted-foreground">
                                            {tab === 'donations' && 'Lihat dan kelola semua donasi.'}
                                            {tab === 'news' && 'Buat, edit, dan hapus berita terbaru.'}
                                            {tab === 'publications' && 'Unggah dan kelola publikasi resmi.'}
                                            {tab === 'settings' && 'Kelola akun admin dan pengaturan situs.'}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-center py-12">
                                        <p className="text-muted-foreground mb-4">Fitur ini belum tersedia.</p>
                                        <Button onClick={handleFeatureClick} className="transition-all duration-[320ms] hover:opacity-90">
                                            Minta Fitur
                                        </Button>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Admin;