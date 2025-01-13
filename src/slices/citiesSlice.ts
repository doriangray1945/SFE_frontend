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

export const getCitiesList = createAsyncThunk(
  'cities/getCitiesList',
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

export const getCity = createAsyncThunk(
  'cities/getCity',
  async (id: string) => {
    try {
      const response = await api.cities.citiesRead(id);
      return response.data;
    } catch (error) {
      throw new Error('Не удалось загрузить данные о городе');
    }
  }
);

export const deleteCity = createAsyncThunk(
  'cities/deleteCity',
  async (id: string) => {
    try {
      await api.cities.citiesDeleteCityDelete(id);
    } catch (error) {
      throw new Error('Не удалось удалить город');
    }
  }
);

export const editCity = createAsyncThunk(
  'cities/editCity',
  async ({ id, cityData }: { id: string; cityData: Partial<Cities> }, { getState, rejectWithValue }) => {
    const state: any = getState(); 
    const existingCity = state.cities.city; 

    if (!existingCity) {
      return rejectWithValue('Данные текущего города отсутствуют.');
    }

    const updatedCity: Cities = {
      ...existingCity,
      ...cityData,
    };

    try {
      await api.cities.citiesEditCityUpdate(id, updatedCity); 
      return updatedCity; 
    } catch (error) {
      return rejectWithValue('Не удалось сохранить изменения.');
    }
  }
);

export const updateCityImage = createAsyncThunk(
  'cities/updateCityImage',
  async ({ id, file }: { id: string; file: File }, { rejectWithValue }) => {
    try {
      const response = await api.cities.citiesUpdateImageCreate(id, { 'image' : file});

      return response.data.url;
    } catch (error) {
      return rejectWithValue('Не удалось обновить изображение.');
    }
  }
);

export const createCity = createAsyncThunk(
  'cities/createCity',
  async (cityData: Cities, { rejectWithValue }) => {
    try {
      const response = await api.cities.citiesCreateCityCreate(cityData); 
      return response.data.city_id; 
    } catch (error) {
      return rejectWithValue('Не удалось сохранить изменения.');
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
    setCities: (state, action) => {
      state.cities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCitiesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCitiesList.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(getCitiesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.cities = CITIES_MOCK.cities.filter((item) =>
          item.name.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
        );
      })

      .addCase(getCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.city = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
  },
});

export const { setSearchValue, setCities } = citiesSlice.actions;
export default citiesSlice.reducer;