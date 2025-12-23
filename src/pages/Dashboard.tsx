import { Link } from 'react-router-dom';
import { useMemeData } from '../context/MemeDataContext';
import { useCart } from '../context/CartContext';

export const Dashboard = () => {
    const { memes, loading } = useMemeData();
    const { totalItems } = useCart();

    if (loading) return <div className="p-10 text-center">Načítám...</div>;

    const categoriesCount = new Set(memes.map(m => m.category)).size;
    const mostPopular = [...memes].sort((a, b) => b.rating - a.rating)[0];

    return (
        <div className="space-y-8">
            <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">Vítejte zpět! 👋</h1>
                <p className="text-gray-500 mt-2">Přehled vašeho meme impéria.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-indigo-500">
                    <p className="text-gray-500 text-sm font-medium uppercase">Celkem Memes</p>
                    <p className="text-3xl font-bold mt-2">{memes.length}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                    <p className="text-gray-500 text-sm font-medium uppercase">Kategorie</p>
                    <p className="text-3xl font-bold mt-2">{categoriesCount}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                    <p className="text-gray-500 text-sm font-medium uppercase">V košíku</p>
                    <p className="text-3xl font-bold mt-2">{totalItems}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-pink-500">
                    <p className="text-gray-500 text-sm font-medium uppercase">Nejoblíbenější</p>
                    <p className="font-bold mt-2 truncate">{mostPopular?.name}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4">Máte chuť nakupovat?</h2>
                <Link to="/memes" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
                    Přejít do obchodu
                </Link>
            </div>
        </div>
    );
};