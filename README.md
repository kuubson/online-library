# 💻 js fullstack [app](https://online-library.up.railway.app), monorepo (web & [mobile](https://github.com/kuubson/online-library/tree/master/apps/native#-native-app))

| [Stack](#-stack-) | [Preview](#-app-preview) | [Notes](#-some-notes) | [Flow](#-flow) | [Packages](#-custom-local-packages) | [Docs](#-documentation) | [Tools](#-tools) | [Goals](#-future-goals) | [Scripts](#-root-scripts) | [Env](#-environment-variables) | [Tips](#-tips) |
| ----------------- | ------------------------ | --------------------- | -------------- | ----------------------------------- | ----------------------- | ---------------- | ----------------------- | ------------------------- | ------------------------------ | -------------- |

## 🔧 Stack &nbsp;[![CircleCI](https://circleci.com/gh/kuubson/online-library.svg?style=svg&circle-token=c6f9611e819c26df85c288d0c0a9edc6bbd4116d)](https://app.circleci.com/pipelines/github/kuubson/online-library)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white) ![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) ![Turborepo](https://img.shields.io/badge/Turborepo-EF4444.svg?style=for-the-badge&logo=Turborepo&logoColor=white) ![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white) ![CircleCI](https://img.shields.io/badge/circle%20ci-%23161616.svg?style=for-the-badge&logo=circleci&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

> **Note** See the [stack](https://github.com/kuubson/online-library/tree/master/apps/native#-stack-) for the mobile app

## 📺 App preview

| Home                                                                                                           | Login form                                                                                                           | Sample error                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ![home](https://user-images.githubusercontent.com/38701627/193646690-b5be0407-37a2-4693-8583-56e717c0ef16.png) | ![login form](https://user-images.githubusercontent.com/38701627/190213920-2003322f-59b3-4973-bb5c-d49a0cf424d5.png) | ![error](https://user-images.githubusercontent.com/38701627/190214063-4e03889d-dc1b-4ea0-bab2-5ec26ad92e8c.png) |

| Store                                                                                                           | Profile                                                                                                           | Book preview                                                                                                        |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| ![store](https://user-images.githubusercontent.com/38701627/190213868-82a1cba6-3738-4133-870d-9cc9fade0e2c.png) | ![profile](https://user-images.githubusercontent.com/38701627/190641482-0707fbe5-505e-4b55-8fb1-f0224b7b24bb.png) | <video src="https://user-images.githubusercontent.com/38701627/190917584-ea1c74da-2b37-4730-bf74-ff9d6e245570.mp4"> |

| Chat                                                                                                           | Cart                                                                                                           | Stripe                                                                                                         |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ![chat](https://user-images.githubusercontent.com/38701627/190213605-faccbbd6-cd74-4e44-bfe5-944cf1019e67.png) | ![cart](https://user-images.githubusercontent.com/38701627/190213811-bc6236ca-0de5-499b-9455-c434bbb144bb.png) | ![cart](https://user-images.githubusercontent.com/38701627/190213822-11bdd6ab-e4cd-40e6-87f1-805c229806be.png) |

> **Note** Preview the [mobile app](https://github.com/kuubson/online-library/tree/master/apps/native#-app-preview)

## 📄 Some notes

> **Note** A cutting-edge technologies driven 💯, fullstack, cross-plaftorm app, hosted on 📡 **Railway**

Acts as a **fake store** with possibility to chat 💬 with other users:

-  account registration, fb / credentials login
-  user support (forgot password, lost activation link)
-  store fulfilled with paid and free books
-  payments with **stripe** or **paypal**
-  push notifications to stay up to date with what other writes
-  possibility to send images / videos / files
-  searchbar for books
-  preview of books inside the profile tab
-  targets both web and mobile app users
-  UX: infinite loaders (store, chat), proper error handling, push notifications, fully responsive, jump to the last unread message (chat)

## 📊 Flow

```mermaid
graph TD

api-->turborepo

%% --------------------------

turborepo[\turborepo/]-->apps
turborepo-->lib("@online-library")

%% --------------------------

config(config)-->lib
core(core)-->lib
logic(logic)-->lib

lib-->apps((apps))

%% --------------------------

railway[\Railway/]-->db[("sequelize (sql)")]
railway-->server
db-->server

apps-->server{{server}}
apps-->client(web)
apps-->native(native)

Firebase[\Firebase/]-->native
online-library-releases-->native
CircleCI[\CircleCI/]-->online-library-releases{{online-library-releases}}

%% --------------------------

server-->api{API}

auth("auth (jwt)")-->api

express("express (swagger)")-->api

graphql("graphql (apollo)")-->api

socket("socket.io")-->api
```

> **Note** See [distribution](https://github.com/kuubson/online-library/tree/master/apps/native#-distribution) flow for the mobile app

## 📦 Custom local packages

| @online-library/config                                                                                                                                                                                | @online-library/core                                                                                                                                         | @online-library/logic                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| <ul> <li> `yup` config </li> <li> constants, urls, global types</li> <li> custom wrapper (`api.ts`) of an autogenerated `swagger.json` that exposes useful, strongly typed `API` variable </li> </ul> | <ul> <li> `redux` config </li> <li> `graphql` config </li> <li>simulated `i18` config </li> <li> shareable: styles, hooks, helpers, utils, types </li> </ul> | <ul><li> hooks for both web and mobile apps </li></ul> |

## 🛡 Documentation

> **Note** Docs are available in the development environment

| [REST API](http://localhost:3001/api-docs) (**OpenAPI**)                                                            | [GraphQL API](http://localhost:3001/graphql)                                     |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| <video src="https://user-images.githubusercontent.com/38701627/190416852-2c523abd-96ca-44ef-acbe-78c268ce72e7.mp4"> | autogenerated with a few additional comments (common **Apollo Studio Explorer**) |

## 🆒 Tools

### 🤖 Automation

-  every push to the master branch triggers the autodeployment on Railway + **CircleCI** build workflow (linting, e2e tests, new release of the mobile app that requires an approval)
-  [@trivago/prettier-plugin-sort-imports](https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports) for keeping a consistent order of imports (custom flow)
-  [graphql-codegen](https://www.the-guild.dev/graphql/codegen) for autogenerating the code (hooks & types) from gql schema & documents
-  [@graphql-tools/merge](https://www.graphql-tools.com/docs/schema-merging) for auto merging resolvers & type defs into schema (**custom wrapper** to detect duplicated resolvers)
-  [swagger-autogen](https://github.com/davibaltar/swagger-autogen) for autogenerating the **API docs** (allow skipping **YAML** hell 😈)

### 🔩 Side tools

-  [Budibase](https://budibase.com/) (low code platform) for creating a simple UI panels (perfect choice for admin panels)
-  [Mermaid](https://mermaid-js.github.io/mermaid/#/) for diagrams
-  [TS errors translator](https://ts-error-translator.vercel.app)
-  [json to ts/jsonschema](https://app.quicktype.io/?l=ts) converter
-  [@faker-js/faker](https://fakerjs.dev/guide/) for seeding db with fake data
-  [picsum.photos](https://picsum.photos) for generating random images

## 🎯 Future goals

-  [x] CRA ~> Vite
-  [ ] **test coverage** as high as possible + add e2e tests (**cypress**)
-  [ ] switch stack **graphql** + **sequelize** ~> **tRPC** + **prisma**
-  [ ] make use of **storybook.js**
-  [ ] run app in a **Docker** container
-  [ ] integrate **Sentry** for monitoring the app
-  [ ] finish setup for **i18n**
-  [ ] add **WebRTC** for video chat
-  [ ] replace errors popup with **react-toastify**
-  [ ] tweak seeding db flow

> **Note** See [goals](https://github.com/kuubson/online-library/tree/master/apps/native#-future-goals) for the mobile app

## ⌨ Root scripts

> **Note** To run locally, install proper version of nodejs (use `nvm` / see `.nvmrc`), fill `.env` (see [Environment variables](#-environment-variables) and `.env-example`), trigger `yarn install` and `yarn dev`

> **Warning** Remember to bump release tag version (`config.yml`) when pushing to the master branch othwerise CircleCI will fail

| command            | description                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| `yarn start`       | triggers `start` script in `/server` ~> runs server production build                                            |
| `yarn start:local` | triggers `start:local` script in `/server` ~> runs server production build for `CircleCI` + `Cypress` purposes  |
| `yarn dev`         | triggers `dev` pipeline ~> launches apps, bundles all packages (watchmode)                                      |
| `yarn lib:dev`     | triggers filtered `dev` pipeline ~> bundles only packages (watchmode)                                           |
| `yarn lint`        | triggers `lint` pipeline ~> ts & eslint & stylelint check through all apps and packages                         |
| `yarn test`        | triggers `test` pipeline ~> runs tests for mobile app                                                           |
| `yarn test:e2e`    | triggers `test:e2e` script in `/web` ~> runs e2e tests for web app                                              |
| `yarn cypress`     | triggers `cypress` script in `/web` ~> runs e2e tests for web app                                               |
| `yarn build`       | triggers `build` pipeline ~> build all apps, bundles all packages                                               |
| `yarn postbuild`   | triggers `yarn lib` script ~> makes sure that all packages are built on top of the newest docs                  |
| `yarn lib`         | triggers `lib:build` pipeline ~> bundles all packages                                                           |
| `yarn android`     | triggers `android` script in `/native` ~> runs the android app                                                  |
| `yarn metro`       | triggers `metro` script in `/native` ~> runs the metro server                                                   |
| `yarn server`      | triggers `dev` script in `/server` ~> runs the express server                                                   |
| `yarn docs`        | triggers filtered `docs` pipeline ~> generates the API docs (**OpenAPI**) from comments of the REST controllers |
| `yarn codegen`     | triggers `graphql codegen` ~> generates hooks & types from graphql schema                                       |
| `yarn postinstall` | triggers `yarn lib` script ~> makes sure that `build` pipeline runs without any errors                          |

## 🔎 Detailed scripts

| command            | server                                                                                                                 | web                         | each package                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------- |
| `yarn start`       | runs the server production build (serves also the web app)                                                             | ❌                          | ❌                              |
| `yarn start:local` | runs the server production build on specific port (needed for `CircleCI` + `Cypress`)                                  | ❌                          | ❌                              |
| `yarn dev`         | runs express server with `NODE_ENV` set to `development`                                                               | runs the react app          | bundles the package (watchmode) |
| `yarn lint`        | lint & ts check                                                                                                        | lint & ts & stylelint check | lint & ts check                 |
| `yarn test:e2e`    | ❌                                                                                                                     | runs e2e tests              | ❌                              |
| `yarn build`       | builds the express server & copies ([copyfiles](https://www.npmjs.com/package/copyfiles)) gql related files to `/dist` | builds the react app        | bundles the package             |
| `yarn docs`        | generates API docs (**OpenAPI**) from comments of the REST controllers                                                 | ❌                          | ❌                              |

> **Note** See [scripts](https://github.com/kuubson/online-library/tree/master/apps/native#-scripts) for the mobile app

## 🔒 Environment variables

| details                                                                                                       | server                                                                  | web                           |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------- |
| [cloudinary](https://cloudinary.com) API credentials                                                          | `CLOUDINARY_API_KEY` `CLOUDINARY_API_SECRET` `CLOUDINARY_NAME`          | ❌                            |
| PostgreSQL credentials                                                                                        | `DATABASE_HOST` `DATABASE_NAME` `DATABASE_PASSWORD` `DATABASE_USERNAME` | ❌                            |
| secret key for `jsonwebtoken`                                                                                 | `JWT_KEY`                                                               | ❌                            |
| email address for the email sender (eg. no-reply@online-library.com)                                          | `NODEMAILER_USERNAME`                                                   | ❌                            |
| SMTP provider (`nodemailer` credentials)                                                                      | `MAILJET_USER` `MAILJET_PASSWORD`                                       | ❌                            |
| [paypal](https://developer.paypal.com) API credentials                                                        | `PAYPAL_CLIENT_ID` `PAYPAL_CLIENT_SECRET`                               | ❌                            |
| `web-push` [package](<(https://www.npmjs.com/package/web-push)>) credentials (`web-push generate-vapid-keys`) | `PRIVATE_VAPID_KEY` `VITE_PUBLIC_VAPID_KEY`                             | `VITE_PUBLIC_VAPID_KEY`       |
| fb [app](https://developers.facebook.com/apps) credentials                                                    | `FACEBOOK_APP_SECRET` `VITE_FACEBOOK_APP_ID`                            | `VITE_FACEBOOK_APP_ID`        |
| [stripe](https://dashboard.stripe.com) API credentials                                                        | `STRIPE_SECRET_KEY`                                                     | `VITE_STRIPE_PUBLISHABLE_KEY` |
| set to `true` to re-autogenerate db models from existing tables (generates all methods for associations)      | `SEQUELIZE_AUTO`                                                        | ❌                            |
| set to `true` to seed db with some random books                                                               | `SEED_BOOKS`                                                            | ❌                            |
| set to `true` to seed db with a testing user                                                                  | `SEED_USER`                                                             | ❌                            |

> **Note** See [envs](https://github.com/kuubson/online-library/tree/master/apps/native#-environment-variables) for the mobile app

## 🔐 CircleCI variables (+ all envs for the `server`)

> **Note** To be able to run e2e tests, all server env variables are also required on the CircleCI

| variable                                                                               | details                                                                                                   |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`                                                                         | personal access token for Github CLI orb                                                                  |
| `RELEASE_KEYSTORE_BASE64`                                                              | release keystore converted to base64 (more [info](https://circleci.com/docs/deploy-android-applications)) |
| `RELEASE_KEYSTORE` `RELEASE_KEY_ALIAS` `RELEASE_KEY_PASSWORD` `RELEASE_STORE_PASSWORD` | keystore related details (more [info](https://circleci.com/docs/deploy-android-applications))             |

## 📙 Tips

-  #### Remember to update the `HOST` variable in `@online-library\config\src\utils\urls.ts` when changing a target domain
