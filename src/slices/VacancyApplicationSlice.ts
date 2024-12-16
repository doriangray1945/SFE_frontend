import { createSlice } from '@reduxjs/toolkit';

interface VacancyApplicationState {
  app_id: number,
  count: number | undefined,
}

const initialState: VacancyApplicationState = {
  app_id: NaN,
  count: NaN
};

const VacancyApplicationSlice = createSlice({
  name: 'VacancyApplication',
  initialState,
  reducers: {
    setAppId: (state, action) => {
      state.app_id = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setAppId, setCount } = VacancyApplicationSlice.actions;
export default VacancyApplicationSlice.reducer;
