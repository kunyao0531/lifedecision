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
var mysql = require("mysql");
var db = require('./func/db/dbcontext.js');

var db_option = {
    host: 'localhost',
    user: 'root',
    password: '@Qazwsx123',
    database: 'germany',
    port: 3306, //access denied
}

var conn = mysql.createConnection(db_option);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/restaurant', express.static(__dirname + '/public'))

var server = app.listen(5050, function() {
    console.log("Node server is runing");
    db.dbConnect();
    db.dbDisconnect();
});

//insert
app.post('/create', function(req, res) {
        var city = req.body.city;
        var name = req.body.name;
        var type = req.body.type;
        var address = req.body.address;

        if (city && name && type && address) {
            var insertStatement = "insert into restaurants (name, type, address, city) values ('" + name + "','" + type + "','" + address + "','" + city + "')"
            conn.query(insertStatement, function(err, results) {
                if (err) throw err;
            });

        } else {
            res.send("all columns is mandatory");
        }

    })
    //get list
app.post('/getList', function(req, res) {
    conn.query("select * from restaurants", function(err, results) {
        if (err) throw err;
        console.log(results);
        res.json({ rows: results });
    })
})

// delete restaurent
//app.get('/deleteRestaurant/:id', function(req, res) {
//    var id = req.params.id;
//    conn.query("DELETE FROM restaurants where id=" + id);
//    res.sendFile(__dirname + "/public/index.html");
//})
app.post('/remove', function(req, res) {
    var id = req.body.id;
    conn.query("DELETE FROM restaurants where id=" + id, function(err, results) {
        if (err) throw err;
        res.sendStatus(200);
    });
})

//index
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
})