## 📦 Building the app

1. Update `~/.gradle/gradle.properties` or `android/gradle.properties` with the following vars ([fyi](https://reactnative.dev/docs/signed-apk-android))

```js
ORG_GRADLE_PROJECT_MYAPP_UPLOAD_STORE_FILE=onlinelibrary.keystore
ORG_GRADLE_PROJECT_MYAPP_UPLOAD_KEY_ALIAS=onlinelibrary
ORG_GRADLE_PROJECT_MYAPP_UPLOAD_STORE_PASSWORD=
ORG_GRADLE_PROJECT_MYAPP_UPLOAD_KEY_PASSWORD=
```

> **Note** prefix `ORG_GRADLE_PROJECT_` is required for CircleCI

2. `cd apps/native`
3. `yarn assets`
4. `yarn apk` or `yarn aab`
5. Upload APK to Firebase App Distribution panel

## 🛬 Distribution

-  [APK](https://appdistribution.firebase.google.com/testerapps/1:718345577418:android:a2439d8d871bd72e5e6533/releases/47c0skdhcct38)
-  IPA's missing

## 📙 Tips

### In case of the following error, delete `/dist` folder from `/apps/server/`

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

### Keystore file encryption/decryption

1. Generate key
   openssl enc -aes-256-cbc -k `<secret>` -P -md sha1
2. Encrypt:
   openssl aes-256-cbc -e -in onlinelibrary.keystore -out onlinelibrary.keystore.encrypted -k `<key>`
3. Decrypt
   openssl aes-256-cbc -d -in onlinelibrary.keystore.encrypted -k `<key>` -md md5 >> onlinelibrary.keystore
