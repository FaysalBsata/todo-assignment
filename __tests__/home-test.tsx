import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

test('renders correctly', () => {
  jest.mock(
    '@react-native-async-storage/async-storage',
    () => mockAsyncStorage,
  );
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
