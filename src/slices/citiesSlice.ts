import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface City {
  name: string;
  population: string;
  salary: string;
  unemployment_rate: string;
  description: string;
  url: string;
}

interface CitiesState {
  cities: City[];
  loading: boolean;
  error: string | null;
}

const initialState: CitiesState = {
  cities: [],
  loading: false,
  error: null,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    fetchCitiesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCitiesSuccess: (state, action: PayloadAction<City[]>) => {
      state.loading = false;
      state.cities = action.payload;
    },
    fetchCitiesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCitiesStart, fetchCitiesSuccess, fetchCitiesFailure } = citiesSlice.actions;

export default citiesSlice.reducer;
