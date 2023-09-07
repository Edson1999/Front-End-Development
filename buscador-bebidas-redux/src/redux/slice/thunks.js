import axios from 'axios';
import {
  getCategorias,
  getDrinkById,
  getDrinks,
  startLoading,
} from './drinkSlice';

export const obtenerCategorias = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    // Realizar petición
    try {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const { data } = await axios(url);
      dispatch(getCategorias({ categoria: data.drinks }));
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const obtenerBebidas = (datos = []) => {
  return async (dispatch) => {
    dispatch(startLoading());

    // Realizar petición dinámica
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
      const { data } = await axios(url);
      dispatch(getDrinks({ drinks: data.drinks }));
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const obtenerBebidaId = (id = null) => {
  return async (dispatch) => {
    dispatch(startLoading());

    // Realizar petición por ID
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { data } = await axios(url);
      dispatch(getDrinkById({ drink: data.drinks[0] }));
    } catch (error) {
      throw new Error(error);
    }
  };
};
