const express = require('express');
var app = express();
const fs =require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')

app.use(function (req, res, next){
  var now = new Date().toString();
  var log = `${now}:  ${req.method} ${req.url}`;
  //console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

/*
app.use(function(req, res, next){
  res.render('main.hbs');
});
*/
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getcurrentYear', function(){
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', function(text){
  return text.toUpperCase();
})

app.get('/',function(req, res){
  res.render('home.hbs', {
    pageTitle : "It's the HOMEPAGE",
    welcomeMessage : "Welcome!!!"
    });
});

app.get('/help', function(req, res){
  res.render('help.hbs',{
    pageTitle: "It's the Help Page"
  });
});

app.get('/about', function(req, res){
  res.render('about.hbs', {
    pageTitle : 'About PAGE'  });
  });

app.get('/error',function(req, res){
  res.send("<h1>This is an ERROR</h1>");
});

app.listen(port, function(){
  console.log(`Server is up on port ${port}`);
});
