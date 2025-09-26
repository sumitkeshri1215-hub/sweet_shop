// src/components/Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth-service';
import { toast } from 'react-toastify';

const Register = () => {
    const [registerData, setRegisterData] = useState({
        name: '',
        password: '',
        role: 'USER'
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });

        // Calculate password strength
        if (name === 'password') {
            calculatePasswordStrength(value);
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        setPasswordStrength(strength);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 25) return 'from-red-500 to-red-600';
        if (passwordStrength < 50) return 'from-orange-500 to-orange-600';
        if (passwordStrength < 75) return 'from-yellow-500 to-yellow-600';
        return 'from-green-500 to-green-600';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength < 25) return 'Very Weak';
        if (passwordStrength < 50) return 'Weak';
        if (passwordStrength < 75) return 'Good';
        return 'Strong';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await register(registerData);
            toast.success('🎉 Registration successful! Please login to continue your sweet journey.');
            navigate('/login');
        } catch (error) {
            toast.error('❌ Registration failed! Please try again with different credentials.');
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background */}
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
                                <span className="text-3xl">✨</span>
                            </div>
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 -z-10"></div>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-2">Join SweetVerse</h2>
                        <p className="text-purple-100 font-medium">Start your confectionery journey today</p>
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
                                        placeholder="Choose your username"
                                        value={registerData.name}
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
                                        placeholder="Create a strong password"
                                        value={registerData.password}
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

                                {/* Password Strength Meter */}
                                {registerData.password && (
                                    <div className="mt-3 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Password strength:</span>
                                            <span className={`font-semibold ${
                                                passwordStrength < 25 ? 'text-red-400' :
                                                passwordStrength < 50 ? 'text-orange-400' :
                                                passwordStrength < 75 ? 'text-yellow-400' : 'text-green-400'
                                            }`}>
                                                {getPasswordStrengthText()}
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-500`}
                                                style={{ width: `${passwordStrength}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-300 mb-3">
                                    <span className="flex items-center gap-2">
                                        <span>🎯</span>
                                        Account Type
                                    </span>
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { value: 'USER', label: 'User', icon: '👤', description: 'Browse sweets' },
                                        { value: 'ADMIN', label: 'Admin', icon: '👑', description: 'Manage inventory' }
                                    ].map((roleOption) => (
                                        <label
                                            key={roleOption.value}
                                            className={`relative cursor-pointer transition-all duration-300 ${
                                                registerData.role === roleOption.value ? 'scale-105' : 'scale-100'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={roleOption.value}
                                                checked={registerData.role === roleOption.value}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <div className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                                                registerData.role === roleOption.value
                                                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500 text-white'
                                                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                                            }`}>
                                                <div className="text-2xl mb-2">{roleOption.icon}</div>
                                                <div className="font-semibold">{roleOption.label}</div>
                                                <div className="text-xs opacity-75">{roleOption.description}</div>
                                            </div>
                                        </label>
                                    ))}
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
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            <span>🚀</span>
                                            Start Sweet Journey
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative flex items-center justify-center">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-sm">Already have an account?</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        {/* Login Link */}
                        <Link 
                            to="/login" 
                            className="group flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-all duration-300 font-semibold py-3 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10"
                        >
                            <span>🔑</span>
                            Sign in to your account
                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Link>
                    </div>

                    {/* Security Footer */}
                    <div className="bg-white/5 backdrop-blur-lg border-t border-white/10 p-4">
                        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                            <span>🛡️</span>
                            <span>Your data is securely encrypted and protected</span>
                        </div>
                    </div>
                </div>

                {/* Features Hint */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/10">
                        <span className="text-yellow-400">💡</span>
                        <span className="text-gray-300 text-sm">Admin accounts get full inventory management access</span>
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

export default Register;