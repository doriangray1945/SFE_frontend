import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './slices/citiesSlice';
import userReducer from './slices/userSlice'; // Подключаем новый редьюсер
import VacancyApplicationReducer from './slices/VacancyApplicationSlice'; // Подключаем новый редьюсер

const store = configureStore({
  reducer: {
    cities: citiesReducer,  // Редьюсер для городов
    user: userReducer,      // Новый редьюсер для пользователя
    VacancyApplication: VacancyApplicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
