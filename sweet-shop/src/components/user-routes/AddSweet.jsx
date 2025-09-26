import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSweet } from '../../services/sweet-service';
import { toast } from 'react-toastify';

const AddSweet = () => {
    const [sweetData, setSweetData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    const categories = [
        { value: 'Chocolate', icon: '🍫', color: 'from-yellow-600 to-brown-600' },
        { value: 'Candy', icon: '🍬', color: 'from-pink-500 to-rose-500' },
        { value: 'Gum', icon: '🫧', color: 'from-blue-400 to-cyan-400' },
        { value: 'Biscuit', icon: '🍪', color: 'from-amber-600 to-orange-600' },
        { value: 'Cake', icon: '🎂', color: 'from-purple-500 to-pink-500' },
        { value: 'Pastry', icon: '🥐', color: 'from-yellow-400 to-orange-400' },
        { value: 'Donut', icon: '🍩', color: 'from-pink-400 to-rose-400' },
        { value: 'Brownie', icon: '🍫', color: 'from-brown-600 to-amber-600' },
        { value: 'Pudding', icon: '🍮', color: 'from-cream-400 to-yellow-200' },
        { value: 'Ice Cream', icon: '🍦', color: 'from-blue-200 to-cyan-200' },
        { value: 'Cupcake', icon: '🧁', color: 'from-pink-300 to-purple-300' },
        { value: 'Muffin', icon: '🧁', color: 'from-brown-500 to-amber-500' },
        { value: 'Pie', icon: '🥧', color: 'from-orange-400 to-red-400' },
        { value: 'Other', icon: '🍭', color: 'from-gray-500 to-gray-700' }
    ];

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e) => {
        setSweetData({
            ...sweetData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await addSweet({
                ...sweetData,
                price: parseFloat(sweetData.price),
                quantity: parseInt(sweetData.quantity)
            });
            toast.success('🎉 Sweet added successfully! Your new confection is ready.');
            navigate('/private/sweets');
        } catch (error) {
            toast.error('❌ Failed to add sweet. Please try again.');
            console.error('Add sweet error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getCategoryIcon = (category) => {
        return categories.find(cat => cat.value === category)?.icon || '🍬';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            <div className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 mb-6">
                        <span className="text-2xl">✨</span>
                        <span className="text-white font-semibold">Add New Sweet</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Create Your 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Masterpiece</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Add a new sweet creation to your inventory with all the delicious details.
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Sweet Name */}
                        <div className="group">
                            <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-3">
                                <span className="text-2xl">🏷️</span>
                                Sweet Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={sweetData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg"
                                    placeholder="Enter a delicious name for your sweet..."
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </div>
                        </div>

                        {/* Category Selection */}
                        <div className="group">
                            <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-3">
                                <span className="text-2xl">📁</span>
                                Category
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                {categories.map((category) => (
                                    <label
                                        key={category.value}
                                        className={`relative cursor-pointer transition-all duration-300 ${
                                            sweetData.category === category.value ? 'scale-110' : 'scale-100'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="category"
                                            value={category.value}
                                            checked={sweetData.category === category.value}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <div className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                                            sweetData.category === category.value
                                                ? `bg-gradient-to-r ${category.color} border-white text-white shadow-2xl`
                                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                                        }`}>
                                            <div className="text-3xl mb-2">{category.icon}</div>
                                            <div className="text-sm font-medium">{category.value}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price and Quantity Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Price */}
                            <div className="group">
                                <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-3">
                                    <span className="text-2xl">💰</span>
                                    Price ($)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        name="price"
                                        required
                                        value={sweetData.price}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg"
                                        placeholder="0.00"
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">$</div>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="group">
                                <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-3">
                                    <span className="text-2xl">📦</span>
                                    Initial Quantity
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="0"
                                        name="quantity"
                                        required
                                        value={sweetData.quantity}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg"
                                        placeholder="0"
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">units</div>
                                </div>
                            </div>
                        </div>

                        {/* Sweet Preview */}
                        {sweetData.name && (
                            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <span>👀</span>
                                    Sweet Preview
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl">
                                        {getCategoryIcon(sweetData.category)}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-lg">{sweetData.name}</div>
                                        <div className="text-gray-400">{sweetData.category} • ${sweetData.price} • {sweetData.quantity} units</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Creating Sweet...
                                        </>
                                    ) : (
                                        <>
                                            <span>🍬</span>
                                            Add Sweet Masterpiece
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/private/sweets')}
                                className="group flex-1 bg-white/10 backdrop-blur-lg border border-white/20 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span>↶</span>
                                    Cancel
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Quick Tips */}
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-2xl px-4 py-2 border border-white/10">
                        <span className="text-yellow-400">💡</span>
                        <span className="text-gray-300 text-sm">Pro tip: Use descriptive names to make your sweets stand out!</span>
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

export default AddSweet;