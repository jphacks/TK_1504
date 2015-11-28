var async = require('async');

module.exports = function(app){

  var url = "http://192.168.33.10:3000"
  var option1 = url + "/google/places?lat=35.658182&lng=139.702043";
  var option2 = url + "/google/detail?placeid=";

  var chooseone = "";

  var http = require('http');

  app.get('/apitest', function(req, res){

    async.waterfall([
      function(callback){
        console.log("start");
        http.get(option1,function(response){
          var body = "";
          response.on('data', function(chunk){
            body += chunk;
          });
          response.on('end', function(){
            var gatya = require('../kamata-gatya.js')(body);
            console.log(gatya);
            callback(null, gatya);
          });
        });
      },
      function(placeid, callback){
        option2 = option2 + placeid;
        http.get(option2, function(response){
          var body = "";
          response.on('data', function(chunk){
            body += chunk;
          });
          response.on('end', function(){
            chooseone = require('../kamata-json_return.js')(body);
            callback(null, 'done');
          });
        });
      }
    ], function(err, result){
      if(err){
          throw err;
      }
      console.log(result);
      if(result == 'done'){
        res.send(chooseone);
      }
    });
  });
}
