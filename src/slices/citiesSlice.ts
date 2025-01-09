import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cities } from '../api/Api';
import { api } from '../api';
import { CITIES_MOCK } from "../modules/mock";
import { setAppId, setCount } from './vacancyApplicationDraftSlice';

interface CitiesState {
  searchValue: string;
  cities: Cities[];
  loading: boolean;
}

const initialState: CitiesState = {
  searchValue: '',
  cities: [],
  loading: false,
};

export const getCitiesList = createAsyncThunk(
  'cities/getCitiesList',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { cities }: any = getState();
    try {
      const response = await api.cities.citiesList({city_name: cities.searchValue});

      const app_id = response.data.draft_vacancy_application; // ID черновой заявки
      const count = response.data.count; // количество услуг в черновой заявке

      dispatch(setAppId(app_id));
      dispatch(setCount(count));

      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке данных');
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
      .addCase(getCitiesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCitiesList.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload.cities;
      })
      .addCase(getCitiesList.rejected, (state) => {
        state.loading = false;
        state.cities = CITIES_MOCK.cities.filter((item) =>
          item.name.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
        );
      });
  },
});

export const { setSearchValue } = citiesSlice.actions;
export default citiesSlice.reducer;