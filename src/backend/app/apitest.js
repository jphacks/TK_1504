var async = require('async');

module.exports = function(app){

  var url = "http://localhost:3000"
  var option1 = url + "/google/places?";
  var option2 = url + "/google/detail?placeid=";

  var chooseone = "";

  var http = require('http');

  app.get('/apitest', function(req, res){

    async.waterfall([
      function(callback){
        var option = option1
          + "lat=" + req.query.lat
          + "&lng=" + req.query.lng
          + "&type=" + req.query.type;

        console.log("start");
        http.get(option, function(response){
          var body = "";
          response.on('data', function(chunk){
            body += chunk;
          });
          response.on('end', function(){
            var gatya = require('../kamata-gatya.js')(body);
            console.log("gatya", gatya);
            callback(null, gatya);
          });
        });
      },
      function(placeid, callback){
        var option = option2 + placeid;
        http.get(option, function(response){
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
      console.log("result", result);
      if(result == 'done'){
        res.send(chooseone);
      }
    });
  });
}
