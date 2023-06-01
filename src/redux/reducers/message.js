import { SET_MESSAGE, CLEAR_MESSAGE, REGISTER_SUCCESS, REGISTER_FAIL, UPDATE_INFO_SUCCESS, UPDATE_INFO_FAIL, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, SET_MESSAGE_LOGIN, SET_MESSAGE_REGISTER, SET_MESSAGE_UPDATE_INFO, SET_MESSAGE_UPDATE_PASSWORD } from "../actions/types";

const initialState = {message_login: "",message_register: "" , message_update_info: "", message_update_password: "" };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

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

    case CLEAR_MESSAGE:
      return { 
        
        message_login: "",message_register: "" , message_update_info: "", message_update_password: "" 
      
      }

    default :
      return state
  }

}


