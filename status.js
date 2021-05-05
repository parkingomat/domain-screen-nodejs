var http = require('http');
var https = require('https');

// test("https://stackoverfdlow.com/");

module.exports = function status(url, success, error) {
    https
        .get(url, function(res) {
            // console.log(url, res.statusCode);
            return success("::: status:success:" +res.statusCode);
        })
        .on("error", function(e) {
            // console.log(url, e.code);
            return error(e.code);
        });
}

function test(url){
    status(url, function(check){
        console.log(check); //true
    })
}
