import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import { getItem, addItem, removeItem } from './LocalStorage';
import authID from './auth-header2';
import { v4 as uuid } from 'uuid';

const API_URL = "https://dev-mks.com:9000/api/v1/srv-core"


const functionCheckout = (credentials)=>{

        console.log("Je suis la fonction de test")
        console.log(credentials)
        console.log(authID())
        return axios
        .post(API_URL+'/order/', credentials, {headers:authID()} )
        .then(response =>response.data)
        .then(data =>{
                return true;
        })
        // .catch(error=>{
        //         console.log(error)
        // });
}



export default functionCheckout