// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doLogout } from '../auth';

const Header = () => {
    const { isAuthenticated, user, isAdmin, logoutContext } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        doLogout();
        logoutContext();
        navigate('/');
        setIsMenuOpen(false);
    };

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        { path: '/', label: 'Home', emoji: '🏠' },
        { path: '/about', label: 'About', emoji: '🌟' },
        ...(isAuthenticated ? [
            { path: '/private/sweets', label: 'Sweets', emoji: '🍬' },
            { path: '/private/dashboard', label: 'Dashboard', emoji: '📊' },
        ] : []),
    ];

    return (
        <>
            {/* Background Blur */}
            <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`} onClick={() => setIsMenuOpen(false)} />

            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl' : 'bg-transparent'
            }`}>
                <nav className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link 
                            to="/" 
                            className="group flex items-center gap-3"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-2xl">🍭</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 -z-10 group-hover:opacity-75 transition-opacity duration-300"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    SweetVerse
                                </span>
                                <span className="text-xs text-gray-400 font-medium">Premium Confectionery</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        isActiveLink(link.path)
                                            ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">{link.emoji}</span>
                                        {link.label}
                                    </span>
                                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-3/4 ${
                                        isActiveLink(link.path) ? 'w-3/4' : ''
                                    }`}></div>
                                </Link>
                            ))}

                            {isAuthenticated ? (
                                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
                                    {/* Admin Badge */}
                                    {isAdmin && (
                                        <div className="relative group">
                                            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                                                👑 Admin
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                        </div>
                                    )}

                                    {/* User Menu */}
                                    <div className="relative group">
                                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/20 cursor-pointer">
                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                            <span className="text-white font-medium">{user?.name}</span>
                                            <span className="text-xl transform group-hover:rotate-180 transition-transform duration-300">▼</span>
                                        </div>

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="p-4 border-b border-white/10">
                                                <div className="text-white font-semibold">{user?.name}</div>
                                                <div className="text-gray-400 text-sm">{user?.email}</div>
                                            </div>
                                            <div className="p-2">
                                                {isAdmin && (
                                                    <Link
                                                        to="/private/add-sweet"
                                                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                                                    >
                                                        <span>🎨</span>
                                                        <span>Add New Sweet</span>
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200"
                                                >
                                                    <span>🚪</span>
                                                    <span>Sign Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                                    <Link
                                        to="/login"
                                        className="px-6 py-3 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>✨</span>
                                            Get Started
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden flex flex-col gap-1.5 p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20"
                        >
                            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className={`lg:hidden absolute top-full left-4 right-4 mt-2 bg-slate-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 transform origin-top ${
                        isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                    }`}>
                        <div className="p-4">
                            {/* Navigation Links */}
                            <div className="space-y-2 mb-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                            isActiveLink(link.path)
                                                ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20'
                                                : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <span className="text-lg">{link.emoji}</span>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Auth Section */}
                            {isAuthenticated ? (
                                <div className="border-t border-white/10 pt-4">
                                    <div className="flex items-center gap-3 px-4 py-3 mb-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-semibold">{user?.name}</div>
                                            <div className="text-gray-400 text-sm">{user?.email}</div>
                                        </div>
                                        {isAdmin && (
                                            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-black uppercase">
                                                Admin
                                            </div>
                                        )}
                                    </div>
                                    {isAdmin && (
                                        <Link
                                            to="/private/add-sweet"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200 mb-2"
                                        >
                                            <span>🎨</span>
                                            Add New Sweet
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200"
                                    >
                                        <span>🚪</span>
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="border-t border-white/10 pt-4 space-y-2">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                                    >
                                        <span>🔑</span>
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold transition-all duration-200"
                                    >
                                        <span>✨</span>
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Spacer for fixed header */}
            <div className="h-20"></div>
        </>
    );
};

export default Header;