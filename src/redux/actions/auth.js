import {
        REGISTER_SUCCESS,
        REGISTER_FAIL,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        UPDATE_PASSWORD_SUCCESS,
        UPDATE_PASSWORD_FAIL,
        UPDATE_INFO_SUCCESS,
        UPDATE_INFO_FAIL,
        LOGOUT,
        SET_MESSAGE,
        SET_MESSAGE_LOGIN,
        SET_MESSAGE_UPDATE_PASSWORD,
        SET_MESSAGE_REGISTER,
        SET_MESSAGE_UPDATE_INFO
      } from "./types";
      
import AuthService from "../../services/auth.service";


// La fonction pour s'inscrire 
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
                                type: SET_MESSAGE_REGISTER,
                                payload: message,
                        });

                        return Promise.resolve();
                },
                (error) => {

                        console.log(error.response.data)
                        var message = error.response.data

                        dispatch({
                                type: REGISTER_FAIL,
                        });

                        dispatch({
                                type: SET_MESSAGE_REGISTER,
                                payload: message,
                        });

                        return Promise.reject();
                }
        );
};

// La fonction pour la modification des infos 
export const update_info = (credentials) => (dispatch) => {
        return AuthService.functionUpdate(credentials).then(
                (response) => {

                        console.log(response)
                        var message = ""
                        if(response ===true){
                                message = "Modification effectuée avec succès !"
                        }
                        dispatch({
                                type: UPDATE_INFO_SUCCESS,
                        });

                        dispatch({
                                type: SET_MESSAGE_UPDATE_INFO,
                                payload: message,
                        });

                        return Promise.resolve();
                },
                (error) => {
                        console.log(error)
                        console.log(error.response.data)
                        var message = error.response.data.message


                        dispatch({
                                type: UPDATE_INFO_FAIL,
                        });

                        dispatch({
                                type: SET_MESSAGE_UPDATE_INFO,
                                payload: message,
                        });

                        return Promise.reject();
                }
        );
};


// La fonction pour modifier le mot de passe 
export  const update_password = (credentials) =>(dispatch)=>{
        return AuthService.functionUpdatePassword(credentials).then(
                (response) => {

                        console.log(response)
                        var message = ""
                        if(response ===true){
                                message = "Modification effectuée avec succès !"
                        }
                        dispatch({
                                type: UPDATE_PASSWORD_SUCCESS,
                        });

                        dispatch({
                                type: SET_MESSAGE_UPDATE_PASSWORD,
                                payload: message
                        });

                        return Promise.resolve();
                },
                (error) => {
                        console.log(error)
                        console.log(error.response.data)
                        var message = error.response.data.message


                        dispatch({
                                type: UPDATE_PASSWORD_FAIL,
                        });

                        dispatch({
                                type: SET_MESSAGE_UPDATE_PASSWORD,
                                payload:message
                        });

                        return Promise.reject();
                }
        );
}


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

                
                dispatch({
                        type: LOGIN_FAIL,
                });

                dispatch({
                        type: SET_MESSAGE_LOGIN,
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