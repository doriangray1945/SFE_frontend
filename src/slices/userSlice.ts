import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface UserState {
  id?: number;
  username: string;
  isAuthenticated: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  email?: string;
  first_name?: string;
  last_name?: string;
  password: string;
  date_joined?: string;
  error?: string | null; 
}

const initialState: UserState = {
  id: NaN,
  username: '',
  isAuthenticated: false,
  is_staff: undefined,
  is_superuser: undefined,
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  password: '',
  date_joined: undefined,
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

// Асинхронное действие для апдейта пользователя
export const updateUserDataAsync = createAsyncThunk(
  'user/updateUserDataAsync',
  async ({ id, email, username, password }: { id: number; email?: string; username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.user.userUpdateUserUpdate(id.toString(), { email, username, password });
      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка при обновлении email');
    }
  }
);

export const createUser = createAsyncThunk (
  'user/createUser',
  async (credentials: { username: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await api.user.userCreate(credentials);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при регистрации'); 
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
        const { id, username, password, is_staff, is_superuser, email, first_name, last_name, date_joined } = action.payload;
        state.id = id;
        state.username = username;
        state.isAuthenticated = true;
        state.password = password;
        state.is_staff = is_staff;
        state.is_superuser = is_superuser;
        state.email = email;
        state.first_name = first_name;
        state.last_name = last_name;
        state.date_joined = date_joined;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false; 
      })


      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.id = NaN;
        state.username = '';
        state.isAuthenticated = false;
        state.is_staff = false;
        state.is_superuser = false;
        state.email = undefined; 
        state.first_name = undefined;
        state.last_name = undefined;
        state.date_joined = undefined;
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })


      .addCase(updateUserDataAsync.fulfilled, (state, action) => {
        state.password = action.payload.password;
        state.email = action.payload.email;
      })
      .addCase(updateUserDataAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });        
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
