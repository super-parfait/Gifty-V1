
export const ADD_TO_GIFT = "ADD_TO_GIFT"
export const DECREASE_QUANTITY_GIFT = "DECREASE_QUANTITY_GIFT"
export const DELETE_GIFT_FROM_CART = "DELETE_GIFT_FROM_CART"
export const GIFT_CREATED_SUCCESS = "GIFT_CREATED_SUCCESS"
export const GIFT_CREATED_FAIL = "GIFT_CREATED_FAIL"
export const SET_MESSAGE_CREATED_GIFT = "SET_MESSAGE_CREATED_GIFT"




var tab= []
// AJOUTER AU CADEAU
export const addToGift = (
        item,
        addToast,
        quantityCount,
        Gift,
        quantityGift
      ) => {

        console.log(item)
        // console.log(Gift)
        // console.log(quantityGift)


        
        tab.push(item)

        console.log(tab)

        // var newGift = {
        //   gift:Gift,
        //   product:tab,
        //   quantity:quantityGift,
        //   custumize: "true"
        // }

        var newGift = {
          // gift:Gift,
          "title": "Gift personalisé 01",
          "description": "Personnalized Description",
          "personnalized": true,
          "products":tab,
          // "quantity":quantityGift,
          // "custumize": "true"
        }

        // if (quantityCount){
        //   newGift = {
        //     gift:Gift,
        //     product:tab,
        //     quantity:quantityCount,
        //     custumize: true
        //   }
        // }else{
        //   newGift = {
        //     gift:Gift,
        //     product:tab,
        //     quantity:quantityGift,
        //     custumize: true
        //   }
        // }
        

        console.log(newGift)
                
        


        return dispatch => {
          if (addToast) {
            addToast("Ajouté au Cadeau", { appearance: "success", autoDismiss: true });
          }
          dispatch({
            type: ADD_TO_GIFT,
            payload: newGift
        //       ...item,
        //       ...Gift
        //       Mygift:{Gift},
        //       quantity:quantityGift
        //       quantity: quantityCount,
              
            
          });
        };
      };


//decrease from Gift
export const decreaseQuantityGift = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Décrémenté du Panier", {
        appearance: "warning",
        autoDismiss: true
      });
    }
    dispatch({ type: DECREASE_QUANTITY_GIFT, payload: item });
  };
};

//delete from cart
export const deleteGiftFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Supprimé du Cadeau", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_GIFT_FROM_CART, payload: item });
  };
};


