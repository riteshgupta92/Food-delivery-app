import { createSlice } from '@reduxjs/toolkit';
import { foodData } from '../../Data/foodData';

const initialState = {
  items: foodData,
  filteredItems: foodData,
  categories: ['All', ...new Set(foodData.map(item => item.category))],
  selectedCategory: 'All',
  loading: false,
  error: null,
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'All') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          item => item.category === action.payload
        );
      }
    },
    
    searchFood: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === '') {
        // If search is empty, just filter by category
        if (state.selectedCategory === 'All') {
          state.filteredItems = state.items;
        } else {
          state.filteredItems = state.items.filter(
            item => item.category === state.selectedCategory
          );
        }
      } else {
        // Filter by search term and category if not 'All'
        state.filteredItems = state.items.filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                               item.description.toLowerCase().includes(searchTerm);
          
          if (state.selectedCategory === 'All') {
            return matchesSearch;
          } else {
            return matchesSearch && item.category === state.selectedCategory;
          }
        });
      }
    },
    
    sortByPrice: (state, action) => {
      const direction = action.payload; // 'asc' or 'desc'
      
      state.filteredItems = [...state.filteredItems].sort((a, b) => {
        if (direction === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    },
    
    sortByRating: (state, action) => {
      const direction = action.payload; // 'asc' or 'desc'
      
      state.filteredItems = [...state.filteredItems].sort((a, b) => {
        if (direction === 'asc') {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });
    },
  },
});

export const { setCategory, searchFood, sortByPrice, sortByRating } = foodSlice.actions;
export default foodSlice.reducer;