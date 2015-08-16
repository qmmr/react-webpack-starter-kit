var express = require('express')
var path = require('path')
var httpProxy = require('http-proxy')

var proxy = httpProxy.createProxyServer()
var app = express()

var isProduction = process.env.NODE_ENV === 'production'
var port = isProduction ? 8080 : 3000
var publicPath = path.resolve(__dirname, 'public')

var bundle

app.use(express.static(publicPath))

// this is run ONLY in development
if (!isProduction) {
	console.log('DEVELOPMENT...')
	bundle = require('./server/bundler')()

	app.all('/build/*', function(req, res) {
		proxy.web(req, res, { target: 'http://localhost:8080' })
	})
}

// it is important to catch all errors from the proxy or the server will crash
// An example: connecting to server when webpack is bundling
proxy.on('error', function(e) {
	console.log('Could not connect to proxy, error: ', e)
})

app.listen(port, function() {
	console.log('Server is listening on port:' + port)
})
