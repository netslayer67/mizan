import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    Heart,
    Home,
    Info,
    Book,
    Building2,
    Newspaper,
    Phone,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ReactCountryFlag from "react-country-flag";
import logo from "@/assets/miz.svg";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { t, currentLanguage, changeLanguage } = useLanguage();

    const navigation = useMemo(() => [
        { name: t("home"), href: "/", icon: <Home className="w-4 h-4 mr-2" /> },
        { name: t("about"), href: "/about", icon: <Info className="w-4 h-4 mr-2" /> },
        { name: t("programs"), href: "/programs", icon: <Book className="w-4 h-4 mr-2" /> },
        { name: t("asrama"), href: "/asrama", icon: <Building2 className="w-4 h-4 mr-2" /> },
        { name: t("publications"), href: "/publications", icon: <Book className="w-4 h-4 mr-2" /> },
        { name: t("news"), href: "/news", icon: <Newspaper className="w-4 h-4 mr-2" /> },
        { name: t("contact"), href: "/contact", icon: <Phone className="w-4 h-4 mr-2" /> },
    ], [t]);

    const languages = useMemo(() => [
        { code: "id", countryCode: "ID" },
        { code: "en", countryCode: "US" },
        { code: "ar", countryCode: "SA" },
    ], []);

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40 ring-1 ring-white/20 transition-all duration-[320ms]">
            {/* Decorative animated blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    className="absolute w-72 h-72 rounded-full bg-accent/20 blur-3xl"
                    animate={{ x: [0, 60, -40, 0], y: [0, 40, -30, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute right-0 top-0 w-56 h-56 rounded-full bg-primary/10 blur-2xl"
                    animate={{ x: [0, -50, 40, 0], y: [0, -30, 20, 0] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="Rumah Yatim Mizan"
                            className="h-10 w-auto transition-transform duration-[320ms] hover:scale-110 hover:drop-shadow-lg"
                        />
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`relative px-3 py-1 rounded-lg text-sm font-medium transition-all duration-[320ms] ${isActive
                                        ? "text-primary bg-accent/10"
                                        : "text-foreground hover:text-primary hover:bg-accent/5"
                                        }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="navbar-underline"
                                            className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Language selector + donate */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Select value={currentLanguage} onValueChange={changeLanguage}>
                            <SelectTrigger className="w-[60px] bg-card/40 border border-border rounded-lg justify-center backdrop-blur-md transition-all duration-[320ms] hover:bg-accent/20">
                                <SelectValue>
                                    <ReactCountryFlag
                                        svg
                                        style={{ width: "1.5em", height: "1.5em" }}
                                        countryCode={
                                            languages.find((l) => l.code === currentLanguage)?.countryCode
                                        }
                                    />
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="bg-card border border-border rounded-lg shadow-xl">
                                {languages.map((lang) => (
                                    <SelectItem key={lang.code} value={lang.code}>
                                        <ReactCountryFlag
                                            svg
                                            style={{ width: "1.5em", height: "1.5em" }}
                                            countryCode={lang.countryCode}
                                        />
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Link to="/donation">
                            <Button className="btn-primary transition-all duration-[320ms] shadow-md hover:shadow-xl hover:scale-[1.03]">
                                <Heart className="w-4 h-4 mr-2" />
                                {t("donateNow")}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile menu btn */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground hover:text-primary p-2 transition-colors duration-[320ms]"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/40"
                    >
                        <div className="px-4 pt-3 pb-5 space-y-3">
                            {navigation.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center rounded-lg px-3 py-2 text-base font-medium transition-colors duration-[320ms] ${isActive
                                            ? "text-primary bg-accent/10"
                                            : "text-foreground hover:text-primary hover:bg-accent/5"
                                            }`}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                );
                            })}

                            <div className="space-y-3 pt-2">
                                <Select value={currentLanguage} onValueChange={changeLanguage}>
                                    <SelectTrigger className="w-full bg-card/50 border border-border rounded-lg justify-center backdrop-blur-md transition-colors duration-[320ms] hover:bg-accent/20">
                                        <SelectValue>
                                            <ReactCountryFlag
                                                svg
                                                style={{ width: "1.5em", height: "1.5em" }}
                                                countryCode={
                                                    languages.find((l) => l.code === currentLanguage)?.countryCode
                                                }
                                            />
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border border-border rounded-lg shadow-xl">
                                        {languages.map((lang) => (
                                            <SelectItem key={lang.code} value={lang.code}>
                                                <ReactCountryFlag
                                                    svg
                                                    style={{ width: "1.5em", height: "1.5em" }}
                                                    countryCode={lang.countryCode}
                                                />
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Link to="/donation" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full btn-primary transition-all duration-[320ms] shadow-md hover:shadow-xl hover:scale-[1.03]">
                                        <Heart className="w-4 h-4 mr-2" />
                                        {t("donateNow")}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
