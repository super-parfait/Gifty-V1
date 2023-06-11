import { FETCH_LIST_FAIL, FETCH_LIST_SUCCESS } from "./types";

// import {functionGetList} from "../../services/gift.services";
import { functionGetList } from "../../services/gift.service";



export const  GetList =  () => (dispatch)=>{
        return functionGetList().then(
                (response)=>{
                        console.log(response)
                        dispatch({
                                type: FETCH_LIST_SUCCESS,
                                payload: response
                                
                        });

                        return Promise.resolve()
                },
                (error)=>{

                        console.log(error)

                        dispatch({
                                type: FETCH_LIST_FAIL,
                        });

                        return Promise.reject();
                }
        );
}
