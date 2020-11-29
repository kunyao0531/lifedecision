var express = require("express");
var app = express();
var mysql = require("mysql");
var port = process.env.PORT || 5050;

var db_option = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'germany',
    port: 3306, //access denied
} 
console.info("yahsin");
console.info("Sinping");
console.info("Alice!!");
console.info("Gooood job.");

app.listen(port, function() {
    console.log("Node server is runing");
});

// var db_option = {
//     host: '127.0.0.1',
//     user: 'azure',
//     password: '6#vWHD_$',
//     database: 'germany',
//     port: 52113
// }

var conn = mysql.createConnection(db_option);



//index


app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/alice.html");
})