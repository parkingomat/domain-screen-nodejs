var http = require('http');
var https = require('https');

// test("https://stackoverfdlow.com/");

module.exports = function status(url, callback) {
    https
        .get(url, function(res) {
            console.log(url, res.statusCode);
            return callback(res.statusCode === 200);
        })
        .on("error", function(e) {
            console.log(url, res.statusCode);
            return callback(false);
        });
}

function test(url){
    status(url, function(check){
        console.log(check); //true
    })
}
