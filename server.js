var express = require('express');
var fs = require('fs');
var app =  express.createServer();

// Initialize main server
app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', function(req, res){
  res.render('index');
});

app.get('/files/*', function(req, res){
  console.log(req.params[0]);
  res.render('template', {blank: req.params[0]});
});

app.post('/', function(req, res){
  res.redirect('/files/' + req.body.file);
});


app.listen(8082);


