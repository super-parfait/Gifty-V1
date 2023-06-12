export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";

//add to cart
export const addToCart = (item,addToast,quantityCount) => {
  return dispatch => {
    if (addToast) {
      addToast("Ajouté au Panier", { appearance: "success", autoDismiss: true });
    }
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount,
        // selectedProductColor: selectedProductColor
        //   ? selectedProductColor
        //   : item.selectedProductColor
        //   ? item.selectedProductColor
        //   : null,
        // selectedProductSize: selectedProductSize
        //   ? selectedProductSize
        //   : item.selectedProductSize
        //   ? item.selectedProductSize
        //   : null
      }
    });
  };
};



//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Décrémenté du Panier", {
        appearance: "warning",
        autoDismiss: true
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Supprimé du Panier", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
export const deleteAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Panier vide", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.quantity) {
    return item.quantity;
  } else {
    return item
    // .variation
    //   .filter(single => single.color === color)[0]
    //   .size.filter(single => single.name === size)[0].stock;
  }
};
