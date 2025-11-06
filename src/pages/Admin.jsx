import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Newspaper,
    FolderHeart as HandHeart,
    BookOpen,
    User,
    Settings,
    Plus,
    Edit,
    Trash2,
    Upload,
    FileText,
    Image,
    Calendar,
    Eye,
    Download,
    BarChart3,
    TrendingUp,
    DollarSign,
    Users,
    Shield,
    Lock,
    Key,
    Save,
    X
} from 'lucide-react';
import { useLanguage, useTheme } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const Admin = React.memo(() => {
    const { t } = useLanguage();
    const { isDarkMode } = useTheme();
    const { toast } = useToast();

    // State management for different admin features
    const [activeTab, setActiveTab] = useState('dashboard');
    const [newsForm, setNewsForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        image: null,
        published: false
    });
    const [publications, setPublications] = useState([]);
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Mock data for demonstration
    const dashboardCards = useMemo(() => [
        {
            title: "Total Donasi",
            value: "Rp 1.2M",
            icon: HandHeart,
            color: 'text-success',
            trend: '+12%',
            description: "Total donasi yang terkumpul"
        },
        {
            title: "Berita Dipublikasi",
            value: "45",
            icon: Newspaper,
            color: 'text-primary',
            trend: '+3',
            description: "Artikel berita yang dipublikasikan"
        },
        {
            title: "Anak Yatim",
            value: "2,500",
            icon: User,
            color: 'text-secondary',
            trend: '+25',
            description: "Anak yang terlayani program"
        },
        {
            title: "Publikasi",
            value: "35",
            icon: BookOpen,
            color: 'text-info',
            trend: '+5',
            description: "Dokumen dan laporan resmi"
        },
    ], []);

    const newsCategories = useMemo(() => [
        'Program', 'Penghargaan', 'Kegiatan', 'Kemitraan', 'Sosial'
    ], []);

    const handleFeatureClick = () => {
        toast({
            title: "Fitur Belum Tersedia",
            description: t('featureNotImplemented'),
        });
    };

    // News management functions
    const handleNewsSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast({
                title: "Berita Berhasil Dibuat",
                description: "Berita telah dipublikasikan ke website.",
            });
            setNewsForm({
                title: '',
                excerpt: '',
                content: '',
                category: '',
                image: null,
                published: false
            });
            setIsLoading(false);
        }, 1500);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Basic validation
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast({
                    variant: "destructive",
                    title: "File Terlalu Besar",
                    description: "Ukuran file maksimal 5MB.",
                });
                return;
            }
            setNewsForm(prev => ({ ...prev, image: file }));
        }
    };

    // Publication management
    const handlePublicationUpload = (files) => {
        const newPublications = Array.from(files).map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date(),
            status: 'processing'
        }));

        setPublications(prev => [...prev, ...newPublications]);

        // Simulate processing
        setTimeout(() => {
            setPublications(prev =>
                prev.map(pub =>
                    newPublications.find(np => np.id === pub.id)
                        ? { ...pub, status: 'completed' }
                        : pub
                )
            );
            toast({
                title: "Publikasi Diunggah",
                description: `${files.length} file berhasil diunggah.`,
            });
        }, 2000);
    };

    // Donation monitoring
    const donationStats = useMemo(() => ({
        total: 1200000,
        thisMonth: 250000,
        pending: 15000,
        completed: 1185000
    }), []);

    return (
        <>
            <Helmet>
                <title>Admin Dashboard - Rumah Yatim Mizan</title>
                <meta name="description" content="Admin dashboard untuk mengelola konten, donasi, dan publikasi Rumah Yatim Mizan" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
                    >
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-foreground tracking-wide">
                                Admin Dashboard
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Kelola konten, donasi, dan publikasi website
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.location.reload()}
                                className="glass-card"
                            >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Refresh
                            </Button>
                            <Button variant="destructive" size="sm">
                                <Lock className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </motion.div>

                    {/* Dashboard Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 lg:mb-12">
                        {dashboardCards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="glass-card transition-all duration-[320ms] hover:shadow-lg hover:scale-[1.02] cursor-pointer group">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <div>
                                            <CardTitle className="text-sm font-medium text-foreground">{card.title}</CardTitle>
                                            <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                                        </div>
                                        <card.icon className={`h-5 w-5 ${card.color} transition-transform duration-[320ms] group-hover:scale-110`} />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-xl sm:text-2xl font-bold text-foreground">{card.value}</div>
                                        <div className="text-xs text-success flex items-center mt-1">
                                            <TrendingUp className="w-3 h-3 mr-1" />
                                            {card.trend}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Content Tabs */}
                    <Tabs defaultValue="dashboard" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 bg-card rounded-xl p-1 h-auto">
                            <TabsTrigger value="dashboard" className="transition-colors duration-[320ms] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2">
                                <LayoutDashboard className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </TabsTrigger>
                            <TabsTrigger value="news" className="transition-colors duration-[320ms] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2">
                                <Newspaper className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Berita</span>
                            </TabsTrigger>
                            <TabsTrigger value="publications" className="transition-colors duration-[320ms] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2">
                                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Publikasi</span>
                            </TabsTrigger>
                            <TabsTrigger value="donations" className="transition-colors duration-[320ms] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2">
                                <HandHeart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Donasi</span>
                            </TabsTrigger>
                            <TabsTrigger value="analytics" className="transition-colors duration-[320ms] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2">
                                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Analytics</span>
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="transition-colors duration-[320ms] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2">
                                <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">Settings</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Dashboard Tab */}
                        <TabsContent value="dashboard" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <BarChart3 className="w-5 h-5 mr-2" />
                                            Aktivitas Terbaru
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {[
                                            { action: "Berita baru dipublikasikan", time: "2 jam yang lalu", type: "news" },
                                            { action: "Donasi sebesar Rp 500.000 diterima", time: "4 jam yang lalu", type: "donation" },
                                            { action: "Laporan keuangan diunggah", time: "1 hari yang lalu", type: "publication" },
                                            { action: "5 anak baru terdaftar", time: "2 hari yang lalu", type: "user" }
                                        ].map((activity, i) => (
                                            <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-2 h-2 rounded-full ${activity.type === 'news' ? 'bg-primary' :
                                                        activity.type === 'donation' ? 'bg-success' :
                                                            activity.type === 'publication' ? 'bg-info' : 'bg-secondary'
                                                        }`} />
                                                    <span className="text-sm text-foreground">{activity.action}</span>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <TrendingUp className="w-5 h-5 mr-2" />
                                            Statistik Bulan Ini
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Total Donasi</span>
                                            <span className="text-lg font-semibold text-success">Rp 250K</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Berita Dipublikasi</span>
                                            <span className="text-lg font-semibold text-primary">12</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">File Diunggah</span>
                                            <span className="text-lg font-semibold text-info">8</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Pengunjung Website</span>
                                            <span className="text-lg font-semibold text-secondary">1,245</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* News Management Tab */}
                        <TabsContent value="news" className="space-y-6">
                            {/* Quick Stats for News */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Card className="glass-card">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Berita Bulan Ini</p>
                                                <p className="text-2xl font-bold text-primary">12</p>
                                            </div>
                                            <Newspaper className="w-8 h-8 text-primary/60" />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="glass-card">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Total Views</p>
                                                <p className="text-2xl font-bold text-secondary">8,542</p>
                                            </div>
                                            <Eye className="w-8 h-8 text-secondary/60" />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="glass-card">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Draft Berita</p>
                                                <p className="text-2xl font-bold text-warning">3</p>
                                            </div>
                                            <Edit className="w-8 h-8 text-warning/60" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="flex items-center">
                                            <Plus className="w-5 h-5 mr-2" />
                                            Buat Berita Baru
                                        </span>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline">
                                                <Eye className="w-4 h-4 mr-2" />
                                                Lihat Semua
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <FileText className="w-4 h-4 mr-2" />
                                                Draft
                                            </Button>
                                        </div>
                                    </CardTitle>
                                    <CardDescription>
                                        Publikasikan berita terbaru tentang program dan kegiatan Rumah Yatim Mizan
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleNewsSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="news-title">Judul Berita</Label>
                                                <Input
                                                    id="news-title"
                                                    value={newsForm.title}
                                                    onChange={(e) => setNewsForm(prev => ({ ...prev, title: e.target.value }))}
                                                    placeholder="Masukkan judul berita"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="news-category">Kategori</Label>
                                                <Select
                                                    value={newsForm.category}
                                                    onValueChange={(value) => setNewsForm(prev => ({ ...prev, category: value }))}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih kategori" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {newsCategories.map(cat => (
                                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="news-excerpt">Ringkasan</Label>
                                            <Textarea
                                                id="news-excerpt"
                                                value={newsForm.excerpt}
                                                onChange={(e) => setNewsForm(prev => ({ ...prev, excerpt: e.target.value }))}
                                                placeholder="Ringkasan singkat berita (max 200 karakter)"
                                                rows={3}
                                                maxLength={200}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="news-content">Konten Lengkap</Label>
                                            <Textarea
                                                id="news-content"
                                                value={newsForm.content}
                                                onChange={(e) => setNewsForm(prev => ({ ...prev, content: e.target.value }))}
                                                placeholder="Isi lengkap berita"
                                                rows={8}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="news-image">Gambar Utama</Label>
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-4">
                                                    <Input
                                                        id="news-image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => document.getElementById('news-image').click()}
                                                    >
                                                        <Upload className="w-4 h-4 mr-2" />
                                                        Pilih Gambar
                                                    </Button>
                                                    {newsForm.image && (
                                                        <div className="flex items-center space-x-2">
                                                            <Image className="w-4 h-4 text-success" />
                                                            <span className="text-sm text-muted-foreground">
                                                                {newsForm.image.name}
                                                            </span>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setNewsForm(prev => ({ ...prev, image: null }))}
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Format: JPG, PNG, WebP. Maksimal 5MB. Rekomendasi: 1200x800px
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="flex items-center space-x-3">
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={newsForm.published}
                                                        onChange={(e) => setNewsForm(prev => ({ ...prev, published: e.target.checked }))}
                                                        className="rounded border-border"
                                                    />
                                                    <span className="text-sm text-muted-foreground">Publikasikan langsung</span>
                                                </label>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setNewsForm({
                                                        title: '',
                                                        excerpt: '',
                                                        content: '',
                                                        category: '',
                                                        image: null,
                                                        published: false
                                                    })}
                                                >
                                                    <X className="w-4 h-4 mr-2" />
                                                    Reset
                                                </Button>
                                                <Button type="submit" disabled={isLoading} className="btn-primary">
                                                    {isLoading ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                                                            Menyimpan...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save className="w-4 h-4 mr-2" />
                                                            Publikasikan Berita
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Publications Tab */}
                        <TabsContent value="publications" className="space-y-6">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="flex items-center">
                                            <Upload className="w-5 h-5 mr-2" />
                                            Unggah Publikasi
                                        </span>
                                        <Button size="sm" variant="outline">
                                            <BookOpen className="w-4 h-4 mr-2" />
                                            Lihat Semua
                                        </Button>
                                    </CardTitle>
                                    <CardDescription>
                                        Unggah laporan keuangan, audit, dan dokumen resmi lainnya
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                        <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-medium text-foreground mb-2">
                                            Seret file ke sini atau klik untuk memilih
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            PDF, DOC, XLS (Maksimal 10MB per file)
                                        </p>
                                        <Input
                                            type="file"
                                            multiple
                                            accept=".pdf,.doc,.docx,.xls,.xlsx"
                                            onChange={(e) => handlePublicationUpload(e.target.files)}
                                            className="hidden"
                                            id="publication-upload"
                                        />
                                        <Button
                                            onClick={() => document.getElementById('publication-upload').click()}
                                            variant="outline"
                                        >
                                            Pilih File
                                        </Button>
                                    </div>

                                    {publications.length > 0 && (
                                        <div className="mt-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-foreground">File yang Diupload ({publications.length})</h4>
                                                <Button size="sm" variant="outline" onClick={() => setPublications([])}>
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Hapus Semua
                                                </Button>
                                            </div>
                                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                                {publications.map((pub) => (
                                                    <div key={pub.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
                                                        <div className="flex items-center space-x-3">
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${pub.status === 'completed' ? 'bg-success/10' :
                                                                pub.status === 'processing' ? 'bg-warning/10' : 'bg-error/10'
                                                                }`}>
                                                                <FileText className={`w-5 h-5 ${pub.status === 'completed' ? 'text-success' :
                                                                    pub.status === 'processing' ? 'text-warning' : 'text-error'
                                                                    }`} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium truncate">{pub.name}</p>
                                                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                                                    <span>{(pub.size / 1024 / 1024).toFixed(2)} MB</span>
                                                                    <span>•</span>
                                                                    <span className={`px-2 py-1 rounded-full text-xs ${pub.status === 'completed' ? 'bg-success/10 text-success' :
                                                                        pub.status === 'processing' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                                                                        }`}>
                                                                        {pub.status === 'completed' ? 'Selesai' :
                                                                            pub.status === 'processing' ? 'Memproses...' : 'Gagal'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            {pub.status === 'completed' && (
                                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                                    <Eye className="w-4 h-4" />
                                                                </Button>
                                                            )}
                                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                                <Download className="w-4 h-4" />
                                                            </Button>
                                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-error hover:text-error">
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Donations Tab */}
                        <TabsContent value="donations" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="glass-card">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg flex items-center">
                                            <DollarSign className="w-5 h-5 mr-2 text-success" />
                                            Total Donasi
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-success">
                                            Rp {donationStats.total.toLocaleString('id-ID')}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            +12% dari bulan lalu
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="glass-card">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg flex items-center">
                                            <Calendar className="w-5 h-5 mr-2 text-primary" />
                                            Bulan Ini
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-primary">
                                            Rp {donationStats.thisMonth.toLocaleString('id-ID')}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            45 donatur
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="glass-card">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg flex items-center">
                                            <Users className="w-5 h-5 mr-2 text-warning" />
                                            Pending
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-warning">
                                            Rp {donationStats.pending.toLocaleString('id-ID')}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Menunggu konfirmasi
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>Donasi Terbaru</CardTitle>
                                    <CardDescription>
                                        Monitor dan kelola donasi yang masuk
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { name: "Ahmad S.", amount: 500000, date: "2024-01-15", status: "completed" },
                                            { name: "Siti R.", amount: 250000, date: "2024-01-14", status: "completed" },
                                            { name: "Budi K.", amount: 1000000, date: "2024-01-13", status: "pending" },
                                            { name: "Maya L.", amount: 75000, date: "2024-01-12", status: "completed" }
                                        ].map((donation, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                        <Users className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground">{donation.name}</p>
                                                        <p className="text-sm text-muted-foreground">{donation.date}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-foreground">
                                                        Rp {donation.amount.toLocaleString('id-ID')}
                                                    </p>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${donation.status === 'completed'
                                                        ? 'bg-success/10 text-success'
                                                        : 'bg-warning/10 text-warning'
                                                        }`}>
                                                        {donation.status === 'completed' ? 'Selesai' : 'Pending'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Analytics Tab */}
                        <TabsContent value="analytics" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle>Website Traffic</CardTitle>
                                        <CardDescription>Pengunjung website dalam 30 hari terakhir</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-primary mb-2">2,847</div>
                                        <div className="flex items-center text-sm text-success">
                                            <TrendingUp className="w-4 h-4 mr-1" />
                                            +23% dari bulan lalu
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Halaman Home</span>
                                                <span className="font-medium">1,245</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Halaman Donasi</span>
                                                <span className="font-medium">892</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Halaman Program</span>
                                                <span className="font-medium">567</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="glass-card">
                                    <CardHeader>
                                        <CardTitle>Engagement Rate</CardTitle>
                                        <CardDescription>Interaksi pengguna dengan konten</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold text-secondary mb-2">68%</div>
                                        <div className="flex items-center text-sm text-success">
                                            <TrendingUp className="w-4 h-4 mr-1" />
                                            +5% dari bulan lalu
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Berita Dibaca</span>
                                                <span className="font-medium">1,847</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Donasi Diterima</span>
                                                <span className="font-medium">156</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Kontak Masuk</span>
                                                <span className="font-medium">43</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Settings Tab */}
                        <TabsContent value="settings" className="space-y-6">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Settings className="w-5 h-5 mr-2" />
                                        Pengaturan Admin
                                    </CardTitle>
                                    <CardDescription>
                                        Kelola akun admin dan pengaturan website
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <h4 className="font-medium text-foreground">Informasi Akun</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label>Nama Admin</Label>
                                                    <Input defaultValue="Admin Rumah Yatim Mizan" />
                                                </div>
                                                <div>
                                                    <Label>Email</Label>
                                                    <Input type="email" defaultValue="admin@rumahyatimmizan.org" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-medium text-foreground">Keamanan</h4>
                                            <div className="space-y-3">
                                                <Button variant="outline" className="w-full justify-start">
                                                    <Key className="w-4 h-4 mr-2" />
                                                    Ubah Password
                                                </Button>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <Shield className="w-4 h-4 mr-2" />
                                                    Two-Factor Authentication
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t">
                                        <div className="space-y-2">
                                            <h5 className="font-medium text-foreground">Bahaya: Pengaturan Sistem</h5>
                                            <p className="text-sm text-muted-foreground">
                                                Perubahan pada pengaturan ini dapat mempengaruhi fungsionalitas website
                                            </p>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Button variant="outline" onClick={handleFeatureClick}>
                                                <X className="w-4 h-4 mr-2" />
                                                Batal
                                            </Button>
                                            <Button className="btn-primary" onClick={handleFeatureClick}>
                                                <Save className="w-4 h-4 mr-2" />
                                                Simpan Perubahan
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
});

Admin.displayName = 'Admin';

export default Admin;