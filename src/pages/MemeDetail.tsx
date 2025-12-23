import { useParams, Link } from 'react-router-dom';
import { useMemeData } from '../context/MemeDataContext';
import { useCart } from '../context/CartContext';

export const MemeDetail = () => {
    const { id } = useParams();
    const { memes, loading } = useMemeData();
    const { addItem } = useCart();

    if (loading) return <div className="text-center mt-10 text-gray-500">Načítám detail...</div>;

    const meme = memes.find(m => m.id === id);
    if (!meme) return <div className="text-center mt-10 text-red-500 font-bold">Meme nebyl nalezen 😢</div>;

    // Najdeme 3 "příbuzné" memes ze stejné kategorie (pro sekci dole)
    const relatedMemes = memes
        .filter(m => m.category === meme.category && m.id !== meme.id)
        .slice(0, 3);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Tlačítko Zpět */}
            <Link
                to="/memes"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
                &larr; Zpět na seznam
            </Link>

            {/* Hlavní karta detailu */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-100">

                {/* Levá část - Obrázek */}
                <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100">
                    <img
                        src={meme.url}
                        alt={meme.name}
                        className="max-h-[500px] w-auto object-contain rounded-lg shadow-sm"
                    />
                </div>

                {/* Pravá část - Informace */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{meme.name}</h1>

                    <div className="space-y-4 text-lg text-gray-700">
                        <div className="flex border-b border-gray-100 pb-2">
                            <span className="font-semibold w-32 text-gray-500">Kategorie:</span>
                            <span className="capitalize">{meme.category}</span>
                        </div>

                        <div className="flex border-b border-gray-100 pb-2">
                            <span className="font-semibold w-32 text-gray-500">Rozměry:</span>
                            <span>{meme.width} x {meme.height}</span>
                        </div>

                        <div className="flex border-b border-gray-100 pb-2">
                            <span className="font-semibold w-32 text-gray-500">Hodnocení:</span>
                            <span className="text-yellow-500 flex gap-1 items-center">
                {"⭐".repeat(meme.rating)} <span className="text-gray-400 text-sm">({meme.rating}/5)</span>
              </span>
                        </div>

                        <div className="flex items-center pt-2">
                            <span className="font-semibold w-32 text-gray-500">Cena:</span>
                            <span className="text-3xl font-bold text-indigo-600">${meme.price}</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <button
                            onClick={() => addItem(meme)}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 hover:shadow-lg transition transform active:scale-95"
                        >
                            Přidat do košíku 🛒
                        </button>
                    </div>
                </div>
            </div>

            {/* Sekce Podobné Memes */}
            {relatedMemes.length > 0 && (
                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Mohlo by se vám líbit</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {relatedMemes.map(rel => (
                            <Link key={rel.id} to={`/memes/${rel.id}`} className="group block">
                                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition">
                                    <div className="h-48 overflow-hidden bg-gray-50">
                                        <img
                                            src={rel.url}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            alt={rel.name}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="font-bold text-gray-800 truncate group-hover:text-indigo-600 transition">
                                            {rel.name}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">${rel.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};