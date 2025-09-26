// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth-service';
import { doLogin } from '../auth';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [loginData, setLoginData] = useState({
        name: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { loginContext } = useAuth();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await login(loginData);
            const userData = {
                token: response.token,
                user: response.user
            };

            doLogin(userData, () => {
                loginContext(userData.user);
                toast.success('🎉 Welcome back! Login successful!');
                navigate('/private/dashboard');
            });
        } catch (error) {
            toast.error('❌ Login failed! Please check your credentials.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
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

            <div className={`relative max-w-md w-full transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
                {/* Main Card */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    {/* Gradient Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
                        <div className="relative inline-block mb-4">
                            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                                <span className="text-3xl">🔐</span>
                            </div>
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 -z-10"></div>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-2">Welcome Back</h2>
                        <p className="text-purple-100 font-medium">Sign in to your SweetVerse account</p>
                    </div>

                    {/* Form Section */}
                    <div className="p-8 space-y-6">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Username Field */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-300 mb-3">
                                    <span className="flex items-center gap-2">
                                        <span>👤</span>
                                        Username
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 group-hover:border-white/20"
                                        placeholder="Enter your username"
                                        value={loginData.name}
                                        onChange={handleChange}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-300 mb-3">
                                    <span className="flex items-center gap-2">
                                        <span>🔒</span>
                                        Password
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 group-hover:border-white/20 pr-12"
                                        placeholder="Enter your password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Signing In...
                                        </>
                                    ) : (
                                        <>
                                            <span>🚀</span>
                                            Sign In
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative flex items-center justify-center">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        {/* Alternative Actions */}
                        <div className="text-center space-y-4">
                            <Link 
                                to="/register" 
                                className="group flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-all duration-300 font-semibold"
                            >
                                <span>✨</span>
                                Don't have an account? 
                                <span className="text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                                    Create one now
                                </span>
                                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </Link>

                            <Link 
                                to="/forgot-password" 
                                className="group flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm"
                            >
                                <span>🔑</span>
                                Forgot your password?
                                <span className="text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                                    Reset it here
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="bg-white/5 backdrop-blur-lg border-t border-white/10 p-4">
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                            <span>🛡️</span>
                            <span>Your data is securely encrypted</span>
                        </div>
                    </div>
                </div>

                {/* Demo Credentials Hint */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/10">
                        <span className="text-yellow-400">💡</span>
                        <span className="text-gray-300 text-sm">Demo: Try with any registered credentials</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(180deg); }
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default Login;