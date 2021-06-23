/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SignUpScreen from '../src/screen/SignUpScreen';
jest.useFakeTimers();

it('renders correctly', () => {
  renderer.create(<SignUpScreen />);
});
