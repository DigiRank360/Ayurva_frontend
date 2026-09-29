import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/PageHero';
import Accordion from '@/components/ui/Accordion';

const questions = [
    { title: 'How can I track my order?', content: <>Open <Link className="font-semibold text-accent-gold underline" to="/track">Track Order</Link> and enter the order ID from your confirmation. Courier events become available once the shipment is created.</> },
    { title: 'When can I request a return?', content: 'The current return request flow is available for delivered orders within 7 days of delivery. Sign in and open your orders to submit a request for review.' },
    { title: 'How do I check refund progress?', content: <>Open your account’s orders and return request to review its latest status. For help with a specific request, <Link className="font-semibold text-accent-gold underline" to="/contact">contact support</Link> with the order ID.</> },
    { title: 'What payment and delivery options are available?', content: 'Available payment methods, delivery destinations, estimates, and charges are displayed during checkout for your order and address.' },
    { title: 'How can I update my delivery address?', content: <>Sign in and manage saved addresses from your <Link className="font-semibold text-accent-gold underline" to="/profile">account profile</Link>. For an order already placed, contact support as soon as possible.</> },
    { title: 'How can I contact the team?', content: <>Use the <Link className="font-semibold text-accent-gold underline" to="/contact">contact form</Link> or the email and phone details listed on the contact page.</> },
];

export default function FAQ() {
    return (
        <Layout>
            <PageHero title="Frequently Asked Questions" subtitle="Quick answers about orders, delivery, and returns." backgroundImage="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1800&q=85" currentPage="FAQs" />
            <main className="bg-bg-main px-4 py-12 sm:px-6 md:py-16">
                <div className="mx-auto max-w-3xl">
                    <p className="text-sm leading-7 text-text-muted">Answers below reflect the current store checkout and order workflows. For an order-specific question, share the order ID with support.</p>
                    <Accordion items={questions} />
                    <div className="mt-10 border-t border-border-light pt-6">
                        <p className="text-sm text-text-muted">Still need help?</p>
                        <Link to="/contact" className="mt-2 inline-block font-semibold text-accent-gold underline underline-offset-4">Contact our support team</Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
}