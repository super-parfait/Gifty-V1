import axios from 'axios';
import authID from './auth-header2';

const API_URL = "https://dev-mks.com:9000/api/v1/srv-core"


const functionGetOrder = ()=>{

        return axios
        .get(API_URL+'/order/', {headers:authID()} )
        .then(response =>response.data)
        .then(data =>{
                return data;
        })
}

export function functionCredentialsForPayment (orderID, UserId){

        return axios
                .post(API_URL+"/order/"+orderID+"/payment/", {headers:{"UserId":UserId}})
                .then(response=> response.data)
                .then(data=>{
                        return data
                        console.log(data)
                })
}


export default functionGetOrder