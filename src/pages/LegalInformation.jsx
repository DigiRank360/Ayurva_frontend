import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/ui/PageHero';

const pageContent = {
    '/shipping': {
        title: 'Shipping Information',
        subtitle: 'Order updates and delivery details, in one place.',
        eyebrow: 'Delivery',
        sections: [
            { title: 'Delivery availability', body: 'Available delivery destinations, delivery estimates, and any shipping charges are shown during checkout after you enter your address.' },
            { title: 'Order updates', body: 'After an order is placed, its current processing and delivery status is available through the order tracking page. Courier tracking details appear when a shipment has been created.' },
            { title: 'Need help?', body: 'If an order appears delayed or your delivery details need attention, contact our support team with your order ID.' },
        ],
        action: { label: 'Track an order', to: '/track' },
    },
    '/returns': {
        title: 'Returns & Refunds',
        subtitle: 'How to request help with an order.',
        eyebrow: 'After your purchase',
        sections: [
            { title: 'Return window', body: 'The current return flow accepts requests within 7 days of delivery. Requests can only be submitted for delivered orders and remain subject to review.' },
            { title: 'Request a return or exchange', body: 'Sign in and open your orders to select the delivered order and submit a request. Include the affected items and a clear reason so the request can be reviewed.' },
            { title: 'Refund status', body: 'Refund progress depends on the request review and return status. The latest status is shown with the return request; a completed return does not mean the payment has already been credited.' },
        ],
        action: { label: 'View your orders', to: '/profile' },
    },
    '/privacy-policy': {
        title: 'Privacy Policy',
        subtitle: 'What information is used to support your orders and account.',
        eyebrow: 'Your information',
        sections: [
            { title: 'Information we receive', body: 'When you use the store, we may receive details you provide such as your name, email address, phone number, delivery addresses, order information, and messages sent to support.' },
            { title: 'How information is used', body: 'Account and order information is used to provide store features, process and deliver purchases, respond to support requests, and maintain service security.' },
            { title: 'Service providers', body: 'Some services needed to operate the store, such as payment processing, delivery, and hosting, may process relevant information to complete their function.' },
            { title: 'Your choices', body: 'You can review account information in your profile and contact us with questions about information associated with your account or orders.' },
        ],
        action: { label: 'Contact support', to: '/contact' },
    },
    '/terms': {
        title: 'Terms of Service',
        subtitle: 'Terms for using this online store.',
        eyebrow: 'Store terms',
        sections: [
            { title: 'Using the store', body: 'Please provide accurate contact and delivery details when placing an order and keep your account credentials private. We may restrict access where needed to protect the store or its customers.' },
            { title: 'Orders and prices', body: 'Product availability, applicable prices, delivery options, and charges are presented during the purchase flow. An order is subject to confirmation and successful processing.' },
            { title: 'Product information', body: 'We work to keep product descriptions, images, and availability current. Product imagery is illustrative and minor presentation differences may occur.' },
            { title: 'Support and policies', body: 'Shipping, returns, and refund requests are handled according to the information shown at checkout and the applicable store policies. Contact us if you need help with an order.' },
        ],
        action: { label: 'Contact support', to: '/contact' },
    },
};

export default function LegalInformation() {
    const { pathname } = useLocation();
    const content = pageContent[pathname] || pageContent['/shipping'];

    return (
        <Layout>
            <PageHero title={content.title} subtitle={content.subtitle} backgroundImage="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1800&q=85" currentPage={content.title} />
            <main className="bg-bg-main px-4 py-12 sm:px-6 md:py-16">
                <article className="mx-auto max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-gold">{content.eyebrow}</p>
                    <div className="mt-6 divide-y divide-border-light border-y border-border-light">
                        {content.sections.map((section) => <section key={section.title} className="py-6">
                            <h2 className="text-lg font-semibold text-text-heading">{section.title}</h2>
                            <p className="mt-2 text-sm leading-7 text-text-muted">{section.body}</p>
                        </section>)}
                    </div>
                    <Link to={content.action.to} className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-text-heading px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-gold hover:text-text-heading">{content.action.label}</Link>
                </article>
            </main>
        </Layout>
    );
}