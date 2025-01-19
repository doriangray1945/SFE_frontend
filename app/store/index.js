import { configureStore } from '@reduxjs/toolkit';
import { citiesReducer } from './slices/citiesSlice';

export const store = configureStore({ reducer: {
    cities: citiesReducer,
    
} });