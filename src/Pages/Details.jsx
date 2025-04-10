import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { addToCart } from '../features/Slices/cartSlice';
import { addBookmark, removeBookmark } from '../features/Slices/bookmarkSlice';
import FoodCard from '../components/FoodCard';
import { useToast } from '../context/ToastContext';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Get food item from store
  const { items } = useSelector(state => state.food);
  const bookmarks = useSelector(state => state.bookmarks.items);
  const { isAuthenticated } = useSelector(state => state.auth);

  const foodItem = items.find(item => item.id === parseInt(id));
  const isBookmarked = bookmarks.some(item => item.id === parseInt(id));

  // Get related items
  const relatedItems = foodItem?.relatedItems
    ? items.filter(item => foodItem.relatedItems.includes(item.id))
    : [];

  // Handle quantity change
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: `/details/${id}` } });
      return;
    }
    if (foodItem) {
      dispatch(addToCart({ ...foodItem, quantity }));
      showToast(`${quantity} ${quantity > 1 ? 'items' : 'item'} of ${foodItem.name} added to cart`, 'success');
    }
  };

  // Handle bookmark toggle
  const handleToggleBookmark = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: `/details/${id}` } });
      return;
    }
    if (foodItem) {
      if (isBookmarked) {
        dispatch(removeBookmark(foodItem.id));
        showToast(`${foodItem.name} removed from bookmarks`, 'info');
      } else {
        dispatch(addBookmark(foodItem));
        showToast(`${foodItem.name} added to bookmarks`, 'success');
      }
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!foodItem) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Food item not found</h2>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li>
              <Link to={`/?category=${foodItem.category}`} className="text-gray-500 hover:text-primary transition-colors">
                {foodItem.category}
              </Link>
            </li>
            <li className="mx-2 text-gray-400">/</li>
            <li className="text-primary font-medium truncate">{foodItem.name}</li>
          </ol>
        </nav>

        {/* Food Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Food Image */}
          <motion.div
            className="rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={foodItem.image}
              alt={foodItem.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Food Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold text-dark">{foodItem.name}</h1>
              <motion.button
                className={`p-2 rounded-full ${isBookmarked ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                onClick={handleToggleBookmark}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </motion.button>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 font-medium">{foodItem.rating}</span>
              </div>
              <span className="text-gray-500">Category: {foodItem.category}</span>
            </div>

            <p className="text-2xl font-bold text-primary mb-6">${foodItem.price.toFixed(2)}</p>

            <p className="text-gray-600 mb-6">{foodItem.description}</p>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'description'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-primary'
                    }`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'ingredients'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-primary'
                    }`}
                  onClick={() => setActiveTab('ingredients')}
                >
                  Ingredients
                </button>
              </div>

              <div className="py-4">
                {activeTab === 'description' ? (
                  <p className="text-gray-600">{foodItem.description}</p>
                ) : (
                  <ul className="list-disc pl-5 text-gray-600">
                    {foodItem.ingredients.map((ingredient, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {ingredient}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center">
              <div className="flex items-center border border-gray-300 rounded-lg mr-4">
                <motion.button
                  className="w-10 h-10 flex items-center justify-center text-gray-600"
                  onClick={handleDecrement}
                  whileTap={{ scale: 0.9 }}
                  disabled={quantity <= 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </motion.button>

                <motion.span
                  className="w-10 h-10 flex items-center justify-center font-medium"
                  key={quantity}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {quantity}
                </motion.span>

                <motion.button
                  className="w-10 h-10 flex items-center justify-center text-gray-600"
                  onClick={handleIncrement}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.button>
              </div>

              <motion.button
                className="btn-primary flex-1 py-3"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedItems.map((food, index) => (
                <FoodCard key={food.id} food={food} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;