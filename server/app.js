var express = require('express');
var app = express();
var https = require('https');

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function (req, res) {
  var screenName = req.query.screenName;
  var count = req.query.count;
  https.get({
    hostname: 'api.twitter.com',
    path: '/1.1/statuses/user_timeline.json?screen_name=' + screenName + '&count=' + count,
    headers: {
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAJ4QhgAAAAAALfDFu06KaFURObCIE3o%2B2fY0xyw%3D3kbaUz3eYqvPzMlePyjS26eg3baxZoLacLVRBkOzexzZfYLu24'
    }
  }, function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      res.send(parsed);
    })
  }).end();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server running at http://%s:%s', host, port);
});
