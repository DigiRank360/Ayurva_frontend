import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = () => {
            try {
                const session = authService.getSession();
                if (session && session.user) {
                    setUser(session.user);
                    setIsAuthenticated(true);
                    console.log('✅ Session restored:', session.user.phone);
                }
            } catch (error) {
                console.error('Session check failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    // Send OTP to phone number
    const sendOTP = async (phone) => {
        try {
            const result = await authService.sendOTP(phone);
            return result;
        } catch (error) {
            throw new Error(error.message || 'Failed to send OTP');
        }
    };

    // Verify OTP and login/register
    const login = async (phone, otp) => {
        try {
            const result = await authService.verifyOTP(phone, otp);

            if (result.success) {
                setUser(result.user);
                setIsAuthenticated(true);

                if (result.isNewUser) {
                    console.log('🎉 New account created and logged in!');
                } else {
                    console.log('✅ Logged in successfully!');
                }

                return result;
            }

            throw new Error('Login failed');
        } catch (error) {
            throw new Error(error.message || 'Invalid OTP');
        }
    };

    // Logout
    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        console.log('👋 Logged out');
    };

    // Update profile
    const updateProfile = async (updates) => {
        try {
            const result = await authService.updateProfile(updates);
            if (result.success) {
                setUser(result.user);
                return result;
            }
        } catch (error) {
            throw new Error(error.message || 'Failed to update profile');
        }
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        sendOTP,
        login,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
