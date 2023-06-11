import {
  GIFT_CREATED_SUCCESS,
  GIFT_CREATED_FAIL,
} from "../actions/newGiftActions";


const initState = [];

const newGiftReducer = (state = initState, action) => {

        
          const product = action.payload;

        if(action.type === GIFT_CREATED_SUCCESS){

                return [
                        ...state,
                        // product
                        {
                                gift: product,
                                quantity:1
                        }
                ];
        }

        if(action.type === GIFT_CREATED_FAIL){
                return[
                        ...state
                ]
        }

        return state;
};

export default newGiftReducer