var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('./routers/user');

// var myLogger = function(req, res, next) {
//     console.log(req.url);
//     next();
// }

// app.use(myLogger);

app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use('/', express.static('public'));

app.use('/user', user);

app.listen(3000, function() {
    console.log("Example app is listening on port 3000.");
});