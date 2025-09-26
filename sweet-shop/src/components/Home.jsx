// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isAuthenticated, isAdmin } = useAuth();
    const [currentFeature, setCurrentFeature] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: "🌍",
            title: "Global Artisan Network",
            description: "Connect with 500+ artisan producers across 25 countries",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: "🤖",
            title: "AI-Powered Insights",
            description: "Smart analytics predict trends and optimize your inventory",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: "⚡",
            title: "Instant Operations",
            description: "Real-time sync across all your devices and locations",
            gradient: "from-orange-500 to-red-500"
        }
    ];

    const stats = [
        { number: "500+", label: "Premium Varieties", icon: "🍬" },
        { number: "98%", label: "Customer Satisfaction", icon: "⭐" },
        { number: "3.2x", label: "Faster Operations", icon: "🚀" },
        { number: "5K+", label: "Happy Partners", icon: "👥" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 5}s infinite ease-in-out`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-6xl mx-auto">
                    {/* Animated Logo */}
                    <div className="mb-8">
                        <div className="relative inline-block">
                            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                                <span className="text-5xl">🍭</span>
                            </div>
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 -z-10"></div>
                        </div>
                    </div>

                    <h1 className={`text-5xl md:text-7xl font-black text-white mb-6 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Welcome to{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            SweetVerse
                        </span>
                    </h1>

                    <p className={`text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Where cutting-edge technology meets the art of confectionery. Experience the future 
                        of sweet management with our immersive platform designed for visionaries.
                    </p>

                    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {!isAuthenticated ? (
                            <>
                                <Link 
                                    to="/register" 
                                    className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span>🚀</span>
                                        Launch Experience
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                                </Link>
                                <Link 
                                    to="/about" 
                                    className="group relative overflow-hidden border-2 border-purple-500 text-purple-400 px-8 py-4 rounded-xl font-bold text-lg hover:text-white transition-all duration-300"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span>✨</span>
                                        Explore Magic
                                    </span>
                                    <div className="absolute inset-0 bg-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/private/sweets" 
                                    className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span>🌈</span>
                                        Enter Dashboard
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                                </Link>
                                {isAdmin && (
                                    <Link 
                                        to="/private/add-sweet" 
                                        className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <span>🎨</span>
                                            Create Magic
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Animated Features Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-12">
                        Revolutionary <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Features</span>
                    </h2>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`relative group cursor-pointer transition-all duration-500 ${currentFeature === index ? 'scale-105' : 'scale-95 opacity-70'}`}
                                onMouseEnter={() => setCurrentFeature(index)}
                            >
                                <div className={`bg-gradient-to-br ${feature.gradient} p-8 rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-105`}>
                                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-purple-100 leading-relaxed">{feature.description}</p>
                                </div>
                                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Stats Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                            >
                                <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
                                <div className="text-purple-200 font-medium">{stat.label}</div>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3D Testimonial Card */}
            <section className="relative py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="group perspective-1000">
                        <div className="relative preserve-3d group-hover:rotate-x-5 group-hover:rotate-y-5 transition-transform duration-700">
                            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl transform-style-3d">
                                <div className="text-center">
                                    <div className="text-6xl mb-6">🌟</div>
                                    <blockquote className="text-2xl text-white italic mb-8 leading-relaxed">
                                        "SweetVerse redefined our entire operation. The AI insights helped us increase 
                                        profits by 65% while creating unforgettable customer experiences."
                                    </blockquote>
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                                            👑
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-white text-lg">Alex Chen</div>
                                            <div className="text-purple-200">CEO, Royal Confections</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl blur-xl opacity-50 -z-10 translate-z-12"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Animated CTA Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Begin Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Journey</span>?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join the revolution and transform your confectionery business today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to={isAuthenticated ? "/private/sweets" : "/register"} 
                            className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-xl font-black text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 hover:rotate-1"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span className="transform group-hover:rotate-180 transition-transform duration-300">🎯</span>
                                {isAuthenticated ? 'Enter Metaverse' : 'Start Free Trial'}
                            </span>
                            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
                .translate-z-12 {
                    transform: translateZ(-12px);
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default Home;