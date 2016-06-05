var express = require('express');

var app = express();
app.use(express.static('bin'));
app.use(express.static('lib'));
// define static files

const _htmlpath = __dirname + '/bin/html/';
// define paths to static files

app.get('/', function(req, res) {
  res.sendFile(_htmlpath + 'index.html');
});
// default middleware

app.listen(3000, function() {
  console.log("started on port 3000");
});
// initialize server
