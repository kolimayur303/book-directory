const express = require('express');
const bodyParser = require('body-parser');
require('./src/config/db');
var app = express();

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

// api routes
const bookRoutes = require("./src/routes/bookRouter");

app.use("/book", bookRoutes);

//listen port
app.listen(3000,() =>{
    console.log("server is running on localhost:3000");
});