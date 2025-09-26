// src/components/user-routes/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllSweets } from '../../services/sweet-service';
import { toast } from 'react-toastify';

const UserDashboard = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        totalSweets: 0,
        lowStock: 0,
        outOfStock: 0,
        totalValue: 0,
        popularCategory: ''
    });
    
    const { user, isAdmin } = useAuth();

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const data = await getAllSweets();
            setSweets(data);
            
            // Calculate advanced stats
            const totalSweets = data.length;
            const lowStock = data.filter(sweet => sweet.quantity > 0 && sweet.quantity < 10).length;
            const outOfStock = data.filter(sweet => sweet.quantity === 0).length;
            const totalValue = data.reduce((sum, sweet) => sum + (sweet.price * sweet.quantity), 0);
            
            // Find popular category
            const categoryCount = {};
            data.forEach(sweet => {
                categoryCount[sweet.category] = (categoryCount[sweet.category] || 0) + 1;
            });
            const popularCategory = Object.keys(categoryCount).reduce((a, b) => 
                categoryCount[a] > categoryCount[b] ? a : b, 'None'
            );
            
            setStats({ 
                totalSweets, 
                lowStock, 
                outOfStock, 
                totalValue: Math.round(totalValue * 100) / 100,
                popularCategory 
            });
        } catch (error) {
            toast.error('❌ Failed to load dashboard data');
            console.error('Dashboard error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'Chocolate': '🍫',
            'Candy': '🍬',
            'Gum': '🫧',
            'Biscuit': '🍪',
            'Cake': '🎂',
            'Pastry': '🥐',
            'Donut': '🍩',
            'Brownie': '🍫',
            'Pudding': '🍮',
            'Ice Cream': '🍦',
            'Cupcake': '🧁',
            'Muffin': '🧁',
            'Pie': '🥧',
            'Other': '🍭'
        };
        return icons[category] || '🍬';
    };

    const quickActions = [
        { 
            title: 'Browse Sweets', 
            description: 'Explore our complete collection', 
            icon: '📦', 
            path: '/private/sweets',
            color: 'from-blue-500 to-cyan-500'
        },
        { 
            title: 'Add New Sweet', 
            description: 'Create a new sweet entry', 
            icon: '➕', 
            path: '/private/add-sweet',
            color: 'from-green-500 to-teal-500',
            adminOnly: true
        },
        { 
            title: 'View Profile', 
            description: 'Manage your account settings', 
            icon: '👤', 
            path: '/private/profile',
            color: 'from-purple-500 to-pink-500'
        },
        { 
            title: 'Sales Analytics', 
            description: 'View detailed statistics', 
            icon: '📊', 
            path: '/private/analytics',
            color: 'from-orange-500 to-red-500'
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <span className="text-5xl">📊</span>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Loading Dashboard</h2>
                    <p className="text-gray-400">Preparing your sweet insights...</p>
                    <div className="flex justify-center mt-4 space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 mb-6">
                        <span className="text-2xl">🚀</span>
                        <span className="text-white font-semibold">Dashboard</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                        Welcome Back,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {user?.name}
                        </span>
                        ! 👋
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        {isAdmin 
                            ? 'Manage your sweet empire with powerful insights and controls' 
                            : 'Discover amazing sweets and track your sweet journey'
                        }
                    </p>
                </div>

                {/* Role Badge */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-yellow-900 px-6 py-2 rounded-full font-black uppercase tracking-wide text-sm flex items-center gap-2">
                        <span>⭐</span>
                        {isAdmin ? 'Platform Administrator' : 'Sweet Enthusiast'}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { 
                            label: 'Total Sweets', 
                            value: stats.totalSweets, 
                            icon: '🍬', 
                            color: 'from-green-500 to-emerald-500',
                            description: 'In collection'
                        },
                        { 
                            label: 'Low Stock', 
                            value: stats.lowStock, 
                            icon: '⚠️', 
                            color: 'from-orange-500 to-amber-500',
                            description: 'Need restocking'
                        },
                        { 
                            label: 'Out of Stock', 
                            value: stats.outOfStock, 
                            icon: '❌', 
                            color: 'from-red-500 to-pink-500',
                            description: 'Currently unavailable'
                        },
                        { 
                            label: 'Total Value', 
                            value: `$${stats.totalValue}`, 
                            icon: '💰', 
                            color: 'from-purple-500 to-indigo-500',
                            description: 'Inventory worth'
                        }
                    ].map((stat, index) => (
                        <div key={index} className="group bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-black text-white">{stat.value}</div>
                                    <div className="text-gray-400 text-sm">{stat.description}</div>
                                </div>
                            </div>
                            <div className="text-gray-300 font-semibold">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {quickActions.map((action, index) => (
                        (!action.adminOnly || isAdmin) && (
                            <Link 
                                key={index}
                                to={action.path} 
                                className="group bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                            >
                                <div className="text-center">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                                        {action.icon}
                                    </div>
                                    <h3 className="font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                        {action.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">{action.description}</p>
                                </div>
                            </Link>
                        )
                    ))}
                </div>

                {/* Content Tabs */}
                <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 mb-8">
                    {/* Tab Navigation */}
                    <div className="border-b border-white/10">
                        <div className="flex overflow-x-auto">
                            {['overview', 'recent', 'insights'].map((tab) => (
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

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div>
                                <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                                    <span>📈</span>
                                    Inventory Overview
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 rounded-2xl p-4">
                                        <h4 className="font-semibold text-white mb-2">Stock Distribution</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">In Stock</span>
                                                <span className="text-white">{stats.totalSweets - stats.outOfStock} items</span>
                                            </div>
                                            <div className="w-full bg-white/10 rounded-full h-2">
                                                <div 
                                                    className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                                                    style={{ width: `${((stats.totalSweets - stats.outOfStock) / stats.totalSweets) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4">
                                        <h4 className="font-semibold text-white mb-2">Popular Category</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">{getCategoryIcon(stats.popularCategory)}</div>
                                            <div>
                                                <div className="text-white font-semibold">{stats.popularCategory}</div>
                                                <div className="text-gray-400 text-sm">Most items in collection</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'recent' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-black text-white flex items-center gap-2">
                                        <span>🆕</span>
                                        Recent Sweets
                                    </h3>
                                    <Link to="/private/sweets" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                                        View All <span>→</span>
                                    </Link>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {sweets.slice(0, 6).map(sweet => (
                                        <div key={sweet.id} className="group bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-xl">
                                                    {getCategoryIcon(sweet.category)}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white truncate">{sweet.name}</h4>
                                                    <p className="text-gray-400 text-sm capitalize">{sweet.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                    ${sweet.price.toFixed(2)}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    sweet.quantity === 0 ? 'bg-red-500/20 text-red-300' :
                                                    sweet.quantity < 10 ? 'bg-orange-500/20 text-orange-300' :
                                                    'bg-green-500/20 text-green-300'
                                                }`}>
                                                    {sweet.quantity} units
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'insights' && (
                            <div>
                                <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                                    <span>💡</span>
                                    Sweet Insights
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                                        <h4 className="font-semibold text-white mb-2">Inventory Health</h4>
                                        <p className="text-gray-300 text-sm">
                                            {stats.lowStock === 0 && stats.outOfStock === 0 
                                                ? '🎉 Excellent! All items are well-stocked.'
                                                : `⚠️ ${stats.lowStock} items need attention, ${stats.outOfStock} are out of stock.`
                                            }
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
                                        <h4 className="font-semibold text-white mb-2">Collection Value</h4>
                                        <p className="text-gray-300 text-sm">
                                            Your sweet collection is valued at <strong>${stats.totalValue}</strong> with an average of{' '}
                                            <strong>${stats.totalSweets > 0 ? (stats.totalValue / stats.totalSweets).toFixed(2) : '0.00'}</strong> per item.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;