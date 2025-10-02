// src/notifications/push.ts
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export async function initPush() {
  try {
    if (Platform.OS === 'android' && Number(Platform.Version) >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
    }

    const authStatus = await messaging().requestPermission();
    console.log('[FCM] permission status:', authStatus);

    const token = await messaging().getToken();
    console.log('[FCM] token:', token);

    const unsubMsg = messaging().onMessage(async msg => {
      console.log('[FCM][fg]', msg.messageId, msg.notification);
      Alert.alert(
        msg.notification?.title ?? 'Mensagem',
        msg.notification?.body ?? JSON.stringify(msg.data),
      );
    });

    const unsubOpen = messaging().onNotificationOpenedApp(msg => {
      console.log('[FCM] opened from background:', msg?.messageId);
    });

    const initMsg = await messaging().getInitialNotification();
    if (initMsg) console.log('[FCM] opened from quit:', initMsg.messageId);

    const unsubToken = messaging().onTokenRefresh(newToken => {
      console.log('[FCM] token refresh:', newToken);
    });

    return () => {
      unsubMsg();
      unsubOpen();
      unsubToken();
    };
  } catch (e) {
    console.log('[FCM] init error', e);
  }
}
