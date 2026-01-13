import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-color)',
            padding: '2rem',
            textAlign: 'center',
            marginTop: 'auto',
            color: 'var(--text-secondary)'
        }}>
            <p>&copy; 2026 Tech Shop. Todos los derechos reservados.</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Hardware del Futuro
            </p>
        </footer>
    );
};

export default Footer;
