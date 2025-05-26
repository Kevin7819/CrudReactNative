import '@testing-library/jest-native/extend-expect';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    StyleSheet: {
      ...RN.StyleSheet,
      create: (styles) => styles,
    },
  };
});

jest.mock('@react-native-picker/picker', () => {
  const mockComponent = require('react-native/jest/mockComponent');
  return {
    Picker: mockComponent('Picker'),
    PickerItem: mockComponent('PickerItem'),
  };
});

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

jest.mock('firebase/app');
jest.mock('firebase/firestore');
