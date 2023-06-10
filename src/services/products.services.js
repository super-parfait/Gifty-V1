import axios from "axios";

const API_URL = "https://dev-mks.com:9000/api/v1/srv-core/"


export  function functionGetProductForPersonnalized(){  
    
        return axios
            .get(API_URL+'product/')
            .then(response =>{
                console.log(response)
                return response.data;
            })

}


// export default functionGetProductForPersonnalized