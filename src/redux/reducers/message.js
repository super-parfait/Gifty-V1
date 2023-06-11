import { SET_MESSAGE, CLEAR_MESSAGE, REGISTER_SUCCESS, REGISTER_FAIL, UPDATE_INFO_SUCCESS, UPDATE_INFO_FAIL, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, SET_MESSAGE_LOGIN, SET_MESSAGE_REGISTER, SET_MESSAGE_UPDATE_INFO, SET_MESSAGE_UPDATE_PASSWORD, SET_MESSAGE_CHECKOUT } from "../actions/types";

import { SET_MESSAGE_CREATED_GIFT } from "../actions/giftActions";

const initialState = {
  message_login: "",
  message_register: "" , message_update_info: "", message_update_password: "", message_checkout:"",message_for_created_gift:"Aucun produits ajouté !" };

export default function (state = initialState, action) {
  const { type, payload } = action;


  console.log(type)

  switch (type) {

    case SET_MESSAGE_CHECKOUT:
      return {
        message_checkout: payload
      }

    case SET_MESSAGE_LOGIN: 
      return {
        message_login: payload
      }

    case SET_MESSAGE_REGISTER: 
      return {
        message_register: payload
      }

    case SET_MESSAGE_UPDATE_INFO:
        return {
          message_update_info: payload
        }

    case SET_MESSAGE_UPDATE_PASSWORD:
        return {
          message_update_password: payload
        }

    case SET_MESSAGE_CREATED_GIFT: 
    return {
      message_for_created_gift: payload
    }

    case CLEAR_MESSAGE:
      return { 
        
        message_login: "",message_register: "" , message_update_info: "", message_update_password: "" ,
        message_for_created_gift:""
      
      }

    default :
      return state
  }

}


