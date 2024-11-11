import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './slices/citiesSlice'; // создадим редьюсер для городов

const store = configureStore({
  reducer: {
    cities: citiesReducer, // добавляем редьюсер для города
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;