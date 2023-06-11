import axios from 'axios';

const API_URL = "https://dev-mks.com:9000/api/v1/srv-core"

const functionCreateGift = (credentials)=>{

        return axios
        .post(API_URL+'/gift/', credentials )
        .then(response =>response.data)
        .then(data =>{
                return data;
        })
}

export function functionGetList (){

        return axios
        .get(API_URL+'/gift/')
        .then(response =>response.data)
        .then(data =>{
                return data;
        })
}

export default functionCreateGift