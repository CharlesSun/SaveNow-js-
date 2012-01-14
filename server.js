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

  fs.readFile(req.params[0] + '.txt', 'utf8', function (err, data) {
  console.log(data);
  console.log(err);
  res.render('template', {title: req.params[0], content: data});
  });
  
});

app.post('/', function(req, res){
  res.redirect('/files/' + req.body.file);
});

app.post('/files/*', function(req, res){
  fs.writeFile(req.params[0] + '.txt', req.body.document,'utf8', function (err, data) {
  res.render('template', {title: req.params[0], content: req.body.document});
  });
});

app.listen(8082);


