# Project "online-library"

## Technologies

-  HTML, CSS, JS, TS
-  React.js + Redux (Hooks, Styled Components, PWA, Web Push Notifications, PayPal, Stripe)
-  GraphQL + Apollo
-  Node.js + Express (passport.js, JWT, socket.io, multer, cloudinary)
-  PostgreSQL (ORM Sequelize)
-  React Native ([online-library-native](https://github.com/toxxiczny/online-library-native))

## Description

This app is based on **fake** book database and acts as an online library where you can borrow, buy and "read" books.

Users can create accounts classically by registering with an e-mail address or log in using a Facebook account. Each user has at their disposal a list of available books that can be sorted by title or author, and from which they can choose between free or paid books. He can add free books to his account and immediately start "reading" any of them and add paid books to the cart for which he must first pay using **test** stripe or paypal environments.

Users have also a chat for discussing about best books and authors or for talking to each other with possibility of sending images, videos or files.

The app's code is an environment where I implement and test new technologies, improve my skills and gather all good habits in it.

There is also [native version](https://github.com/toxxiczny/online-library-native) of the app written in React Native.

## Installation

Create **.env** file and fill it based on **.env-example** file, then:

### Development

#### Front-end:

Install dependencies on the root level (project uses **npm workspaces**)

```bash
nvm use && npm install
```

#### Front-end:

```bash
cd ./client && npm start
```

#### Back-end:

```bash
cd ./server && npm start
```

#### TIPS:

-  Make sure to setup **PostgreSQL** database with credentials the same as in **.env**. Can be different db, just adjust dialect settings inside the **server/config/db.ts**
-  When describing API with **swagger**, add the following property to the **nodemon.json**:

```bash
"exec": "npm run docs"
```

## Some screenshots

### Registration form

[![online-library-User-Registration.png](https://i.postimg.cc/GhnmZTDc/online-library-User-Registration.png)](https://postimg.cc/ThQxbwQS)

### Login form

[![online-library-User-Login.png](https://i.postimg.cc/SR9ZzvQz/online-library-User-Login.png)](https://postimg.cc/MfW0CtQW)

### Store

[![online-library-User-Store.png](https://i.postimg.cc/tJwFxdhW/online-library-User-Store.png)](https://postimg.cc/V09SyCZk)

### Cart

[![online-library-User-Cart.png](https://i.postimg.cc/q7J6gD9W/online-library-User-Cart.png)](https://postimg.cc/qNFv5wBG)

### Profile (reading book simulation)

https://user-images.githubusercontent.com/38701627/148210183-97434604-9cd8-4969-b3a0-5cfd083f98ec.mp4

### Chat

[![online-library-User-Chat.png](https://i.postimg.cc/7YpGDHf9/online-library-User-Chat.png)](https://postimg.cc/PPQrQkbv)
