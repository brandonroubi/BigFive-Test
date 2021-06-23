import {UserProfileTS, UserProfileTSImp} from "./src/model/type/UserProfileTS";
import {exceptionHandleUtils} from "./src/utilities/Utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from "react";
import * as React from "react";
import * as _ from "lodash";


export const appStore = () => {
    const [loading, setLoading]         = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<UserProfileTS>(UserProfileTSImp);

    const storeData = async(key:string, value:any) : Promise<boolean> => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            return Promise.resolve(true);
        } catch (e) {
            // saving error
        }
        return Promise.reject(false);
    }

    const getData = async (key:string) : Promise<any> => {
        try {
            const value = await AsyncStorage.getItem(key);
            if(value !== null) {
              return Promise.resolve(JSON.parse(value));
            }
        } catch(e) {exceptionHandleUtils(e);}
        return Promise.reject('');
    }

    const updateUserProfil  = (data:any) => {
        let uprof : UserProfileTS   = _.cloneDeep(userProfile);
        uprof.data.first_name       =  data.first_name;
        uprof.data.last_name        =  data.last_name;
        uprof.data.username         =  data.username;
        uprof.data.email            =  data.email;
        setUserProfile(userProfile);
    }
    return {
        loading, setLoading,
        userProfile, setUserProfile,
        storeData,
        getData,
        updateUserProfil,
    }
}

const AppContext    = React.createContext({});
export default  AppContext ;
