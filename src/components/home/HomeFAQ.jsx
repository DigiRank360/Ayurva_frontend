import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const faqs = [
    {
        question: 'Where can I find product ingredients and directions?',
        answer: 'Each product page lists the ingredients, pack size, directions for use and precautions. Please read them and the product label before use.',
    },
    {
        question: 'What is included in the Combo Packages?',
        answer: 'Each combo page lists the included products and pack quantities. Check the contents, usage directions, price and support terms before ordering.',
    },
    {
        question: 'How are orders dispatched and what are the delivery timelines?',
        answer: 'Shipping charges and delivery estimates are shown at checkout. Once your order is dispatched, tracking details are available on the Track Order page.',
    },
    {
        question: 'Are there any shipping fees or additional charges?',
        answer: 'Applicable taxes and delivery charges are shown with the price details at checkout before you pay.',
    },
    {
        question: 'Can I use these products alongside other medicines?',
        answer: 'Please consult a qualified healthcare professional before starting any new product, especially if you have a health condition, are pregnant or nursing, or take regular medication.',
    },
    {
        question: 'How do I reach Customer Support?',
        answer: (
            <>
                You can contact our team at <a className="font-semibold text-[#173d3a] underline" href="mailto:Support@ayuvapro.com">Support@ayuvapro.com</a> or through the{' '}
                <Link className="font-semibold text-[#173d3a] underline" to="/contact">Contact page</Link>.
            </>
        ),
    },
];

export default function HomeFAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="bg-[#f4f0e9] px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="home-faq-heading">
            <div className="mx-auto max-w-3xl">
                <div className="text-center">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8b5a08]">Need Help Choosing?</p>
                    <h2 id="home-faq-heading" className="mt-2 font-serif text-3xl font-bold text-[#173d3a] sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#5d6964]">
                        Review our product FAQs or contact the support team for help with product details, orders and policies.
                    </p>
                </div>

                <div className="mt-9 space-y-3">
                    {faqs.map((item, index) => {
                        const isOpen = openIndex === index;
                        const panelId = `home-faq-panel-${index}`;
                        return (
                            <div key={item.question} className="rounded-xl border border-[#e8e2d6] bg-white shadow-sm">
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-sm font-bold text-[#173d3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#946000] sm:text-base"
                                >
                                    {item.question}
                                    <ChevronDown size={18} className={cn('shrink-0 text-[#68716f] transition-transform duration-200', isOpen && 'rotate-180')} aria-hidden="true" />
                                </button>
                                {isOpen && (
                                    <div id={panelId} className="px-5 pb-5 text-sm leading-7 text-[#5d6964]">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to="/contact"
                        className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#173d3a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0f2f2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173d3a] focus-visible:ring-offset-2"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </section>
    );
}
