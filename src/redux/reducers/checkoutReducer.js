import {
        SET_MESSAGE_CHECKOUT,
        CHECKOUT_FAIL,
        CHECKOUT_SUCCESS
} from "./type";


const initialState = {}

export default function (state  = initialState, action){
        const {type, payload} = action


        console.log(type)
        
        switch(type){
                case CHECKOUT_SUCCESS:
                        return{
                                ...state,
                                commande: payload
                        }
                case CHECKOUT_FAIL:
                        return{
                                ...state,
                        }
                default:
                        return state
        }
}