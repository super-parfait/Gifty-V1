import { FETCH_PRODUCTS_SUCCESS, RECEIVE_PRODUCT, REQUEST_PRODUCT } from "../actions/types";


const initState = {
  products: [],
  query: '',
  isFetching: false,
  data: {},
  error: ''
};

// const initialState = {
//   query: '',
//   isFetching: false,
//   data: {},
//   error: ''
// }

const productReducer = (state = initState, action) => {
  // if (action.type === FETCH_PRODUCTS_SUCCESS) {
  //   return {
  //     ...state,
  //     products: action.payload
  //   };
  // }

  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      }
    case REQUEST_PRODUCT:
      return {
        ...state,
        isFetching: true,
        query: action.query
      }
    case RECEIVE_PRODUCT:
      return {
        ...state,
        isFetching: false,
        data: action.status === 'success' ? action.payload : initState.data,
        error: action.status === 'error' ? action.payload : initState.error
      }
    default:
      return state;
  }

  // return state;
};


// const productsSearch = (state = initialState, action) => {
//   switch (action.type) {
//     case REQUEST_PRODUCT:
//       return Object.assign({}, state, {
//         isFetching: true,
//         query: action.query
//       })
//     case RECEIVE_PRODUCT:
//       return Object.assign({}, state, {
//         isFetching: false,
//         data: action.status === 'success' ? action.payload : initialState.data,
//         error: action.status === 'error' ? action.payload : initialState.error
//       })
//     default:
//       return state;
//   }
// }

export default productReducer;
