## 📦 Build process

1. Follow [steps](https://reactnative.dev/docs/signed-apk-android) to sign the app
2. cd apps/native/android
3. npx react-native bundle --platform android --dev false --entry-file apps/native/index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

4.

-  AAB: ./gradlew bundleRelease -x bundleReleaseJsAndAssets
-  APK: ./gradlew assembleRelease -x bundleReleaseJsAndAssets

5. Upload APK to Firebase App Distribution panel

## 🛬 Distribution

-  [APK](https://appdistribution.firebase.google.com/testerapps/1:718345577418:android:a2439d8d871bd72e5e6533/releases/47c0skdhcct38)
-  IPA's missing

## 📺 App preview

| Registration                                                                                                           | Profile                                                                                                           | Chat                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ![registration](https://user-images.githubusercontent.com/38701627/193342190-9e8e50ca-276f-4b8d-941d-235a6e1f9903.jpg) | ![profile](https://user-images.githubusercontent.com/38701627/193342213-08da5473-1989-4864-aba8-f28b2828bcd8.jpg) | ![chat](https://user-images.githubusercontent.com/38701627/193342195-2ecf9c94-0d74-44a8-ae97-28eb234103e0.jpg) |
