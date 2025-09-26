// src/components/About.jsx
import React, { useState, useEffect } from 'react';

const About = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const teamMembers = [
        {
            name: "Sarah Chen",
            role: "Lead Developer",
            bio: "Full-stack wizard with 8+ years in creating delightful user experiences",
            emoji: "👩‍💻",
            color: "from-purple-500 to-pink-500"
        },
        {
            name: "Marcus Rodriguez",
            role: "UI/UX Designer",
            bio: "Transforming complex ideas into beautiful, intuitive interfaces",
            emoji: "🎨",
            color: "from-blue-500 to-cyan-500"
        },
        {
            name: "Alex Thompson",
            role: "Backend Architect",
            bio: "Building robust systems that scale with your sweetest dreams",
            emoji: "⚙️",
            color: "from-green-500 to-teal-500"
        },
        {
            name: "Priya Patel",
            role: "Product Manager",
            bio: "Bridging user needs with technical innovation seamlessly",
            emoji: "📊",
            color: "from-orange-500 to-red-500"
        }
    ];

    const techStack = [
        { name: "React.js", icon: "⚡", description: "Modern frontend framework", color: "from-cyan-500 to-blue-500" },
        { name: "Tailwind CSS", icon: "🎨", description: "Utility-first CSS framework", color: "from-emerald-500 to-green-500" },
        { name: "Node.js", icon: "🚀", description: "Server-side JavaScript runtime", color: "from-lime-500 to-green-500" },
        { name: "MongoDB", icon: "🍃", description: "NoSQL database for scalability", color: "from-green-500 to-teal-500" },
        { name: "JWT Auth", icon: "🔐", description: "Secure authentication system", color: "from-amber-500 to-orange-500" },
        { name: "Spring Boot", icon: "🌱", description: "Enterprise Java framework", color: "from-green-600 to-emerald-600" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Main Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 mb-6">
                        <span className="text-2xl">🌟</span>
                        <span className="text-white font-semibold">About SweetVerse</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                        Crafting the Future of{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            Sweet Experiences
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We're revolutionizing how the world discovers, manages, and enjoys premium confectionery 
                        through cutting-edge technology and unparalleled user experiences.
                    </p>
                </div>

                {/* Mission & Vision Cards */}
                <div className={`grid lg:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="group relative">
                        <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                            <p className="text-purple-100 leading-relaxed">
                                To create an immersive platform where confectionery enthusiasts and business owners 
                                can seamlessly discover, manage, and innovate in the world of sweets through 
                                AI-powered tools and intuitive design.
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity duration-500"></div>
                    </div>

                    <div className="group relative">
                        <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                            <p className="text-blue-100 leading-relaxed">
                                To become the global standard for confectionery management, empowering businesses 
                                to thrive through data-driven insights, automated workflows, and unforgettable 
                                customer experiences.
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity duration-500"></div>
                    </div>
                </div>

                {/* Interactive Features Section */}
                <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-3xl font-black text-white text-center mb-8">Why We Stand Out</h2>
                    
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {['Innovation', 'Design', 'Security', 'Performance'].map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                                    activeTab === index 
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                        {activeTab === 0 && (
                            <div className="text-center">
                                <div className="text-5xl mb-4">🚀</div>
                                <h3 className="text-2xl font-bold text-white mb-4">Cutting-Edge Innovation</h3>
                                <p className="text-gray-300">
                                    Leveraging AI and machine learning to predict trends, optimize inventory, 
                                    and create personalized sweet experiences for every user.
                                </p>
                            </div>
                        )}
                        {activeTab === 1 && (
                            <div className="text-center">
                                <div className="text-5xl mb-4">🎨</div>
                                <h3 className="text-2xl font-bold text-white mb-4">Beautiful Design</h3>
                                <p className="text-gray-300">
                                    Every pixel is crafted with care, ensuring an intuitive and delightful 
                                    experience that makes managing sweets a pleasure.
                                </p>
                            </div>
                        )}
                        {activeTab === 2 && (
                            <div className="text-center">
                                <div className="text-5xl mb-4">🛡️</div>
                                <h3 className="text-2xl font-bold text-white mb-4">Enterprise Security</h3>
                                <p className="text-gray-300">
                                    Military-grade encryption and compliance measures to keep your data 
                                    and transactions completely secure.
                                </p>
                            </div>
                        )}
                        {activeTab === 3 && (
                            <div className="text-center">
                                <div className="text-5xl mb-4">⚡</div>
                                <h3 className="text-2xl font-bold text-white mb-4">Blazing Performance</h3>
                                <p className="text-gray-300">
                                    Optimized for speed and reliability, handling thousands of operations 
                                    simultaneously without compromising user experience.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Technology Stack */}
                <div className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-3xl font-black text-white text-center mb-8">Our Technology Ecosystem</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {techStack.map((tech, index) => (
                            <div
                                key={index}
                                className="group text-center bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                    {tech.icon}
                                </div>
                                <div className="font-bold text-white mb-1">{tech.name}</div>
                                <div className="text-xs text-gray-400">{tech.description}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h2 className="text-3xl font-black text-white text-center mb-8">The Visionaries Behind SweetVerse</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                            >
                                <div className={`w-20 h-20 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl group-hover:rotate-12 transition-transform duration-300`}>
                                    {member.emoji}
                                </div>
                                <h3 className="text-xl font-bold text-white text-center mb-2">{member.name}</h3>
                                <div className="text-purple-300 text-center mb-3 font-medium">{member.role}</div>
                                <p className="text-gray-400 text-sm text-center">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <span className="text-2xl">🍭</span>
                        <span className="font-black text-lg">Where Technology Meets Sweet Innovation</span>
                        <span className="text-2xl">✨</span>
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

export default About;