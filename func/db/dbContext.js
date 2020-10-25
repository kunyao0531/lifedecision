var mysql = require('mysql');

var db_option = {
    host: 'localhost',
    user: 'root',
    password: '@Qazwsx123',
    database: 'germany',
    port: 3306
}


exports.dbConnect = function() {
    var conn = mysql.createConnection(db_option);
    conn.connect();
    console.log("connect to MySQL");
}

exports.dbDisconnect = function() {
    var conn = mysql.createConnection(db_option);
    conn.end();
    console.log("disconnect to MySQL");
}

exports.dbQuery = function(queryStatement) {
    var conn = mysql.createConnection(db_option);
    var rows = null;
    console.log(queryStatement);
    conn.query(queryStatement, function(err, results) {
        if (err) throw err;
        console.log("result : " + results);
        rows = results;
        return results;
    });
    return rows;
}