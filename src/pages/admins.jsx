import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LayoutDashboard, Newspaper, FolderHeart as HandHeart, BookOpen, User, Settings, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        toast({
            title: "Fitur Login Belum Tersedia",
            description: t('featureNotImplemented'),
        });
        // setIsAuthenticated(true); // This would be set on successful authentication
    };

    const handleFeatureClick = () => {
        toast({
            title: "Fitur Belum Tersedia",
            description: t('featureNotImplemented'),
        });
    };

    // if (!isAuthenticated) {
    //     return (
    //         <>
    //             <Helmet>
    //                 <title>Admin Login - Rumah Yatim Mizan</title>
    //             </Helmet>
    //             <div className="min-h-screen flex items-center justify-center bg-mizan-light-gray">
    //                 <motion.div
    //                     initial={{ opacity: 0, scale: 0.9 }}
    //                     animate={{ opacity: 1, scale: 1 }}
    //                     transition={{ duration: 0.5 }}
    //                 >
    //                     <Card className="w-full max-w-md mx-auto shadow-xl">
    //                         <CardHeader className="text-center">
    //                             <Lock className="w-12 h-12 mx-auto text-mizan-blue mb-4" />
    //                             <CardTitle className="text-2xl">Admin Login</CardTitle>
    //                             <CardDescription>Please enter your credentials to access the dashboard.</CardDescription>
    //                         </CardHeader>
    //                         <CardContent>
    //                             <form onSubmit={handleLogin} className="space-y-6">
    //                                 <div className="space-y-2">
    //                                     <Label htmlFor="username">Username</Label>
    //                                     <Input id="username" placeholder="admin" />
    //                                 </div>
    //                                 <div className="space-y-2">
    //                                     <Label htmlFor="password">Password</Label>
    //                                     <Input id="password" type="password" placeholder="••••••••" />
    //                                 </div>
    //                                 <Button type="submit" className="w-full btn-primary">
    //                                     Login
    //                                 </Button>
    //                             </form>
    //                         </CardContent>
    //                     </Card>
    //                 </motion.div>
    //             </div>
    //         </>
    //     );
    // }

    const dashboardCards = [
        { title: "Total Donasi", value: "Rp 1.2M", icon: HandHeart, color: 'text-mizan-green' },
        { title: "Berita Dipublikasi", value: "45", icon: Newspaper, color: 'text-mizan-blue' },
        { title: "Anak Yatim", value: "2,500", icon: User, color: 'text-mizan-orange' },
        { title: "Publikasi", value: "35", icon: BookOpen, color: 'text-mizan-red' },
    ];

    return (
        <>
            <Helmet>
                <title>Admin Dashboard - Rumah Yatim Mizan</title>
            </Helmet>
            <div className="min-h-screen bg-mizan-light-gray">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-mizan-dark">Admin Dashboard</h1>
                            <Button onClick={() => setIsAuthenticated(false)}>Logout</Button>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {dashboardCards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                        <card.icon className={`h-4 w-4 ${card.color}`} />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{card.value}</div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <Tabs defaultValue="donations">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="donations"><HandHeart className="w-4 h-4 mr-2" />Donations</TabsTrigger>
                            <TabsTrigger value="news"><Newspaper className="w-4 h-4 mr-2" />News</TabsTrigger>
                            <TabsTrigger value="publications"><BookOpen className="w-4 h-4 mr-2" />Publications</TabsTrigger>
                            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2" />Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="donations" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manage Donations</CardTitle>
                                    <CardDescription>View and manage all donations.</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center py-12">
                                    <p className="text-mizan-gray mb-4">Donation management feature is not yet implemented.</p>
                                    <Button onClick={handleFeatureClick}>Request Feature</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="news" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manage News</CardTitle>
                                    <CardDescription>Create, edit, and delete news articles.</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center py-12">
                                    <p className="text-mizan-gray mb-4">News management feature is not yet implemented.</p>
                                    <Button onClick={handleFeatureClick}>Request Feature</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="publications" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manage Publications</CardTitle>
                                    <CardDescription>Upload and manage official publications.</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center py-12">
                                    <p className="text-mizan-gray mb-4">Publication management feature is not yet implemented.</p>
                                    <Button onClick={handleFeatureClick}>Request Feature</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="settings" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Admin Settings</CardTitle>
                                    <CardDescription>Manage admin accounts and site settings.</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center py-12">
                                    <p className="text-mizan-gray mb-4">Settings feature is not yet implemented.</p>
                                    <Button onClick={handleFeatureClick}>Request Feature</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Admin;