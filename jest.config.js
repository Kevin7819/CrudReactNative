module.exports = {
  preset: 'react-native',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },

  // List of file extensions that Jest will recognize when solving modules.
  // With this, Jest will know to look for files with these extensions when we import modules.
 "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
    "mjs"
  ],


  transformIgnorePatterns: [
  
    'node_modules/(?!(react-native|@react-native|@testing-library|firebase|@firebase)/)'
  ],
// testMatch indicates where Jest should look for test files.
  testMatch: ['<rootDir>/tests/**/*.test.(js|jsx|ts|tsx)'],

  //This way we avoid reading real variables from .env.
  moduleNameMapper: {
    '^@env$': '<rootDir>/mocks/env.js'
  },

  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};
