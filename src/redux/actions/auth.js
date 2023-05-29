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

                        console.log(response)
                        var message = ""
                        if(response ===true){
                                message = "Inscription effectuée avec succès !!! "
                        }
                        dispatch({
                                type: REGISTER_SUCCESS,
                        });

                        dispatch({
                                type: SET_MESSAGE,
                                payload: message,
                        });

                        return Promise.resolve();
                },
                (error) => {

                        console.log(error.response.data)
                        var message = error.response.data

                        // if(error.response.data === '"telephone" must be a number'){
                        //         message = "Numero de téléphone incorrect !!!"
                        // }

                        

                        // if(error.response.data ==='"password" length must be at least 8 characters long'){
                        //         message = "Mot de Passe Incorrect avec minimum 8 caracteres !!!"
                        // }

                        // const message = error

                        // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

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

                // console.log(error.response.data.msg)
                var message = error.response.data;

                // if (error.response.data.msg) {
                //         message = error.response.data.msg
                // }

                // if (error.response.data.msg ===undefined) {
                //         message = "Erreur de connexion !!!"
                // }




                // if(error.toString() === "Request failed with status code 401"){
                //         message = "Votre connexion a echoué !!!"
                // }
                // const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();

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