import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

const Donation = React.memo(() => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [amount, setAmount] = useState(100000);
    const [customAmount, setCustomAmount] = useState('');
    const [donationType, setDonationType] = useState('preset');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    const presetAmounts = useMemo(() => [50000, 100000, 250000, 500000, 1000000], []);

    const handleFeatureClick = () => {
        toast({
            title: "Fitur Belum Tersedia",
            description: t('featureNotImplemented'),
        });
    };

    const handleAmountChange = (value) => {
        setDonationType('preset');
        setAmount(value);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setDonationType('custom');
        setCustomAmount(value);
        setAmount(Number(value));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Sanitize input to prevent XSS and malicious content
        const sanitizedValue = value.replace(/<[^>]*>/g, '').replace(/javascript:|data:|vbscript:|on\w+=/gi, '').trim();
        setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount <= 0) {
            toast({
                variant: "destructive",
                title: "Jumlah Donasi Tidak Valid",
                description: "Silakan masukkan jumlah donasi yang valid.",
            });
            return;
        }
        if (!formData.name || !formData.email) {
            toast({
                variant: "destructive",
                title: "Informasi Tidak Lengkap",
                description: "Nama dan email wajib diisi.",
            });
            return;
        }
        handleFeatureClick();
    };

    const impactData = useMemo(() => [
        { amount: 50000, text: "Bantuan perlengkapan sekolah untuk 1 anak" },
        { amount: 100000, text: "Bantuan gizi seimbang selama 1 minggu untuk 1 anak" },
        { amount: 250000, text: "Biaya kesehatan rutin untuk 1 anak selama 1 bulan" },
        { amount: 500000, text: "Bantuan biaya pendidikan selama 1 bulan untuk 1 anak" },
        { amount: 1000000, text: "Beasiswa penuh untuk 1 anak selama 1 semester di sekolah favorit" },
    ], []);

    const getImpactText = () => {
        let impact = impactData[0].text;
        for (let i = impactData.length - 1; i >= 0; i--) {
            if (amount >= impactData[i].amount) {
                impact = impactData[i].text;
                break;
            }
        }
        return `Donasi Anda dapat memberikan: ${impact}`;
    };

    return (
        <>
            <Helmet>
                <title>Donasi - Rumah Yatim Mizan</title>
                <meta name="description" content="Salurkan donasi Anda untuk mendukung program pendidikan, kesehatan, dan pemberdayaan anak yatim di Rumah Yatim Mizan. Setiap donasi Anda sangat berarti." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 gradient-bg overflow-hidden">
                <div className="absolute inset-0 pattern-dots"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-broken-white mb-6">
                            {t('donateNow')}
                        </h1>
                        <p className="text-xl text-broken-white/90 max-w-3xl mx-auto">
                            Setiap donasi Anda adalah investasi untuk masa depan yang lebih baik bagi anak-anak yatim Indonesia.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Donation Form */}
            <section className="section-padding bg-mizan-light-gray">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-0 shadow-2xl">
                            <form onSubmit={handleSubmit}>
                                <CardHeader className="text-center bg-broken-white p-8 rounded-t-lg">
                                    <Heart className="w-12 h-12 text-mizan-blue mx-auto mb-4" />
                                    <CardTitle className="text-3xl text-mizan-dark">
                                        {t('donationAmount')}
                                    </CardTitle>
                                    <CardDescription className="text-mizan-gray">
                                        Pilih atau masukkan jumlah donasi Anda
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-8 space-y-8">
                                    <div className="bg-mizan-blue/10 p-6 rounded-lg text-center">
                                        <div className="text-4xl font-bold text-mizan-blue mb-2">
                                            Rp {new Intl.NumberFormat('id-ID').format(amount)}
                                        </div>
                                        <p className="text-mizan-gray">{getImpactText()}</p>
                                    </div>

                                    <div>
                                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                                            {presetAmounts.map((preset) => (
                                                <Button
                                                    key={preset}
                                                    type="button"
                                                    variant={donationType === 'preset' && amount === preset ? 'default' : 'outline'}
                                                    className={`h-12 text-md ${donationType === 'preset' && amount === preset ? 'btn-primary' : 'bg-white'}`}
                                                    onClick={() => handleAmountChange(preset)}
                                                >
                                                    {new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(preset)}
                                                </Button>
                                            ))}
                                        </div>

                                        <div className="relative">
                                            <Label htmlFor="custom-amount" className="sr-only">{t('customAmount')}</Label>
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mizan-gray">Rp</span>
                                            <Input
                                                id="custom-amount"
                                                type="text"
                                                placeholder={t('customAmount')}
                                                className="pl-10 h-12 text-lg"
                                                value={customAmount}
                                                onChange={handleCustomAmountChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="border-t pt-8 space-y-6">
                                        <CardTitle className="text-2xl text-mizan-dark text-center">
                                            {t('donorInfo')}
                                        </CardTitle>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">{t('fullName')}</Label>
                                                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">{t('email')}</Label>
                                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">{t('phone')}</Label>
                                            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">{t('message')}</Label>
                                            <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} />
                                        </div>
                                    </div>

                                    <Button type="submit" size="lg" className="w-full btn-primary text-lg">
                                        Lanjut ke Pembayaran <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>

                                    <div className="flex items-center justify-center text-sm text-mizan-gray">
                                        <Lock className="w-4 h-4 mr-2" />
                                        Transaksi aman dan terenkripsi
                                    </div>
                                </CardContent>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Why Donate Section */}
            <section className="section-padding bg-broken-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-mizan-dark mb-6">
                            Mengapa Berdonasi Melalui Kami?
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: CheckCircle, title: 'Terverifikasi & Amanah', description: 'Lembaga resmi terdaftar dan diawasi oleh pemerintah.' },
                            { icon: CheckCircle, title: 'Transparan', description: 'Laporan keuangan dan program dipublikasikan secara berkala.' },
                            { icon: CheckCircle, title: 'Dampak Nyata', description: 'Program terstruktur untuk hasil yang terukur dan berkelanjutan.' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full border-0 shadow-lg card-hover text-center">
                                    <CardHeader>
                                        <div className="w-16 h-16 bg-mizan-green rounded-full flex items-center justify-center mx-auto mb-4">
                                            <item.icon className="w-8 h-8 text-broken-white" />
                                        </div>
                                        <CardTitle className="text-xl text-mizan-dark">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-mizan-gray">{item.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
});

Donation.displayName = 'Donation';

export default Donation;