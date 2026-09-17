import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatWidget from '@/components/common/ChatWidget';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-[72px] md:pt-[80px]">
                {children}
            </main>
            <Footer />
            {/* <ChatWidget /> */}
        </div>
    );
};

export default Layout;
