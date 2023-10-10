import axios from 'axios';
import {
  getCategorias,
  getDrinkById,
  getDrinks,
  startLoading,
} from './drinkSlice';

/**
 * The function `obtenerCategorias` is an asynchronous action that makes a request to the CocktailDB
 * API to retrieve a list of categories and dispatches an action with the retrieved data.
 * @returns an asynchronous function that dispatches actions.
 */
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

/**
 * The function `obtenerBebidas` is an asynchronous action that makes a dynamic request to the
 * CocktailDB API based on the provided drink name and category, and dispatches the retrieved drinks to
 * the Redux store.
 * @param [datos] - An object that contains the following properties:
 * @returns an async function that takes a dispatch function as an argument.
 */
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

/**
 * The function `obtenerBebidaId` is an asynchronous action that retrieves a drink by its ID from an
 * API and dispatches an action with the retrieved drink data.
 * @param [id=null] - The `id` parameter is the identifier of the drink that you want to retrieve. It
 * is used to make a request to the API and fetch the drink with the corresponding ID.
 * @returns an asynchronous function that dispatches actions.
 */
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
