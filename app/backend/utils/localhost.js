
'use strict';
const http = require('http');
const https = require('https');
const fs = require('fs');

const sslkey = fs.readFileSync('./ssl-key.pem');
const sslcert = fs.readFileSync('./ssl-cert.pem');
const options = {
  key: sslkey,
  cert: sslcert
};

//Force redirection from http to https:
const httpsRedirect = ((req, res) => {
  res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
  res.end();
});

module.exports = (app, httpsPort, httpPort) => {
 https.createServer(options, app).listen(httpsPort);
 http.createServer(httpsRedirect).listen(httpPort);
};
