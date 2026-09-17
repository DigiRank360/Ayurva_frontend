import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
    { id: 1, label: 'Address' },
    { id: 2, label: 'Summary' },
    { id: 3, label: 'Payment' },
];

const CheckoutSteps = ({ currentStep }) => {
    return (
        <div className="flex items-center justify-between md:justify-center w-full max-w-3xl mx-auto mt-2 md:mt-6 px-4">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                    {/* Step Circle */}
                    <div
                        className={cn(
                            "w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-[10px] md:text-sm border-2 transition-all duration-300 backdrop-blur-sm z-10 relative shrink-0",
                            currentStep > step.id
                                ? "bg-accent-gold border-accent-gold text-white shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                                : currentStep === step.id
                                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                    : "bg-white/10 border-white/20 text-gray-400"
                        )}
                    >
                        {currentStep > step.id ? <Check size={16} /> : step.id}
                    </div>

                    {/* Step Label */}
                    <span
                        className={cn(
                            "ml-2 md:ml-3 mr-2 md:mr-8 text-[10px] md:text-sm font-bold uppercase tracking-wider block transition-colors duration-300",
                            currentStep >= step.id ? "text-white" : "text-white/40",
                            // Hide label on very small screens if needed, but flex-col might be better. Keeping inline but small.
                        )}
                    >
                        {step.label}
                    </span>

                    {/* Connector Line (except for last step) */}
                    {index < steps.length - 1 && (
                        <div
                            className={cn(
                                "flex-1 h-[2px] mx-2 md:mx-4 transition-all duration-500 rounded-full min-w-[20px]",
                                currentStep > step.id ? "bg-accent-gold shadow-[0_0_10px_rgba(234,179,8,0.5)]" : "bg-white/10"
                            )}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default CheckoutSteps;
