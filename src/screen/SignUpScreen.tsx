import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {SignUpTS, signUpTSImp} from "../model/type/SignUpTS";
import {navigateToUtils, rulesMessagesUtils, sleepUtils, updateInputValueUtils} from "../utilities/Utils";
import {validate} from "indicative/validator";
import StyleAppContext from "../styles/StyleAppContext";
import SnackbarUtils from "../utilities/SnackbarUtils";
import AppContext from "../../AppContext";
import Services from "../api/Services";
import {sanitize} from "indicative/sanitizer";
// @ts-ignore
import {API_OAUTH_REGISTER, APP_SCREEN_SIGNIN} from "@env";
import { TextField} from 'rn-material-ui-textfield'
import * as _ from "lodash";
import {UserProfileTS} from "../model/type/UserProfileTS";
import Button from 'react-native-button';
import {useContext, useRef, useState} from "react";
// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import * as React from "react";

const DELAY_GOTO_SIGNIN : number = 4000; //4000 millisecond


const useSignUpScreen = (props:any) => {
    const stylesappref : any        = useRef(useContext(StyleAppContext));
    const appctx : any              = useContext(AppContext);
    const [signup, setSignUp]       = useState<SignUpTS>(signUpTSImp);
    const [showpass, setShowpass]   = useState<boolean>(false);


    const onChange              = (key:string, val:string) => updateInputValueUtils<SignUpTS>(signup, setSignUp, key, val);
    const onShowPassToggle      = () => setShowpass(!showpass);
    const onNavigateToSignIn    = () => navigateToUtils(props, APP_SCREEN_SIGNIN);

    /**
     * PROCESSING ON SERVER SIGN UP DEMAND OF USER
     */
    const signupDemand          = () => {
        appctx.setLoading(true);
        Services.post({
            path : `${API_OAUTH_REGISTER}`,
            data : signup.data
        }).then(msgOK => {
            appctx.setLoading(false);
            let userprofile : UserProfileTS = _.cloneDeep(appctx.userProfile);
            userprofile.data.first_name     = signup.data.first_name;
            userprofile.data.last_name      = signup.data.last_name;
            userprofile.data.username       = signup.data.username;
            userprofile.data.email          = signup.data.email;
            appctx.setUserProfile(userprofile);

            SnackbarUtils.info({message:`Successful sign up! You will be redirect to login form.`, duration:DELAY_GOTO_SIGNIN, actionText:`GREAT!`});
            sleepUtils(DELAY_GOTO_SIGNIN + 100).then(()=> props.navigation.reset({index: 0, routes: [{ name: APP_SCREEN_SIGNIN }],}));
        }).catch(msgErr => {
            appctx.setLoading(false);
            SnackbarUtils.error({message:msgErr.message});
        });
    } ;

    /**
     * CHECK AND VALIDATE SIGN UP SUBMIT BY USER
     */
    const onFormSubmit          = () => {
        sanitize(signup.data, signup.sanitize);
        validate(signup.data, signup.rules, rulesMessagesUtils(signup.label)).then(signupDemand).catch(e=>SnackbarUtils.error({message:e[0]?.message}));
    };


    return {
        signup,
        showpass,
        onChange,
        onFormSubmit,
        onShowPassToggle,
        onNavigateToSignIn,
        appctx,
        stylesappref,
    }
}

const SignUpScreen = (props:any) => {
    const usescreen : any       = useSignUpScreen(props);

     return (
         <SafeAreaView>
             <ScrollView
                 contentInsetAdjustmentBehavior="automatic"
                 keyboardShouldPersistTaps="handled">
                 <View  style={usescreen.stylesappref.current.container}>
                     <TextField
                         inputContainerStyle={usescreen.stylesappref.current.input}
                         label={`${usescreen.signup.label.first_name} *`}
                         placeholder={`Please enter your ${usescreen.signup.label.first_name}`}
                         value={usescreen.signup.data.first_name}
                         onChangeText={e=>usescreen.onChange('first_name', e)}
                         renderLeftAccessory={()=>(<Icon  name="account-outline"  style={usescreen.stylesappref.current.icon} />)}
                     />

                     <TextField
                         inputContainerStyle={usescreen.stylesappref.current.input}
                         label={`${usescreen.signup.label.last_name} *`}
                         placeholder={`Please enter your ${usescreen.signup.label.last_name}`}
                         value={usescreen.signup.data.last_name}
                         onChangeText={e=>usescreen.onChange('last_name', e)}
                         renderLeftAccessory={()=>(<Icon  name="account"  style={usescreen.stylesappref.current.icon} />)}
                     />

                     <TextField
                         inputContainerStyle={usescreen.stylesappref.current.input}
                         label={`${usescreen.signup.label.username} *`}
                         placeholder={`Please enter your ${usescreen.signup.label.username}`}
                         value={usescreen.signup.data.username}
                         onChangeText={e=>usescreen.onChange('username', e)}
                         renderLeftAccessory={()=>(<Icon  name="account-circle"  style={usescreen.stylesappref.current.icon} />)}
                     />

                     <TextField
                         inputContainerStyle={usescreen.stylesappref.current.input}
                         label={`${usescreen.signup.label.email} *`}
                         placeholder={`Please enter your ${usescreen.signup.label.email}`}
                         value={usescreen.signup.data.email}
                         onChangeText={e=>usescreen.onChange('email', e)}
                         textContentType="emailAddress"
                         keyboardType="email-address"
                         renderLeftAccessory={()=>(<Icon  name="at"  style={usescreen.stylesappref.current.icon} />)}
                     />

                     <TextField
                         inputContainerStyle={usescreen.stylesappref.current.input}
                         label={`${usescreen.signup.label.password} *`}
                         placeholder={`Please enter your ${usescreen.signup.label.password}`}
                         value={usescreen.signup.data.password}
                         onChangeText={e=>usescreen.onChange('password', e)}
                         secureTextEntry={usescreen.showpass}
                         returnKeyType="done"
                         renderLeftAccessory={()=>(<Icon  name="lock"  style={usescreen.stylesappref.current.icon} />)}
                         renderRightAccessory={()=>(<Icon  name="eye"  style={usescreen.stylesappref.current.iconbutton} onPress={usescreen.onShowPassToggle} />)}
                     />


                     {
                         usescreen.appctx.loading &&
                         <ActivityIndicator size="large" color={usescreen.stylesappref.current.secondarydarkcolor.color} />
                     }
                     {
                         !usescreen.appctx.loading &&
                         <Button
                             style={usescreen.stylesappref.current.buttoncolor}
                             containerStyle={usescreen.stylesappref.current.button}
                             loading={usescreen.appctx.loading}
                             onPress={usescreen.onFormSubmit}>Sign up</Button>
                     }

                     <View style={usescreen.stylesappref.current.lignecenter}>
                         <Text style={usescreen.stylesappref.current.label}>Already Registered ? </Text>
                         <TouchableOpacity onPress={usescreen.onNavigateToSignIn} activeOpacity={0.8}>
                             <Text style={usescreen.stylesappref.current.lien} >Click here to sign in</Text>
                         </TouchableOpacity>
                     </View>
                 </View>
             </ScrollView>
         </SafeAreaView>

     );
}
export default React.memo(SignUpScreen);

