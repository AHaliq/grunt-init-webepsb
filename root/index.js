var express = require('express');

var app = express();
app.use(express.static('bin'));
app.use(express.static('lib'));
// define static files

app.set('port', (process.env.PORT || 5000));

const _htmlpath = __dirname + '/bin/html/';
// define paths to static files

app.get('/', function(req, res) {
  res.sendFile(_htmlpath + 'index.html');
});
// default middleware

app.listen(app.get('port'), function() {
  console.log("started on port " + app.get('port'));
});
// initialize server
