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
    setCities(state, action) {
      state.cities = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setSearchValue, setCities, setLoading } = citiesSlice.actions;
export default citiesSlice.reducer;
