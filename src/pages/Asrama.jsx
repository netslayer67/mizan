import React, { useMemo, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Users, Building, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

/*
  Refactor highlights (see comments in code):
  - Smaller components inside single file for clarity (Hero, StatsGrid, LocationCard, CTA, DonationForm)
  - Uses provided design tokens (tailwind variables) only — no hardcoded colors
  - Glass / liquid-card effect using backdrop blur + subtle gradient + border
  - Smooth transitions using Tailwind/JIT arbitrary duration (320ms)
  - Performance: React.memo on LocationCard, useMemo for lists, lazy images
  - Basic client-side input sanitization and validation for donation form
  - Compact mobile layout (condensed cards / icons) and accessible markup
*/

// --- simple sanitizer to avoid scripts, links, and suspicious payloads on client-side inputs ---
const sanitizeInput = (value = '') => {
    if (typeof value !== 'string') return '';
    // strip HTML tags
    let s = value.replace(/<[^>]*>?/gm, '');
    // disallow javascript: or data: or other protocols often used in attacks
    s = s.replace(/(javascript:|data:|vbscript:)/gi, '');
    // remove common suspicious patterns
    s = s.replace(/(\bhttps?:\/\/|\bwww\.)/gi, '');
    // collapse excessive whitespace
    s = s.replace(/\s{2,}/g, ' ').trim();
    // limit length to reasonable input
    return s.slice(0, 240);
};

const LiquidCard = ({ children, className = '', ...props }) => (
    <div
        className={`glass-card transition-all duration-[320ms] ease-[cubic-bezier(.2,.8,.2,1)] shadow-lg ${className}`}
        {...props}
    >
        {children}
    </div>
);

const Hero = ({ title, subtitle }) => (
    <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full blur-3xl opacity-30 animated-gradient" aria-hidden="true" />
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full blur-xl bg-accent/20" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading drop-shadow text-foreground">{title}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">{subtitle}</p>
            </motion.div>
        </div>
    </section>
);

const StatsGrid = ({ stats }) => (
    <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((s, i) => (
                        <LiquidCard key={i} className="p-6 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/90 text-primary-foreground">
                                <s.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xl font-semibold text-foreground">{s.value}</div>
                                <div className="text-sm text-text-subtle">{s.label}</div>
                            </div>
                        </LiquidCard>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

// memoized location card for perf
const LocationCard = React.memo(function LocationCard({ asrama, onDetail }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
        >
            <LiquidCard className="overflow-hidden flex flex-col h-full">
                <div className="relative h-40 md:h-44 w-full">
                    <img
                        loading="lazy"
                        decoding="async"
                        alt={`${asrama.name} building`}
                        src={`https://images.unsplash.com/photo-1689239404320-1f8ff60672e4?q=80&w=1600&fit=crop`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium bg-primary/95 text-primary-foreground">
                        {asrama.currentOccupancy}/{asrama.capacity}
                    </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <header className="mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{asrama.name}</h3>
                        <p className="mt-1 text-sm text-text-secondary flex items-start">
                            <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" /> {asrama.address}
                        </p>
                    </header>

                    <div className="mt-auto flex flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                            {asrama.facilities.map((f, idx) => (
                                <span key={idx} className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">{f}</span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="text-sm text-text-secondary flex flex-col">
                                <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> <span>{asrama.phone}</span></span>
                                <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> <span>{asrama.email}</span></span>
                            </div>

                            <div className="flex-shrink-0">
                                <Button className="btn-primary transition-all duration-[320ms]" onClick={() => onDetail(asrama)}>
                                    Lihat
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </LiquidCard>
        </motion.article>
    );
});

const CTA = ({ onDonate }) => (
    <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <LiquidCard className="p-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Bantu kami buka asrama baru</h2>
                <p className="mt-2 text-text-secondary">Dukungan Anda membuka jalan bagi lebih banyak anak untuk mendapat rumah yang layak.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" className="btn-primary px-6" onClick={onDonate}>Donasi Sekarang</Button>
                    <Button size="lg" variant="outline" className="px-6" onClick={() => { /* fallback: navigate to locations */ }}>
                        Telusuri Asrama
                    </Button>
                </div>
            </LiquidCard>
        </div>
    </section>
);

function DonationForm({ onSuccess }) {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const validate = useCallback(() => {
        const cleanName = sanitizeInput(name);
        const cleanNote = sanitizeInput(note);
        const numeric = Number(amount);
        if (!cleanName) return { ok: false, msg: 'Nama tidak boleh kosong' };
        if (!numeric || numeric <= 0) return { ok: false, msg: 'Masukkan nominal valid' };
        if (cleanNote.length > 200) return { ok: false, msg: 'Catatan terlalu panjang' };
        return { ok: true, cleanName, cleanNote, numeric };
    }, [name, amount, note]);

    const submit = useCallback((e) => {
        e.preventDefault();
        const v = validate();
        if (!v.ok) {
            toast({ title: 'Kesalahan', description: v.msg });
            return;
        }
        // Here we'd normally call an API; for now simulate success
        toast({ title: 'Terima kasih', description: 'Donasi Anda sangat berarti' });
        setName(''); setAmount(''); setNote('');
        onSuccess && onSuccess({ name: v.cleanName, amount: v.numeric, note: v.cleanNote });
    }, [validate, onSuccess, toast]);

    return (
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div className="sm:col-span-1">
                <label className="block text-sm text-text-secondary mb-1">Nama</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkap"
                    className="w-full rounded-md border border-border px-3 py-2 bg-card text-card-foreground transition-all duration-[320ms]"
                    aria-label="Nama donatur"
                />
            </div>

            <div className="sm:col-span-1">
                <label className="block text-sm text-text-secondary mb-1">Nominal (IDR)</label>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="100000"
                    inputMode="numeric"
                    className="w-full rounded-md border border-border px-3 py-2 bg-card text-card-foreground transition-all duration-[320ms]"
                    aria-label="Nominal donasi"
                />
            </div>

            <div className="sm:col-span-1">
                <label className="block text-sm text-text-secondary mb-1">Catatan (opsional)</label>
                <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Untuk pembangunan asrama"
                    className="w-full rounded-md border border-border px-3 py-2 bg-card text-card-foreground transition-all duration-[320ms]"
                    aria-label="Catatan donasi"
                />
            </div>

            <div className="sm:col-span-3">
                <div className="flex justify-end">
                    <Button type="submit" className="btn-primary px-6">Donasi Aman</Button>
                </div>
            </div>
        </form>
    );
}

export default function Asrama() {
    const { t } = useLanguage();
    const { toast } = useToast();

    const asramaLocations = useMemo(() => [
        {
            name: 'Asrama Jakarta Timur',
            address: 'Jl. Raya Bogor KM 24, Cijantung, Jakarta Timur 13770',
            capacity: 120,
            currentOccupancy: 95,
            facilities: ['Ruang Belajar', 'Perpustakaan', 'Masjid', 'Klinik'],
            phone: '+62 21 8400 8080',
            email: 'jakarta@rumahyatimmizan.org'
        },
        { name: 'Asrama Bandung', address: 'Jl. Soekarno Hatta No. 456, Bandung', capacity: 80, currentOccupancy: 72, facilities: ['Ruang Belajar', 'Lab Komputer'], phone: '+62 22 7564 3210', email: 'bandung@rumahyatimmizan.org' },
        { name: 'Asrama Surabaya', address: 'Jl. Ahmad Yani No. 123, Surabaya', capacity: 100, currentOccupancy: 88, facilities: ['Ruang Seni', 'Kantin'], phone: '+62 31 5678 9012', email: 'surabaya@rumahyatimmizan.org' },
        { name: 'Asrama Medan', address: 'Jl. Gatot Subroto No. 789, Medan', capacity: 90, currentOccupancy: 76, facilities: ['Lab Sains', 'Area Parkir'], phone: '+62 61 4567 8901', email: 'medan@rumahyatimmizan.org' },
        { name: 'Asrama Makassar', address: 'Jl. Veteran No. 321, Makassar', capacity: 70, currentOccupancy: 65, facilities: ['Ruang Makan', 'Lapangan Futsal'], phone: '+62 411 234 5678', email: 'makassar@rumahyatimmizan.org' },
        { name: 'Asrama Yogyakarta', address: 'Jl. Malioboro No. 567, Yogyakarta', capacity: 85, currentOccupancy: 79, facilities: ['Studio Musik', 'Taman Baca'], phone: '+62 274 567 8901', email: 'yogyakarta@rumahyatimmizan.org' }
    ], []);

    const stats = useMemo(() => [
        { icon: Building, value: '25+', label: 'Total Asrama' },
        { icon: Users, value: '2,500+', label: 'Anak Terlayani' },
        { icon: MapPin, value: '15+', label: 'Kota di Indonesia' },
    ], []);

    const handleFeatureClick = useCallback(() => {
        toast({ title: 'Fitur Belum Tersedia', description: t('featureNotImplemented') });
    }, [toast, t]);

    const handleDonate = useCallback(() => {
        // open donation modal / scroll to donation form
        toast({ title: 'Form Donasi', description: 'Scroll ke formulir donasi di bawah (versi contoh)' });
        // optionally scroll to form id
        document.getElementById('donation-form')?.scrollIntoView({ behavior: 'smooth' });
    }, [toast]);

    const handleDetail = useCallback((asrama) => {
        toast({ title: asrama.name, description: asrama.address });
    }, [toast]);

    return (
        <>
            <Helmet>
                <title>Asrama - Rumah Yatim Mizan</title>
                <meta name="description" content="Lokasi asrama dan cara berdonasi untuk Rumah Yatim Mizan" />
            </Helmet>

            <main>
                <Hero title={t('asrama') || 'Asrama Rumah Yatim Mizan'} subtitle={'Tempat aman, nyaman, dan penuh asuhan untuk anak-anak yatim.'} />

                <section className="max-w-6xl mx-auto px-4">
                    <StatsGrid stats={stats} />

                    <section className="py-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl md:text-2xl font-semibold text-foreground">Lokasi Asrama Kami</h2>
                            {/* <div className="text-sm text-text-secondary">Tersedia di beberapa provinsi—pilih yang terdekat</div> */}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {asramaLocations.map((a, idx) => (
                                <LocationCard key={idx} asrama={a} onDetail={handleDetail} />
                            ))}
                        </div>
                    </section>

                    <CTA onDonate={handleDonate} />

                    {/* <section id="donation-form" className="py-8">
                        <LiquidCard className="p-6">
                            <h3 className="text-lg font-medium text-foreground">Donasi Cepat</h3>
                            <p className="text-sm text-text-secondary mb-4">Donasi diproses aman. Form ini punya validasi dasar untuk mencegah input berbahaya.</p>
                            <DonationForm onSuccess={(data) => console.log('donation', data)} />
                        </LiquidCard>
                    </section> */}
                </section>

            </main>
        </>
    );
}
