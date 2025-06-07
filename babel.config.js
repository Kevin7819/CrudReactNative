// This file configures Babel for your React Native project with Expo
// Babel is the “transpiler” that converts modern code (JSX, ES6+, etc.)
// into JavaScript that can understand the device (Android, iOS).

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', { // plugin “react-native-dotenv”: allows importing environment variables
        moduleName: '@env',      
        path: '.env',             
        safe: false,
        allowUndefined: true
      }]
    ]
  };
};
