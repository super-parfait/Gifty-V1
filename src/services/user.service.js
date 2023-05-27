import axios from "axios";
import authHeader from "./auth-header";


const API_URL =  "http://192.168.1.11:4005/api/v1/";

const getInfoUser = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
  };


export default getInfoUser