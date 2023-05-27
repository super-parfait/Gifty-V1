import {
        REGISTER_SUCCESS,
        REGISTER_FAIL,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT,
        SET_MESSAGE,
      } from "./types";
      
import AuthService from "../../services/auth.service";
      
export const register = (credentials) => (dispatch) => {
        return AuthService.functionRegister(credentials).then(
                (response) => {
                        dispatch({
                                type: REGISTER_SUCCESS,
                        });

                        dispatch({
                                type: SET_MESSAGE,
                                payload: response.data.message,
                        });

                        return Promise.resolve();
                },
                (error) => {
                        const message =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();

                        dispatch({
                                type: REGISTER_FAIL,
                        });

                        dispatch({
                                type: SET_MESSAGE,
                                payload: message,
                        });

                        return Promise.reject();
                }
        );
};

export const login = (credentials) => (dispatch) => {
return AuthService.functionLogin(credentials).then(
        (data) => {
                dispatch({
                        type: LOGIN_SUCCESS,
                        payload: { user: data },
                });

                return Promise.resolve();
        },
        (error) => {
                const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

                dispatch({
                        type: LOGIN_FAIL,
                });

                dispatch({
                        type: SET_MESSAGE,
                        payload: message,
                });

                return Promise.reject();
        }
);
};

export const logout = () => (dispatch) => {
        AuthService.functionLogout();

        dispatch({
                type: LOGOUT,
        });
};