/*
 * server/app.js
 */

'use strict';

var util = require('util');

var _ = require('lodash');
var config = require(__dirname + '/config/weekday.json');
var ultimateRequire = require(__dirname + '/lib/ultimate-require.js');
var restBus = require('restbus');
var httpRequest = require(__dirname +'/controllers/httpRequest.js');

var exec = require('child_process').exec,
    child;

// Create an app
var app = {
  config: config,
  dir: __dirname,
  servers: {}
};

// Assign app to exports
exports = module.exports = app;

app.restBus = restBus;

// Run app.servers
app.run = function () {
  restBus.listen('3000', function() {
    console.log('restbus is now listening on port 3000');
  });
  setInterval(function(){
    var options = {
      host: "localhost",
      port: 3000,
      path: '/agencies/' + app.config.agency + '/routes/' + app.config.routes[0].name + '/stops/'  + app.config.routes[0].startStop + '/predictions',
      method: "GET"
    };

    httpRequest.doRequest(options).then(function(resp){
      var response = JSON.parse(resp);
      if (response[0].values){
        var seconds = response[0].values[0].seconds;
        console.log("next bus in " + seconds + " seconds");

        setColorForSeconds(seconds);

      }
    });
  },30000);
  return restBus;
};

function setColorForSeconds(seconds){
    var r,g,b;
    if (seconds < 120){
	r = 255, g = 0, b = 0;
    }
    else if (seconds < 240){
	r = 150, g = 150, b = 0; 
    }
    else {
	r = 0, g = 0; b = 255;
    }

child = exec(app.config.startScript + '&& python ../colorific.py ' + app.config.colorificId + ' ' + r + ' ' + g + ' ' + b,
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
}

process.on('uncaughtException',function(e){
  console.log(e);
});
