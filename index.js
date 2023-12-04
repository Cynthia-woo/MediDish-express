//import express.js
const express = require('express');

//import vercel api
const product = require('./api/product');

//define express app
const app = express();

//define port used in the project
const PORT = process.env.PORT || 5050;

//use vercel api
app.use("/api/product", product);

//listen the reaction of the port
app.listen(PORT, () => console.log(`Server is running in port http://localhost:${PORT}`))

