const port = process.env.PORT || 3001;
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, console.log(`Server started at port ${port}`));