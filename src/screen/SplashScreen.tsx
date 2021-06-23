import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';
import * as React from "react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4F6D7A',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#F5FCFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#F5FCFF',
        marginBottom: 5,
    },
});
const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#4F6D7A"
            />
            <Text style={styles.welcome}> WELCOME BIG FIVE TEAM!</Text>
            <Text style={styles.instructions}>DEVELOP BY IBRAHIM SIRIPE</Text>
        </View>
    );
}
export default SplashScreen ;
