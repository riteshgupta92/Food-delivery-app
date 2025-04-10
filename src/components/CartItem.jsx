import React from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { updateQuantity, removeFromCart } from '../features/Slices/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };
  
  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <motion.div 
      className="flex items-center p-4 border-b border-gray-200"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {/* Item Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
        <motion.img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Item Details */}
      <div className="flex-1">
        <h3 className="font-medium text-dark">{item.name}</h3>
        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center">
        <motion.button 
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-dark"
          onClick={handleDecrement}
          whileHover={{ scale: 1.1, backgroundColor: '#f1f1f1' }}
          whileTap={{ scale: 0.9 }}
          disabled={item.quantity <= 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </motion.button>
        
        <motion.span 
          className="mx-3 font-medium"
          key={item.quantity}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {item.quantity}
        </motion.span>
        
        <motion.button 
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-dark"
          onClick={handleIncrement}
          whileHover={{ scale: 1.1, backgroundColor: '#f1f1f1' }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      </div>
      
      {/* Subtotal and Remove */}
      <div className="ml-6 text-right">
        <p className="font-bold text-dark">${(item.price * item.quantity).toFixed(2)}</p>
        <motion.button 
          className="text-red-500 text-sm mt-1 flex items-center"
          onClick={handleRemove}
          whileHover={{ scale: 1.05, color: '#ef4444' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Remove
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartItem;