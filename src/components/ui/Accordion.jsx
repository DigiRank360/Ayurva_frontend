import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const AccordionItem = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-border-light">
            <button
                className="w-full flex justify-between items-center py-4 text-left group"
                onClick={onClick}
            >
                <span className="text-sm font-bold uppercase tracking-widest text-text-heading group-hover:text-accent-gold transition-colors">
                    {title}
                </span>
                {isOpen ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
            </button>
            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
                )}
            >
                <div className="text-sm text-text-body leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(0);

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="border-t border-border-light mt-8">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    isOpen={openIndex === index}
                    onClick={() => handleClick(index)}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
}
