import React, { useState, useEffect } from 'react';

const SearchAndFilter = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        name: '',
        category: '',
        minPrice: '',
        maxPrice: ''
    });
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasActiveFilters, setHasActiveFilters] = useState(false);

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
        // Check if any filters are active
        const active = Object.values(filters).some(value => value !== '');
        setHasActiveFilters(active);
    }, [filters]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onSearch(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            name: '',
            category: '',
            minPrice: '',
            maxPrice: ''
        };
        setFilters(clearedFilters);
        onSearch(clearedFilters);
        setIsExpanded(false);
    };

    const getActiveFilterCount = () => {
        return Object.values(filters).filter(value => value !== '').length;
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-6 mb-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🔍</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white">Find Your Sweet</h3>
                        <p className="text-gray-400">Discover the perfect treat with advanced filters</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Active Filters Badge */}
                    {hasActiveFilters && (
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                            <span>🎯</span>
                            {getActiveFilterCount()} active
                        </div>
                    )}
                    
                    {/* Expand/Collapse Button */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-3 transition-all duration-300"
                    >
                        <span className={`text-white transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            ⬇️
                        </span>
                    </button>
                </div>
            </div>

            {/* Quick Search Bar */}
            <div className="relative mb-4">
                <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    placeholder="Search for sweets by name..."
                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-lg pr-12"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
                    🔍
                </div>
            </div>

            {/* Expanded Filters Section */}
            <div className={`overflow-hidden transition-all duration-500 ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                    {/* Category Filter */}
                    <div className="group">
                        <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">📁</span>
                            Category
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.value}
                                    onClick={() => handleFilterChange('category', 
                                        filters.category === category.value ? '' : category.value
                                    )}
                                    className={`p-3 rounded-2xl border-2 transition-all duration-300 text-center ${
                                        filters.category === category.value
                                            ? `bg-gradient-to-r ${category.color} border-white text-white shadow-2xl scale-105`
                                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                                    }`}
                                >
                                    <div className="text-2xl mb-1">{category.icon}</div>
                                    <div className="text-xs font-medium">{category.value}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="group">
                        <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">💰</span>
                            Price Range
                        </label>
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    placeholder="Min price"
                                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</div>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    placeholder="Max price"
                                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all duration-300"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="group">
                        <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            Quick Actions
                        </label>
                        <div className="space-y-3">
                            <button
                                onClick={() => handleFilterChange('category', 'Chocolate')}
                                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 text-white transition-all duration-300 text-left flex items-center gap-3"
                            >
                                <span className="text-2xl">🍫</span>
                                <span>Chocolate Only</span>
                            </button>
                            <button
                                onClick={() => {
                                    handleFilterChange('minPrice', '');
                                    handleFilterChange('maxPrice', '5');
                                }}
                                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-3 text-white transition-all duration-300 text-left flex items-center gap-3"
                            >
                                <span className="text-2xl">💸</span>
                                <span>Under $5</span>
                            </button>
                            <button
                                onClick={clearFilters}
                                className="w-full bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/30 rounded-2xl p-3 text-white transition-all duration-300 text-left flex items-center gap-3"
                            >
                                <span className="text-2xl">🗑️</span>
                                <span>Clear All Filters</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-gray-400 text-sm font-semibold">Active Filters:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filters.name && (
                            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30 flex items-center gap-2">
                                Name: {filters.name}
                                <button onClick={() => handleFilterChange('name', '')} className="hover:text-white">×</button>
                            </span>
                        )}
                        {filters.category && (
                            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30 flex items-center gap-2">
                                Category: {filters.category}
                                <button onClick={() => handleFilterChange('category', '')} className="hover:text-white">×</button>
                            </span>
                        )}
                        {filters.minPrice && (
                            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30 flex items-center gap-2">
                                Min: ${filters.minPrice}
                                <button onClick={() => handleFilterChange('minPrice', '')} className="hover:text-white">×</button>
                            </span>
                        )}
                        {filters.maxPrice && (
                            <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm border border-orange-500/30 flex items-center gap-2">
                                Max: ${filters.maxPrice}
                                <button onClick={() => handleFilterChange('maxPrice', '')} className="hover:text-white">×</button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAndFilter;