import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <Layout>
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-bg-main">
                <h1 className="text-9xl font-bold text-accent-gold/20 font-sans tracking-widest select-none">
                    404
                </h1>
                <div className="relative -mt-12 mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-heading font-sans mb-2">
                        Lost in Luxury?
                    </h2>
                    <p className="text-text-muted text-lg max-w-md mx-auto">
                        The page you are looking for seems to have unraveled. Let's get you back to our collection.
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-text-heading text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest hover:bg-accent-gold transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    <Home size={18} />
                    Back to Home
                </Link>
            </div>
        </Layout>
    );
};

export default NotFound;
