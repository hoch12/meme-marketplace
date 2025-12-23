import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.length < 3) return setError('Jméno musí mít alespoň 3 znaky');
        if (password.length < 5) return setError('Heslo musí mít alespoň 5 znaků');
        login(username);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-indigo-600">MemeMarket</h1>
                    <p className="text-gray-500 mt-2">Přihlaste se do svého účtu</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 mb-6 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Uživatelské jméno</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="Zadejte jméno (min 3 znaky)"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Heslo</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
                        Přihlásit se
                    </button>
                </form>
            </div>
        </div>
    );
};