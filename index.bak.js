// index.js
const http = require('http'); // https
const express = require('express');

var fs = require('fs')
var https = require('https')
const options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.cert')
}

const app = express();
app.server = http.createServer(app);
// http.createServer(app).listen(80);
// https.createServer(options, app).listen(443);

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

const server = app.server.listen(3003, (err) => {
  if (err) {
    return console.log('http: something bad happened', err)
  }
  console.log(`http server is listening on port ${app.server.address().port}`)
});

const httpsServer = app.httpsServer.listen(3443, (err) => {
  if (err) {
    return console.log('https: something bad happened', err)
  }
  console.log(`https server is listening on port ${app.httpsServer.address().port}`)
});


module.exports = app;