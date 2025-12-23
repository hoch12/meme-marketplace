import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MemeProvider } from './context/MemeDataContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';

// Import Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { MemeList } from './pages/MemeList';
import { MemeDetail } from './pages/MemeDetail';
import { Cart } from './pages/Cart';

const NotFound = () => <div className="text-center text-4xl mt-20">404 - Page Not Found</div>;

function App() {
    return (
        <AuthProvider>
            <MemeProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        <Route element={<PrivateRoute />}>
                            <Route element={<Layout />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/memes" element={<MemeList />} />
                                <Route path="/memes/:id" element={<MemeDetail />} />
                                <Route path="/cart" element={<Cart />} />
                            </Route>
                        </Route>

                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </CartProvider>
            </MemeProvider>
        </AuthProvider>
    );
}

export default App;