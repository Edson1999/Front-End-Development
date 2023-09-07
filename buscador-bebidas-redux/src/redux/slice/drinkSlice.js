import { createSlice } from '@reduxjs/toolkit';

export const drinkSlice = createSlice({
  name: 'drink',
  initialState: {
    drinks: [],
    ingredient: [],
    categorias: [],
    isLoading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getCategorias: (state, { payload }) => {
      state.isLoading = false;
      state.categorias = payload.categoria;
    },
    getDrinks: (state, { payload }) => {
      state.isLoading = false;
      state.drinks = payload.drinks;
    },
    getDrinkById: (state, { payload }) => {
      state.isLoading = false;
      state.ingredient = payload.drink;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getDrinks, getDrinkById, getCategorias, startLoading } =
  drinkSlice.actions;
