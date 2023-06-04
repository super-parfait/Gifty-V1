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


    const UserId = JSON.parse(localStorage.getItem('generate_id_user'));

    // const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`
    const query_search = { "theme": query }
    const url = `https://dev-mks.com:9000/api/v1/srv-core/recommandation`

    console.log(UserId.UserId)
    return axios.get(url,query_search, {headers: UserId.UserId})
      .then(response => response.data)
      .then(data =>{
        console.log(data)
        dispatch(receiveProducts({
          status: 'success',
          payload: data
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