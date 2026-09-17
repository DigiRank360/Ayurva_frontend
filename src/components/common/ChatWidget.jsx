import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can we help you today?", isUser: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        const newMessage = {
            id: Date.now(),
            text: inputText,
            isUser: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText("");

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Thanks for reaching out! Our support team will get back to you shortly.",
                isUser: false,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            <div className={cn(
                "bg-white w-80 md:w-96 rounded-2xl shadow-2xl border border-border-light overflow-hidden transition-all duration-300 origin-bottom-right mb-4",
                isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10 pointer-events-none h-0 mb-0"
            )}>
                {/* Header */}
                <div className="bg-text-heading p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center border border-accent-gold text-accent-gold">
                                <User size={20} />
                            </div>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-text-heading rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">Luga Vastra Support</h3>
                            <p className="text-xs text-text-muted">Online</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="h-80 overflow-y-auto p-4 bg-bg-section space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={cn("flex flex-col max-w-[80%]", msg.isUser ? "ml-auto items-end" : "items-start")}>
                            <div className={cn(
                                "px-4 py-2.5 rounded-2xl text-sm font-medium",
                                msg.isUser
                                    ? "bg-accent-gold text-white rounded-tr-none"
                                    : "bg-white border border-border-light text-text-heading rounded-tl-none"
                            )}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-text-muted mt-1 px-1">{msg.time}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-border-light flex gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-bg-section border-transparent rounded-full px-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-gold"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="w-10 h-10 rounded-full bg-text-heading text-white flex items-center justify-center hover:bg-accent-gold transition-colors disabled:opacity-50 disabled:hover:bg-text-heading"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>

            {/* Float Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95",
                    isOpen ? "bg-white text-text-heading border border-border-light rotate-90" : "bg-text-heading text-white border-2 border-white"
                )}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default ChatWidget;
