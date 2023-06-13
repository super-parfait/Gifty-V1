import { FETCH_ORDER_SUCCESS,FETCH_ORDER_FAIL, RECEIVE_PRODUCT, REQUEST_PRODUCT } from "../actions/types";


const initState = {
  order: []
};


const orderReducer = (state = initState, action) => {


  switch (action.type) {
        
        case FETCH_ORDER_SUCCESS:
                return {
                        ...state,
                        order: action.payload
                }
        case FETCH_ORDER_FAIL:
                return {
                        ...state
                }

        default:
        return state;
  }

};



export default orderReducer;
