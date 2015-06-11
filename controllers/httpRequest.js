"use strict";


var http = require('http');
var Promise = require('mpromise');


function doRequest(options){
    var promise = new Promise;
    http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            promise.resolve(null,chunk);
        });
    }).end();
    return promise;
}
exports = module.exports = {
    doRequest : doRequest
};

