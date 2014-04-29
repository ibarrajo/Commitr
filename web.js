var gzippo = require('gzippo');
var express = require('express');
var morgan  = require('morgan')
var app = express();

var PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(gzippo.staticGzip('' + __dirname + '/dist'));
app.get('/', function(req, res){
    res.sendfile('index.html', { root: __dirname + "/dist" } );
});

app.listen(PORT, function(){
	console.log("Listening on " + PORT);
});