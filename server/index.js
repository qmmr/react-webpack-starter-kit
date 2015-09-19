import express from 'express'
import path from 'path'
import cors from 'cors'
import httpProxy from 'http-proxy'

import webpackDevServer from '../webpack/server'

const proxy = httpProxy.createProxyServer()

const publicPath = path.resolve(__dirname, '../public')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.set('env', process.env.NODE_ENV || 'development')
app.set('host', process.env.HOST || 'localhost')
app.set('port', process.env.PORT || 3000)

app.use(express.static(publicPath))
app.use(cors())

if (process.env.NODE_ENV === 'production') {
	app.get('/', function(req, res) {
		res.render('index', { title: 'react-webpack-starter-kit' })
	})
} else { // this runs ONLY in development
	webpackDevServer()

	app.all('*', function(req, res, next) {
		res.render('index', { title: 'react-webpack-starter-kit' })
		next()
	})
}

// it is important to catch all errors from the proxy or the server will crash
// An example: connecting to server when webpack is bundling
proxy.on('error', function(err) {
	console.log(`Could not connect to proxy, error: ${ err }`)
})

app.listen(app.get('port'), function() {
	console.log(`Server is listening on http://${ app.get('host')}:${ app.get('port') }`)
})
