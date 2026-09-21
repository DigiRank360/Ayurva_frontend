import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const BASE_URL = API_URL.replace('/api', '');

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Ensure cookies are sent
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Banner API
export const getBanners = async () => {
    const response = await api.get('/banners');
    return response.data;
};

// Category API
export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};

// Trending Products API
export const getTrendingProducts = async () => {
    const response = await api.get('/products/trending');
    return response.data;
};

// New Arrivals API (gets latest 8 active products)
export const getNewArrivals = async () => {
    const response = await api.get('/products', { params: { limit: 8, active: true } });
    return response.data.products;
};

// Product API
export const getProducts = async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
};

// get product by id
export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    if (Array.isArray(response.data)) {
        return response.data[0];
    }
    return response.data;
};

// get related/similar products
export const getRelatedProducts = async (productId) => {
    const response = await api.get(`/products/${productId}/related`);
    return response.data;
};

// get product reviews
export const getReviews = async (productId) => {
    const response = await api.get(`/products/${productId}/reviews`);
    return response.data;
};

// create a review
export const createReview = async (productId, reviewData) => {
    const response = await api.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
};

// Wishlist APIs
export const getWishlist = async () => {
    const response = await api.get('/wishlist');
    return response.data;
};

export const toggleWishlistApi = async (productId) => {
    const response = await api.post('/wishlist/toggle', { productId });
    return response.data;
};

// CRM APIs
export const submitContact = async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
};

export const subscribeNewsletter = async (email) => {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
};

// Cart APIs
export const getCartApi = async (sessionId) => {
    const response = await api.get('/cart', { params: { sessionId } });
    return response.data;
};

export const addToCartApi = async (productId, quantity = 1, sessionId) => {
    const response = await api.post('/cart/add', { productId, quantity, sessionId });
    return response.data;
};

export const updateCartItemApi = async (itemId, quantity, sessionId) => {
    const response = await api.put(`/cart/${itemId}`, { quantity, sessionId });
    return response.data;
};

export const removeFromCartApi = async (itemId, sessionId) => {
    const response = await api.delete(`/cart/${itemId}`, { params: { sessionId } });
    return response.data;
};

export const clearCartApi = async (sessionId) => {
    const response = await api.delete('/cart/clear', { params: { sessionId } });
    return response.data;
};

export const mergeCartApi = async (sessionId) => {
    const response = await api.post('/cart/merge', { sessionId });
    return response.data;
};

// Offer / Coupon APIs
export const validateCoupon = async (code, orderAmount) => {
    const response = await api.post('/offers/validate', { code, orderAmount });
    return response.data;
};

// Address APIs
export const getUserAddresses = async () => {
    const response = await api.get('/users/addresses');
    return response.data;
};

export const addUserAddress = async (addressData) => {
    const response = await api.post('/users/address', addressData);
    console.log(addressData);
    return response.data;
};

export const updateUserAddress = async (addressId, addressData) => {
    const response = await api.put(`/users/address/${addressId}`, addressData);
    return response.data;
};

export const deleteUserAddress = async (addressId) => {
    const response = await api.delete(`/users/address/${addressId}`);
    return response.data;
};

// Order APIs
export const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export const getMyOrders = async (page = 1, limit = 10) => {
    const response = await api.get('/orders/myorders', { params: { page, limit } });
    return response.data;
};

export const getOrderById = async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
};

export const updateOrderToPaid = async (orderId, paymentData) => {
    const response = await api.put(`/orders/${orderId}/pay`, paymentData);
    return response.data;
};

// Payment APIs (Razorpay)
export const createPaymentOrder = async (amount) => {
    const response = await api.post('/payment/create-order', { amount });
    return response.data;
};

export const verifyPaymentApi = async (paymentData) => {
    const response = await api.post('/payment/verify', paymentData);
    return response.data;
};

export default api;
