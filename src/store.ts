import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './slices/citiesSlice';
import userReducer from './slices/userSlice'; 
import vacancyApplicationReducer from './slices/vacancyApplicationSlice';
import vacancyApplicationDraftReducer from './slices/vacancyApplicationDraftSlice';

const store = configureStore({
  reducer: {
    cities: citiesReducer,  
    user: userReducer,      
    vacancyApplication: vacancyApplicationReducer,
    vacancyApplicationDraft: vacancyApplicationDraftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;