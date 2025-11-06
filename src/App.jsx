import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Programs from '@/pages/Programs';
import Asrama from '@/pages/Asrama';
import Publications from '@/pages/Publications';
import News from '@/pages/News';
import Donation from '@/pages/Donation';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';

function App() {
    return (
        <LanguageProvider>
            <Router>
                <div className="min-h-screen bg-background">
                    {/* Skip link for accessibility */}
                    <a href="#main-content" className="skip-link">Skip to main content</a>

                    <Helmet>
                        <title>Rumah Yatim Mizan - Membangun Masa Depan Anak Yatim</title>
                        <meta name="description" content="Rumah Yatim Mizan adalah lembaga sosial yang berkomitmen membangun masa depan cerah anak-anak yatim melalui program pendidikan, kesehatan, ekonomi, dan dakwah." />
                        <meta name="keywords" content="rumah yatim, yatim piatu, donasi, pendidikan, kesehatan, sosial, mizan" />
                        <meta property="og:title" content="Rumah Yatim Mizan - Membangun Masa Depan Anak Yatim" />
                        <meta property="og:description" content="Bergabunglah dengan misi mulia kami dalam membangun masa depan cerah anak-anak yatim di Indonesia" />
                        <meta property="og:type" content="website" />
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                        {/* Accessibility meta */}
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="theme-color" content="hsl(var(--primary))" />
                    </Helmet>

                    <Navbar />

                    <main id="main-content" className="min-h-screen" role="main" aria-label="Main content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/programs" element={<Programs />} />
                            <Route path="/asrama" element={<Asrama />} />
                            <Route path="/publications" element={<Publications />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/donation" element={<Donation />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </main>

                    <Footer />
                    <Toaster />
                </div>
            </Router>
        </LanguageProvider>
    );
}

export default App;