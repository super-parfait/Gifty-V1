import functionCreateGift from "../../services/gift.service";

export const GIFT_CREATED_SUCCESS = "GIFT_CREATED_SUCCESS"
export const GIFT_CREATED_FAIL = "GIFT_CREATED_FAIL"
export const SET_MESSAGE_CREATED_GIFT = "SET_MESSAGE_CREATED_GIFT"
export const DELETE_GIFT =  "DELETE_GIFT"




export const create_gift = (credentials)=>(dispatch) => {
        return functionCreateGift(credentials).then(
          (response)=>{
      
                  console.log(response)
                  // var message = ""
                  // if(response ===true){
                  //         message = "Commande crée avec succès !!! "
                  // }
      
                  dispatch(
                        {
                        
                          type: GIFT_CREATED_SUCCESS,
                          payload: response
                          
                  },
                  
                  
                  );

                //   dispatch({
                //         type: SET_MESSAGE_CREATED_GIFT,
                //         payload: 'Succes',
                // });

                  dispatch({
                        type: DELETE_GIFT
                  })

      
                  return Promise.resolve()
          },
          (error)=>{
      
                  // console.log(error.response.data)
                  console.log(error.message)
                  var message = error.message
      
                  if(message){
                          message= "Erreur lors de creation du cadeau"
                  }
      
      
                  dispatch({
                          type: GIFT_CREATED_FAIL,
                          // payload: data
                  });
      
                  dispatch({
                          type: SET_MESSAGE_CREATED_GIFT,
                          payload: message,
                  });
      
                  return Promise.reject();
          } 
      
        )
}