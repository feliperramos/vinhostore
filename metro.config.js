const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(defaultConfig, {
  resolver: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    sourceExts: ['ts', 'tsx', 'js', 'jsx', 'json'],
  },
});
