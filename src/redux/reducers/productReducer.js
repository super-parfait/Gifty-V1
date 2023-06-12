import {FETCH_PRODUCT_PERSONNALIZED_SUCCESS, FETCH_PRODUCT_PERSONNALIZED_FAIL, FETCH_PRODUCTS_SUCCESS, RECEIVE_PRODUCT, REQUEST_PRODUCT } from "../actions/types";


const initState = {
  products: [],
  query: '',
  isFetching: false,
  data: [],
  error: '',
  products_for_personnalized:[]
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

  console.log(action.type)

  switch (action.type) {
    
    case FETCH_PRODUCT_PERSONNALIZED_SUCCESS:
      return{
        ...state,
        products_for_personnalized: action.payload
      }
    // case FETCH_PRODUCT_PERSONNALIZED_FAIL:
    //   return {

    // }
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
      const list= action.payload
    // je regroupe tous les cadeaux en associants les produits
  
    if (list.length > 1) {
        const objetsRegroupes = list.reduce((acc, objet) => {
        const giftId = objet.gift.id;
        
        if (!acc.has(giftId)) {
                acc.set(giftId, {
                gift: objet.gift,
                product: [],
                quantity:1
                });
        }
        
        acc.get(giftId).product.push(objet.product);
        
        return acc;
        }, new Map());
        
        var resultat = Array.from(objetsRegroupes.values());
    }

    console.log(resultat)

      return {
        ...state,
        isFetching: false,
        data: action.status === 'success' ? resultat : initState.data,
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
