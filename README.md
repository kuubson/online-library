# Project "online-library"

## Technologies

-   HTML, CSS, JS
-   React.js + Redux (Hooks, Styled Components, PWA, PayPal, Stripe)
-   React Native for mobile app
-   Node.js + Express (passport.js, JWT)
-   GraphQL + Apollo ("graphql" branch)
-   MySQL (ORM Sequelize)


## Description

This app is based on **fake** book database and acts as an online library where you can borrow, buy and "read" books.

Users can create accounts classically by registering with an e-mail address or log in using a Facebook account. Each user has at their disposal a list of available books that can be sorted by title or author, and from which they can choose between free or paid books. He can add free books to his account and immediately start "reading" any of them and add paid books to the cart for which he must first pay using **test** stripe or paypal environments.

The app's code is an environment where I implement and test new technologies, improve my skills and gather all good habits in it.

There is also [native version](https://github.com/toxxiczny/online-library-native) of the app written in React Native.

## Installation

Create **.env** file and fill it based on **.env-example** file, then:

### Development

```bash
npm install
```

Start backend:

```bash
npm run backend
```

Start frontend:

```bash
npm run frontend
```

Make sure to create **MySQL** database with credentials the same as in **.env** with the usage of e.g, [xampp](https://www.apachefriends.org/pl/index.html)

### Production

Build frontend:

```bash
npm run build
```

Compile & start backend:

```bash
npm run start
```

## Some screenshots

### Registration form

[![online-library-User-Registration.png](https://i.postimg.cc/GhnmZTDc/online-library-User-Registration.png)](https://postimg.cc/ThQxbwQS)

### Login form

[![online-library-User-Login.png](https://i.postimg.cc/SR9ZzvQz/online-library-User-Login.png)](https://postimg.cc/MfW0CtQW)

### Store

[![online-library-User-Store.png](https://i.postimg.cc/rsb7W4LK/online-library-User-Store.png)](https://postimg.cc/8fRygjcS)

### Cart

[![online-library-User-Cart.png](https://i.postimg.cc/RFx73V84/online-library-User-Cart.png)](https://postimg.cc/DW5JHFnM)

### Profile (reading book simulation)

[![online-library-User-Profile.png](https://i.postimg.cc/nht9Yw2G/online-library-User-Profile.png)](https://postimg.cc/ppqdPCgm)
