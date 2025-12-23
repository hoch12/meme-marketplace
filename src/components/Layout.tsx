import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, LogOut } from 'lucide-react';

export const Layout = () => {
    const { logout, user } = useAuth();
    const { totalItems } = useCart();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
                            MemeMarket
                        </Link>

                        <div className="flex items-center gap-6">
                            <Link to="/memes" className="font-medium text-gray-600 hover:text-indigo-600">
                                Memes
                            </Link>

                            <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600">
                                <ShoppingCart className="w-6 h-6" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                                )}
                            </Link>

                            <div className="flex items-center gap-4 border-l pl-6 border-gray-200">
                                <span className="text-sm font-medium text-gray-700">{user?.username}</span>
                                <button onClick={logout} className="text-gray-400 hover:text-red-600 transition">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};