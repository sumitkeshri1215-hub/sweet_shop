// src/components/user-routes/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user, isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [isVisible, setIsVisible] = useState(false);
    const [stats, setStats] = useState({
        totalPurchases: 24,
        favoriteCategory: 'Chocolate',
        memberSince: 'Jan 2024',
        lastActive: 'Today'
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const profileStats = [
        { label: 'Total Purchases', value: stats.totalPurchases, icon: '🛒', color: 'from-blue-500 to-cyan-500' },
        { label: 'Favorite Category', value: stats.favoriteCategory, icon: '❤️', color: 'from-pink-500 to-rose-500' },
        { label: 'Member Since', value: stats.memberSince, icon: '📅', color: 'from-green-500 to-emerald-500' },
        { label: 'Last Active', value: stats.lastActive, icon: '🟢', color: 'from-purple-500 to-indigo-500' }
    ];

    const adminFeatures = [
        { title: 'Inventory Management', description: 'Full control over sweet inventory', icon: '📊', color: 'from-purple-500 to-pink-500' },
        { title: 'User Management', description: 'Manage user accounts and permissions', icon: '👥', color: 'from-blue-500 to-cyan-500' },
        { title: 'Sales Analytics', description: 'Advanced sales data and insights', icon: '📈', color: 'from-green-500 to-teal-500' },
        { title: 'System Settings', description: 'Configure platform preferences', icon: '⚙️', color: 'from-orange-500 to-red-500' }
    ];

    const userActions = [
        { label: 'Edit Profile', icon: '✏️', action: () => console.log('Edit profile') },
        { label: 'Change Password', icon: '🔒', action: () => console.log('Change password') },
        { label: 'Privacy Settings', icon: '👁️', action: () => console.log('Privacy settings') },
        { label: 'Purchase History', icon: '📋', action: () => console.log('Purchase history') }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            <div className={`relative max-w-6xl mx-auto transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 mb-6">
                        <span className="text-2xl">👤</span>
                        <span className="text-white font-semibold">User Profile</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Welcome Back,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {user?.name}
                        </span>
                    </h1>
                </div>

                {/* Main Profile Card */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 overflow-hidden mb-8">
                    {/* Profile Header */}
                    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10">
                            <div className="relative inline-block mb-4">
                                <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                                    <span className="text-5xl">👑</span>
                                </div>
                                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 -z-10"></div>
                                
                                {/* Admin Badge */}
                                {isAdmin && (
                                    <div className="absolute -top-2 -right-2">
                                        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-900 px-3 py-1 rounded-full text-sm font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                                            <span>⭐</span>
                                            ADMIN
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <h2 className="text-3xl font-black text-white mb-2">{user?.name}</h2>
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full border border-white/30">
                                <span className="text-white font-semibold">
                                    {isAdmin ? 'Platform Administrator' : 'Sweet Enthusiast'}
                                </span>
                                <span className="text-yellow-300">✨</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-b border-white/10">
                        <div className="flex overflow-x-auto">
                            {['overview', 'activity', 'settings', 'preferences'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 min-w-max px-6 py-4 font-semibold transition-all duration-300 border-b-2 ${
                                        activeTab === tab
                                            ? 'text-purple-400 border-purple-400 bg-purple-400/10'
                                            : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {profileStats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                                        <div className="text-gray-400 text-sm">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Admin Features Section */}
                        {isAdmin && (
                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                                    <span>🛠️</span>
                                    Administrator Tools
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {adminFeatures.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-xl`}>
                                                    {feature.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                                                    <p className="text-gray-400 text-sm">{feature.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {userActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.action}
                                    className="group bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {action.icon}
                                    </div>
                                    <div className="text-white font-semibold text-sm">{action.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Achievement Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                    <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <span>🏆</span>
                        Your Achievements
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Sweet Explorer', icon: '🍬', progress: 100 },
                            { name: 'Chocolate Lover', icon: '🍫', progress: 75 },
                            { name: 'Early Adopter', icon: '🚀', progress: 100 },
                            { name: 'Sweet Connoisseur', icon: '👑', progress: 40 }
                        ].map((achievement, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform duration-300">
                                    {achievement.icon}
                                </div>
                                <div className="text-white font-semibold text-sm mb-2">{achievement.name}</div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                    <div 
                                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                                        style={{ width: `${achievement.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
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

export default Profile;