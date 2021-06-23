// @ts-ignore
import {API_BASEURL} from "@env";
import axios from "axios";
// @ts-ignore
import _ from "lodash";
import {ApiMessageTS,
    apiFailedMessageTSImp
} from "../model/type/ApiMessageTS";

axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

const onResult = (response:any)  => {
    let r : ApiMessageTS = _.cloneDeep(apiFailedMessageTSImp);
    if(!response.data){
        return r ;
    }
    r =  {...response.data};
    return r ;
};
const onError = (error:any) => {
    let r : ApiMessageTS = _.cloneDeep(apiFailedMessageTSImp);
    if(!error.response?.data){
        return r;
    }
    r.status    =  error.response.data.status ;
    r.type      =  error.response.data.type ;
    const jsonQuery = require('json-query');
    const result : any = jsonQuery('errors[**][description!=""]', {data: error.response.data}).value;
    r.message = result?.description ? result.description : `` ;
    return r;
}

const Services = {
    post : async ({path = '', data = {}} :  {path:string, data ?: any} = {path : '', data : {}} ) : Promise<ApiMessageTS> => {

            const options : any = {
                url: `${API_BASEURL}${path}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'
                },
                data: data
            };
            let result : ApiMessageTS  ;
            try{
                result  = onResult(await axios(options)) ;
            }catch(e:any){
                result  = onError(e) ;
            }
           return result.status !== 200 ? Promise.reject(result) : Promise.resolve(result);
    },
    get : async ({path = '', data = {}} :  {path:string, data ?: any} = {path : '', data : {}} ) : Promise<ApiMessageTS> => {

        const options : any = {
            url: `${API_BASEURL}${path}`,
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            data: data
        };
        let result : ApiMessageTS  ;
        try{
            result  = onResult(await axios(options)) ;
        }catch(e:any){
            result  = onError(e) ;
        }
        return result.status !== 200 ? Promise.reject(result) : Promise.resolve(result);
    }
}

export default Services ;
