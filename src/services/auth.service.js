import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import { getItem, addItem, removeItem } from './LocalStorage';
import authHeader from './auth-header';
import { v4 as uuid } from 'uuid';

const API_URL = "http://192.168.1.12:4005/api/v1/srv-usr/"


export  function functionGetUserData(){  

    const unique_id = uuid();
    const generate_user = JSON.parse(localStorage.getItem("generate_id_user"));

    if(!generate_user){
        addItem("generate_id_user", JSON.stringify({'UserId': unique_id}))
    }

    return axios
        .get(API_URL+'user/', {headers: authHeader()})
        // .then(response => response.data)
        .then(response =>{
            addItem('user', JSON.stringify({"token":response.data.token}));
        //     addItem('userRefeshToken', JSON.stringify({}))
            return response.data;
        })
        // .catch(error =>{
        //     const unique_id = uuid();
        //     const generate_user = JSON.parse(localStorage.getItem("generate_id_user"));

        //     if(!generate_user){
        //         addItem("generate_id_user", JSON.stringify({'UserId': unique_id}))
        //     }
            
            
        // });

        

//     return token ? tokenIsValid(token, refreshtoken) : false ;

// return true


    // if((token && refreshtoken)){
    //     const value = tokenIsValid(token, refreshtoken)

    //     console.log(value)
    
        
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
            return data;
        });

        
}


const functionUpdate = (credentials) => {


    
        return axios
            .put(API_URL + 'user', credentials, {headers: authHeader()})
            .then(response => response.data)
            .then(data => {
                return true;
            });


    
}


const functionUpdatePassword = (credentials) =>{
    return axios
            .put(API_URL + 'user/modify-password', credentials, {headers: authHeader()})
            .then(response => response.data)
            .then(data => {
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
        functionUpdate, 
        functionUpdatePassword,
        functionGetUserData
      };
