// @ts-ignore
import _ from "lodash";
import * as React from "react";

export const exceptionHandleUtils =  (error:any) : void => {
   console.log(error);
}

/**
 * Wait ms Milliseconde before execute function
 * @param ms
 */
export const sleepUtils = (ms:number)  => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Go from screen to another screen
 * @param props
 * @param screen Name Of screen
 */
export const navigateToUtils = (props:any, screen:string) => props.navigation.navigate(screen);

/**
 * Customize error message on validation form
 * @param label
 */
export const rulesMessagesUtils = (label:any) : any => {
    return {
        required: (field:string) => `${label[field]} is required ` ,
        alpha: (field:string) => `${label[field]} contains unallowed characters`,
        email: (field:string) => `${label[field]} contains an invalid email address`,
        min: (field:string) => `${label[field]} is too short`
    }
}



/**
 * Update Data
 * @param t
 * @param setTata
 * @param key
 * @param val
 */
function updateInputValue <T>(t: T, setTata:React.Dispatch<React.SetStateAction<T>>, key:string, val:any) : void {
    const d : T = _.cloneDeep(t) ;
    // @ts-ignore
    d['data'][key] = val;
    setTata(d) ;
}
export const updateInputValueUtils : <T>(t: T, setTata:React.Dispatch<React.SetStateAction<T>>, key:string, val:any) => void = updateInputValue;
