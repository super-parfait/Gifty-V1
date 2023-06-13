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
                        if(response){
                                message = "Commande crée avec succès !!! "
                        }

                        dispatch({
                                type: CHECKOUT_SUCCESS,
                                payload: response
                                
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

                        if(error.message==="Request failed with status code 500"){
                                message= "Désolé Erreur lors de la creation de la commande! "
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
        
        )
}

// export default chekout