// src/components/user-routes/SweetDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSweetById, purchaseSweet, restockSweet, deleteSweet } from '../../services/sweet-service';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const SweetDetails = () => {
    const { sweetId } = useParams();
    const navigate = useNavigate();
    const [sweet, setSweet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchaseQty, setPurchaseQty] = useState(1);
    const [restockQty, setRestockQty] = useState(10);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [isRestocking, setIsRestocking] = useState(false);
    const { isAdmin } = useAuth();

    useEffect(() => {
        loadSweetDetails();
    }, [sweetId]);

    const loadSweetDetails = async () => {
        try {
            const data = await getSweetById(sweetId);
            setSweet(data);
        } catch (error) {
            toast.error('❌ Failed to load sweet details');
            console.error('Error loading sweet:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async () => {
        setIsPurchasing(true);
        try {
            await purchaseSweet(sweetId, purchaseQty);
            toast.success('🎉 Purchase successful! Enjoy your sweet treat!');
            loadSweetDetails();
        } catch (error) {
            toast.error('❌ Purchase failed. Please try again.');
        } finally {
            setIsPurchasing(false);
        }
    };

    const handleRestock = async () => {
        setIsRestocking(true);
        try {
            await restockSweet(sweetId, restockQty);
            toast.success('🔄 Restocked successfully! Inventory updated.');
            loadSweetDetails();
        } catch (error) {
            toast.error('❌ Restock failed. Please try again.');
        } finally {
            setIsRestocking(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${sweet.name}"? This action cannot be undone.`)) {
            setIsDeleting(true);
            try {
                await deleteSweet(sweetId);
                toast.success('🗑️ Sweet deleted successfully!');
                navigate('/private/sweets');
            } catch (error) {
                toast.error('❌ Delete failed. Please try again.');
            } finally {
                setIsDeleting(false);
            }
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

    const getStockColor = (quantity) => {
        if (quantity === 0) return 'from-red-500 to-red-600';
        if (quantity < 10) return 'from-orange-500 to-amber-500';
        return 'from-green-500 to-emerald-500';
    };

    const getStockStatus = (quantity) => {
        if (quantity === 0) return 'Out of Stock';
        if (quantity < 5) return 'Low Stock';
        if (quantity < 20) return 'In Stock';
        return 'Plenty Available';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <span className="text-5xl">🍬</span>
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">Loading Sweet Details</h2>
                    <p className="text-gray-400">Getting everything ready for you...</p>
                </div>
            </div>
        );
    }

    if (!sweet) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <span className="text-5xl">😞</span>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Sweet Not Found</h2>
                    <p className="text-gray-400 mb-6">The sweet you're looking for doesn't exist or has been removed.</p>
                    <Link 
                        to="/private/sweets" 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                        <span>←</span>
                        Back to Sweets Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link 
                    to="/private/sweets" 
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 mb-6 group"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    <span>Back to Sweets Catalog</span>
                </Link>

                {/* Main Content Card */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    <div className="lg:flex">
                        {/* Sweet Image/Icon Section */}
                        <div className="lg:w-2/5 bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8 flex items-center justify-center relative">
                            <div className="text-center">
                                <div className="w-48 h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                                    <span className="text-8xl">{getCategoryIcon(sweet.category)}</span>
                                </div>
                                <div className="absolute top-6 right-6">
                                    <span className={`px-4 py-2 rounded-full text-sm font-black uppercase bg-gradient-to-r ${getStockColor(sweet.quantity)} text-white shadow-lg`}>
                                        {getStockStatus(sweet.quantity)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Sweet Details Section */}
                        <div className="lg:w-3/5 p-8">
                            {/* Header */}
                            <div className="mb-6">
                                <h1 className="text-4xl font-black text-white mb-3">{sweet.name}</h1>
                                <div className="flex items-center gap-4">
                                    <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-2xl font-semibold capitalize border border-purple-500/30">
                                        📁 {sweet.category}
                                    </span>
                                    <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        ${sweet.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Stock Information */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-gray-400 mb-2">
                                    <span>Current Stock Level</span>
                                    <span className="font-semibold text-white">{sweet.quantity} units available</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                                    <div 
                                        className={`h-3 rounded-full bg-gradient-to-r ${getStockColor(sweet.quantity)} transition-all duration-1000`}
                                        style={{ width: `${Math.min((sweet.quantity / 50) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Purchase Section */}
                            <div className="mb-6">
                                <label className="block text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                    <span>🛒</span>
                                    Purchase Quantity
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="number"
                                            min="1"
                                            max={sweet.quantity}
                                            value={purchaseQty}
                                            onChange={(e) => setPurchaseQty(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg"
                                            disabled={sweet.quantity === 0}
                                        />
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">units</div>
                                    </div>
                                    <button
                                        onClick={handlePurchase}
                                        disabled={sweet.quantity === 0 || purchaseQty > sweet.quantity || isPurchasing}
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-purple-500/25 min-w-[140px]"
                                    >
                                        {isPurchasing ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </div>
                                        ) : sweet.quantity === 0 ? (
                                            'Sold Out'
                                        ) : (
                                            `Buy ${purchaseQty}`
                                        )}
                                    </button>
                                </div>
                                {purchaseQty > sweet.quantity && sweet.quantity > 0 && (
                                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                                        <span>⚠️</span>
                                        Only {sweet.quantity} units available
                                    </p>
                                )}
                            </div>

                            {/* Admin Actions */}
                            {isAdmin && (
                                <div className="border-t border-white/10 pt-6">
                                    <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                        <span>👑</span>
                                        Administrator Actions
                                    </h3>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <label className="block text-sm font-semibold text-gray-300">Restock Quantity</label>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={restockQty}
                                                        onChange={(e) => setRestockQty(Math.max(1, parseInt(e.target.value) || 1))}
                                                        className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all duration-300"
                                                    />
                                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">units</div>
                                                </div>
                                                <button
                                                    onClick={handleRestock}
                                                    disabled={isRestocking}
                                                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-3 rounded-2xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-green-500/25"
                                                >
                                                    {isRestocking ? '📦...' : '📦 Restock'}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/private/update-sweet/${sweet.id}`}
                                                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-blue-500/25"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <button
                                                onClick={handleDelete}
                                                disabled={isDeleting}
                                                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 rounded-2xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-red-500/25"
                                            >
                                                {isDeleting ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Deleting...
                                                    </div>
                                                ) : (
                                                    '🗑️ Delete'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Product Description */}
                            <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                    <span>📋</span>
                                    Product Details
                                </h4>
                                <p className="text-gray-300 leading-relaxed">
                                    Indulge in our premium {sweet.name}, a exquisite {sweet.category.toLowerCase()} crafted with 
                                    the finest ingredients. Each piece is carefully prepared to deliver an unforgettable 
                                    taste experience that will satisfy your sweet cravings.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SweetDetails;