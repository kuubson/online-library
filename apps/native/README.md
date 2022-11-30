# 📱 native [app](https://online-library-application.herokuapp.com)

| [Stack](#-technologies) | [Notes](#-some-notes) | [Preview](#-app-preview) | [Distribution](#-distribution) | [Goals](#-future-goals) | [Scripts](#-scripts) | [Env](#-environment-variables) | [CircleCI](#-circleci-variables) | [Tips](#-tips) | [Web](https://github.com/kuubson/online-library#-js-fullstack-app-monorepo) |
| ----------------------- | --------------------- | ------------------------ | ------------------------------ | ----------------------- | -------------------- | ------------------------------ | -------------------------------- | -------------- | --------------------------------------------------------------------------- |

## 🔧 Technologies &nbsp;[![CircleCI](https://circleci.com/gh/kuubson/online-library.svg?style=svg&circle-token=c6f9611e819c26df85c288d0c0a9edc6bbd4116d)](https://app.circleci.com/pipelines/github/kuubson/online-library)

> **Note** Tech stack is in sync with the web app, since all the configuration and logic is shared within [custom packages](https://github.com/kuubson/online-library#-custom-packages)

> **Warning** App may behave unexpectedly on iOS due to the lack of needed development tools (macOS)

-  **react navigation**
-  **styled components** (no integration with **react-native-web** since the mobile app targets different UX than the web app)
-  **react-native-webview** for handling integration with PayPal 💲
-  **react-native-document-picker** for sending files in a chat
-  **react-native-video** for showing videos in the chat
-  **react-native-fbsdk** for FB 🔑 auth
-  **rn-fetch-blob** for downloading files from the chat
-  **react-native-splash-screen** for a custom splash screen

## 📄 Some notes

The app covers all the [features](https://github.com/kuubson/online-library#-some-notes) of the web app with some temporarily exceptions:

-  lack of the **stripe** payments
-  lack of a "sneak-peek" the books
-  lack of push notifications

> **Warning** Integration with `react-native-monorepo-tools` didn't work well (metro was throwing error[^metro-error]) so paths to node_modules, inside the native files, are prefixed with `../../` to match the monorepo root + `metro.config.js` has additional property `projectRoot`

## 📺 App preview

> **Note** Layout of the app is fully scalable thanks to the [scale](https://github.com/kuubson/online-library/blob/master/apps/native/src/styles/scale.ts) util

| Registration                                                                                                           | Store                                                                                                           | Cart                                                                                                           | Chat                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ![registration](https://user-images.githubusercontent.com/38701627/193405537-6ce8595b-ffeb-43b0-8ecf-b43b3fe66b11.jpg) | ![store](https://user-images.githubusercontent.com/38701627/193405554-312760be-7fb2-4666-952b-a5ac6c20582f.jpg) | ![cart](https://user-images.githubusercontent.com/38701627/193405578-a92c8d28-a013-4d7e-9bab-e0fc7e25fa4b.jpg) | ![chat](https://user-images.githubusercontent.com/38701627/193405592-4694c837-e706-41cf-bd5a-c709d360d4bf.jpg) |

## 🛬 Distribution

> **Note** Ready and set up 🔥 [Firebase App Distribution](https://console.firebase.google.com/project/onlinelibrary-7ca01/appdistribution/app/android:com.onlinelibrary/releases) helps with distributing the app among testers

> **Warning** The app is distributed internally (no Google Play & App Store involved) using **CircleCI**

### Every push to the master branch triggers CircleCI build workflow:

#### 🤖 Android

-  installs all dependencies
-  caches what's possible to speed up the subsequent builds
-  decodes **release keystore** from the CircleCI variable
-  creates `keystore.properties` from CircleCI [variables](#-circleci-variables) (it keeps the keystore details)
-  bundles needed assets & generates APK file
-  creates a new github release in the special repository [online-library-releases](https://github.com/kuubson/online-library-releases)[^releases-repo]

#### To build locally:

-  have the `release.keystore` at `apps/native/android/app`
-  have the filled `keystore.properties` at `apps/native/android`
-  `pnpm assets && pnpm apk`

#### 🍏 iOS

> **Note** Empty due to the lack of needed development tools (macOS)

## 🎯 Future goals

-  [ ] go **offline-first** with at least the chat
-  [ ] validate behaviour on iOS devices
-  [ ] finish setup for the iOS (packages + distribution)
-  [ ] integrate the **beta** branch with the **Firebase App Distribution** (using **CircleCI**)
-  [ ] set up rollback mechanism for releases

## ⚙ Scripts

> **Note** To run locally, have the [environment](https://reactnative.dev/docs/environment-setup) ready (see `.nvmrc` / use `nvm` to install proper version of nodejs), fill `.env` (see [Environment variables](#-environment-variables) and `.env-example`), trigger `pnpm install` and `pnpm android` or `pnpm ios`

| command           | description                                       |
| ----------------- | ------------------------------------------------- |
| `pnpm android`    | builds the android app (debug)                    |
| `pnpm ios`        | builds the ios app (debug)                        |
| `pnpm metro`      | runs bundler                                      |
| `pnpm lint`       | ts & eslint & stylelint check                     |
| `pnpm test`       | runs `jest` only once                             |
| `pnpm test:watch` | runs `jest` (watchmode)                           |
| `pnpm assets`     | generates all needed assets for the release build |
| `pnpm apk`        | builds the android app (apk release file)         |
| `pnpm aab`        | builds the android app (aab release file)         |

## 🔒 Environment variables

| variable  | details                                                 |
| --------- | ------------------------------------------------------- |
| `API_URL` | url for the express server (e.g. `http://${IPv4}:3001`) |

## 🔐 CircleCI variables

| variable                                                                               | details                                                                                                   |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`                                                                         | personal access token for Github CLI orb                                                                  |
| `RELEASE_KEYSTORE_BASE64`                                                              | release keystore converted to base64 (more [info](https://circleci.com/docs/deploy-android-applications)) |
| `RELEASE_KEYSTORE` `RELEASE_KEY_ALIAS` `RELEASE_KEY_PASSWORD` `RELEASE_STORE_PASSWORD` | keystore related details (more [info](https://circleci.com/docs/deploy-android-applications))             |

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

[^releases-repo]: Must be a separate repository, otherwise there is a risk, that the release will include the source code of the whole monorepo (when someone accidentally deletes `.gitattributes`)
[^metro-error]: Invariant Violation: Failed to call into JavaScript module method AppRegistry.runApplication() - it was caused by importing [custom packages](https://github.com/kuubson/online-library#-custom-packages) into any ts file
