import axios from 'axios';
// import jwtDecode from 'jwt-decode';
// import { getItem, addItem, removeItem } from './LocalStorage';
// import authID from './auth-header2';
// import { v4 as uuid } from 'uuid';
// import functionCredentialsForPayment from './order.services'

const API_URL = "https://dev-mks.com:9000/api/v1/srv-core"

const functionCreateGift = (credentials)=>{

        // console.log("Je suis la fonction de test")
        // console.log(credentials)
        // console.log(authID())


        return axios
        .post(API_URL+'/gift/', credentials )
        .then(response =>response.data)
        .then(data =>{

                // const orderID =data.id
                // const UserId = data.user
                // functionCredentialsForPayment(orderID, UserId)
                // .then(response=>response.data)
                // .then(data =>{
                //         console.log(data)
                //         // return true
                // })
                return data;
        })
        // .catch(error=>{
        //         console.log(error)
        // });
}






export default functionCreateGift