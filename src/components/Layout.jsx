import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: '1', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
