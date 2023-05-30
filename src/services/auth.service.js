import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import { getItem, addItem, removeItem } from './LocalStorage';

const API_URL = "http://192.168.1.9:4005/api/v1/"


export  function hasAuthenticated(){  
//     const token =  getItem('userToken');
//     const refreshtoken = getItem('userRefeshToken');

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

const functionLogin = (credentials) =>{
    return axios
        .post(API_URL+'user/login', credentials)
        .then(response => response.data)
        .then(data => {
            addItem('user', JSON.stringify({"token":data.token,"refresh_token": data.refreshtoken }));
        //     addItem('userRefeshToken', JSON.stringify({}))
            return true;
        });
}

const functionRegister = (credentials) => {
    return axios
        .post(API_URL + 'user/register', credentials)
        .then(response => response.data)
        .then(data => {
            addItem('user', JSON.stringify({'token':data.token}));
            // addItem('userRefeshToken', refreshtoken)

            return true;
        });
}

const  functionLogout = () => {
    removeItem('userToken','userRefeshToken');
    // removeItem('userRefeshToken');
    // return true
}

// async function  tokenIsValid (token,refreshtoken) {

    
//     const { exp: expiration } = jwtDecode(token);

//     if (expiration * 1000 > new Date().getTime()) {
//         return await true;
//     }else{

//         console.log('token expiré', refreshtoken)
//          if(generateToken(refreshtoken)){
//             return await true
//          }else{
//             return await false
//          }
        
//     }
// }

// La fonction pour generer les token et refreshtoken a partir du refresh token

//  function generateToken(refreshtoken){

//     console.log("Voila le refresh token",refreshtoken)

//          axios
//         .post('http://192.168.1.11:4005/user/refreshtoken', {refresh_token:refreshtoken})
//         .then(response => response.data)
//         .then(data => {
//             addItem('userToken', data.token);
//             addItem('userRefeshToken', data.refreshtoken)
//             console.log('true de la fonction de generation de refreshToken')
//             return true;
//         })
//         .catch(error=>{
//             if (error.code ==="ERR_BAD_REQUEST") {
//                 return false
//               }
//         })
//     // 
//     return false

// }


export default {
        functionRegister,
        functionLogin,
        functionLogout,
      };
