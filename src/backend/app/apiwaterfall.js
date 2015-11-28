var async = require('async');
var https = require('https');

module.exports = function(req, res){

  var keyid = "AIzaSyBxEIXyiNI3s4lDH6hMlC2JKsNGioD7iFg";

  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + req.query.lat + ","
    + req.query.lng + "&radius=3000&types=" + req.query.type + "&language=ja&sensor=false&key=" + keyid;

  var detail;

  async.waterfall([
    function(callback){
      https.get(url, function(response){
        var body = "";
        response.on('data', function(chunk){
          body += chunk;
        });
        response.on('end', function(){
          console.log(body);
          var capsule = require('../kamata-gatya.js')(body);
          callback(null, capsule);
        });
      });
    },
    function(placeid, callback){
      https.get(url, function(response){
        var body = "";
        response.on('data', function(chunk){
          body += chunk;
        });
        response.on('end', function(){
          detail = require('../kamata-json_return.js')(body);
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
      return detail;
    }
  });
}
