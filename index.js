// index.js
const http = require('http'); // https
const express = require('express');

const config = require('./config');

var fs = require('fs')
var https = require('https')
const options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.cert')
}

const app = express();

// == create application seerver on https
app.httpsServer = https.createServer(options, app)

const routes = require('./routes');

// api routes v1
app.use('/v1', routes);

// static routes
app.use(express.static(__dirname + '/static'));

// errors handling middleware
// Обработчик ошибок должен быть последней функцией, добавленной с помощью app.use.
// Обработчик ошибок принимает коллбек next. Он может использоваться для объединения нескольких обработчиков ошибок.
app.use((err, request, response, next) => {
    // логирование ошибки, пока просто console.log
    console.log(err.toString())
    response.status(500).send(`Something broke! ${err.toString()}`)
})

// == create redirect server on http
// ref: https://stackoverflow.com/questions/22453782/nodejs-http-and-https-over-same-port/23975955#23975955
app.httpRedirect = http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host']
      .replace(`:${config.httpPort}`, `:${config.httpsPort}`) + req.url });
    res.end();
})

// == make servers listen
const httpsServer = app.httpsServer.listen(config.httpsPort, (err) => {
  if (err) {
    return console.log('https: something bad happened', err)
  }
  console.log(`https server is listening on port ${app.httpsServer.address().port}`)
});

const httpRedirect = app.httpRedirect.listen(config.httpPort, (err) => {
  if (err) {
    return console.log('http: something bad happened', err)
  }
  console.log(`http redirect server is listening on port ${config.httpPort}`)
});

module.exports = app; // run on http://localhost:3080