# Vinhos Store — React Native + Firebase

Aplicativo do desafio técnico **React Native + Firebase**.

- **Auth (email/senha)** com React Native Firebase (API modular)
- **Lista de produtos** da Fake Store API
- **Favoritos** salvos por usuário no **Firestore**
- **Tela de Favoritos**
- **Design tokens** + **Tema** (System / Light / Dark) — navegação tematizada
- **Carrinho** (estado local) + **modal de detalhes** do produto
- **Push Notifications (FCM)**: Android pronto; iOS depende de **APNs** (documentado)

---

## 📱 Screens

- Login / Cadastro (Firebase Auth)
- Produtos (lista, favoritos, adicionar ao carrinho)
- Modal de detalhes do produto
- Favoritos (lidos do Firestore)
- Carrinho
- Configurações (tema: system / light / dark)

---

## 🚀 Rodando o projeto

### 1) Clonar & instalar
```bash
yarn
```

### 2) Firebase

- Crie um projeto no [Firebase Console] e adicione apps **iOS** e **Android** com o **mesmo Bundle ID/ApplicationId** do projeto.
- Em **Authentication → Sign-in method**, habilite **Email/Password**.
- Em **Cloud Firestore → Rules**, cole as regras abaixo (salve e publique).
- Coloque os arquivos de configuração:
  - iOS: `ios/GoogleService-Info.plist`
  - Android: `android/app/google-services.json`

**Regras do Firestore**

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /users/{uid}/favorites/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

### 3) iOS
```bash
cd ios && pod install && cd ..
yarn ios
```
> Obs.: se o Xcode reclamar de cache, apague `DerivedData` e rode novamente.

### 4) Android
```bash
yarn android
```

---

## 🔔 Push Notifications (FCM)

Este projeto usa `@react-native-firebase/messaging`.

### Android
- Permissão **POST_NOTIFICATIONS** é solicitada automaticamente no Android 13+.
- Em **foreground**, as mensagens aparecem via `Alert` (hook `onMessage`).
- Para testar: copie o token do log (`[FCM] token:`) e envie uma **Test Message** no Firebase Console.

### iOS
> Requer conta **Apple Developer** e **APNs** configurado. Sem APNs, iOS **não recebe push** (simulador também não).

Passos:
1. Apple Developer → **Keys** → “+” → marque **APNs** → gere a **Auth Key (.p8)**; anote **Key ID** e **Team ID**.
2. Firebase Console → **Project settings → Cloud Messaging → Apple app configuration** → suba a `.p8` + Key ID + Team ID.
3. Xcode (Target): **Push Notifications** + **Background Modes → Remote notifications**.
4. Rode em **dispositivo físico**; o app chamará `registerDeviceForRemoteMessages()` e `requestPermission()`.

---

## 🧩 Decisões Técnicas

- **RNFirebase modular**: `getAuth`, `onAuthStateChanged`, `getFirestore`, etc. — evita namespaces deprecados.
- **Estrutura**: `providers/` (Auth/Theme), `context/` (Cart), `hooks/` (favorites), `screens/`, `components/`, `api/`.
- **Favoritos**: `users/{uid}/favorites/{productId}` com snapshot de dados → tela de favoritos independe da API externa.
- **Tema**: tokens (`spacing`, `radius`, `font`, `colors`) + `ThemeProvider` (system/light/dark persistido).
- **Qualidade**: ESLint + Prettier + Jest + CI (GitHub Actions).

---

## 🧪 Scripts úteis

```json
{
  "scripts": {
    "start": "react-native start",
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "lint": "eslint . --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "test": "jest --passWithNoTests",
    "ci": "yarn lint && yarn typecheck && yarn test"
  }
}
```

### Dependências de desenvolvimento sugeridas
```bash
yarn add -D eslint @react-native-community/eslint-config \
  @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-plugin-import eslint-plugin-react-hooks \
  prettier jest @types/jest react-test-renderer
```

---

## ✅ Checagem final

- [x] Auth (email/senha) funcionando
- [x] Lista de produtos (Fake Store API)
- [x] Favoritar/desfavoritar no Firestore
- [x] Tela de Favoritos
- [x] Tema system/light/dark (UI + navegação)
- [x] Modal de detalhes + Carrinho
- [x] Push Android; iOS documentado (APNs)
- [x] README com passos de setup
- [x] Scripts de lint/typecheck/test
```

