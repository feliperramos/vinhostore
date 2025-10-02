import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[FCM][bg] ', remoteMessage?.messageId, remoteMessage?.data);
});

if (Platform.OS === 'android') {
  messaging().setAutoInitEnabled(true);
}

AppRegistry.registerComponent(appName, () => App);
