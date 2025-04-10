import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FormInput = ({ 
  id, 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  icon
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-gray-700 text-sm font-medium mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        
        <motion.input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`input ${icon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          animate={{
            boxShadow: isFocused 
              ? '0 0 0 3px rgba(255, 107, 107, 0.2)' 
              : '0 0 0 0px rgba(255, 107, 107, 0)'
          }}
          transition={{ duration: 0.2 }}
          required={required}
        />
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p 
            className="mt-1 text-sm text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInput;