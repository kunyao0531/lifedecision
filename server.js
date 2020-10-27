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
var port = process.env.PORT || 5050;

/* var db_option = {
    host: 'localhost',
    user: 'root',
    password: '@Qazwsx123',
    database: 'germany',
    port: 3306, //access denied
} */

app.listen(port, function() {
    console.log("Node server is runing");
});

var db_option = {
    host: 'localdb',
    user: 'azure',
    password: '6#vWHD_$',
    database: 'germany',
    port: 52113
}

var conn = mysql.createConnection(db_option);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/restaurant', express.static(__dirname + '/public'))



//insert
app.post('/create', function(req, res) {
    var city = req.body.city;
    var name = req.body.name;
    var type = req.body.type;
    var address = req.body.address;

    if (city && name && type && address) {
        //restaurant duplicated validation
        var checkStatement = "select name from restaurants where name ='" + name + "' or address='" + address + "'";
        conn.query(checkStatement, function(err, count) {
            if (err) throw err;
            if (count.length >= 1) {
                res.status(200).send("data exist.");
            } else {
                var insertStatement = "insert into restaurants (name, type, address, city) values ('" + name + "','" + type + "','" + address + "','" + city + "')"
                conn.query(insertStatement, function(err, results) {
                    if (err) throw err;
                    res.status(200).send("success");
                });
            }
        })
    } else {
        res.send("all columns is mandatory");
    }
})

app.post('/getList', function(req, res) {
    conn.query("select * from restaurants", function(err, results) {
        if (err) throw err;
        res.json({ rows: results });
    })
})

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