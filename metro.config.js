// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
// const config = {
//   // assetExts: ['tflite'],
// };

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig();
//   const {assetExts} = defaultConfig.resolver;
//   return {
//     resolver: {
//       // Add bin to assetExts
//       assetExts: [...assetExts, 'tflite'],
//     },
//   };
// })();

const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: {sourceExts, assetExts},
} = defaultConfig;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: [...assetExts, 'tflite'],
    sourceExts: [...sourceExts, 'tflite'],
    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
  },
  watchFolders: [path.resolve(__dirname, '../')],
};

module.exports = mergeConfig(defaultConfig, config);
