import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface VacancyApplicationState {
  app_id: number,
  count: number | undefined,
  applications: {
    app_id?: number;
    status?: number;
    date_created: string;
    creator: string;
    moderator?: string | null;
    date_submitted?: string | null;
    date_completed?: string | null;
    vacancy_name?: string | null;
    vacancy_responsibilities?: string | null;
    vacancy_requirements?: string | null;
    duration_days?: number | null;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: VacancyApplicationState = {
  app_id: NaN,
  count: NaN,
  applications: [],
  loading: false,
  error: null,
};

export const fetchVacancyApplicationList = createAsyncThunk(
  'vacancyApplications/fetchApplications',
  async (filters: { status: number | undefined; date_submitted_start: string | undefined; date_submitted_end: string | undefined }) => {
    const { status, date_submitted_start, date_submitted_end } = filters;
    try {
      const response = await api.vacancyApplications.vacancyApplicationsList({
        status,
        date_submitted_start,
        date_submitted_end,
      });
      return response.data; // Возвращаем данные заявок
    } catch (error) {
      throw new Error('Ошибка при загрузке заявок');
    }
  }
);

const VacancyApplicationSlice = createSlice({
  name: 'vacancyApplication',
  initialState,
  reducers: {
    setAppId: (state, action) => {
      state.app_id = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancyApplicationList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancyApplicationList.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload; // Получаем и сохраняем список заявок
      })
      .addCase(fetchVacancyApplicationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  },
});

export const { setAppId, setCount } = VacancyApplicationSlice.actions;
export default VacancyApplicationSlice.reducer;
