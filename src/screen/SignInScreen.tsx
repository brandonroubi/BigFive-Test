import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {SignInTS, signInTSImp} from "../model/type/SignInTS";
import {exceptionHandleUtils, navigateToUtils, rulesMessagesUtils, updateInputValueUtils} from "../utilities/Utils";
import {validate} from "indicative/validator";
import StyleAppContext from "../styles/StyleAppContext";
import SnackbarUtils from "../utilities/SnackbarUtils";
import AppContext from "../../AppContext";
import Services from "../api/Services";
import {sanitize} from "indicative/sanitizer";
//@ts-ignore
import {API_OAUTH_LOGIN, APP_STOREKEY_USERPROFILE, APP_SCREEN_SIGNUP, APP_SCREEN_MAP} from "@env";
import * as _ from "lodash";
import {TextField} from 'rn-material-ui-textfield'
import Button from 'react-native-button';
import {useContext, useRef, useState} from "react";
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import * as React from "react";


const useSignInScreen = (props:any) => {
    const stylesappref : any        = useRef<any>(useContext(StyleAppContext));
    const appctx : any              = useContext(AppContext);
    const [signin, setSignIn]       = useState<SignInTS>(signInTSImp);
    const [showpass, setShowpass]   = useState<boolean>(false);


    const onChange              = (key:string, val:string) => updateInputValueUtils<SignInTS>(signin, setSignIn, key, val);
    const onShowPassToggle      = () => setShowpass(!showpass);
    const onNavigateToSignUp    = () => navigateToUtils(props, APP_SCREEN_SIGNUP);

    /**
     * PROCESSING ON SERVER SIGN IN DEMAND OF USER
     */
    const signinDemand          = () => {
        appctx.setLoading(true);
        Services.post({
            path : `${API_OAUTH_LOGIN}`,
            data : signin.data
        }).then(msgOK => {
            appctx.setLoading(false);
            appctx.storeData(APP_STOREKEY_USERPROFILE, appctx.userProfile).then(b=>{
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: APP_SCREEN_MAP }],
                });
            }).catch(exceptionHandleUtils);
        }).catch(msgErr => {
            appctx.setLoading(false);
            SnackbarUtils.error({message:`Sign in failed! Check your email and password.`});
            //exceptionHandleUtils(msgErr);
        });
    } ;

    /**
     * CHECK AND VALIDATE SIGN IN SUBMIT BY USER
     */
    const onFormSubmit          = () => {
        sanitize(signin.data, signin.sanitize);
        validate(signin.data, signin.rules, rulesMessagesUtils(signin.label)).then(signinDemand).catch(e=>SnackbarUtils.error({message:e[0]?.message}));
    };


    return {
        signin,
        showpass,
        onChange,
        onFormSubmit,
        onShowPassToggle,
        onNavigateToSignUp,
        appctx,
        stylesappref,
    }
}

const SignInScreen = (props:any) => {
    const usescreen : any   = useSignInScreen(props);

    return (
        <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps="handled">
                    <View  style={usescreen.stylesappref.current.container}>

                        <TextField
                            inputContainerStyle={usescreen.stylesappref.current.input}
                            label={`${usescreen.signin.label.email} *`}
                            placeholder={`Please enter your ${usescreen.signin.label.email}`}
                            value={usescreen.signin.data.email}
                            onChangeText={e=>usescreen.onChange('email', e)}
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            renderLeftAccessory={()=>(<Icon  name="at"  style={usescreen.stylesappref.current.icon} />)}
                        />

                        <TextField
                            inputContainerStyle={usescreen.stylesappref.current.input}
                            label={`${usescreen.signin.label.password} *`}
                            placeholder={`Please enter your ${usescreen.signin.label.password}`}
                            value={usescreen.signin.data.password}
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
                                onPress={usescreen.onFormSubmit}>Sign in</Button>
                        }

                        <View style={usescreen.stylesappref.current.lignecenter}>
                            <Text style={usescreen.stylesappref.current.label}>Don't have account ? </Text>
                            <TouchableOpacity onPress={usescreen.onNavigateToSignUp} activeOpacity={0.8}>
                                <Text style={usescreen.stylesappref.current.lien} >Click here to sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default React.memo(SignInScreen);
