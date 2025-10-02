/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  resolver: 'react-native/jest/resolver',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-svg|@react-navigation|react-native-gesture-handler)/)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(png|jpe?g|gif|webp|bmp)$': '<rootDir>/__mocks__/assetTransformer.js',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['react-native-gesture-handler/jestSetup'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
