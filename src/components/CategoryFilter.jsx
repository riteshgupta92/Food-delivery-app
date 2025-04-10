
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setCategory } from '../features/Slices/foodSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(state => state.food);

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            isSelected={category === selectedCategory}
            onClick={() => handleCategoryChange(category)}
          />
        ))}
      </div>
    </div>
  );
};

const CategoryButton = ({ category, isSelected, onClick }) => {
  return (
    <motion.button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isSelected 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30
      }}
    >
      {category}
    </motion.button>
  );
};

export default CategoryFilter;