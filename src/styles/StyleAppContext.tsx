// @ts-ignore
import React from "react";
import {StyleSheet} from "react-native";



export function styleScreenHeader (theme:any)  {
    return {
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerStyle: {
            backgroundColor: theme.palette.primary.main,
        },
        headerTintColor: theme.palette.primary.contrastText,
    }
};

export function styleApp(theme:any) {
    return StyleSheet.create({
        primarycolor : {
            color : theme.palette.primary.main,
        },
        secondarydarkcolor : {
            color : theme.palette.secondary.dark,
        },
        secondarylightcolor : {
            color : theme.palette.secondary.light,
        },
        container: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 25
        },
        input: {
            marginBottom:15,
        },
        icon: {
            padding: 10,
            color: theme.palette.iconcolor,
            fontSize:20,
        },
        iconbutton: {
            padding: 10,
            color: '#455A64',
            fontSize:20,
        },
        buttoncolor:{
            fontSize: 20,
            color: theme.palette.primary.contrastText,
        },
        button:{
            marginTop:25,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft:8,
            paddingRight:8,
            height: 50,
            overflow: 'hidden',
            borderRadius: 20,
            backgroundColor: theme.palette.primary.main,
        },
        label: {
            color: 'gray',
        },
        lignecenter: {
            flex:1,
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
        },
        lien: {
            fontWeight: 'bold',
            color: theme.palette.primary.light,
        },
        fabutton: {
            alignItems: "center",
            backgroundColor: theme.palette.secondary.main,
            color:theme.palette.secondary.contrastText,
            padding: 10,
            width:150,
            borderRadius:50,
        },
        fabcont: {
            position:'absolute',
            top:'90%',
            alignSelf:'flex-end',
            paddingRight:15,
        },
        fabuttonbottomcenter: {
            alignItems: "center",
            backgroundColor: theme.palette.secondary.dark,
            color:theme.palette.secondary.contrastText,
            padding: 10,
            width:200,
            borderRadius:50,
        },
        fabcontcenter: {
            position:'absolute',
            top:'90%',
            alignSelf:'center',
        },
        fabtextcolor: {
            color:theme.palette.secondary.contrastText,
        },
    });
};

const StyleAppContext    = React.createContext({});
export default  StyleAppContext ;
