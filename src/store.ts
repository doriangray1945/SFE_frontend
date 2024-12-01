import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './slices/citiesSlice';
import userReducer from './slices/userSlice'; // Подключаем новый редьюсер

const store = configureStore({
  reducer: {
    cities: citiesReducer,  // Редьюсер для городов
    user: userReducer,      // Новый редьюсер для пользователя
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
