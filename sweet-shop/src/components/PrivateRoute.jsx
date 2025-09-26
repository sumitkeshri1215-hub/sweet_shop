// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedin } from "../auth";
import { useState, useEffect } from "react";

const PrivateRoute = () => {
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Simulate authentication check with a slight delay for better UX
        const checkAuth = async () => {
            // Small delay for smooth animation
            await new Promise(resolve => setTimeout(resolve, 800));
            const loggedIn = isLoggedin();
            setIsAuthenticated(loggedIn);
            setIsChecking(false);
        };

        checkAuth();
    }, []);

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${3 + Math.random() * 5}s infinite ease-in-out`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Main Loading Content */}
                <div className="text-center relative z-10">
                    {/* Animated Logo */}
                    <div className="relative inline-block mb-8">
                        <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                            <span className="text-5xl">🔒</span>
                        </div>
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 -z-10"></div>
                        {/* Orbiting dots */}
                        <div className="absolute -inset-6">
                            <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-orbit"></div>
                            <div className="absolute top-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-orbit" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-4xl font-black text-white mb-4">
                        Securing Your 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Access</span>
                    </h2>
                    
                    {/* Loading Indicator */}
                    <div className="flex items-center justify-center gap-4 text-gray-300 mb-8">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-lg font-medium">Verifying authentication...</span>
                    </div>

                    {/* Security Features Grid */}
                    <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-8">
                        {[
                            { icon: '🛡️', label: 'Encrypted', color: 'from-green-500 to-emerald-500' },
                            { icon: '🔐', label: 'Secure', color: 'from-blue-500 to-cyan-500' },
                            { icon: '⚡', label: 'Fast', color: 'from-purple-500 to-pink-500' }
                        ].map((feature, index) => (
                            <div key={index} className="text-center group">
                                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="text-2xl">{feature.icon}</span>
                                </div>
                                <div className="text-sm text-gray-400 font-medium">{feature.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="max-w-md mx-auto bg-white/10 rounded-full h-2 mb-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse"></div>
                    </div>

                    {/* Status Message */}
                    <div className="text-gray-400 text-sm">
                        <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Checking session validity...
                        </span>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-10px) rotate(180deg); }
                    }
                    @keyframes orbit {
                        0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
                        100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
                    }
                    .animation-delay-2000 {
                        animation-delay: 2s;
                    }
                `}</style>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Enhanced redirect experience
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="text-center">
                    <div className="relative inline-block mb-6">
                        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                            <span className="text-4xl">🚫</span>
                        </div>
                        <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur-xl opacity-50 -z-10"></div>
                    </div>
                    
                    <h2 className="text-3xl font-black text-white mb-4">
                        Access 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400"> Denied</span>
                    </h2>
                    <p className="text-gray-300 mb-6 text-lg">Redirecting to login page...</p>
                    
                    <div className="flex justify-center items-center gap-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-400 text-sm">Please wait</span>
                    </div>
                </div>
                
                {/* Automatic redirect */}
                <Navigate to="/login" replace />
            </div>
        );
    }

    // Authenticated - render protected content with security overlay
    return (
        <div className="secure-route-wrapper">
            {/* Security Status Indicator */}
            <div className="fixed top-6 right-6 z-50">
                <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-lg rounded-full px-4 py-2 border border-green-500/30 shadow-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-semibold">SECURE SESSION</span>
                </div>
            </div>

            {/* Content */}
            <Outlet />

            {/* Security Footer Note */}
            <div className="fixed bottom-6 left-6 z-50">
                <div className="bg-black/50 backdrop-blur-lg rounded-full px-4 py-2 border border-white/10">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                        <span>🔒</span>
                        Protected Route
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PrivateRoute;