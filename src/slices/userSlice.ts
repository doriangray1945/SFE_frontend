import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface UserState {
  username: string;
  isAuthenticated: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  password: string;
  error?: string | null; 
}

const initialState: UserState = {
  username: '',
  isAuthenticated: false,
  is_staff: undefined,
  is_superuser: undefined,
  password: '',
  error: null,
};

// Асинхронное действие для авторизации
export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.login.loginCreate(credentials);
      return response.data; 
    } catch (error) {
      return rejectWithValue('Ошибка авторизации'); // Возвращаем ошибку в случае неудачи
    }
  }
);

// Асинхронное действие для деавторизации
export const logoutUserAsync = createAsyncThunk(
  'user/logoutUserAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.logout.logoutCreate();
      return response.data; 
    } catch (error) {
      return rejectWithValue('Ошибка при выходе из системы'); 
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { username, password, is_staff, is_superuser } = action.payload;
        state.username = username;
        state.isAuthenticated = true;
        state.password = password;
        state.is_staff = is_staff;
        state.is_superuser = is_superuser;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false; 
      })

      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.username = '';
        state.isAuthenticated = false;
        state.is_staff = false;
        state.is_superuser = false;
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });      
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
