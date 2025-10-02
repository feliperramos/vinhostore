try { require('@testing-library/jest-native/extend-expect'); } catch { }

require('react-native-gesture-handler/jestSetup');

try {
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));
} catch { }

jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-native-firebase/app', () => ({
  __esModule: true,
  default: {},
  setLogLevel: jest.fn(),
  getApp: jest.fn(() => ({ options: {} })),
}));

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn((_, cb) => {
    cb(null);
    return jest.fn();
  }),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  doc: jest.fn(),
  onSnapshot: jest.fn(() => jest.fn()),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
  serverTimestamp: jest.fn(() => Date.now()),
}));

jest.mock('@react-native-firebase/messaging', () => {
  const api = {
    requestPermission: jest.fn(async () => 1),
    getToken: jest.fn(async () => 'test-token'),
    onMessage: jest.fn(() => jest.fn()),
    onNotificationOpenedApp: jest.fn(() => jest.fn()),
    getInitialNotification: jest.fn(async () => null),
    setAutoInitEnabled: jest.fn(),
    setBackgroundMessageHandler: jest.fn(),
    registerDeviceForRemoteMessages: jest.fn(),
    onTokenRefresh: jest.fn(() => jest.fn()),
  };
  return () => api;
});

jest.mock('@/components/Icon/Icon.component', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Icon: (props) => React.createElement(View, { accessibilityRole: 'image', ...props }),
  };
});

const originalWarn = console.warn;
const originalLog = console.log;

console.warn = (...args) => {
  const msg = String(args[0] ?? '');
  if (
    msg.includes('SafeAreaView has been deprecated') ||
    msg.includes('Require cycle:') ||
    msg.includes('new NativeEventEmitter') ||
    msg.includes('VirtualizedLists should never be nested')
  ) return;
  originalWarn(...args);
};

console.log = (...args) => {
  const msg = String(args[0] ?? '');
  if (msg.startsWith('[FCM]')) return;
  originalLog(...args);
};

const { cleanup } = require('@testing-library/react-native');

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.clearAllTimers();
});
