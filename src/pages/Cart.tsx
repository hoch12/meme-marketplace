import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export const Cart = () => {
    const { cart, removeItem, decreaseCount, addItem, clearCart, totalPrice } = useCart();

    // Prázdný košík
    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="bg-gray-100 p-6 rounded-full">
                    <Trash2 size={48} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Váš košík je prázdný</h2>
                <p className="text-gray-500">Zatím jste si nic nevybrali.</p>
                <Link
                    to="/memes"
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                    Jít nakupovat
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Nákupní košík</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Hlavička tabulky (skrytá na mobilech) */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-6">Produkt</div>
                    <div className="col-span-2 text-center">Cena</div>
                    <div className="col-span-2 text-center">Množství</div>
                    <div className="col-span-2 text-right">Celkem</div>
                </div>

                {/* Seznam položek */}
                <div className="divide-y divide-gray-100">
                    {cart.map(item => (
                        <div key={item.id} className="p-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-center bg-white">

                            {/* Info o produktu */}
                            <div className="col-span-6 flex items-center gap-4 w-full">
                                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 line-clamp-1" title={item.name}>{item.name}</h3>
                                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500 mt-1">
                        {item.category}
                      </span>
                                </div>
                            </div>

                            {/* Jednotková cena */}
                            <div className="col-span-2 text-gray-600 font-medium text-center hidden md:block">
                                ${item.price}
                            </div>

                            {/* Ovládání množství */}
                            <div className="col-span-2 flex items-center justify-center gap-3">
                                <button
                                    onClick={() => decreaseCount(item.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600 transition"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="font-bold w-6 text-center text-gray-900">{item.quantity}</span>
                                <button
                                    onClick={() => addItem(item)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 text-gray-600 transition"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            {/* Celkem & Smazat */}
                            <div className="col-span-2 flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0">
                   <span className="font-bold text-indigo-600 text-lg md:text-base">
                     ${item.price * item.quantity}
                   </span>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                                    title="Odstranit"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Patička košíku */}
                <div className="bg-gray-50 p-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-200">
                    <button
                        onClick={clearCart}
                        className="text-red-500 hover:text-red-700 text-sm font-medium underline decoration-red-200 hover:decoration-red-700 transition"
                    >
                        Vyprázdnit celý košík
                    </button>

                    <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                        <div className="text-xl text-gray-700">
                            Celkem k úhradě: <span className="font-extrabold text-3xl text-gray-900 ml-2">${totalPrice}</span>
                        </div>
                        <button className="w-full md:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform active:scale-95 flex items-center justify-center gap-2">
                            Zaplatit <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};