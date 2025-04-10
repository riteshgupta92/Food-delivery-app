import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { clearBookmarks, removeBookmark } from '../features/Slices/bookmarkSlice';
import { addToCart } from '../features/Slices/cartSlice';

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.bookmarks);
  
  const handleClearBookmarks = () => {
    dispatch(clearBookmarks());
  };
  
  const handleRemoveBookmark = (id) => {
    dispatch(removeBookmark(id));
  };
  
  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0,
      x: -100,
      transition: { 
        duration: 0.3
      }
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Bookmarks
          </motion.h1>
          
          {items.length > 0 && (
            <motion.button 
              className="text-red-500 text-sm font-medium flex items-center"
              onClick={handleClearBookmarks}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </motion.button>
          )}
        </div>
        
        {items.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {items.map(item => (
                <motion.div 
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  variants={itemVariants}
                  exit="exit"
                  layout
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-48 sm:h-auto">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link to={`/details/${item.id}`} className="text-xl font-bold text-dark hover:text-primary transition-colors">
                            {item.name}
                          </Link>
                          <p className="text-gray-500 text-sm">{item.category}</p>
                        </div>
                        
                        <motion.button 
                          className="text-red-500"
                          onClick={() => handleRemoveBookmark(item.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </div>
                      
                      <p className="text-gray-600 my-2 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center mt-auto">
                        <div className="flex items-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium ml-1">{item.rating}</span>
                        </div>
                        <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <Link 
                          to={`/details/${item.id}`} 
                          className="text-primary font-medium hover:underline"
                        >
                          View Details
                        </Link>
                        
                        <motion.button 
                          className="btn-primary py-1 px-3 text-sm"
                          onClick={() => handleAddToCart(item)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">No bookmarks yet</h2>
            <p className="text-gray-600 mb-8">Save your favorite items to find them easily later.</p>
            <Link to="/" className="btn-primary">
              Explore Food
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;