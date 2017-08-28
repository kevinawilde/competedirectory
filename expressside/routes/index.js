var express = require('express');
var request = require('request');
var app = express();
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    request('http://localhost:8080/employees', function(error, response, body) {
    	console.log(body)
        let employees = JSON.parse(body);
        res.render('index', { title: 'Express', employees });
    });
});

module.exports = router;