import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from "./src/screen/SignUpScreen";
import MapScreen from "./src/screen/MapScreen";
import SignInScreen from "./src/screen/SignInScreen";
import StyleAppContext, {styleApp, styleScreenHeader} from './src/styles/StyleAppContext';
import AppContext, {appStore} from './AppContext';
// @ts-ignore
import {APP_STOREKEY_USERPROFILE, APP_SCREEN_SIGNUP, APP_SCREEN_SIGNIN, APP_SCREEN_MAP, APP_SCREEN_SPLASH} from "@env";
import SplashScreen from "./src/screen/SplashScreen";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {useEffect, useState} from "react";
import * as React from "react";
import BluePrintheme from "./src/styles/themes/BluePrint";
import {sleepUtils} from "./src/utilities/Utils";


const Stack = createStackNavigator();
const styleapp : any = styleApp(BluePrintheme);
const stylescreenheader : any = styleScreenHeader(BluePrintheme);

const App = () => {
    const appstore : any = appStore();
    const [initialRouteName, setInitialRouteName]   = useState<string|undefined>(undefined);

    useEffect(() => {
        sleepUtils(7000).then(()=>{
            appstore.getData(APP_STOREKEY_USERPROFILE).then(value=>{
                appstore.setUserProfile(value);
                setInitialRouteName(APP_SCREEN_MAP);
            }).catch(e=>setInitialRouteName(APP_SCREEN_SIGNUP));
        });
        return () => {}
    }, [])

    return (
        <StyleAppContext.Provider value={styleapp}>
            {
                initialRouteName &&
                <AppContext.Provider value={appstore}>
                    <SafeAreaProvider>
                        <NavigationContainer>
                            <Stack.Navigator initialRouteName={initialRouteName} screenOptions={stylescreenheader}>
                                <Stack.Screen name={APP_SCREEN_SIGNUP} component={SignUpScreen} />
                                <Stack.Screen name={APP_SCREEN_SIGNIN} component={SignInScreen} />
                                <Stack.Screen name={APP_SCREEN_MAP} component={MapScreen} />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </SafeAreaProvider>
                </AppContext.Provider>
            }
            {
                !initialRouteName && <SplashScreen  />
            }
        </StyleAppContext.Provider>
    );
}
export default App;
