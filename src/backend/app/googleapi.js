var keyid = "AIzaSyBxEIXyiNI3s4lDH6hMlC2JKsNGioD7iFg";

// shibuya
var lat = "35.658182";
var lng = "139.702043";

var async = require('async');

module.exports = function(app){

  app.get('/google/places', function(req, res){

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + req.query.lat + ","
      + req.query.lng + "&radius=3000&types=restaurant&language=ja&sensor=false&key=" + keyid;

    var https = require('https');
    var data;
    var totalData = [];
    var pagetoken;

    async.waterfall([
      function(callback){
        console.log("start");
        https.get(url, function(response){
          var body = "";
          response.on('data', function(chunk){
            body += chunk;
          });
          response.on('end', function(){
            totalData.push(body);
            data = JSON.parse(body);
            pagetoken = data.next_page_token;
            console.log(pagetoken);
            callback(null, pagetoken);
          });
        });
      },
      function(page,callback){
        var option = url + "&pagetoken=" + page;
        https.get(option, function(response){
          var body = "";
          response.on('data', function(chunk){
            body += chunk;
          });
          response.on('end', function(){
            totalData.push(body);
            data = JSON.parse(body);
            pagetoken = data.next_page_token;
            console.log(pagetoken);
            callback(null, pagetoken);
          });
        });
      },
      function(page, callback){
        var option = url + "&pagetoken=" + page;
        https.get(option, function(response){
          var body = "";
          response.on('data', function(chunk){
            body += chunk;
          });
          response.on('end', function(){
            totalData.push(body);
            data = JSON.parse(body);
            pagetoken = data.next_page_token;
            console.log(pagetoken);
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
        res.send(totalData);
      }
    });
  });
}
