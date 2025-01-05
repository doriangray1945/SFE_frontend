// vacancyApplicationsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface City {
    city_id?: { 
        city_id?: number | undefined; 
        name: string; 
        population: string; 
        salary: string; 
        unemployment_rate: string; 
        description: string; 
        url?: string | undefined; 
    } | undefined;
    count?: number | undefined;  
}

interface VacancyData {
    vacancy_name?: string | null;
    vacancy_responsibilities?: string | null;
    vacancy_requirements?: string | null;
}

interface VacancyApplicationState {
  cities: City[];
  vacancyData: VacancyData;
  isDraft: boolean;
  isLoading: boolean;
  error: string | null;
  allowedForSubmitted: boolean;
}

const initialState: VacancyApplicationState = {
  cities: [],
  vacancyData: {
    vacancy_name: '',
    vacancy_responsibilities: '',
    vacancy_requirements: ''
  },
  isDraft: false,
  isLoading: false,
  error: null,
  allowedForSubmitted: true
};


export const fetchVacancyApplication = createAsyncThunk(
  'vacancyApplication/fetchVacancyApplication',
  async (appId: string) => {
    const response = await api.vacancyApplications.vacancyApplicationsRead(appId);
    return response.data;
  }
);

export const updateVacancyApplication = createAsyncThunk(
    'vacancyApplication/updateVacancyApplication',
    async ({ appId, vacancyData }: { appId: string; vacancyData: VacancyData }) => {
      const vacancyDataToSend = {
        vacancy_name: vacancyData.vacancy_name ?? '', 
        vacancy_responsibilities: vacancyData.vacancy_responsibilities ?? '',
        vacancy_requirements: vacancyData.vacancy_requirements ?? ''
      };
  
      const response = await api.vacancyApplications.vacancyApplicationsUpdateVacancyUpdate(appId, vacancyDataToSend);
      return response.data;
    }
  );

export const deleteVacancyApplication = createAsyncThunk(
  'vacancyApplication/deleteVacancyApplication',
  async (appId: string) => {
    const response = await api.vacancyApplications.vacancyApplicationsDeleteVacancyApplicationDelete(appId);
    return response.data;
  }
);

export const submittedVacancyApplication = createAsyncThunk(
  'vacancyApplication/submittedVacancyApplication',
  async (appId: string) => {
    const response = await api.vacancyApplications.vacancyApplicationsUpdateStatusUserUpdate(appId);
    return response.data;
  }
); 

const vacancyApplicationDraftSlice = createSlice({
  name: 'vacancyApplicationDraft',
  initialState,
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setVacancyData: (state, action) => {
      state.vacancyData = {
          ...state.vacancyData,
          ...action.payload,
      };
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancyApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVacancyApplication.fulfilled, (state, action) => {
        const { vacancy_application, cities } = action.payload;
        if (vacancy_application && cities) {
            state.vacancyData = {
                vacancy_name: vacancy_application.vacancy_name,
                vacancy_responsibilities: vacancy_application.vacancy_responsibilities,
                vacancy_requirements: vacancy_application.vacancy_requirements
            };
            state.cities = cities || [];
            state.isDraft = vacancy_application.status === 1;
            state.allowedForSubmitted = cities.length > 0;
            state.isLoading = false;
        }
      })
      .addCase(fetchVacancyApplication.rejected, (state) => {
        state.error = 'Ошибка при загрузке данных';
        state.isLoading = false;
      })
      .addCase(updateVacancyApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVacancyApplication.fulfilled, (state, action) => {
        state.vacancyData = action.payload;
        state.isLoading = false;
      })
      .addCase(updateVacancyApplication.rejected, (state) => {
        state.error = 'Ошибка при обновлении данных';
        state.isLoading = false;
      })
      .addCase(deleteVacancyApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVacancyApplication.fulfilled, (state) => {
        state.cities = [];
        state.vacancyData = {
          vacancy_name: '',
          vacancy_responsibilities: '',
          vacancy_requirements: ''
        };
        state.isLoading = false;
      })
      .addCase(deleteVacancyApplication.rejected, (state) => {
        state.error = 'Ошибка при удалении вакансии';
        state.isLoading = false;
      })

      .addCase(submittedVacancyApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submittedVacancyApplication.fulfilled, (state) => {
        state.cities = [];
        state.vacancyData = {
          vacancy_name: '',
          vacancy_responsibilities: '',
          vacancy_requirements: ''
        };
        state.isDraft = false;
        state.isLoading = false;
        state.error = '';
        state.allowedForSubmitted = false;
      })
      .addCase(submittedVacancyApplication.rejected, (state) => {
        state.error = 'Ошибка при оформлении вакансии';
        state.isLoading = false;
      });
  }
});

export const { setCities, setVacancyData, setError } = vacancyApplicationDraftSlice.actions;
export default vacancyApplicationDraftSlice.reducer;
