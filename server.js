var http = require('http');
var port = process.env.port || 3000;
//create a server object:
var server = http.createServer(function(req, res) {

    if (req.url == "/aboutus") {
        res.write("aboutus")
        res.end();
    } else if (req.url == "/data") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: "Hello World" }));
        res.end();
    } else {
        res.write('Hello World!'); //write a response to the client
        res.end(); //end the response
    }

})

server.listen(port); //the server object listens on port 8080