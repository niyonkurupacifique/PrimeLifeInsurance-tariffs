var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors()); // Enable CORS for all routes

app.get('/', function (req, res) {
    var sql = require("mssql");
    // config for your database
    var config = {
        user: 'NIYONKURU',
        password: '12345',
        server: 'DESKTOP-TO2UMIT\\SQLEXPRESS', 
        database: 'Prime_insurance_DB',
        synchronize: true,
        trustServerCertificate: true,
    };
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from primeInsuranceTable', function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send(recordset);
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
