import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './slices/citiesSlice';
import userReducer from './slices/userSlice'; 
import vacancyApplicationReducer from './slices/vacancyApplicationSlice';

const store = configureStore({
  reducer: {
    cities: citiesReducer,  
    user: userReducer,      
    vacancyApplication: vacancyApplicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;