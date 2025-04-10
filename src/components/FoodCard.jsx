import React from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { addToCart } from '../features/Slices/cartSlice';
import { addBookmark, removeBookmark } from '../features/Slices/bookmarkSlice';
import { useToast } from '../context/ToastContext';

const FoodCard = ({ food, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {showToast} = useToast();
  const bookmarks = useSelector(state => state.bookmarks.items);
  const {isAuthenticated} = useSelector(state => state.auth);
  const isBookmarked = bookmarks.some(item => item.id === food.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!isAuthenticated) {
      navigate('/login',{state: { from: location.pathname }});
      return;
    }
    dispatch(addToCart(food));
    showToast(`${food.name} added to cart`, 'success');
  };

  const handleToggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if(!isAuthenticated) {
      navigate('/login',{state: { from: location.pathname }});
      return;
    }
    
    if (isBookmarked) {
      dispatch(removeBookmark(food.id));
      showToast(`${food.name} removed from bookmarks`, 'info');
    } else {
      dispatch(addBookmark(food));
      showToast(`${food.name} added to bookmarks`, 'success');
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.1 // Stagger effect
      }
    },
    hover: {
      y: -15,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className="card card-hover h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Link to={`/details/${food.id}`} className="block h-full">
        <div className="relative overflow-hidden">
          {/* Food Image */}
          <div className="h-48 overflow-hidden">
            <motion.img 
              src={food.image} 
              alt={food.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Bookmark Button */}
          <motion.button
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isBookmarked ? 'bg-primary text-white' : 'bg-white text-gray-600'
            } shadow-md`}
            onClick={handleToggleBookmark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </motion.button>
          
          {/* Popular Badge */}
          {food.popular && (
            <div className="absolute top-2 left-2 bg-accent text-dark text-xs font-bold px-2 py-1 rounded-full">
              Popular
            </div>
          )}
        </div>
        
        <div className="p-4">
          {/* Food Info */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-dark truncate">{food.name}</h3>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium ml-1">{food.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{food.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-primary font-bold">${food.price.toFixed(2)}</span>
            
            {/* Add to Cart Button */}
            <motion.button
              className="btn-primary py-1 px-3 text-sm"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FoodCard;