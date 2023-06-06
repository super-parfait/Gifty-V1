import axios from 'axios';
import authID from './auth-header2';

const API_URL = "https://dev-mks.com:9000/api/v1/srv-core"


const functionGetOrder = ()=>{

        // console.log("Je suis la fonction de test")
        // console.log(credentials)
        // console.log(authID())
        return axios
        .get(API_URL+'/order/', {headers:authID()} )
        .then(response =>response.data)
        .then(data =>{
                return data;
        })
}



export default functionGetOrder