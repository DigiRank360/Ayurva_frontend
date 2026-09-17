import React from 'react';
import BannerSlider from './BannerSlider';

const Hero = () => {
    return (
        <section className="w-full bg-bg-main pt-6 pb-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BannerSlider />
            </div>
        </section>
    );
};

export default Hero;
