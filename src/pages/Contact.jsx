import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/PageHero';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import useLoading from '@/hooks/useLoading';
import { submitContact } from '@/lib/api';
import toast from 'react-hot-toast';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const { isLoading, startLoading, stopLoading } = useLoading();

    const handleSubmit = async (e) => {
        e.preventDefault();
        startLoading();
        try {
            const response = await submitContact(formData);
            toast.success(response.message || 'Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message.');
        } finally {
            stopLoading();
        }
    };
    return (
        <Layout>
            <PageHero
                title="Contact Us"
                subtitle="We'd love to hear from you."
                backgroundImage="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                currentPage="Contact"
            />

            <div className="bg-bg-main min-h-screen py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                        {/* Contact Info */}
                        <div>
                            <span className="text-accent-gold font-bold uppercase tracking-widest text-sm mb-4 block">Get in Touch</span>
                            <h2 className="text-3xl md:text-5xl font-sans font-bold text-text-heading mb-8 leading-tight">
                                Let's Start a <br /><span className="text-accent-gold">Conversation</span>.
                            </h2>
                            <p className="text-text-muted text-lg mb-12">
                                Whether you have questions about our collections, need help with sizing, or just want to say hello, our team is here for you.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center text-accent-gold shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-heading text-lg">Email Us</h3>
                                        <p className="text-text-muted">lugavastra@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center text-accent-gold shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-heading text-lg">Call Us</h3>
                                        <p className="text-text-muted">+91 7400980354</p>
                                        <p className="text-text-muted">Mon - Sat, 10am - 7pm IST</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center text-accent-gold shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-heading text-lg">Visit Us</h3>
                                        <p className="text-text-muted max-w-xs">
                                            125, Rohit Nagar,<br />
                                            Bhopal, Madhya Pradesh - 462001
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-border-light relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/10 rounded-bl-full -mr-8 -mt-8" />

                            <h3 className="text-2xl font-bold text-text-heading mb-8">Send a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-gold transition-colors" size={18} />
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full pl-10 bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold transition-colors"
                                                placeholder="Your Name"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Email</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-gold transition-colors" size={18} />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full pl-10 bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold transition-colors"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-heading">Message</label>
                                    <div className="relative group">
                                        <MessageSquare className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent-gold transition-colors" size={18} />
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={5}
                                            className="w-full pl-10 bg-bg-section border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-gold transition-colors resize-none"
                                            placeholder="How can we help?"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    loadingText="Sending..."
                                    rightIcon={Send}
                                    variant="primary"
                                    size="lg"
                                    className="w-full bg-text-heading text-white hover:bg-accent-gold uppercase tracking-widest text-xs"
                                >
                                    Send Message
                                </Button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}
