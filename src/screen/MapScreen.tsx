import {
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Platform,
    PermissionsAndroid
} from "react-native";
import StyleAppContext from "../styles/StyleAppContext";
import AppContext from "../../AppContext";
import Services from "../api/Services";
import {exceptionHandleUtils} from "../utilities/Utils";
//@ts-ignore
import {API_DATA_CACHE_PLACES} from "@env";
import GeoDataUtils from "../utilities/GeoDataUtils";
import {GeoLocationTS, geoLocationTSImp} from "../model/type/GeoLocationTS";
import MapView, {Marker} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import SnackbarUtils from "../utilities/SnackbarUtils";
import * as _ from "lodash";
import {useContext, useEffect, useReducer, useRef, useState} from "react";
// @ts-ignore
import Geolocation from 'react-native-geolocation-service';
import * as React from "react";
import Snackbar from "react-native-snackbar";

/** MAX NUMBER PLACE TO SHOW **/
const MAX_PLACES : number       = 50 ;

/**
 * MAPVIEW CONFIGURATION
 */
const { height, width }         = Dimensions.get( 'window' );
const ASPECT_RATIO              = width / height;
const LATITUDE_DELTA : number   = 0.1; /** LATITUDE_DELTA => DEFAULT ZOOM LEVEL ON MAP **/
const LONGITUDE_DELTA : number  = LATITUDE_DELTA * ASPECT_RATIO;

const ButtonFindPlacesAround = (props:any) => (
    <View style={props.usescreen.stylesappref.current.fabcont}>
        <TouchableOpacity
            style={props.usescreen.stylesappref.current.fabutton}
            onPress={props.usescreen.onPlaceSearch}
            activeOpacity={0.9}
        >
            <Text style={{color:props.usescreen.stylesappref.current.fabtextcolor}}>Search in this area</Text>
        </TouchableOpacity>
    </View>
);


const useMapScreen = (props:any) => {
    const stylesappref : any                = useRef(useContext(StyleAppContext));
    const allplacelistref : any             = useRef<any[]>([]);
    const appctx : any                      = useContext(AppContext);
    const [userplace, setUserplace]         = useState<GeoLocationTS>(geoLocationTSImp);
    const [regionplace, setRegionplace]     = useState<GeoLocationTS>(geoLocationTSImp);
    const isallplacesloadedref : any        = useRef<boolean>(false);
    const ismaploadedref : any              = useRef<boolean>(false);
    const initref : any                     = useRef<boolean>(false);
    const [showfindplacesbtn, setShowfindplacesbtn]  = useState<boolean>(false);

    /**
     * SEARCH PARTNERS PLACES NEAR
     */
    const findPlacesaround =  () => {
        if(!isallplacesloadedref.current || !ismaploadedref.current){
            return [];
        }
        const datalist =   GeoDataUtils.findClosestPlaces({placezero: regionplace, datalist:allplacelistref.current, limit:MAX_PLACES});
        setShowfindplacesbtn(false);
        return datalist ;
    };
    const [placesaround, dispatchPlacesaround]  = useReducer(findPlacesaround, [{}]);


    const findClosestPlaces = async () => dispatchPlacesaround();

    const onPlaceSearch = () => findClosestPlaces();

    /**
     * WHEN USER MOVE ON THE MAP
     * @param region
     */
    const onMapRegionChangeComplete = (region:any) => {
        if(!isallplacesloadedref.current || !ismaploadedref.current){
            return ;
        }
        setRegionplace(region);
        setShowfindplacesbtn(initref.current);
        initref.current = true ;
    };

    /**
     * GET USER GEOLOCATION AFTER MAP COMPLETELY LOADED
     */
    const onMapReady = () => {
        ismaploadedref.current = true ;
        if(!isallplacesloadedref.current){ return ; }
        findClosestPlaces();
    }



    /**
     * ASK USER TO ENABLE LOCATION
     */
    const askToEnableLocation = async () => {
        if (Platform.OS === 'ios') {
            const auth = await Geolocation.requestAuthorization("whenInUse");
            if(auth.toLocaleLowerCase() === "granted") {
                moveToUserLocation();
            }
            Snackbar.dismiss();
        }

        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "GeoLocation Permission",
                        message:
                            "Please allow permission so you can find places around your current place." ,
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    moveToUserLocation();
                }
                Snackbar.dismiss();
            } catch (err) {
                console.warn(err);
            }
        }
    }

    /***
     * LOAD FROM SERVERS PARTNERS PLACES
     */
    const loadPartnersPlaces = () => {
        Services.get({
            path : `${API_DATA_CACHE_PLACES}`,
        }).then(msgOK => {
            if(!msgOK.data || !Array.isArray(msgOK.data)){ return ; }

            allplacelistref.current = msgOK.data ;
            isallplacesloadedref.current = true ;

            if(!ismaploadedref.current){  return ; }
            findClosestPlaces();
        }).catch(msgErr => {
            exceptionHandleUtils(msgErr);
        });
    }

    /**
     * FIND THE CURRENT USER GEOLOCATION
     */
    const moveToUserLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                let loc : GeoLocationTS = _.cloneDeep(userplace);
                loc.latitude = position.coords.latitude ;
                loc.longitude = position.coords.longitude ;
                loc.latitudeDelta = LATITUDE_DELTA ;
                loc.longitudeDelta = LONGITUDE_DELTA ;
                setUserplace(loc);
                setRegionplace(loc);
            },(error) => {
                 SnackbarUtils.error({message:error.message});
            },{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    /**
     * MESSAGE TO ASK USER TO ENABLE LOCATIOTION IF NOT ALREADY DONE
     */
    const processingUserLocation = async () => {
        const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
        granted ? moveToUserLocation() :  SnackbarUtils.warning({message:`Please allow access to location!`, actionText:'OK', duration:Snackbar.LENGTH_INDEFINITE, onPress:askToEnableLocation});
    };

    return {
        userplace,
        regionplace,
        placesaround,
        appctx,
        stylesappref,
        onMapReady,
        onMapRegionChangeComplete,
        loadPartnersPlaces,
        showfindplacesbtn,
        processingUserLocation,
        onPlaceSearch,
    }
}

const MapScreen = (props:any) => {
    const usescreen : any       = useMapScreen(props)

    useEffect(()=>{
        usescreen.loadPartnersPlaces();
        usescreen.processingUserLocation();
        return () => {
            Snackbar.dismiss();
        };
    }, []);

    return (
        <SafeAreaView style={{flex:1}}>
            <MapView
                style={{flex:1}}
                region={usescreen.regionplace}
                onRegionChangeComplete={usescreen.onMapRegionChangeComplete}
                onMapReady={usescreen.onMapReady}
                followsUserLocation
                showsUserLocation>
                <Marker
                    coordinate={{ latitude:usescreen.userplace.latitude, longitude: usescreen.userplace.longitude,}}
                    title="My current place"
                />
                {
                    usescreen.placesaround &&
                    !_.isEmpty(usescreen.placesaround) &&
                    usescreen.placesaround.map((marker, index) => {
                        if(!marker || !marker.address){ return ;}
                        return <Marker
                            key={index}
                            coordinate={{ latitude:parseFloat(marker.address.lat), longitude: parseFloat(marker.address.lng),}}
                            title={marker.translations[0]?.name}
                            description={marker.translations[0]?.description}
                        />
                    })
                }
            </MapView>
            {
                usescreen.showfindplacesbtn &&
                <ButtonFindPlacesAround usescreen={usescreen}  />
            }

        </SafeAreaView>
    );
}


export default React.memo(MapScreen) ;
