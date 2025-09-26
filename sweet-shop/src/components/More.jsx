// src/components/More.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const More = () => {
    const { isAuthenticated } = useAuth();
    const [activeCategory, setActiveCategory] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const categories = [
        {
            id: 0,
            title: "📚 Documentation",
            icon: "📖",
            gradient: "from-purple-500 to-pink-500",
            items: [
                { title: "User Guide", description: "Complete guide to using SweetVerse", icon: "👤" },
                { title: "API Documentation", description: "Developer resources and APIs", icon: "🔌" },
                { title: "Admin Manual", description: "Advanced administration guide", icon: "👑" },
                { title: "FAQ Section", description: "Frequently asked questions", icon: "❓" }
            ]
        },
        {
            id: 1,
            title: "🚀 Features",
            icon: "✨",
            gradient: "from-blue-500 to-cyan-500",
            items: [
                { title: "AI Inventory Management", description: "Smart stock predictions", icon: "🤖" },
                { title: "Advanced Analytics", description: "Real-time business insights", icon: "📊" },
                { title: "Purchase Tracking", description: "Complete sales monitoring", icon: "🛒" },
                { title: "User Management", description: "Team collaboration tools", icon: "👥" }
            ]
        },
        {
            id: 2,
            title: "🔧 Technical",
            icon: "⚙️",
            gradient: "from-green-500 to-teal-500",
            items: [
                { title: "System Requirements", description: "Hardware and software specs", icon: "💻" },
                { title: "Browser Compatibility", description: "Supported platforms", icon: "🌐" },
                { title: "Mobile App", description: "iOS and Android applications", icon: "📱" },
                { title: "Integration Guide", description: "Third-party integrations", icon: "🔗" }
            ]
        },
        {
            id: 3,
            title: "📞 Support",
            icon: "💬",
            gradient: "from-orange-500 to-red-500",
            items: [
                { title: "24/7 Support", description: "Round-the-clock assistance", icon: "🌙" },
                { title: "Community Forum", description: "Connect with other users", icon: "💭" },
                { title: "Video Tutorials", description: "Step-by-step guides", icon: "🎥" },
                { title: "Service Status", description: "Real-time system status", icon: "📡" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Header Section */}
                <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 mb-6">
                        <span className="text-2xl">🌟</span>
                        <span className="text-white font-semibold">Explore SweetVerse</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                        Discover{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            More Power
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Unlock the full potential of SweetVerse with our comprehensive resources, 
                        advanced features, and dedicated support ecosystem.
                    </p>
                </div>

                {/* Category Navigation */}
                <div className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                                activeCategory === category.id
                                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-2xl`
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                            }`}
                        >
                            <span className="text-2xl">{category.icon}</span>
                            <span>{category.title.split(' ')[1]}</span>
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className={`grid md:grid-cols-2 gap-6 mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {categories[activeCategory].items.map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-16 h-16 bg-gradient-to-r ${categories[activeCategory].gradient} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                <span className="text-2xl">→</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className={`bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-black text-white mb-2">500+</div>
                            <div className="text-gray-400 text-sm">Active Documents</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white mb-2">24/7</div>
                            <div className="text-gray-400 text-sm">Support Available</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white mb-2">99.9%</div>
                            <div className="text-gray-400 text-sm">Uptime Guarantee</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-white mb-2">5K+</div>
                            <div className="text-gray-400 text-sm">Happy Users</div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className={`text-center transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {!isAuthenticated ? (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link 
                                to="/register" 
                                className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <span>🚀</span>
                                    Start Free Trial
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </Link>
                            <Link 
                                to="/about" 
                                className="group flex items-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
                            >
                                <span>✨</span>
                                Learn About Us
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link 
                                to="/private/sweets" 
                                className="group relative bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <span>🍬</span>
                                    Explore Sweet Catalog
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </Link>
                            <Link 
                                to="/private/dashboard" 
                                className="group flex items-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-semibold hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
                            >
                                <span>📊</span>
                                Go to Dashboard
                            </Link>
                        </div>
                    )}
                    
                    {/* Additional Help */}
                    <div className="mt-6">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10">
                            <span className="text-yellow-400">💡</span>
                            <span className="text-gray-300 text-sm">Need immediate help? Contact our support team 24/7</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default More;