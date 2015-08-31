import express from 'express'
import path from 'path'
import cors from 'cors'
import httpProxy from 'http-proxy'
import { bundler } from './bundler'

const proxy = httpProxy.createProxyServer()
const app = express()
const publicPath = path.resolve(__dirname, '..', 'public')
const isProduction = process.env.NODE_ENV === 'production'
const PORT = isProduction ? 8081 : 3000

app.use(express.static(publicPath))
app.use(cors())

// this is run ONLY in development
if (!isProduction) {
	console.log('\nRemember about DX...\n')
	bundler()

	app.all('*', function(req, res) {
		proxy.web(req, res, { target: 'http://localhost:8080' })
	})
}

// it is important to catch all errors from the proxy or the server will crash
// An example: connecting to server when webpack is bundling
proxy.on('error', function(err) {
	console.log(`Could not connect to proxy, error: ${ err }`)
})

app.listen(PORT, function() {
	console.log(`Server is listening on port: ${ PORT }`)
})
