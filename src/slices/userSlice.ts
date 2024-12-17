import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  date_joined: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ id?: number, username: string, password: string, is_staff?: boolean, is_superuser?: boolean, email?: string, first_name?: string, last_name?: string, date_joined?: string }>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.isAuthenticated = true;
      state.is_staff = action.payload.is_staff;
      state.is_superuser = action.payload.is_superuser;
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.date_joined = action.payload.date_joined;
    },
    logoutUser: (state) => {
      state.id = NaN;
      state.username = '';
      state.isAuthenticated = false;
      state.is_staff = false;
      state.is_superuser = false;
      state.email = undefined;
      state.first_name = undefined;
      state.last_name = undefined;
      state.date_joined = undefined;
    },
    updateUser: (state, action: PayloadAction<{ email?: string; password?: string }>) => {
      if (action.payload.email) {
        state.email = action.payload.email;
      }
      if (action.payload.password) {
        state.password = action.payload.password;
      }
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
