import React, { useState, useRef, useEffect } from 'react';
import { X, RefreshCw, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import useLoading from '../../hooks/useLoading';
import { useAuth } from '@/context/AuthContext';

const OTPModal = ({ isOpen, onClose, phone, onSuccess }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const { login, sendOTP } = useAuth();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const inputRefs = useRef([]);

    // Auto-focus first input when modal opens
    useEffect(() => {
        if (isOpen && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [isOpen]);

    // Handle OTP input change
    const handleChange = (index, value) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify when all 6 digits entered
        if (newOtp.every(digit => digit)) {
            handleVerifyOTP(newOtp.join(''));
        }
    };

    // Handle backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const digits = pastedData.split('').filter(char => /^\d$/.test(char));

        const newOtp = [...otp];
        digits.forEach((digit, i) => {
            if (i < 6) newOtp[i] = digit;
        });
        setOtp(newOtp);

        // Focus last filled input
        const lastFilledIndex = digits.length - 1;
        if (lastFilledIndex >= 0 && lastFilledIndex < 6) {
            inputRefs.current[lastFilledIndex]?.focus();
        }

        // Auto-verify if pasted complete OTP
        if (digits.length === 6) {
            handleVerifyOTP(digits.join(''));
        }
    };

    // Verify OTP
    const handleVerifyOTP = async (otpValue) => {
        const otpCode = otpValue || otp.join('');

        if (otpCode.length !== 6) {
            setError('Please enter complete OTP');
            return;
        }

        try {
            startLoading();
            const result = await login(phone, otpCode);
            stopLoading();

            if (result.success) {
                onSuccess(result);
            }
        } catch (err) {
            stopLoading();
            setError(err.message || 'Invalid OTP. Please try again.');
            // Clear OTP on error
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }
    };

    // Resend OTP
    const handleResendOTP = async () => {
        try {
            await sendOTP(phone);
            setOtp(['', '', '', '', '', '']);
            setError('');
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError('Failed to resend OTP');
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
                    <h2 className="text-2xl font-bold text-text-heading mb-2">Verify OTP</h2>
                    <p className="text-sm text-text-muted">
                        Enter the OTP sent to <strong className="text-text-heading">{phone}</strong>
                    </p>
                </div>

                {/* OTP Input Boxes */}
                <div className="mb-6">
                    <div className="flex gap-1 sm:gap-2 justify-center mb-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 rounded-xl outline-none transition-all ${digit
                                        ? 'border-accent-gold bg-accent-gold/5'
                                        : 'border-gray-200 focus:border-accent-gold'
                                    } ${error ? 'border-red-500 shake' : ''}`}
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}
                </div>

                {/* Demo Info */}
                {/* <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-xs text-green-800 flex items-center gap-2">
                        <CheckCircle size={16} />
                        <span><strong>Demo OTP:</strong> Enter <strong>123456</strong></span>
                    </p>
                </div> */}

                {/* Resend OTP */}
                <div className="flex justify-center items-center gap-2 text-sm mb-6">
                    <span className="text-gray-600">Didn't receive OTP?</span>
                    <button
                        onClick={handleResendOTP}
                        className="text-accent-gold hover:text-accent-gold/80 font-medium flex items-center gap-1"
                    >
                        <RefreshCw size={14} />
                        Resend OTP
                    </button>
                </div>

                {/* Verify Button */}
                <Button
                    onClick={() => handleVerifyOTP()}
                    isLoading={isLoading}
                    loadingText="Verifying..."
                    variant="primary"
                    size="lg"
                    className="w-full bg-accent-gold hover:bg-accent-gold/90  font-bold  tracking-widest"
                    disabled={otp.some(digit => !digit)}
                >
                    Verify & Continue
                </Button>
            </div>
        </div>
    );
};

// Add shake animation for error state
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .shake {
        animation: shake 0.3s ease-in-out;
    }
`;
if (!document.querySelector('style[data-otp-modal]')) {
    style.setAttribute('data-otp-modal', 'true');
    document.head.appendChild(style);
}

export default OTPModal;
