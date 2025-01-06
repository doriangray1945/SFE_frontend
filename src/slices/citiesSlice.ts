import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cities } from '../api/Api';
import { api } from '../api';
import { CITIES_MOCK } from "../modules/mock";
import { setAppId, setCount } from './vacancyApplicationDraftSlice';

const initialState: CitiesState = {
  searchValue: '',
  cities: [],
  loading: false,
  error: null,
  city: null,
};

interface CitiesState {
  searchValue: string;
  cities: Cities[];
  loading: boolean;
  error: string | null;
  city: Cities | null;
}

export const fetchCitiesList = createAsyncThunk(
  'cities/fetchCitiesList',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { cities }: any = getState();
    try {
      const response = await api.cities.citiesList();
      const filteredCities = response.data.cities.filter((item: Cities) =>
        item.name.toLocaleLowerCase().startsWith(cities.searchValue.toLocaleLowerCase())
      );

      const app_id = response.data.draft_vacancy_application;
      const count = response.data.count;

      dispatch(setAppId(app_id));
      dispatch(setCount(count));

      return filteredCities;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);

export const fetchCity = createAsyncThunk(
  'city/fetchCity',
  async (id: string) => {
    try {
      const response = await api.cities.citiesRead(id);
      return response.data;
    } catch (error) {
      throw new Error('Не удалось загрузить данные о городе');
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
      .addCase(fetchCitiesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitiesList.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCitiesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.cities = CITIES_MOCK.cities.filter((item) =>
          item.name.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
        );
      })

      .addCase(fetchCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.city = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  },
});

export const { setSearchValue } = citiesSlice.actions;
export default citiesSlice.reducer;