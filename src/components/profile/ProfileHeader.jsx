import React from 'react';
import { User, Camera, Edit2 } from 'lucide-react';

export default function ProfileHeader() {
    return (
        <section className="w-full bg-bg-main pt-6 pb-2">
            <div className="h-32 bg-gradient-to-r from-text-heading to-[#2A1416] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                {/* Gold Sheen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="px-6 md:px-8 pb-8 flex flex-col md:flex-row items-end -mt-12 gap-6 relative z-10">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-xl ring-2 ring-accent-gold/20">
                        <div className="w-full h-full bg-bg-section rounded-xl overflow-hidden flex items-center justify-center text-text-muted transition-transform group-hover:scale-105">
                            <User size={40} className="text-accent-gold/80" />
                        </div>
                    </div>
                    <button className="absolute bottom-[-8px] right-[-8px] w-8 h-8 bg-accent-gold text-white rounded-full flex items-center justify-center hover:bg-text-heading transition-all shadow-lg border-2 border-white hover:scale-110">
                        <Camera size={14} />
                    </button>
                </div>

                <div className="flex-1 mb-2 text-center md:text-left">
                    <h1 className="text-2xl font-sans font-bold text-text-heading">Ankit Jatav</h1>
                    <p className="text-text-muted text-sm font-medium tracking-wide">Platinum Member</p>
                </div>

                <div className="mb-4 hidden md:block">
                    <button className="flex items-center gap-2 px-6 py-2.5 border border-text-heading text-text-heading rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-text-heading hover:text-white hover:border-text-heading transition-all shadow-sm hover:shadow-md">
                        <Edit2 size={12} /> Edit Profile
                    </button>
                </div>
            </div>
        </section>
    );
}
