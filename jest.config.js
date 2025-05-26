module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect', 
    '<rootDir>/jest.setup.js' 
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-picker|@react-native-community|react-clone-referenced-element|expo|@expo|@unimodules|unimodules|sentry-expo|native-base|@sentry|firebase|@firebase)/)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@firebase/app$': '<rootDir>/__mocks__/firebase-app.js',
    '^firebase/app$': '<rootDir>/__mocks__/firebase-app.js',
    '^firebase/firestore$': '<rootDir>/__mocks__/firebase-firestore.js',
    '^@components/(.*)$': '<rootDir>/src/components/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/__mocks__/**',
    '!**/jest.setup.js'
  ]
};