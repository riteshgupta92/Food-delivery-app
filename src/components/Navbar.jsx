
import React, { useState, useEffect } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../features/Slices/authSlice';
import { useToast } from '../context/ToastContext';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showToast}=useToast();

  const { totalItems } = useSelector(state => state.cart);
  const { items: bookmarkedItems } = useSelector(state => state.bookmarks);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
    showToast('Logged out successfully', 'success');
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-2xl font-bold text-primary">Tasty</span>
            <span className="text-2xl font-bold text-dark">Bites</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" />
          <NavLink to="/cart" label="Cart" count={totalItems} />
          <NavLink to="/bookmarks" label="Bookmarks" count={bookmarkedItems.length} />

          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-dark hover:text-primary transition-colors">
                <span>Hi, {user?.name || 'User'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink to="/login" label="Login" />
              <Link
                to="/signup"
                className="btn-primary"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-dark focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <MobileNavLink to="/" label="Home" />
              <MobileNavLink to="/cart" label="Cart" count={totalItems} />
              <MobileNavLink to="/bookmarks" label="Bookmarks" count={bookmarkedItems.length} />

              {isAuthenticated ? (
                <>
                  <div className="py-2 px-4 text-dark border-t border-gray-200">
                    Hi, {user?.name || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 text-left text-primary hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink to="/login" label="Login" />
                  <Link
                    to="/signup"
                    className="py-2 px-4 text-center bg-primary text-white rounded-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Desktop Navigation Link
const NavLink = ({ to, label, count }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative ${isActive ? 'text-primary font-medium' : 'text-dark hover:text-primary'} transition-colors`}
    >
      {label}
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-4 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
        >
          {count}
        </motion.span>
      )}
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ to, label, count }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative py-2 px-4 ${isActive ? 'text-primary font-medium' : 'text-dark'} hover:bg-gray-100 transition-colors`}
    >
      <div className="flex justify-between items-center">
        {label}
        {count > 0 && (
          <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
    </Link>
  );
};

export default Navbar;