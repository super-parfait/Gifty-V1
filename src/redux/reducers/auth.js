import {
        REGISTER_SUCCESS,
        REGISTER_FAIL,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT,
        UPDATE_INFO_SUCCESS,
        UPDATE_INFO_FAIL,
        UPDATE_PASSWORD_SUCCESS,
        UPDATE_PASSWORD_FAIL,
        AUTH_SUCCESS,
        AUTH_FAIL,
      } from "../actions/types";
      
const user = JSON.parse(localStorage.getItem("user"));

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
        const { type, payload } = action;


        console.log(type)
        
        switch (type) {
                
                case AUTH_SUCCESS:
                        return {
                                ...state,
                                isLoggedIn: true,
                                user: payload.user,
                        }
                case AUTH_FAIL:
                        return {
                                ...state,
                                isLoggedIn: false,
                                // userID: 
                        }
                case REGISTER_SUCCESS:
                        return {
                                ...state,
                                isLoggedIn: false,
                        };
                case REGISTER_FAIL:
                        return {
                                ...state,
                                isLoggedIn: false,
                        };
                case LOGIN_SUCCESS:
                        return {
                                ...state,
                                isLoggedIn: true,
                                user: payload.user,
                        };
                case LOGIN_FAIL:
                        return {
                                ...state,
                                isLoggedIn: false,
                                user: null,
                        };
                case UPDATE_INFO_SUCCESS:
                        return {
                                ...state,
                                isLoggedIn: true,
                        }
                case UPDATE_INFO_FAIL: 
                        return {
                                ...state,
                                isLoggedIn: true,
                        }
                case UPDATE_PASSWORD_SUCCESS:
                        return{
                                ...state,
                                isLoggedIn: true,
                        }
                case UPDATE_PASSWORD_FAIL: 
                        return {
                                ...state,
                                isLoggedIn: true,
                        }
                case LOGOUT:
                        return {
                                ...state,
                                isLoggedIn: false,
                                user: null,
                        };
                default:
                        return state;
        }
}