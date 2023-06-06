import { FETCH_ORDER_FAIL, FETCH_ORDER_SUCCESS } from "./types";

import functionGetOrder from "../../services/order.services";



export const  GetOrder =  () => (dispatch)=>{
        return functionGetOrder().then(
                (response)=>{
                        console.log(response)
                        dispatch({
                                type: FETCH_ORDER_SUCCESS,
                                payload: response
                                
                        });

                        return Promise.resolve()
                },
                (error)=>{

                        console.log(error)

                        dispatch({
                                type: FETCH_ORDER_FAIL,
                        });

                        return Promise.reject();
                }
        )
}
