import {
        CHECKOUT_SUCCESS,
        SET_MESSAGE_CHECKOUT,
        CHECKOUT_FAIL
} from "./types";

import functionCheckout from "../../services/checkout.service";

export const checkout = (credentials) =>(dispatch) =>{
        return functionCheckout(credentials).then(
                (response)=>{

                        console.log(response)
                        var message = ""
                        if(response ===true){
                                message = "Commande crée avec succès !!! "
                        }

                        dispatch({
                                type: CHECKOUT_SUCCESS,
                                
                        });

                        dispatch({
                                type: SET_MESSAGE_CHECKOUT,
                                payload: message,
                        });

                        return Promise.resolve()
                },
                (error)=>{

                        // console.log(error.response.data)
                        console.log(error.message)
                        var message = error.message

                        if(error.message==="Request failed with status code 406"){
                                message= "Vous avez une commande en cours de validation"
                        }


                        dispatch({
                                type: CHECKOUT_FAIL,
                                // payload: data
                        });

                        dispatch({
                                type: SET_MESSAGE_CHECKOUT,
                                payload: message,
                        });

                        return Promise.reject();
                } 
        
        )}

// export default chekout