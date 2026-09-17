import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Layout>
            <div className="min-h-screen bg-bg-main flex items-center justify-center px-4 ">
                <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border-light relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-gold via-text-heading to-accent-gold" />

                    <div className="text-center mb-10">
                        <h1 className="font-sans font-bold text-3xl text-text-heading mb-2">Welcome Back</h1>
                        <p className="text-text-muted text-sm">
                            Sign in to access your luxury collection.
                            <span className="block mt-1 italic text-accent-gold">"Parampara, Jo Mehsoos Ho"</span>
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-text-heading mb-2">Email Address</label>
                            <input
                                type="email"
                                className="w-full bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-text-heading">Password</label>
                                <Link to="/forgot-password" className="text-xs text-accent-gold hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-bg-section border border-border-default rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-heading transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button className="w-full bg-text-heading text-white py-3.5 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-accent-gold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
                            Sign In <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border-light text-center">
                        <p className="text-sm text-text-muted">
                            New to Luga Vastra?{' '}
                            <Link to="/signup" className="text-text-heading font-bold hover:text-accent-gold transition-colors">
                                Create an Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
