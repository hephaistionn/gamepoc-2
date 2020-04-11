const app = require('express')();
const express = require('express');
const http = require('http');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname + '/views'));

app.use(express.urlencoded());

app.use('/', express.static(path.normalize('.dist')));
app.use('/assets', express.static(path.normalize('assets')));
app.get('/', (req, res) => {
  res.render('index.ejs');
});

http.createServer(app).listen(process.env.PORT || 3000, function () {
  console.info("[Express] server listening on port " + process.env.PORT || 3000);
});
