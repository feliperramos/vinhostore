## Push Notifications (FCM)

Este projeto usa `@react-native-firebase/messaging`.

### Android

- Permissão `POST_NOTIFICATIONS` é pedida em runtime (Android 13+).
- `index.js` contém `setBackgroundMessageHandler` para mensagens em background.
- Teste:
  1. Rode o app em **device/emulador Android**.
  2. Copie o token do log (`[FCM] token: ...`).
  3. Firebase Console → _Cloud Messaging_ → **Send test message** → cole o token.
  4. Em **foreground**, aparece um `Alert` (via `onMessage`).
  5. Em **background**/fechado, a notificação aparece no tray (payload `notification`).

### iOS

> **Requer Apple Developer Program** (conta paga) + **APNs**. O simulador **não recebe** push.

1. Gere uma **APNs Auth Key (.p8)** no Apple Developer (Keys → “+” → marque APNs).  
   Anote **Key ID** e **Team ID**.
2. Firebase Console → _Project settings_ → _Cloud Messaging_ → **Apple app configuration** → suba a `.p8` + Key ID + Team ID.
3. Xcode (Target):
   - _Signing & Capabilities_ → adicione **Push Notifications** e **Background Modes → Remote notifications**.
   - Use **Automatic signing**.
4. Rode em **dispositivo físico**. O app chama `registerDeviceForRemoteMessages()` e `requestPermission()`.
5. Copie o token do log e envie teste pelo Console do Firebase.

> Sem APNs configurado, o iOS não vai receber push (o Android funciona normalmente). O código já está pronto; basta adicionar as credenciais conforme acima.
