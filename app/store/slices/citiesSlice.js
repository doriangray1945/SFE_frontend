import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cities: [],
    city: {},
};

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setCities: (state, action) => {
            console.log('setCities');
            state.cities = action.payload;
        },
        setCity: (state, action) => {
            console.log('setCity');
            state.city = action.payload;
        },
        resetCity: (state) => {
            console.log('resetCity');
            state.city = {};
        },
    },
});

export const { setCities, setCity, resetCity } = citiesSlice.actions;
export const citiesReducer = citiesSlice.reducer;