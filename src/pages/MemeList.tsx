import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMemeData } from '../context/MemeDataContext';
import { useCart } from '../context/CartContext';
import { useDebounce } from '../hooks/useDebounce';
import type { Meme } from '../types';

export const MemeList = () => {
    const { memes, loading, error } = useMemeData();
    const { addItem } = useCart();

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("name");

    const filteredMemes: Meme[] = useMemo(() => {
        let res = memes;
        if (debouncedSearch) res = res.filter(m => m.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
        if (category !== "All") res = res.filter(m => m.category === category);
        return res.sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'size') return (b.width * b.height) - (a.width * a.height);
            return 0;
        });
    }, [memes, debouncedSearch, category, sortBy]);

    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <div>
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 border border-gray-100">
                <input
                    placeholder="Hledat..."
                    className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={search} onChange={e => setSearch(e.target.value)}
                />
                <select className="border border-gray-300 p-2 rounded-lg bg-white" value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="All">Všechny kategorie</option>
                    {["animals", "gaming", "school", "celebrities", "random"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select className="border border-gray-300 p-2 rounded-lg bg-white" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="name">Jméno</option>
                    <option value="rating">Hodnocení</option>
                    <option value="size">Velikost</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? [1,2,3,4,5,6,7,8].map(n => <div key={n} className="h-72 bg-gray-200 rounded-xl animate-pulse"/>) : filteredMemes.map(meme => (
                    <div key={meme.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden border border-gray-100 group">
                        <div className="h-48 overflow-hidden bg-gray-50 relative">
                            <img src={meme.url} alt={meme.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-gray-900 truncate mb-1">{meme.name}</h3>
                            <div className="flex justify-between text-sm text-gray-500 mb-4">
                                <span>{meme.category}</span>
                                <span className="text-yellow-500 font-bold">⭐ {meme.rating}</span>
                            </div>
                            <div className="mt-auto flex gap-2">
                                <Link to={`/memes/${meme.id}`} className="flex-1 text-center bg-gray-100 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Detail</Link>
                                <button onClick={() => addItem(meme)} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">Koupit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};