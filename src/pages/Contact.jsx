import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Contact = React.memo(() => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Enhanced sanitization to prevent XSS, script injection, and malicious URLs
        const cleanValue = value
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/javascript:|data:|vbscript:|on\w+=/gi, '') // Remove dangerous protocols
            .replace(/(https?:\/\/[^\s]+)/gi, '') // Remove URLs
            .replace(/[^\w\s@.-]/g, '') // Allow only safe characters
            .trim();
        setFormData(prev => ({ ...prev, [name]: cleanValue }));
    };

    const contactInfo = useMemo(() => [
        {
            icon: MapPin,
            title: 'Alamat Kantor Pusat',
            value: 'Jl. Raya Bogor KM 24, Cijantung, Jakarta Timur 13770',
            ariaLabel: 'Office address: Jl. Raya Bogor KM 24, Cijantung, Jakarta Timur 13770'
        },
        {
            icon: Phone,
            title: 'Telepon & WhatsApp',
            value: '+62 21 8400 8080',
            ariaLabel: 'Phone and WhatsApp: +62 21 8400 8080'
        },
        {
            icon: Mail,
            title: 'Email',
            value: 'info@rumahyatimmizan.org',
            ariaLabel: 'Email: info@rumahyatimmizan.org'
        }
    ], []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, subject, message } = formData;
        if (!name || !email || !subject || !message) {
            toast({
                variant: "destructive",
                title: "Formulir Tidak Lengkap",
                description: "Semua kolom wajib diisi.",
            });
            return;
        }
        toast({
            title: "Fitur Belum Tersedia",
            description: t('featureNotImplemented'),
        });
    };


    return (
        <>
            <Helmet>
                <title>Kontak - Rumah Yatim Mizan</title>
                <meta name="description" content="Hubungi Rumah Yatim Mizan untuk informasi lebih lanjut, kemitraan, atau pertanyaan lainnya. Kami siap membantu Anda." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 animated-gradient overflow-hidden text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground drop-shadow mb-4">
                        {t('contact')}
                    </h1>
                    <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                        Kami siap membantu Anda. Hubungi kami melalui formulir, email, atau telepon.
                    </p>
                </motion.div>
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-accent/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            </section>

            {/* Main Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card className="glass-card shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl text-foreground">Kirim Pesan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nama</Label>
                                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subjek</Label>
                                        <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Pesan</Label>
                                        <Textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} required />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full btn-primary transition-all duration-300">
                                        <Send className="w-5 h-5 mr-2" />
                                        Kirim Pesan
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-heading text-foreground mb-4">Informasi Kontak</h2>
                            <p className="text-muted-foreground text-base max-w-md">
                                Anda juga dapat menghubungi kami langsung melalui informasi berikut.
                            </p>
                        </div>
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                        <info.icon className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">{info.title}</h3>
                                        <p className="text-muted-foreground text-sm">{info.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Map Section */}
            <section className="bg-muted">
                <div className="max-w-7xl mx-auto h-80 md:h-96">
                    <iframe
                        src="https://www.openstreetmap.org/export/embed.html?bbox=106.8400, -6.3200, 106.8600, -6.3000&layer=mapnik&marker=-6.3100,106.8500"
                        style={{ border: 0, width: '100%', height: '100%' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Lokasi Kantor Pusat Rumah Yatim Mizan"
                    ></iframe>
                </div>
            </section>
        </>
    );
});

Contact.displayName = 'Contact';

export default Contact;