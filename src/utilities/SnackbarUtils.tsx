import Snackbar from "react-native-snackbar";

const SnackbarUtils = {

    /**
     * Customize and show information on snackbar
     * @param message
     * @param actionText
     * @param textColor
     * @param duration in MilliSecond (default 7000ms)
     * @param onPress
     */
    info : (
        {message = ``, actionText = 'INFOS', textColor = 'green', duration = 5000, onPress = () => {}}
            : {message : string, actionText ?: string, textColor ?: string, duration ?: number, onPress ?: any}
            = {message: ``, actionText:'INFOS', textColor:'green', duration : 5000, onPress: () =>{}}) => {
        Snackbar.show({
            text: message,
            duration: duration,
            action: {
                text: actionText,
                textColor: textColor,
                onPress: onPress,
            },
        });
    },
    /**
     * Customize and show warning message on snackbar
     * @param message
     * @param actionText
     * @param textColor
     * @param duration in MilliSecond (default 5000ms)
     * @param onPress
     */
    warning : (
        {message = ``, actionText = 'ALERT', textColor = 'orange', duration = 5000, onPress = () => {}}
            : {message : string, actionText ?: string, textColor ?: string, duration ?: number, onPress ?: any}
            = {message: ``, actionText:'ALERT', textColor:'orange', duration : 5000, onPress: () =>{}}) => {
        Snackbar.show({
            text: message,
            duration: duration,
            action: {
                text: actionText,
                textColor: textColor,
                onPress: onPress,
            },
        });
    },
    /**
     * Customize and show error message on snackbar
     * @param message
     * @param actionText
     * @param textColor
     * @param duration in MilliSecond (default 9000ms)
     * @param onPress
     */
     error : (
        {message = ``, actionText = 'ERROR', textColor = 'red', duration = 5000, onPress = () => {}}
            : {message : string, actionText ?: string, textColor ?: string, duration ?: number, onPress ?: any}
            = {message: ``, actionText:'ERROR', textColor:'red', duration : 5000, onPress: () =>{}}) => {
             Snackbar.show({
                 text: message,
                 duration: duration,
                 action: {
                     text: actionText,
                     textColor: textColor,
                     onPress: onPress,
                 },
             });
     },


}

export default SnackbarUtils;
