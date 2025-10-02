import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// Mensagens em BACKGROUND (Android e iOS com APNs + Background Modes)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[FCM][bg] ', remoteMessage?.messageId, remoteMessage?.data);
});

if (Platform.OS === 'android') {
  // opcional: auto-init
  messaging().setAutoInitEnabled(true);
}

AppRegistry.registerComponent(appName, () => App);
