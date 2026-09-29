import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Headset, ArrowUpRight, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { submitContact } from '@/lib/api';

const quickActions = [
    { label: 'Track an order', value: 'track order' },
    { label: 'Returns & refunds', value: 'returns' },
    { label: 'Shipping details', value: 'shipping' },
    { label: 'Contact support', value: 'contact support' },
];

const makeMessage = (text, isUser = false, link = null) => ({
    id: `${Date.now()}-${Math.random()}`,
    text,
    isUser,
    link,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
});

const getAssistantReply = (message) => {
    const normalized = message.toLowerCase();
    if (/track|tracking|delivery status|where.*order|order status/.test(normalized)) {
        return { text: 'Enter your order ID on the tracking page to see the latest shipment status and tracking history.', link: { label: 'Track order', to: '/track' } };
    }
    if (/return|refund|exchange|damaged|wrong item/.test(normalized)) {
        return { text: 'Return requests are available for delivered orders within 7 days of delivery. Sign in to your account to open your orders and submit a request.', link: { label: 'Returns information', to: '/returns' } };
    }
    if (/ship|delivery|deliver|courier|shipping/.test(normalized)) {
        return { text: 'Delivery estimates and charges are shown at checkout for your address. Shipment updates and courier details appear on the tracking page after dispatch.', link: { label: 'Shipping information', to: '/shipping' } };
    }
    if (/payment|pay|cod|checkout|charge/.test(normalized)) {
        return { text: 'Available payment methods and order charges are displayed during checkout. More answers are available in our FAQs.', link: { label: 'View FAQs', to: '/faq' } };
    }
    if (/product|ingredient|wellness|shop|catalog/.test(normalized)) {
        return { text: 'Browse the current wellness collection to see available products, ingredients, and prices.', link: { label: 'Explore products', to: '/shop' } };
    }
    return null;
};

const ChatWidget = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        makeMessage('Hi! I can help with order tracking, shipping, returns, and product questions. Choose a topic or send a message.')
    ]);
    const [inputText, setInputText] = useState("");
    const [contactFormOpen, setContactFormOpen] = useState(false);
    const [contactDetails, setContactDetails] = useState({ name: '', email: '' });
    const [pendingInquiry, setPendingInquiry] = useState('');
    const [isSendingContact, setIsSendingContact] = useState(false);
    const [contactError, setContactError] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!isOpen) return undefined;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const askAssistant = (text) => {
        const trimmedText = text.trim();
        if (!trimmedText) return;

        setMessages((current) => [...current, makeMessage(trimmedText, true)]);
        setInputText('');
        const reply = getAssistantReply(trimmedText);
        if (reply) {
            setMessages((current) => [...current, makeMessage(reply.text, false, reply.link)]);
            setContactFormOpen(false);
            setPendingInquiry('');
            return;
        }

        setPendingInquiry(trimmedText);
        setContactError('');
        setContactFormOpen(true);
        setMessages((current) => [...current, makeMessage('I do not have a verified answer for that yet. Leave your details below and I will send your question to our support team.')]);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        askAssistant(inputText);
    };

    const handleContactSubmit = async (event) => {
        event.preventDefault();
        setIsSendingContact(true);
        setContactError('');
        try {
            const response = await submitContact({
                ...contactDetails,
                message: `Support request from website chat: ${pendingInquiry || 'Customer requested support.'}`,
            });
            setMessages((current) => [...current, makeMessage(response.message || 'Your message has been sent to our support team.')]);
            setContactDetails({ name: '', email: '' });
            setPendingInquiry('');
            setContactFormOpen(false);
        } catch (error) {
            setContactError(error.response?.data?.message || 'Could not send your request. Please try again or use the contact page.');
        } finally {
            setIsSendingContact(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
            {/* Chat Window */}
            <div className={cn(
                    "mb-4 flex h-[min(78dvh,42rem)] min-h-[min(24rem,calc(100dvh-8rem))] max-h-[calc(100dvh-6rem)] w-[calc(100vw-2rem)] max-w-[26rem] flex-col overflow-hidden rounded-xl border border-[#d8e2dc] bg-white shadow-[0_20px_60px_-16px_rgba(15,42,34,0.38)] transition-all duration-200 origin-bottom-right",
                    isOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible pointer-events-none absolute translate-y-3 scale-[0.98] opacity-0"
                )} role="dialog" aria-modal="false" aria-labelledby="support-chat-title" aria-hidden={!isOpen}>
                {/* Header */}
                    <div className="flex shrink-0 items-center justify-between bg-[#123f38] px-5 py-4 text-white">
                    <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-[#ead58c]">
                                <Headset size={21} />
                        </div>
                        <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ead58c]">Ayurva Pro</p>
                                <h3 id="support-chat-title" className="mt-0.5 text-base font-semibold leading-tight text-white">Help center</h3>
                        </div>
                    </div>
                        <button type="button" aria-label="Close help chat" onClick={() => setIsOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-md text-white/75 transition-colors hover:bg-white/10 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                    <div aria-live="polite" className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#f5f7f4] p-5">
                    {messages.map((msg) => (
                        <div key={msg.id} className={cn("flex max-w-[88%] flex-col", msg.isUser ? "ml-auto items-end" : "items-start")}>
                            <div className={cn(
                                "rounded-xl px-4 py-2.5 text-sm font-medium leading-relaxed",
                                msg.isUser
                                    ? "rounded-tr-sm bg-text-heading text-white"
                                    : "rounded-tl-sm border border-border-light bg-white text-text-heading"
                            )}>
                                {msg.text}
                            </div>
                            {msg.link && <button type="button" onClick={() => { setIsOpen(false); navigate(msg.link.to); }} className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-text-heading underline underline-offset-4 hover:text-accent-gold">{msg.link.label}<ArrowUpRight size={13} /></button>}
                            <span className="text-[10px] text-text-muted mt-1 px-1">{msg.time}</span>
                        </div>
                    ))}
                    {!contactFormOpen && messages.length === 1 && <div className="space-y-2"><p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Popular topics</p><div className="grid grid-cols-2 gap-2">{quickActions.map((action) => <button key={action.value} type="button" onClick={() => askAssistant(action.value)} className="min-h-11 rounded-md border border-[#d8e2dc] bg-white px-3 py-2 text-left text-xs font-semibold leading-snug text-[#24473c] transition-colors hover:border-[#b79a54] hover:bg-[#fbf8ef]">{action.label}</button>)}</div></div>}
                    <div ref={messagesEndRef} />
                </div>

                {contactFormOpen && <form onSubmit={handleContactSubmit} className="shrink-0 space-y-2 border-t border-[#e2e8e3] bg-white p-4">
                    <input aria-label="Your name" autoComplete="name" required value={contactDetails.name} onChange={(event) => setContactDetails({ ...contactDetails, name: event.target.value })} placeholder="Your name" className="h-10 w-full rounded-md border border-border-default px-3 text-sm outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold" />
                    <input aria-label="Your email" type="email" autoComplete="email" required value={contactDetails.email} onChange={(event) => setContactDetails({ ...contactDetails, email: event.target.value })} placeholder="Email address" className="h-10 w-full rounded-md border border-border-default px-3 text-sm outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold" />
                    {contactError && <p role="alert" className="text-xs text-red-700">{contactError}</p>}
                    <button type="submit" disabled={isSendingContact} className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-text-heading px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-gold disabled:opacity-60">
                        {isSendingContact ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send size={15} />}
                        {isSendingContact ? 'Sending request...' : 'Send to support'}
                    </button>
                </form>}

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="flex shrink-0 gap-2 border-t border-[#e2e8e3] bg-white p-4">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask about an order or product..."
                        aria-label="Type a question"
                        className="h-11 min-w-0 flex-1 rounded-full border border-transparent bg-bg-section px-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    />
                    <button
                        aria-label="Send message"
                        type="submit"
                        disabled={!inputText.trim()}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-text-heading text-white transition-colors hover:bg-accent-gold disabled:opacity-50 disabled:hover:bg-text-heading"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>

            {/* Float Button */}
            <button
                type="button"
                aria-label={isOpen ? 'Close help chat' : 'Open help chat'}
                aria-expanded={isOpen}
                onClick={() => { setIsOpen(!isOpen); if (!isOpen) window.setTimeout(() => inputRef.current?.focus(), 100); }}
                className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-transform duration-200 hover:scale-105 active:scale-95",
                    isOpen ? "border border-border-light bg-white text-text-heading" : "border-2 border-white bg-text-heading text-white"
                )}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default ChatWidget;
