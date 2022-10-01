# 📱 native app

| [Stack](#-technologies) | [Notes](#-some-notes) | [Preview](#-app-preview) | [Goals](#-future-goals) | [Scripts](#-scripts) | [Env](#-environment-variables) | [Builds](#-building-process) | [Distribution](#-distribution) | [Tips](#-tips) | [Web]() |
| ----------------------- | --------------------- | ------------------------ | ----------------------- | -------------------- | ------------------------------ | ---------------------------- | ------------------------------ | -------------- | ------- |

## 🔧 Technologies

> **Note** Tech stack is in sync with the web app, since all the configuration and logic is shared within [custom packages](https://github.com/kuubson/online-library#-custom-packages)

-  **react navigation**
-  **styled components** (no integration with **react-native-web** since native targets different UX than web)
-  **react-native-webview** for handling integration with PayPal 💲
-  **react-native-document-picker** for sending files in chat
-  **react-native-video** for showing videos in chat
-  **react-native-fbsdk** for FB 🔑 auth
-  **rn-fetch-blob** for downloading files from chat
-  **react-native-splash-screen** for custom splash screen
-  **CircleCI** + 🔥 **Firebase App Distribution** for distributing the app

## 📄 Some notes

> **Warning** App may behave unexpectedly on iOS due to the lack of needed development tools (macOS)

Covers all the [features](https://github.com/kuubson/online-library#-some-notes) of the web app with some temporarily exceptions:

-  lack of **stripe** payments
-  lack of "sneak-peek" the books
-  lack of push notifications

## 📺 App preview

> **Note** Layout of the app is fully scalable thanks to the [scale](https://github.com/kuubson/online-library/blob/master/apps/native/src/styles/scale.ts) util

| Registration                                                                                                           | Store                                                                                                           | Cart                                                                                                           | Chat                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ![registration](https://user-images.githubusercontent.com/38701627/193405537-6ce8595b-ffeb-43b0-8ecf-b43b3fe66b11.jpg) | ![store](https://user-images.githubusercontent.com/38701627/193405554-312760be-7fb2-4666-952b-a5ac6c20582f.jpg) | ![cart](https://user-images.githubusercontent.com/38701627/193405578-a92c8d28-a013-4d7e-9bab-e0fc7e25fa4b.jpg) | ![chat](https://user-images.githubusercontent.com/38701627/193405592-4694c837-e706-41cf-bd5a-c709d360d4bf.jpg) |

## 🎯 Future goals

-  go **offline-first** with at least chat
-  validate behaviour on iOS devices
-  finish setup for the iOS (packages + distribution)

## ⚙ Scripts

> **Note** To run locally, have the [environment](https://reactnative.dev/docs/environment-setup) ready (see `.nvmrc` to install proper version of nodejs), fill `.env` (see [Environment variables](#-environment-variables) and `.env-example`), trigger `yarn install` and `yarn android` or `yarn ios`

| command           | description                                       |
| ----------------- | ------------------------------------------------- |
| `yarn android`    | builds android app (debug)                        |
| `yarn ios`        | builds ios app (debug)                            |
| `yarn metro`      | runs bundler                                      |
| `yarn lint`       | ts & eslint & stylelint check                     |
| `yarn test`       | runs `jest` only once                             |
| `yarn test:watch` | runs `jest` (watchmode)                           |
| `yarn assets`     | generates all needed assets for the release build |
| `yarn apk`        | build android app (release apk file)              |
| `yarn aab`        | build android app (release aab file)              |

> **Warning** Integration with `react-native-monorepo-tools` didn't work well (metro throwed errors [see the note]()) so paths to node_modules, inside the native files, are prefixed with `../../` to match the root + `metro.config.js` has additional property `projectRoot`

## 🔒 Environment variables

| variable  | details                                                 |
| --------- | ------------------------------------------------------- |
| `API_URL` | url for the express server (e.g. `http://${IPv4}:3001`) |

## 📦 Building process

### 🤖 Android

1. Fill `~/.gradle/gradle.properties` or `android/gradle.properties` with the following envs ([more info](https://reactnative.dev/docs/signed-apk-android))

> **Note** `ORG_GRADLE_PROJECT_` prefix is required for CircleCI

```js
ORG_GRADLE_PROJECT_MYAPP_UPLOAD_STORE_FILE=onlinelibrary.keystore
ORG_GRADLE_PROJECT_MYAPP_UPLOAD_KEY_ALIAS=onlinelibrary
ORG_GRADLE_PROJECT_MYAPP_UPLOAD_STORE_PASSWORD=
ORG_GRADLE_PROJECT_MYAPP_UPLOAD_KEY_PASSWORD=
```

2. `cd apps/native`
3. `yarn assets`
4. `cd android`
5. `yarn apk` or `yarn aab`
6. Upload apk file to the [Firebase](https://console.firebase.google.com/project/onlinelibrary-7ca01/appdistribution/app/android:com.onlinelibrary/releases) panel

> **Note** Dealing with the keystore:

1. Generate key
   `openssl enc -aes-256-cbc -k <SECRET HERE> -P -md sha1`
2. Encrypt:
   `openssl aes-256-cbc -e -in onlinelibrary.keystore -out onlinelibrary.keystore.encrypted -k <KEY HERE>`
3. Decrypt
   `openssl aes-256-cbc -d -in onlinelibrary.keystore.encrypted -k <KEY HERE> -md md5 >> onlinelibrary.keystore`

### 🍏 iOS

> **Note** Empty due to the lack of needed development tools (macOS)

## 🛬 Distribution

-  [APK](https://appdistribution.firebase.google.com/testerapps/1:718345577418:android:a2439d8d871bd72e5e6533/releases/47c0skdhcct38)
-  IPA (missing)

## 📙 Tips

#### In case of the following error, delete `/dist` folder from `/apps/server/`

```
metro-file-map: Haste module naming collision: @online-library/server
  The following files share their name; please adjust your hasteImpl:
    * <rootDir>\apps\server\package.json
    * <rootDir>\apps\server\dist\package.json
{
    mockPath1: 'apps\\server\\package.json',
    mockPath2: 'apps\\server\\dist\\package.json'
}
error Duplicated files or mocks. Please check the console for more info.
```
