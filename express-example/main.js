var express = require('express');
var app = express();
var user = require('./routers/user'); 

app.get('/', function(req, res) {
    res.send("Hello World");
});

app.use('/user', user);

app.listen(3000, function() {
    console.log("Example app is listening on port 3000.");
});