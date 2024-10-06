import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-500 text-white p-4 text-center">
            &copy; {new Date().getFullYear()} Knoxomm Insurance. All rights reserved.
        </footer>
    );
};

export default Footer;
