var keyid = "AIzaSyBxEIXyiNI3s4lDH6hMlC2JKsNGioD7iFg";

module.exports = function(app){

  app.get('/google/detail', function(req, res){

    var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + req.query.placeid + "&key=" + keyid;

    var https = require('https');

    https.get(url, function(response){
      var body = "";

      response.on('data', function(chunk){
        body += chunk;
      });
      response.on('end', function(){
        res.json(body);
      });
    });
  });
}
