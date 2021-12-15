'use strict';

module.exports = (app, port, httpsPort) => {
	const https = require('https');
	const fs = require('fs');

	const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
	const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
	const options = {
	  key: sslkey,
	  cert: sslcert
	};
	app.enable('trust proxy');
	app.use ((req, res, next) => {
	  if (req.secure) {
		// request was via https, so do no special handling
		next();
	  } else {
		// if express app run under proxy with sub path URL
		// e.g. http://www.myserver.com/app/
		// then, in your .env, set PROXY_PASS=/app
		// Adapt to your proxy settings!
		const proxypath = process.env.PROXY_PASS || ''
		// request was via http, so redirect to https
		res.redirect(301, `https://${req.headers.host}${proxypath}${req.url}`);
	  }
	});
	app.listen(port);
	https.createServer(options, app).listen(httpsPort);
};
