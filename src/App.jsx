import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import OrderDetail from './pages/OrderDetail';
import TrackOrder from './pages/TrackOrder';
import AddressForm from './pages/AddressForm';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';
import OrderConfirmation from './pages/OrderConfirmation';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from '@/components/ui/ScrollToTop';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="font-sans antialiased text-text-body bg-bg-main min-h-screen flex flex-col">
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ScrollToTop />
                <Toaster
                  position="top-right"
                  reverseOrder={false}
                  toastOptions={{
                    className: 'font-sans text-sm shadow-xl border border-gray-100',
                    style: {
                      background: '#fff',
                      color: '#0d1117', // text-heading
                      borderRadius: '0.75rem',
                      padding: '16px',
                    },
                    success: {
                      iconTheme: {
                        primary: '#bea168', // accent-gold
                        secondary: '#fff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  <Route path="/wishlist" element={<Wishlist />} />
                  {/* <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} /> */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order/:id"
                    element={
                      <ProtectedRoute>
                        <OrderDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/track-order/:id" element={<TrackOrder />} />
                  <Route path="/profile/add-address" element={<AddressForm />} />
                  <Route path="/profile/edit-address/:id" element={<AddressForm />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
