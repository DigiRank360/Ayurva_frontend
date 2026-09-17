import axios from 'axios';
import { API_URL } from '../lib/api'

const AUTH_KEY = 'luga_vastra_auth';


// Create axios instance with credentials
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true // Important for cookies
});

export const authService = {
    // Send OTP to phone (also works for Resend)
    sendOTP: async (phone) => {
        try {
            const response = await api.post('/users/send-otp', { phone });
            return {
                success: true,
                message: response.data.message,
                phone: response.data.phone,
                isNewUser: response.data.isNewUser
            };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to send OTP');
        }
    },

    // Verify OTP and login/register
    verifyOTP: async (phone, otp) => {
        try {
            const response = await api.post('/users/verify-otp', { phone, otp });
            const data = response.data;

            // Save user data to local storage for UI persistence
            // Token is handled by HTTP-only cookie, but we store it for legacy if needed
            const authData = {
                user: {
                    _id: data._id,
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    isAdmin: data.isAdmin
                },
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            };

            localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

            // Store token so api.js interceptor can send Bearer auth
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            return {
                success: true,
                user: authData.user,
                isNewUser: data.isNewUser
            };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Invalid OTP');
        }
    },

    // Get current auth session from local storage
    getSession: () => {
        const authData = localStorage.getItem(AUTH_KEY);
        if (!authData) return null;

        try {
            const session = JSON.parse(authData);
            if (new Date(session.expiresAt) < new Date()) {
                localStorage.removeItem(AUTH_KEY);
                return null;
            }
            return session;
        } catch (error) {
            return null;
        }
    },

    // Logout
    logout: async () => {
        try {
            await api.post('/users/logout');
        } catch (error) {
            console.error('Logout API failed:', error);
        }
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem('token');
        return { success: true };
    },

    // Update user profile
    updateProfile: async (updates) => {
        try {
            const response = await api.put('/users/profile', updates);
            const updatedUser = response.data;

            const session = authService.getSession();
            if (session) {
                session.user = {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    phone: updatedUser.phone,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin
                };
                localStorage.setItem(AUTH_KEY, JSON.stringify(session));
            }

            return { success: true, user: updatedUser };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update profile');
        }
    }
};
