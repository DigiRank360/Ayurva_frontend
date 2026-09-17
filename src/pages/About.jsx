import React from 'react';
import Layout from '@/components/layout/Layout';
import { ArrowRight, Heart, Users, Award, Sparkles, Scissors, Star, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    const values = [
        {
            icon: Heart,
            title: 'Craftsmanship',
            description: 'Every thread woven with passion and precision by master artisans'
        },
        {
            icon: Award,
            title: 'Quality',
            description: 'Premium fabrics and traditional techniques for timeless elegance'
        },
        {
            icon: Users,
            title: 'Heritage',
            description: 'Preserving centuries-old weaving traditions for future generations'
        },
        {
            icon: Globe,
            title: 'Sustainability',
            description: 'Eco-friendly practices supporting local communities and artisans'
        }
    ];

    const stats = [
        { number: '25+', label: 'Years of Legacy' },
        { number: '500+', label: 'Master Artisans' },
        { number: '10K+', label: 'Happy Customers' },
        { number: '100%', label: 'Handcrafted' }
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-orange-800/70 to-yellow-900/60">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg3djFoLTd2LTF6bTAgM2g3djFoLTd2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <div className="max-w-4xl">
                        <span className="text-accent-gold font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-4 md:mb-6 block animate-in fade-in slide-in-from-bottom-4 duration-700">
                            Est. 1998
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4 md:mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                            Weaving Tradition<br />
                            <span className="italic font-light text-accent-gold">Into Timeless Beauty</span>
                        </h1>
                        <p className="text-gray-100 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            Where centuries of heritage meet contemporary elegance, crafted by the hands of India's finest artisans
                        </p>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="bg-bg-main">
                {/* Our Story Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                        {/* Text Content */}
                        <div className="order-2 lg:order-1">
                            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4 block">
                                Our Story
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-6 text-text-heading leading-tight">
                                Born in the Heart of <span className="italic text-accent-gold">Varanasi</span>
                            </h2>
                            <p className="text-text-body text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                                In the sacred lanes of Varanasi, where tradition flows like the Ganges, Luga Vastra began with a simple dream: to preserve the dying art of handloom weaving and bring authentic Indian craftsmanship to the world.
                            </p>
                            <p className="text-text-body text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                                For over 25 years, we've been the bridge between master weavers and modern women who appreciate the beauty of handcrafted textiles. Each saree, lehenga, and suit tells a story of dedication, skill, and timeless artistry.
                            </p>
                            <p className="text-text-muted text-sm md:text-base leading-relaxed italic">
                                "We don't just sell clothes; we preserve heritage, support artisans, and celebrate the soul of Indian craftsmanship."
                            </p>
                        </div>

                        {/* Image Collage */}
                        <div className="order-1 lg:order-2 relative">
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="aspect-[3/4] bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg shadow-lg flex items-center justify-center">
                                    <Scissors className="text-accent-gold" size={48} />
                                </div>
                                <div className="aspect-[3/4] bg-gradient-to-br from-orange-100 to-amber-200 rounded-lg shadow-lg mt-8 flex items-center justify-center">
                                    <Sparkles className="text-accent-gold" size={48} />
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-accent-gold/10 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-text-heading text-white py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl lg:text-5xl font-serif text-accent-gold mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-xs md:text-sm uppercase tracking-wider text-gray-300">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Our Values Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-accent-gold font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4 block">
                            What We Stand For
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-text-heading mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
                            Every piece we create is guided by these timeless principles
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="group bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-accent-gold hover:-translate-y-2"
                                >
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-accent-gold/10 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-accent-gold/20 transition-colors">
                                        <Icon className="text-accent-gold" size={24} />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-text-heading mb-2 md:mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-text-muted text-sm md:text-base leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Philosophy Quote Section */}
                <div className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[200px] lg:text-[300px] text-accent-gold/5 font-serif font-bold italic select-none pointer-events-none">
                        &ldquo;
                    </div>

                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
                        <Sparkles className="text-accent-gold mx-auto mb-6 md:mb-8" size={32} />

                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-text-heading leading-tight md:leading-snug mb-6 md:mb-8">
                            Luxury is not just about the price tag.<br />
                            It is about the <span className="text-accent-gold italic">Time</span>, <span className="text-accent-gold italic">Skill</span>, and <span className="text-accent-gold italic">Soul</span><br />
                            poured into every thread.
                        </h2>

                        <div className="flex items-center justify-center gap-4 opacity-40">
                            <div className="w-12 h-[1px] bg-text-heading"></div>
                            <Star size={16} className="text-accent-gold" />
                            <div className="w-12 h-[1px] bg-text-heading"></div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
                    <div className="bg-text-heading text-white rounded-2xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg3djFoLTd2LTF6bTAgM2g3djFoLTd2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

                        <div className="relative z-10">
                            <span className="text-accent-gold font-bold uppercase tracking-widest text-xs md:text-sm mb-4 md:mb-6 block">
                                Experience the Legacy
                            </span>
                            <h2 className="text-3xl md:text-5xl text-white lg:text-6xl font-serif mb-4 md:mb-6 leading-tight">
                                Parampara jo mahsus ho
                            </h2>
                            <p className="text-gray-300 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">
                                Discover handcrafted masterpieces that tell stories of heritage, artistry, and timeless elegance
                            </p>

                            <Link
                                to="/shop"
                                className="group inline-flex items-center gap-3 bg-accent-gold text-text-heading px-6 md:px-10 py-3 md:py-4 rounded-lg font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-accent-gold/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                <span>Explore Collection</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
