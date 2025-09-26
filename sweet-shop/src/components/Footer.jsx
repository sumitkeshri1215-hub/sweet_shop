// src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const quickLinks = [
        { path: '/', label: 'Home', emoji: '🏠' },
        { path: '/about', label: 'About', emoji: '🌟' },
        { path: '/private/sweets', label: 'Sweets Catalog', emoji: '🍬' },
        { path: '/contact', label: 'Contact', emoji: '📞' },
    ];

    const socialLinks = [
        { platform: 'Twitter', icon: '🐦', url: '#', color: 'hover:text-blue-400' },
        { platform: 'Instagram', icon: '📸', url: '#', color: 'hover:text-pink-400' },
        { platform: 'LinkedIn', icon: '💼', url: '#', color: 'hover:text-blue-300' },
        { platform: 'GitHub', icon: '💻', url: '#', color: 'hover:text-gray-400' },
    ];

    const features = [
        { label: 'AI-Powered Analytics', emoji: '🤖' },
        { label: 'Real-time Inventory', emoji: '📊' },
        { label: 'Secure Payments', emoji: '🔒' },
        { label: '24/7 Support', emoji: '🌙' },
    ];

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative group">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-3xl">🍭</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 -z-10"></div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    SweetVerse
                                </h3>
                                <p className="text-gray-400 font-medium">Where Innovation Meets Confectionery</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                            Revolutionizing the sweet industry with cutting-edge technology, 
                            AI-powered insights, and unforgettable user experiences. Join thousands 
                            of businesses thriving with our platform.
                        </p>
                        
                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200">
                                    <span className="text-lg">{feature.emoji}</span>
                                    <span className="text-sm font-medium">{feature.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                            <span>🚀</span>
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        to={link.path}
                                        className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1"
                                    >
                                        <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">
                                            {link.emoji}
                                        </span>
                                        <span className="font-medium">{link.label}</span>
                                        <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">→</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div>
                        <h4 className="text-lg font-black mb-6 flex items-center gap-2">
                            <span>📬</span>
                            Stay Updated
                        </h4>
                        
                        {isSubscribed ? (
                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-4 text-center">
                                <div className="text-2xl mb-2">🎉</div>
                                <p className="text-green-400 font-semibold">Welcome to the SweetVerse family!</p>
                                <p className="text-green-300 text-sm">You'll receive our latest updates soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <p className="text-gray-400 text-sm">
                                    Get exclusive updates, sweet tips, and industry insights delivered to your inbox.
                                </p>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                                    >
                                        Join
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Social Links */}
                        <div className="mt-6">
                            <h5 className="font-semibold text-gray-400 mb-3">Follow Us</h5>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        className={`group w-12 h-12 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center text-xl transition-all duration-300 transform hover:scale-110 border border-white/20 ${social.color}`}
                                    >
                                        <span className="group-hover:scale-110 transition-transform duration-300">
                                            {social.icon}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-white/10">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 text-gray-300 hover:text-white transition-colors duration-200">
                            <span className="text-2xl">📧</span>
                            <div>
                                <div className="font-semibold">Email Us</div>
                                <div className="text-sm text-gray-400">hello@sweetverse.com</div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 text-gray-300 hover:text-white transition-colors duration-200">
                            <span className="text-2xl">📞</span>
                            <div>
                                <div className="font-semibold">Call Us</div>
                                <div className="text-sm text-gray-400">+1 (555) SWEET-VR</div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <div className="flex items-center justify-center md:justify-end gap-3 text-gray-300 hover:text-white transition-colors duration-200">
                            <span className="text-2xl">📍</span>
                            <div>
                                <div className="font-semibold">Visit Us</div>
                                <div className="text-sm text-gray-400">Digital Innovation Hub</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 border-t border-white/10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 text-gray-400">
                            <span>© 2024 SweetVerse. All rights reserved.</span>
                            <div className="hidden md:flex items-center gap-4">
                                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                <span>Made with 💝 for sweet lovers</span>
                                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                <span>v2.0.0</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors duration-200">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating CTA */}
            <div className="fixed bottom-6 right-6 z-40">
                <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110">
                    <span className="flex items-center gap-2 font-semibold">
                        <span className="text-xl">💬</span>
                        <span className="hidden sm:block">Need Help?</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
            </div>

            <style jsx>{`
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </footer>
    );
};

export default Footer;