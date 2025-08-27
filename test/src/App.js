import NavBar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import { FavoriteProvider } from './contexts/FavoriteContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { CartProvider } from './contexts/CartContext';
import './App.css';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <FavoriteProvider>
          <CartProvider>
            <NavBar />
            <div className="container py-4">
              <AppRoutes />
            </div>
          </CartProvider>
        </FavoriteProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
