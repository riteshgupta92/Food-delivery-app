
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center mb-4">
                            <span className="text-2xl font-bold text-primary">Tasty</span>
                            <span className="text-2xl font-bold text-white">Bites</span>
                        </Link>
                        <p className="text-gray-400 mb-4">
                            Delicious food delivered to your doorstep. Fast, fresh, and always tasty.
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon icon="facebook" />
                            <SocialIcon icon="twitter" />
                            <SocialIcon icon="instagram" />
                            <SocialIcon icon="youtube" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <FooterLink to="/" label="Home" />
                            <FooterLink to="/cart" label="Cart" />
                            <FooterLink to="/bookmarks" label="Bookmarks" />
                            <FooterLink to="/login" label="Login" />
                            <FooterLink to="/signup" label="Sign Up" />
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <FooterLink to="/?category=Pizza" label="Pizza" />
                            <FooterLink to="/?category=Burger" label="Burgers" />
                            <FooterLink to="/?category=Salad" label="Salads" />
                            <FooterLink to="/?category=Dessert" label="Desserts" />
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-gray-400">123 Food Street, Tasty City, TC 12345</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-gray-400">(123) 456-7890</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-400">info@tastybites.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="border-gray-800 my-8" />

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} TastyBites. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link to="/privacy" className="text-gray-400 text-sm hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-gray-400 text-sm hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/faq" className="text-gray-400 text-sm hover:text-primary transition-colors">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Footer Link Component
const FooterLink = ({ to, label }) => (
    <li>
        <Link
            to={to}
            className="text-gray-400 hover:text-primary transition-colors"
        >
            {label}
        </Link>
    </li>
);

// Social Icon Component
const SocialIcon = ({ icon }) => {
    let iconPath;

    switch (icon) {
        case 'facebook':
            iconPath = "M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5L14.17.5C10.24.5,9.38,3.13,9.38,5.3V7.46H5v4h4.38V20h5.12V11.46h3.26Z";
            break;
        case 'twitter':
            iconPath = "M23.32,6.44a.5.5,0,0,0-.2-.87l-.79-.2A.5.5,0,0,1,22,4.67l.44-.89a.5.5,0,0,0-.58-.7l-2,.56a.5.5,0,0,1-.44-.08,5,5,0,0,0-3-1,5,5,0,0,0-5,5v.36a.25.25,0,0,1-.22.25c-2.81.33-5.5-1.1-8.4-4.44a.51.51,0,0,0-.51-.15A.5.5,0,0,0,2,4a7.58,7.58,0,0,0,.46,4.92.25.25,0,0,1-.26.36L1.08,9.06a.5.5,0,0,0-.57.59,5.15,5.15,0,0,0,2.37,3.78.25.25,0,0,1,0,.45l-.53.21a.5.5,0,0,0-.26.69,4.36,4.36,0,0,0,3.2,2.48.25.25,0,0,1,0,.47A10.94,10.94,0,0,1,1,18.56a.5.5,0,0,0-.2,1,20.06,20.06,0,0,0,8.14,1.93,12.58,12.58,0,0,0,7-2A12.5,12.5,0,0,0,21.5,9.06V8.19a.5.5,0,0,1,.18-.38Z";
            break;
        case 'instagram':
            iconPath = "M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.64.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12S0,15.67.07,17c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15A1.44,1.44,0,1,0,19.85,5.59,1.44,1.44,0,0,0,18.41,4.15Z";
            break;
        case 'youtube':
            iconPath = "M23.8,7.2a2.93,2.93,0,0,0-2-2.1c-1.78-.48-8.88-.48-8.88-.48s-7.1,0-8.88.48a2.93,2.93,0,0,0-2,2.1,30.64,30.64,0,0,0-.48,5.62A30.64,30.64,0,0,0,1,18.44a2.93,2.93,0,0,0,2,2.1c1.78.48,8.88.48,8.88.48s7.1,0,8.88-.48a2.93,2.93,0,0,0,2-2.1,30.64,30.64,0,0,0,.48-5.62A30.64,30.64,0,0,0,23.8,7.2ZM9.9,15.89V9.75l5.92,3.07Z";
            break;
        default:
            iconPath = "";
    }

    return (
        <motion.a
            href={`https://www.${icon}.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-primary transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d={iconPath} />
            </svg>
        </motion.a>
    );
};

export default Footer;