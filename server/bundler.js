var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('../webpack.config')

module.exports = function() {
	var bundleStart = null
	var compiler = webpack(config) // fire up webpack with our configuration
	var PORT = 8080
	var bundler

	// set the start time and log the message
	compiler.plugin('compile', function() {
		console.log('Bundling, hold your pants...')
		bundleStart = Date.now()
	})

	bundler = new WebpackDevServer(compiler, {
		// We need to tell Webpack to serve our bundled application
		// from the build path. When proxying:
		// http://localhost:3000/build -> http://localhost:8080/build
		publicPath: '/build/',
		hot: true,
		// terminal configuration
		quiet: false,
		noInfo: true,
		stats: { colors: true }
	})

	// fire the dev server and log in the terminal
	bundler.listen(PORT, 'localhost', function() {
		console.log('WebpackDevServer is listening for changes on port: ' + PORT)
	})
}
