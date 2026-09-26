import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../ui/Button';
import useLoading from '../../hooks/useLoading';
import { subscribeNewsletter } from '../../lib/api';
import toast from 'react-hot-toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const { isLoading, startLoading, stopLoading } = useLoading();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        startLoading();
        try {
            const response = await subscribeNewsletter(email);
            toast.success(response.message || 'Subscribed successfully!');
            setEmail('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to subscribe.');
        } finally {
            stopLoading();
        }
    };
    return (
        <section className="relative py-24 bg-text-heading isolate overflow-hidden">
            {/* Background Overlay Image */}
            <div className="absolute inset-0 z-[-1]">
                <img
                    src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1920&q=85"
                    alt="Herbal tea and natural wellness ingredients"
                    className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-text-heading/80 mix-blend-multiply" />
                {/* Radial gradient to focus center */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-text-heading/90" />
            </div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <span className="inline-block text-accent-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 border border-accent-gold/40 px-4 py-1 rounded-full backdrop-blur-sm">
                    Stay Connected
                </span>

                <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 leading-tight max-w-2xl mx-auto">
                    Bring More Wellness Into Your Day
                </h2>

                <p className="text-gray-300 text-base md:text-lg mb-10 font-light max-w-xl mx-auto leading-relaxed">
                    Get practical Ayurvedic tips, mindful routines, and early access to natural wellness essentials. Start your journey with <span className="text-accent-gold font-medium">10% OFF</span> your first purchase.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 sm:gap-0 max-w-lg mx-auto sm:bg-white/10 sm:p-1.5 sm:rounded-full sm:border sm:border-white/10 sm:backdrop-blur-md sm:shadow-2xl bg-transparent p-0 border-none shadow-none rounded-none">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="px-6 py-4 rounded-full bg-white/10 sm:bg-transparent border border-white/20 sm:border-none text-white placeholder-gray-400 focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold flex-grow w-full text-sm font-medium backdrop-blur-sm sm:backdrop-blur-none"
                        required
                    />
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Subscribing..."
                        rightIcon={Send}
                        variant="primary"
                        size="md"
                        className="px-8 py-4 bg-white text-text-heading font-bold uppercase tracking-widest text-xs rounded-full hover:bg-accent-gold hover:text-white whitespace-nowrap w-full sm:w-auto"
                    >
                        Join Now
                    </Button>
                </form>

                <p className="mt-8 text-[10px] text-gray-500 uppercase tracking-widest opacity-60">
                    No spam. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
