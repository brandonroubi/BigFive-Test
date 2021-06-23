/*
module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    }
};
*/
module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native|@react-navigation/.*|react-native-geolocation-service|react-native-maps|react-native-iphone-x-helper|react-navigation|@react-native-async-storage|react-native|rn-material-ui-textfield|react-native-button|rn-material-ui-textfield)/)',
    ],
    setupFiles: ['./jest.setup.js',
        "./node_modules/react-native-gesture-handler/jestSetup.js"],
};

