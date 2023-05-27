import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getItem, addItem, removeItem } from './LocalStorage';

export  function hasAuthenticated(){  
//     const token =  getItem('mksToken');
//     const refreshtoken = getItem('mksRefreshToken');

//     return token ? tokenIsValid(token, refreshtoken) : false ;

return true


    // if((token && refreshtoken)){
    //     const value = tokenIsValid(token, refreshtoken)

    //     console.log(value)
    //     return value
        
    // }else{
    //     return false
    // }
}

export function login(credentials) {
    return axios
        .post('http://192.168.1.11:4005/user/login', credentials)
        .then(response => response.data)
        .then(data => {
            addItem('mksToken', data.token);
            addItem('mksRefreshToken', data.refreshtoken)
            return true;
        });
}

export function register(credentials) {
    return axios
        .post('http://192.168.1.11:4005/user/register', credentials)
        .then(response => response.data.token)
        .then(token => {
            addItem('mksToken', token);
            // addItem('mksrefreshToken', refreshtoken)

            return true;
        });
}

export function logout() {
    removeItem('mksToken','mksRefreshToken');
    // removeItem('mksrefreshToken');
    // return true
}

async function  tokenIsValid (token,refreshtoken) {

    
    const { exp: expiration } = jwtDecode(token);

    if (expiration * 1000 > new Date().getTime()) {
        return await true;
    }else{

        // return false
        console.log('token expiré', refreshtoken)
         if(generateToken(refreshtoken)){
            return await true
         }else{
            return await false
         }
        
    }
}

// La fonction pour generer les token et refreshtoken a partir du refresh token

 function generateToken(refreshtoken){

    console.log("Voila le refresh token",refreshtoken)

    // try {
         axios
        .post('http://192.168.1.11:4005/user/refreshtoken', {refresh_token:refreshtoken})
        .then(response => response.data)
        .then(data => {
            addItem('mksToken', data.token);
            addItem('mksRefreshToken', data.refreshtoken)
            console.log('true de la fonction de generation de refreshToken')
            return true;
        })
        .catch(error=>{
            if (error.code ==="ERR_BAD_REQUEST") {
                return false
              }
        })
    // } catch (error) {
    //     // console.log('error')
    //     return  error
    // }

    return false

}
