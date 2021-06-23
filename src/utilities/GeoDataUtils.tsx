// @ts-ignore
import _ from "lodash";
import {GeoLocationTS, geoLocationTSImp} from "../model/type/GeoLocationTS";


/**
 * Calculate distance between two coodinate
 * @param geo1
 * @param geo2
 * @param unit
 */
const geoDistance = (geo1:GeoLocationTS, geo2:GeoLocationTS, unit:string) => {
    if ((!_.isNumber(geo1.longitude) || !_.isNumber(geo1.latitude) || !_.isNumber(geo2.longitude) || !_.isNumber(geo2.latitude)) ||
        (geo1.latitude === geo2.latitude) && (geo1.longitude === geo2.longitude)) {
        return 0;
    }
    else {
        const radlat1 = Math.PI * geo1.latitude/180;
        const radlat2 = Math.PI * geo2.latitude/180;
        const theta = geo1.longitude - geo2.longitude;
        const radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}


const GeoDataUtils = {
    findClosestPlaces : ({placezero = _.cloneDeep(geoLocationTSImp), datalist = [], limit = 1} : {placezero:GeoLocationTS, datalist : any[], limit:number}) : any[] => {
        let geodatas : any = _.cloneDeep(datalist);
        geodatas.sort(( placeA:any, placeB:any ) => {
            let geoA : GeoLocationTS    = _.cloneDeep(geoLocationTSImp);
            let geoB : GeoLocationTS    = _.cloneDeep(geoLocationTSImp);

            geoA.latitude       = parseFloat(placeA.address.lat);
            geoA.longitude      = parseFloat(placeA.address.lng);
            geoB.latitude       = parseFloat(placeB.address.lat);
            geoB.longitude      = parseFloat(placeB.address.lng);
            const distA         = geoDistance(placezero, geoA, '');
            const distB         = geoDistance(placezero, geoB, '');
            return (distA > distB) ? 1 : ((distB > distA) ? -1 : 0);
        });
        return _.take(geodatas, limit) ;
    }
}

export default GeoDataUtils ;
