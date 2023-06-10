import uuid from "uuid/v4";
import {
  ADD_TO_CART,
  ADD_TO_GIFT,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DECREASE_QUANTITY_GIFT,
  GIFT_CREATED_SUCCESS,
  GIFT_CREATED_FAIL,
  DELETE_ALL_FROM_CART,DELETE_GIFT_FROM_CART
} from "../actions/giftActions";

import { DELETE_GIFT } from "../actions/newGiftActions";


const initState = [];

const giftReducer = (state = initState, action) => {

        const giftItems = state,
          product = action.payload;

          console.log(product)

          console.log(action.type)
      
          
        if (action.type === ADD_TO_GIFT) {
          // for non variant products
          console.log(product.variation)
      
          if (product.variation === undefined) {
            const giftItem = giftItems.filter(item => item.id === product.id)[0];

            console.log(giftItem)

            if (giftItem === undefined) {
              return [
                ...giftItems,
                {
                  ...product,
                //   quantity: product.quantity ? product.quantity : 1,

                  giftItemId: uuid()
                }
              ];
            } else {
              return giftItems.map(item =>
                item.giftItemId === giftItem.giftItemId
                  ? {
                      ...item,
                      // quantity: product.quantity
                      //   ? item.quantity + product.quantity
                      //   : item.quantity + 1
                    }
                  : item
              );
            }
            // for variant products
          } else {
            const giftItem = giftItems.filter(
              item =>
                item.id === product.id &&
                (product.giftItemId ? product.giftItemId === item.giftItemId : true)
            )[0];
      
            if (giftItem === undefined) {
              return [
                ...giftItems,
                {
                  ...product,
                  quantity: product.quantity ? product.quantity : 1,
                  giftItemId: uuid()
                }
              ];
            } else if (
              giftItem !== undefined &&
              (giftItem.selectedProductColor !== product.selectedProductColor ||
                giftItem.selectedProductSize !== product.selectedProductSize)
            ) {
              return [
                ...giftItems,
                {
                  ...product,
                  quantity: product.quantity ? product.quantity : 1,
                  giftItemId: uuid()
                }
              ];
            } else {
              return giftItems.map(item =>
                item.giftItemId === giftItem.giftItemId
                  ? {
                      ...item,
                      quantity: product.quantity
                        ? item.quantity + product.quantity
                        : item.quantity + 1,
                      selectedProductColor: product.selectedProductColor,
                      selectedProductSize: product.selectedProductSize
                    }
                  : item
              );
            }
          }
        }
      
        // console.log(cartItems)
      
        if (action.type === DECREASE_QUANTITY_GIFT) {
          const cartItems = giftItems
          console.log(product)
          if (product.quantity === 1) {
            const remainingItems = (cartItems, product) =>
              cartItems.filter(
                cartItem => cartItem.cartItemId !== product.cartItemId
              );
            return remainingItems(cartItems, product);
          } else {
            return cartItems.map(item =>
              item.cartItemId === product.cartItemId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
          }
        }
      
        if (action.type === DELETE_GIFT) {
          // const remainingItems = (giftItems, product) =>
          //   giftItems.filter(giftItem => giftItem.giftItemId !== product.giftItemId);
            state= []
          return state;
        }
      
        // if (action.type === DELETE_ALL_FROM_CART) {
        //   return cartItems.filter(item => {
        //     return false;
        //   });
        // }
      
        return state;
      };

export default giftReducer