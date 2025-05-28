module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',       // <-- el import que usas
        path: '.env',             // <-- tu fichero .env en la raíz
        safe: false,
        allowUndefined: true
      }]
    ]
  };
};
