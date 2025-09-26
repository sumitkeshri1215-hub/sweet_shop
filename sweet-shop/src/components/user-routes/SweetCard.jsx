// src/components/user-routes/SweetCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteSweet, restockSweet } from '../../services/sweet-service';
import { toast } from 'react-toastify';

const SweetCard = ({ sweet, onPurchase, isAdmin, onUpdate }) => {
    const [purchaseQty, setPurchaseQty] = useState(1);
    const [restockQty, setRestockQty] = useState(10);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handlePurchase = () => {
        if (purchaseQty > 0 && purchaseQty <= sweet.quantity) {
            onPurchase(sweet.id, purchaseQty);
        }
    };

    const handleRestock = async () => {
        try {
            await restockSweet(sweet.id, restockQty);
            toast.success('🔄 Restocked successfully! Inventory updated.');
            onUpdate();
        } catch (error) {
            toast.error('❌ Restock failed. Please try again.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${sweet.name}"? This action cannot be undone.`)) {
            setIsDeleting(true);
            try {
                await deleteSweet(sweet.id);
                toast.success('🗑️ Sweet deleted successfully!');
                onUpdate();
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

    const getStockText = (quantity) => {
        if (quantity === 0) return 'Out of Stock';
        if (quantity < 5) return 'Low Stock';
        if (quantity < 20) return 'In Stock';
        return 'Plenty Available';
    };

    return (
        <div 
            className="group relative bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Hover Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>

            {/* Category Icon Badge */}
            <div className="absolute -top-4 -right-4 z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{getCategoryIcon(sweet.category)}</span>
                </div>
            </div>

            <div className="p-6 relative z-20">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                        <h3 className="text-xl font-black text-white truncate mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                            {sweet.name}
                        </h3>
                        <p className="text-gray-400 text-sm capitalize flex items-center gap-2">
                            <span>📁</span>
                            {sweet.category}
                        </p>
                    </div>
                </div>

                {/* Price and Stock */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ${sweet.price.toFixed(2)}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide bg-gradient-to-r ${getStockColor(sweet.quantity)} text-white shadow-lg`}>
                        {getStockText(sweet.quantity)}
                    </div>
                </div>

                {/* Stock Quantity Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Stock Level</span>
                        <span className="font-semibold text-white">{sweet.quantity} units</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${getStockColor(sweet.quantity)} transition-all duration-1000`}
                            style={{ width: `${Math.min((sweet.quantity / 50) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Purchase Section */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="relative flex-1">
                            <input
                                type="number"
                                min="1"
                                max={sweet.quantity}
                                value={purchaseQty}
                                onChange={(e) => setPurchaseQty(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                                disabled={sweet.quantity === 0}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">units</div>
                        </div>
                        <button
                            onClick={handlePurchase}
                            disabled={sweet.quantity === 0 || purchaseQty > sweet.quantity}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-purple-500/25"
                        >
                            {sweet.quantity === 0 ? 'Sold Out' : 'Add to Cart'}
                        </button>
                    </div>
                    {purchaseQty > sweet.quantity && sweet.quantity > 0 && (
                        <p className="text-red-400 text-sm flex items-center gap-2">
                            <span>⚠️</span>
                            Only {sweet.quantity} units available
                        </p>
                    )}
                </div>

                {/* Admin Actions */}
                {isAdmin && (
                    <div className="space-y-3 border-t border-white/10 pt-4">
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    min="1"
                                    value={restockQty}
                                    onChange={(e) => setRestockQty(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all duration-300 text-sm"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">units</div>
                            </div>
                            <button
                                onClick={handleRestock}
                                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-2xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 text-sm shadow-lg hover:shadow-green-500/25"
                            >
                                📦 Restock
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                to={`/private/update-sweet/${sweet.id}`}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 text-sm text-center shadow-lg hover:shadow-blue-500/25"
                            >
                                ✏️ Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-2xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 text-sm shadow-lg hover:shadow-red-500/25"
                            >
                                {isDeleting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Deleting...
                                    </span>
                                ) : (
                                    '🗑️ Delete'
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* View Details Link */}
                <Link
                    to={`/private/sweet/${sweet.id}`}
                    className="group/details block w-full text-center text-gray-400 hover:text-white font-semibold text-sm mt-4 pt-4 border-t border-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <span>View Full Details</span>
                    <span className="transform group-hover/details:translate-x-1 transition-transform duration-300">→</span>
                </Link>
            </div>

            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-20`}></div>
        </div>
    );
};

export default SweetCard;