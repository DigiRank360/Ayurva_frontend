import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Mail, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-bg-main flex items-center justify-center ">
                <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border-light relative overflow-hidden">

                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-gold via-yellow-400 to-accent-gold" />

                    {status === 'success' ? (
                        <div className="text-center animate-in fade-in duration-500">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-green-500" strokeWidth={3} />
                            </div>
                            <h2 className="text-2xl font-bold text-text-heading mb-2">Check your email</h2>
                            <p className="text-text-muted mb-8">
                                We have sent a password reset link to <span className="font-semibold text-text-heading">{email}</span>.
                            </p>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center w-full bg-text-heading text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-accent-gold transition-colors shadow-lg gap-2"
                            >
                                <ArrowLeft size={16} /> Back to Login
                            </Link>

                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-6 text-xs text-text-muted font-bold uppercase tracking-widest hover:text-accent-gold transition-colors"
                            >
                                Try another email
                            </button>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-500">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-sans font-bold text-text-heading mb-2">Forgot Password?</h2>
                                <p className="text-text-muted text-sm">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                            </div>

                            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-text-muted group-focus-within:text-accent-gold transition-colors" />
                                        </div>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="appearance-none relative block w-full px-3 py-3.5 pl-10 border border-gray-200 placeholder-text-muted text-text-body rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent focus:z-10 sm:text-sm transition-all bg-bg-section focus:bg-white"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-text-heading hover:bg-accent-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-gold transition-all duration-300 uppercase tracking-widest shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending Link...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Send Reset Link <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-text-muted">
                                    Remember your password?{' '}
                                    <Link to="/login" className="font-bold text-text-heading hover:text-accent-gold transition-colors">
                                        Back to Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
