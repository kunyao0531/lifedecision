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
var option = require("./db/dbOption");

console.info(option.db_option().host);

var db_option = {
    host: option.db_option().host,
    user: option.db_option().user,
    password: option.db_option().password,
    database: option.db_option().database,
    port: 3306
}

app.listen(port, function() {
    console.log("Node server is runing");
});

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
        //restaaurant duplicated validation
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

//spt
app.get('/spt', function(req, res) {
    res.sendFile(__dirname + "/public/spt.html");
})

//Anna
app.get('/anna', function(req, res) {
    res.sendFile(__dirname + "/public/anna/index.html");
})

app.get('/anna/index', function(req, res) {
    res.sendFile(__dirname + "/public/anna/index.html");
})

app.get('/anna/create_article', function(req, res) {
    res.sendFile(__dirname + "/public/anna/create_article.html");
})

//create article after clicking create button 到後端，把資料放到mysql中
app.post('/anna/create', function(req, res) {
    var title = req.body.title;
    var hashtag = req.body.hashtag;
    var date = req.body.date;
    var country = req.body.country;
    var text = req.body.text;

    console.log(title + " , " + hashtag + " , " + country + " , " + date + " , " + text)
    if (title && hashtag && country && date && text) {
        //article duplicated validation
        var checkStatement = "select title from anna_goes_around where title ='" + title + "'";
        conn.query(checkStatement, function(err, count) {
            if (err) throw err;
            if (count.length >= 1) {
                res.status(200).send("data exist.");
            } else {
                var insertStatement = "insert into anna_goes_around (title, hashtag, country, date, article) values ('" + title + "','" + hashtag + "','" + country + "','" + date + "','" + text + "')"
                console.log(insertStatement);
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

//NEW create label after clicking create button 到後端，把資料放到mysql中
app.post('/anna/createLabel', function(req, res) {
    var label_chi = req.body.label_chi;
    var label_eng = req.body.label_eng;
    var category = req.body.category;

    console.log(label_chi + " , " + label_eng + " , " + category)
    if (label_chi && label_eng && category) {

        //article duplicated validation
        var checkStatement = "select label_chi, label_eng from label where label_chi ='" + label_chi + "' and label_eng ='" + label_eng + "'";
        conn.query(checkStatement, function(err, count) {
            if (err) throw err;
            if (count.length >= 1) {
                res.status(200).send("data exist.");
            } else {
                var insertStatement = "insert into label (label_chi, label_eng, category) values ('" + label_chi + "','" + label_eng + "','" + category + "')"
                console.log(insertStatement);
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

app.post('/getArticle', function(req, res) {
    conn.query("select * from anna_goes_around", function(err, results) {
        if (err) throw err;
        res.json({ data: results });
    })
})

//NEW label
app.post('/getLabel', function(req, res) {
    conn.query("select * from label", function(err, results) {
        if (err) throw err;
        res.json({ rows: results });
    })
})

app.post('/removeArticle', function(req, res) {
    var id = req.body.id;
    conn.query("DELETE FROM anna_goes_around where id=" + id, function(err, results) {
        if (err) throw err;
        res.sendStatus(200);
    });
})

//NEW delet label
app.post('/removeLabel', function(req, res) {
    var id = req.body.id;
    conn.query("DELETE FROM label where id=" + id, function(err, results) {
        if (err) throw err;
        res.sendStatus(200);
    });
})






// Alice starts from here

app.get('/alice', function(req, res) {
    res.sendFile(__dirname + "/public/alice.html");
})

app.post('/alice/getClinicList', function(req, res) {
    conn.query("select * from clinic", function(err, results) {
        if (err) throw err;
        res.json({ rows: results });
    })
})

app.post('/alice/getSearchedResult', function(req, res) {
    var searchClinic = req.body.searchClinic;
    var searchDB = "select * from clinic WHERE clinicName LIKE '%" + searchClinic + "%'";

    conn.query(searchDB, function(err, results) {
        if (err) throw err;
        if (results.length === 0) {
            res.status(200).send("no result.");

        } else { res.json({ rows: results }); }

    })


})




app.post('/alice/removeClinic', function(req, res) {
    var id = req.body.id;
    conn.query("DELETE FROM clinic where id=" + id, function(err, results) {
        if (err) throw err;
        res.sendStatus(200);
    });
})


app.post('/alice/createClinic', function(req, res) {
    var clinicName = req.body.clinicName;
    var doctorName = req.body.doctorName;
    var speciality = req.body.speciality;
    var addressStreet = req.body.addressStreet;
    var addressNumber = req.body.addressNumber;
    var addressPoscal = req.body.addressPoscal;
    var city = req.body.city;

    var languageEn = req.body.languageEn;
    var languageCn = req.body.languageCn;


    if (clinicName && doctorName && speciality && addressStreet && addressNumber && addressPoscal && city && languageEn && languageCn) {
        //restaurant duplicated validation
        var checkStatement = "select clinicName from clinic where clinicName ='" + clinicName + "' or doctorName='" + doctorName + "'";
        conn.query(checkStatement, function(err, count) {
            if (err) throw err;
            if (count.length >= 1) {
                res.status(200).send("data exist.");
            } else {
                var insertStatement = "insert into clinic (clinicName, doctorName, speciality, addressStreet, addressNumber, addressPoscal, city, languageEn ,languageCn ) values ('" + clinicName + "','" + doctorName + "','" + speciality + "','" + addressStreet + "','" + addressNumber + "','" + addressPoscal + "','" + city + "','" + languageEn + "','" + languageCn + "')"

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