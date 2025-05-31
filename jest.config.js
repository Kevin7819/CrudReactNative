// jest.config.js
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', './jest.setup.js'],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native" +
    "|@react-native" +
    "|@react-native-community" +
    "|@react-navigation" +
    "|@expo" +
    "|expo(nent)?|expo-font|expo-asset" +
    "|@expo/vector-icons" +
    "|@unimodules|unimodules" +
    "|sentry-expo" +
    "|native-base" +
    "|firebase" +
    "|@firebase" +
    ")"
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.mjs$": "babel-jest"
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
