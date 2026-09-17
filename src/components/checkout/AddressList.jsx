import React from 'react';
import { MapPin, Plus, Edit2, Trash2, Check, Home, Briefcase, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const AddressList = ({ addresses, selectedId, onSelect, onAdd, onEdit, onDelete }) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        onClick={() => onSelect(addr.id)}
                        className={cn(
                            "relative flex flex-col p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden",
                            selectedId === addr.id
                                ? "border-text-heading bg-gray-50 shadow-sm"
                                : "border-gray-200 bg-white hover:border-gray-300"
                        )}
                    >
                        {/* Selection Checkmark Corner */}
                        {selectedId === addr.id && (
                            <div className="absolute top-0 right-0 w-8 h-8 md:w-10 md:h-10 bg-text-heading flex items-center justify-center rounded-bl-3xl shadow-sm z-10">
                                <Check size={14} className="text-white -mt-1 -mr-1 md:-mt-2 md:-mr-2" strokeWidth={3} />
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3 md:pr-10">
                                <h3 className="font-bold text-text-heading text-sm md:text-base">{addr.name}</h3>
                                {addr.type && (
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border",
                                        addr.type.toLowerCase() === 'home' ? "bg-orange-50 text-orange-700 border-orange-100" : "bg-blue-50 text-blue-700 border-blue-100"
                                    )}>
                                        {addr.type}
                                    </span>
                                )}
                            </div>

                            <p className="text-text-muted text-xs md:text-sm leading-relaxed mb-1 pr-4">
                                {addr.street}
                            </p>
                            <p className="text-text-heading text-xs md:text-sm font-medium mb-3">
                                {addr.city}, {addr.state} - {addr.pincode}
                            </p>

                            <div className="flex items-center gap-1.5 text-text-muted text-xs md:text-sm">
                                <Phone size={12} className="text-accent-gold" />
                                <span className="font-medium text-text-heading">{addr.phone}</span>
                            </div>
                        </div>

                        {/* Actions Divider */}
                        {/* Only show actions if needed, sticking to right bottom or inline */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEdit(addr); }}
                                className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-black transition-colors"
                            >
                                <Edit2 size={14} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(addr.id); }}
                                className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add New Address Button */}
            <button
                onClick={onAdd}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-2 text-text-muted hover:border-black hover:text-black hover:bg-gray-50 transition-all duration-300 group"
            >
                <Plus size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs uppercase tracking-widest">Add New Address</span>
            </button>
        </div>
    );
};

export default AddressList;
