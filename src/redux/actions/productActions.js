import axios from "axios";

import { REQUEST_PRODUCT, RECEIVE_PRODUCT, FETCH_PRODUCTS_SUCCESS } from "./types";







const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

// fetch products
export const fetchProducts = products => {
  return dispatch => {
    dispatch(fetchProductsSuccess(products));
  };
};




// Ma requete pour recuperer la liste des produits en fonction de la recherche 
export const requestProducts = (query) => ({
  type: REQUEST_PRODUCT,
  query
})


// Cette action est enclenché quand on a une reponse
export const receiveProducts = ({status, payload }) => ({
  type: RECEIVE_PRODUCT,
  status,
  payload
})

export const getProducts = (query) => {
  return function (dispatch) {
    dispatch(requestProducts(query));
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`
    return axios.get(url)
      .then(response => {
        dispatch(receiveProducts({
          status: 'success',
          payload: response.data
        }))
      })
      .catch(error => {
        dispatch(receiveProducts({
          status: 'error',
          payload: error
        }))
      })
  };
}