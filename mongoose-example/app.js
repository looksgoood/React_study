// Load packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes');
// Define model
var Book = require('./models/book');

const app = express();

// Configure app to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure server port
const port = process.env.PORT || 8080;

// Configure router
const router = routes(app, Book);

// Run server
const server = app.listen(port, () => {
    console.log("Express server has started on port " + port);
})

// Configure mongoose

// Connect to mongodb server
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    // connected to mongodb server
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');