// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/miz.svg"; // pastikan file ada

const Footer = () => {
    const { t } = useLanguage();

    const quickLinks = [
        { name: t("about"), href: "/about" },
        { name: t("programs"), href: "/programs" },
        { name: t("asrama"), href: "/asrama" },
        { name: t("publications"), href: "/publications" },
        { name: t("news"), href: "/news" },
        { name: t("contact"), href: "/contact" },
    ];

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Youtube, href: "#", label: "YouTube" },
    ];

    return (
        <footer className="relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-accent/20 blur-3xl animate-pulse" />
                <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-primary/15 blur-3xl animate-[ping_18s_linear_infinite]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
                <div className="glass-card p-10 lg:p-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 transition-all duration-300">
                    {/* Logo & short description */}
                    <div className="space-y-4">
                        <img
                            src={logo}
                            alt="Rumah Yatim Mizan"
                            className="h-12 w-auto object-contain"
                        />
                        <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
                            Membangun masa depan cerah anak-anak yatim Indonesia melalui
                            pendidikan, kesehatan, dan program sosial.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">
                            {t("quickLinks")}
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">
                            {t("contact")}
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">
                                    Jl. Raya Bogor KM 24, Cijantung, Jakarta Timur 13770
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">+62 21 8400 8080</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">
                                    info@rumahyatimmizan.org
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-foreground">
                            {t("followUs")}
                        </h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 rounded-xl bg-card/60 border border-border flex items-center justify-center text-foreground hover:text-primary hover:bg-accent/20 transition-all duration-300 shadow-sm"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 text-center border-t border-border pt-6">
                    <p className="text-sm text-muted-foreground">
                        © 2024 Rumah Yatim Mizan. {t("allRightsReserved")}.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
