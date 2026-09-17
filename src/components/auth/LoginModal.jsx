import React, { useState } from 'react';
import { X, Phone, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import useLoading from '../../hooks/useLoading';
import { useAuth } from '@/context/AuthContext';

const LoginModal = ({ isOpen, onClose, onOTPSent }) => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const { sendOTP } = useAuth();
    const { isLoading, startLoading, stopLoading } = useLoading();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');

        // Validate phone number
        if (!phone || phone.length < 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        const fullPhone = `+91${phone}`;

        try {
            startLoading();
            await sendOTP(fullPhone);
            stopLoading();

            // Pass phone to parent to open OTP modal
            onOTPSent(fullPhone);
        } catch (err) {
            stopLoading();
            setError(err.message || 'Failed to send OTP');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-[slideUp_0.3s_ease-out]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-text-heading mb-2">Login to Continue</h2>
                    <p className="text-sm text-text-muted">Get access to your orders, wishlist, and recommendations</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSendOTP} className="space-y-5">
                    {/* Phone Input */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-text-heading mb-2">
                            Mobile Number
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-600 border-r border-gray-200 pr-3">
                                <Phone size={18} className="text-accent-gold" />
                                <span className="font-medium">+91</span>
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setPhone(value);
                                    setError('');
                                }}
                                placeholder="Enter 10-digit mobile number"
                                className="w-full pl-24 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all text-lg"
                                maxLength="10"
                                required
                            />
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-500">{error}</p>
                        )}
                    </div>

                    {/* Demo OTP Info */}
                    {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-800">
                            <strong>Demo Mode:</strong> Use any phone number. OTP will be <strong>123456</strong>
                        </p>
                    </div> */}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Sending OTP..."
                        rightIcon={ArrowRight}
                        variant="primary"
                        size="lg"
                        className="w-full bg-accent-gold hover:bg-accent-gold/90  font-bold  tracking-widest"
                    >
                        Send OTP
                    </Button>

                    {/* Terms */}
                    <p className="text-xs text-center text-gray-500 leading-relaxed">
                        By continuing, you agree to Luga Vastra's{' '}
                        <a href="/terms" className="text-accent-gold hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-accent-gold hover:underline">Privacy Policy</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

// Add slideUp animation to global CSS or use inline style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
if (!document.querySelector('style[data-login-modal]')) {
    style.setAttribute('data-login-modal', 'true');
    document.head.appendChild(style);
}

export default LoginModal;
