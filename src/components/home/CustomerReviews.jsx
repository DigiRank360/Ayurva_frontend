import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Priya Sharma",
        location: "Mumbai",
        rating: 5,
        text: "The herbal blend has become a simple and comforting part of my morning routine.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80"
    },
    {
        id: 2,
        name: "Aditi Rao",
        location: "Bangalore",
        rating: 5,
        text: "I love knowing exactly what goes into these products. Gentle, natural, and thoughtfully made.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"
    },
    {
        id: 3,
        name: "Sanya Malhotra",
        location: "Delhi",
        rating: 4,
        text: "The digestive wellness range fits so easily into my everyday self-care ritual.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&q=80"
    },
    {
        id: 4,
        name: "Mira Kapoor",
        location: "Jaipur",
        rating: 5,
        text: "Ayurva Pro makes wellness feel practical, calm, and easy to stay consistent with.",
        image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=128&q=80"
    },
    {
        id: 5,
        name: "Ananya Pandey",
        location: "Lucknow",
        rating: 5,
        text: "The natural ingredients and quality packaging give me complete confidence in every order.",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=128&q=80"
    },
    {
        id: 6,
        name: "Kiara Advani",
        location: "Hyderabad",
        rating: 5,
        text: "A beautiful way to bring a little more balance and intention into busy days.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=128&q=80"
    }
];

export default function CustomerReviews() {
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId;
        const scrollSpeed = 0.8; // Slightly slower for reading

        const loop = () => {
            if (!isPaused) {
                // Reset to start if we've scrolled past the first set of items (approximate)
                // A better approach for seamless loop is to check scroll width vs client width
                if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 2)) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += scrollSpeed;
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    // We duplicate the reviews array to create the infinite scroll illusion
    const extendedReviews = [...reviews, ...reviews, ...reviews];

    return (
        <section className="py-24 bg-[#FDFBF7] overflow-hidden border-t border-border-light relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <span className="text-accent-gold font-bold uppercase tracking-[0.2em] text-xs mb-3 block animate-in fade-in slide-in-from-bottom-2">Testimonials</span>
                <h2 className="text-2xl md:text-4xl font-sans font-bold text-text-heading mb-6">Loved by Wellness Seekers</h2>
                <div className="w-24 h-1 bg-accent-gold mx-auto rounded-full"></div>
            </div>

            {/* Scrolling Container */}
            <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide px-4 py-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {extendedReviews.map((review, idx) => (
                    <div
                        key={`${review.id}-${idx}`}
                        className="flex-shrink-0 w-[300px] md:w-[350px] bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-accent-gold/20 group cursor-pointer relative"
                    >
                        {/* Quote Icon */}
                        <div className="absolute top-6 right-8 text-accent-gold/20 group-hover:text-accent-gold transition-colors">
                            <Quote size={40} strokeWidth={1} fill="currentColor" />
                        </div>

                        {/* Profile Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-gold/20 p-1">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-text-heading font-sans">{review.name}</h4>
                                <p className="text-xs text-text-muted uppercase tracking-wider">{review.location}</p>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex gap-1 mb-4 text-accent-gold">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                            ))}
                        </div>

                        {/* Review Text */}
                        <p className="font-serif text-text-body text-lg italic leading-relaxed opacity-90 mb-2">
                            "{review.text}"
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
