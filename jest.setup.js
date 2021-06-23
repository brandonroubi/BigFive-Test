//import * as ReactNative from 'react-native';
//import Geolocation from 'react-native-geolocation-service';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-geolocation-service');
jest.mock('rn-material-ui-textfield');
jest.mock('react-native-button');
jest.mock('rn-material-ui-textfield');
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

