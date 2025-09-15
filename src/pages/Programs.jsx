import React, { useMemo, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
    GraduationCap,
    Heart,
    Building,
    Users,
    BookOpen,
    ArrowRight,
    ExternalLink,
} from 'lucide-react';
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

/**
 * Programs.refactor.jsx
 * - Compact, token-driven UI
 * - Liquid glass aesthetic using provided tokens (no hardcoded colors)
 * - Smooth transitions (320ms)
 * - Defensive input validation for donation form
 * - Mobile-first compact variant
 */

// -------------------- Utilities --------------------
const sanitizeText = (s) => {
    if (typeof s !== 'string') return '';
    return s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

// very conservative URL blocker for text fields (no links, scripts, data that aren't allowed)
const containsForbiddenPatterns = (s = '') => {
    const lowered = String(s).toLowerCase();
    // block common protocol tokens and angle brackets
    return /(<|>|javascript:|data:|document\.|window\.|fetch\(|ajax\(|http:\/\/|https:\/\/)/i.test(lowered);
};

const motionCfg = { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.32 }, viewport: { once: true } };

// tiny helper to prefer safe images
const safeImage = (url) => {
    try {
        if (!url) return null;
        const u = new URL(url);
        if (u.protocol === 'https:') return url;
    } catch (e) { }
    return null;
};

// -------------------- Presentational pieces --------------------
const DecorativeBlob = ({ side = 'left', className = '' }) => (
    <svg
        aria-hidden
        className={`absolute ${side === 'left' ? '-left-16 -top-12' : '-right-16 -bottom-12'} w-64 h-64 opacity-25 blur-3xl transform-gpu ${className}`}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="g1b" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
            </linearGradient>
        </defs>
        <path fill="url(#g1b)" d="M48.7,-31.4C62.7,-14.9,73.5,6.4,67,24.3C60.6,42.2,36.9,56.6,12.8,59.3C-11.3,62.1,-35.9,53.2,-51.7,35.3C-67.5,17.5,-74.6,-8.1,-64.4,-27C-54.1,-46,-26.8,-58.4,-3.1,-57.6C20.7,-56.8,41.6,-42,48.7,-31.4Z" transform="translate(100 100)" />
    </svg>
);

const ProgramCard = React.memo(function ProgramCard({ program, onLearn }) {
    const title = sanitizeText(program.title || '');
    const desc = sanitizeText(program.description || '');
    const details = Array.isArray(program.details) ? program.details.map(sanitizeText) : [];
    const image = safeImage(program.image);

    return (
        <article className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <motion.div {...motionCfg} className="order-2 lg:order-1">
                <Card className="glass-card border-0 shadow-md p-5 lg:p-7">
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center glass-card shrink-0">
                                {program.icon ? <program.icon className="w-5 h-5 text-foreground" /> : null}
                            </div>
                            <div>
                                <CardTitle className="text-xl md:text-2xl font-semibold leading-tight">{title}</CardTitle>
                                <CardDescription className="text-sm text-text-secondary mt-1 max-w-lg">{desc}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-secondary">
                            {details.slice(0, 6).map((d, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <ArrowRight className="w-3 h-3 shrink-0 text-foreground/70" />
                                    <span className="truncate">{d}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-5 flex items-center gap-3">
                            <Button
                                className="btn-primary transition-all duration-320 ease-in-out flex items-center gap-2"
                                onClick={() => onLearn(title)}
                            >
                                Pelajari
                                <ArrowRight className="w-4 h-4" />
                            </Button>

                            <Button
                                variant="ghost"
                                className="hidden sm:inline-flex"
                                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                            >
                                Donasi untuk program
                                <Heart className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div {...motionCfg} className="order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-56 md:h-64 lg:h-72">
                    {image ? (
                        <img
                            src={image}
                            alt={`${title} visual`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-card/30">
                            <span className="text-sm text-muted-foreground">Gambar tidak tersedia</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>
            </motion.div>
        </article>
    );
});

const StatCard = ({ stat }) => (
    <Card className="text-center border-0 shadow-sm p-4 glass-card">
        <CardHeader>
            <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center glass-card">
                {stat.icon ? <stat.icon className="w-5 h-5 text-foreground" /> : null}
            </div>
            <CardTitle className="text-xl font-semibold">{sanitizeText(stat.value)}</CardTitle>
            <CardDescription className="text-sm text-text-secondary">{sanitizeText(stat.label)}</CardDescription>
        </CardHeader>
    </Card>
);

// -------------------- Donation Form (defensive) --------------------
const DonationForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');

    const validate = useCallback(() => {
        if (!name.trim() || containsForbiddenPatterns(name)) return 'Nama tidak valid.';
        if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(amount)) return 'Jumlah harus angka (maks 2 desimal).';
        if (containsForbiddenPatterns(note)) return 'Catatan mengandung karakter terlarang.';
        return '';
    }, [name, amount, note]);

    const submit = (e) => {
        e.preventDefault();
        const v = validate();
        if (v) return setError(v);
        setError('');
        onSubmit({ name: sanitizeText(name), amount: sanitizeText(amount), note: sanitizeText(note) });
        setName('');
        setAmount('');
        setNote('');
    };

    return (
        <form onSubmit={submit} className="w-full max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                    aria-label="Nama"
                    placeholder="Nama (opsional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input p-3 rounded-lg border border-border focus:ring-2 focus:ring-offset-0 focus:ring-primary transition duration-320"
                />

                <input
                    aria-label="Jumlah"
                    placeholder="Jumlah (IDR)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input p-3 rounded-lg border border-border focus:ring-2 focus:ring-offset-0 focus:ring-primary transition duration-320"
                />

                <input
                    aria-label="Catatan singkat"
                    placeholder="Catatan (opsional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="input p-3 rounded-lg border border-border focus:ring-2 focus:ring-offset-0 focus:ring-primary transition duration-320"
                />
            </div>

            {error ? <p className="mt-2 text-sm text-error">{error}</p> : null}

            <div className="mt-4 flex items-center gap-3 justify-center">
                <Button type="submit" className="btn-primary transition-transform duration-320 hover:-translate-y-0.5">
                    Donasi Aman
                </Button>
                <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => window.open('#', '_blank')}>
                    Metode lain <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </form>
    );
};

// -------------------- Main Component --------------------
const Programs = () => {
    const { t } = useLanguage();
    const { toast } = useToast?.() || {};

    const handleFeatureClick = useCallback(
        (ctx) => {
            const safe = sanitizeText(ctx || '');
            if (toast) {
                toast({ title: safe || 'Fitur', description: t('featureNotImplemented') || 'Fitur sedang dikembangkan' });
            } else {
                // fallback
                alert(safe || 'Fitur sedang dikembangkan');
            }
        },
        [toast, t]
    );

    const programs = useMemo(
        () => [
            {
                title: t('education') || 'Pendidikan',
                description: 'Pendidikan & beasiswa untuk pertumbuhan mereka',
                icon: GraduationCap,
                image: 'https://images.unsplash.com/photo-1591206246224-04b4624adef4',
                details: ['SD - SMA', 'Beasiswa', 'Bimbingan belajar', 'Soft skills'],
            },
            {
                title: t('health') || 'Kesehatan',
                description: 'Layanan kesehatan & gizi',
                icon: Heart,
                image: 'https://images.unsplash.com/photo-1580281657521-3b1b3c9b9f9e',
                details: ['Pemeriksaan rutin', 'Imunisasi', 'Gizi', 'Konseling'],
            },
            {
                title: t('economy') || 'Pemberdayaan',
                description: 'Pelatihan keterampilan & wirausaha',
                icon: Building,
                image: 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec',
                details: ['Pelatihan teknis', 'Wirausaha', 'Magang', 'Modal mikro'],
            },
            {
                title: t('dawah') || 'Pembinaan',
                description: 'Pembinaan spiritual dan karakter',
                icon: BookOpen,
                image: 'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa',
                details: ['Tahfidz', 'Kajian', 'Akhlak', 'Dakwah'],
            },
            {
                title: t('social') || 'Sosial',
                description: 'Program sosial dan kepedulian',
                icon: Users,
                image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
                details: ['Bakti sosial', 'Lingkungan', 'Leadership', 'Keterampilan hidup'],
            },
        ],
        [t]
    );

    const stats = useMemo(
        () => [
            { value: '1,800+', label: 'Lulusan Berprestasi', icon: GraduationCap },
            { value: '2,500+', label: 'Anak Terlayani', icon: Heart },
            { value: '450+', label: 'Wirausaha Muda', icon: Building },
            { value: '300+', label: 'Hafidz', icon: BookOpen },
        ],
        []
    );

    const handleDonation = useCallback((payload) => {
        // defensive server handoff would be here; we simulate success toast
        if (containsForbiddenPatterns(payload.name) || containsForbiddenPatterns(payload.note)) {
            return handleFeatureClick('Input tidak valid');
        }
        if (toast) {
            toast({ title: 'Terima kasih', description: `Donasi ${payload.amount} diterima (simulasi).` });
        } else alert(`Terima kasih — ${payload.amount}`);
    }, [toast, handleFeatureClick]);

    return (
        <>
            <Helmet>
                <title>Program Kami - Rumah Yatim Mizan</title>
                <meta name="description" content="Program Rumah Yatim Mizan: pendidikan, kesehatan, pemberdayaan, pembinaan, dan sosial." />
            </Helmet>

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <DecorativeBlob side="left" className="hidden lg:block" />
                    <DecorativeBlob side="right" className="hidden lg:block" />
                </div>

                <section className="relative py-12 px-4 md:py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h1 {...motionCfg} className="text-3xl md:text-4xl lg:text-5xl font-heading animated-gradient bg-clip-text text-transparent leading-tight">
                            {sanitizeText(t('programs') || 'Program Kami')}
                        </motion.h1>

                        <motion.p {...motionCfg} className="mt-3 text-base md:text-lg text-text-subtle max-w-2xl mx-auto">
                            {sanitizeText('Program komprehensif untuk pendidikan, kesehatan, dan pemberdayaan anak-anak yatim.')}
                        </motion.p>
                    </div>
                </section>

                <section className="py-6 px-4">
                    <div className="max-w-6xl mx-auto space-y-10">
                        {programs.map((p, i) => (
                            <div key={i} className={`relative ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <ProgramCard program={p} onLearn={handleFeatureClick} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-8 px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div {...motionCfg} className="text-center mb-6">
                            <h2 className="text-2xl md:text-3xl font-semibold">Dampak Program</h2>
                            <p className="mt-2 text-sm text-text-secondary max-w-2xl mx-auto">Data nyata dari pelaksanaan program kami.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((s, idx) => (
                                <motion.div key={idx} {...motionCfg}>
                                    <StatCard stat={s} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Programs;
