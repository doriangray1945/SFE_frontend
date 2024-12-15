import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  isAuthenticated: boolean;
  is_staff: boolean | undefined;
  is_superuser: boolean | undefined;
}

const initialState: UserState = {
  username: null,
  isAuthenticated: false,
  is_staff: undefined,
  is_superuser: undefined
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ username: string, password: string, is_staff: boolean | undefined, is_superuser: boolean | undefined }>) => {
      state.username = action.payload.username;
      state.isAuthenticated = true;
      state.is_staff = action.payload.is_staff;
      state.is_superuser = action.payload.is_superuser;
    },
    logoutUser: (state) => {
      state.username = null;
      state.isAuthenticated = false;
      state.is_staff = false;
      state.is_superuser = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
