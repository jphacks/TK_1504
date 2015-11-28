var express = require('express');
var port = 3000;
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var async = require('async');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


require('./app/googleapi.js')(app);
require('./app/googledetail.js')(app);
require('./app/apitest.js')(app);

app.get('/kamata', function(req, res){
  var detail;
  async.waterfall([
    function(callback){
      detail = require('./app/apiwaterfall.js')(req, res);
      callback(null, detail);
    },
    function(response, callback){
      res.send(response);
      callback(null, 'done');
    }
  ], function(err, result){
    if(err){
      throw err;
    }
    if(result == 'done'){
      console.log("result", result);
    }
  })
});

app.listen(port);
console.log('App listen on port ' + port);
