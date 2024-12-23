import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  cities: [],
  loading: false,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = citiesSlice.actions;
export default citiesSlice.reducer;






/*import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { CITIES_MOCK } from '../modules/mock';

export interface City {
  city_id?: number;
  name: string;
  population: string; 
  salary: string; 
  unemployment_rate: string; 
  description: string; 
  url?: string | null;
}

interface CitiesState {
  searchValue: string;
  cities: City[];
  loading: boolean;
  error: string | null;
  app_id?: number | null;
  count?: number | null;
}

const initialState: CitiesState = {
  searchValue: '',
  cities: [],
  loading: false,
  error: null,
  app_id: null,
  count: null
};


export const сitiesList = createAsyncThunk(
  'cities/citiesList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { cities } = getState() as { cities: CitiesState };
      const response = await api.cities.citiesList();
      const filteredCities = response.data.cities.filter((city: City) =>
        city.name.toLowerCase().startsWith(cities.searchValue.toLowerCase())
      );
      return {
        cities: filteredCities,
        draft_vacancy_application: response.data.draft_vacancy_application,
        count: response.data.count,
      };
    } catch (error) {
      // Если запрос не удался, возвращаем моковые данные
      const { cities } = getState() as { cities: CitiesState };
      const filteredMockData = CITIES_MOCK.cities.filter((city: City) =>
        city.name.toLowerCase().startsWith(cities.searchValue.toLowerCase())
      );
      return rejectWithValue(filteredMockData);
    }
  }
);

export const cityRead = createAsyncThunk(
  'cities/cityRead',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.cities.citiesRead(id);
      return response.data;
    } catch {
      // Если запрос не удался, возвращаем моковые данные
      const cityData = CITIES_MOCK.cities.find((city) => String(city.city_id) === id);
      return rejectWithValue(cityData);
    }
  }
);


const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(сitiesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(сitiesList.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload.cities;
        state.app_id = action.payload.draft_vacancy_application;
        state.count = action.payload.count;
      })
      .addCase(сitiesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
        state.cities = action.payload as City[];
      })


      .addCase(cityRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cityRead.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(cityRead.rejected, (state) => {
        state.error = 'Не удалось загрузить данные города';
        state.loading = false;
      });
  },
});

export const { setSearchValue } = citiesSlice.actions;
export default citiesSlice.reducer;*/