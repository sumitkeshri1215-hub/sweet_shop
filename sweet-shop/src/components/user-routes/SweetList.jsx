// src/components/user-routes/SweetList.jsx
import React, { useState, useEffect } from 'react';
import { getAllSweets, searchSweets, purchaseSweet } from '../../services/sweet-service';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import SweetCard from './SweetCard';
import SearchAndFilter from './SearchAndFilter';

const SweetList = () => {
    const [sweets, setSweets] = useState([]);
    const [filteredSweets, setFilteredSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchFilters, setSearchFilters] = useState({});
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'quantity'
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const { isAdmin, user } = useAuth();

    useEffect(() => {
        loadSweets();
    }, []);

    useEffect(() => {
        if (Object.keys(searchFilters).length > 0) {
            handleSearch(searchFilters);
        } else {
            applySorting(sweets);
        }
    }, [searchFilters, sweets, sortBy, sortOrder]);

    const loadSweets = async () => {
        try {
            const data = await getAllSweets();
            setSweets(data);
            applySorting(data);
        } catch (error) {
            toast.error('❌ Failed to load sweets collection');
            console.error('Error loading sweets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (filters) => {
        try {
            setLoading(true);
            const data = await searchSweets(filters);
            applySorting(data);
        } catch (error) {
            toast.error('❌ Search failed. Please try again.');
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const applySorting = (data) => {
        const sortedData = [...data].sort((a, b) => {
            let aValue, bValue;
            
            switch (sortBy) {
                case 'price':
                    aValue = a.price;
                    bValue = b.price;
                    break;
                case 'quantity':
                    aValue = a.quantity;
                    bValue = b.quantity;
                    break;
                case 'name':
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredSweets(sortedData);
    };

    const handlePurchase = async (sweetId, quantity) => {
        try {
            await purchaseSweet(sweetId, quantity);
            toast.success('🎉 Purchase successful! Enjoy your sweet treat!');
            loadSweets(); // Reload to update quantities
        } catch (error) {
            toast.error('❌ Purchase failed. Please try again.');
            console.error('Purchase error:', error);
        }
    };

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortOrder('asc');
        }
    };

    const getSortIcon = (column) => {
        if (sortBy !== column) return '↕️';
        return sortOrder === 'asc' ? '⬆️' : '⬇️';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <span className="text-5xl">🍬</span>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Loading Sweet Collection</h2>
                    <p className="text-gray-400">Preparing delicious treats for you...</p>
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
                        <span className="text-2xl">🍭</span>
                        <span className="text-white font-semibold">Sweet Collection</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                        Discover Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            Sweet Treasures
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explore {sweets.length} exquisite sweets crafted to satisfy your cravings and delight your senses.
                    </p>
                </div>

                {/* Controls Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-white font-semibold">View:</span>
                        <div className="flex bg-white/10 backdrop-blur-lg rounded-2xl p-1 border border-white/10">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-xl transition-all duration-300 ${
                                    viewMode === 'grid' 
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                ⬜ Grid
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-xl transition-all duration-300 ${
                                    viewMode === 'list' 
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                📋 List
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-white font-semibold">Sort by:</span>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: 'name', label: 'Name', icon: '🔤' },
                                { key: 'price', label: 'Price', icon: '💰' },
                                { key: 'quantity', label: 'Stock', icon: '📦' }
                            ].map((sortOption) => (
                                <button
                                    key={sortOption.key}
                                    onClick={() => handleSortChange(sortOption.key)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                                        sortBy === sortOption.key
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                            : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                                    }`}
                                >
                                    <span>{sortOption.icon}</span>
                                    <span>{sortOption.label}</span>
                                    <span>{getSortIcon(sortOption.key)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <SearchAndFilter onSearch={setSearchFilters} />

                {/* Results Count */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-gray-400">
                        Showing <span className="text-white font-semibold">{filteredSweets.length}</span> of{' '}
                        <span className="text-white font-semibold">{sweets.length}</span> sweets
                    </div>
                    {Object.keys(searchFilters).some(key => searchFilters[key] !== '') && (
                        <button
                            onClick={() => setSearchFilters({})}
                            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
                        >
                            🗑️ Clear all filters
                        </button>
                    )}
                </div>

                {/* Sweets Grid/List */}
                <div className={`
                    ${viewMode === 'grid' 
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                        : 'space-y-4'
                    }
                `}>
                    {filteredSweets.map(sweet => (
                        <SweetCard 
                            key={sweet.id} 
                            sweet={sweet} 
                            onPurchase={handlePurchase}
                            isAdmin={isAdmin}
                            onUpdate={loadSweets}
                            viewMode={viewMode}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredSweets.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <span className="text-6xl">🔍</span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">No Sweets Found</h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            {Object.keys(searchFilters).some(key => searchFilters[key] !== '') 
                                ? "Try adjusting your search filters or clear them to see all available sweets."
                                : "Our sweet collection is currently empty. Check back soon for new additions!"
                            }
                        </p>
                        {Object.keys(searchFilters).some(key => searchFilters[key] !== '') && (
                            <button
                                onClick={() => setSearchFilters({})}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                            >
                                🗑️ Clear All Filters
                            </button>
                        )}
                    </div>
                )}

                {/* Quick Stats Footer */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10">
                        <div className="text-3xl font-black text-white mb-2">{sweets.length}</div>
                        <div className="text-gray-400">Total Sweets</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10">
                        <div className="text-3xl font-black text-white mb-2">
                            {sweets.filter(s => s.quantity > 0).length}
                        </div>
                        <div className="text-gray-400">Available Now</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10">
                        <div className="text-3xl font-black text-white mb-2">
                            {[...new Set(sweets.map(s => s.category))].length}
                        </div>
                        <div className="text-gray-400">Categories</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SweetList;