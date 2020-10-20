// var http = require('http');
// var port = process.env.port || 3000;

// var server = http.createServer(function(req, res) {

//     if (req.url == "/aboutus") {
//         res.write("aboutus")
//         res.end();
//     } else if (req.url == "/data") {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.write(JSON.stringify({ message: "Hello World" }));
//         res.end();
//     } else {
//         res.write('Hello World!');
//         res.end();
//     }

// })

// server.listen(port);
var express = require("express");
var app = express();

var server = app.listen(5050, function() {
    console.log("Node server is runing");
});

app.post('/create-new-question', function(req, res) {
    var question = req.body.question;
    var answer = req.body.answer;

    res.send('Q: ' + question + '<br> A: ' + answer);
})

app.get('/', function(req, res) {
    res.send("<html><body><h1>Hello, world</h1></body></html>")
})