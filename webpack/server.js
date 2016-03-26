import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
// import ProgressPlugin from 'webpack/lib/ProgressPlugin'
import config from './config.dev.babel'

const HOST = process.env.HOST || 'localhost'
const PORT = 8080

const compileTime = function(start) {
	const end = Date.now()
	const finish = (end - start) / 1000
	console.log(`\nDone!\n\nCompile time: ${ finish }s\n`)
}

const options = {
	// We need to tell Webpack to serve our bundled application from the build path.
	// When proxying: http://localhost:3000 -> http://localhost:8080/build
	publicPath: config.output.publicPath,
	// Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.
	hot: true,
	inline: true,
	lazy: false,
	// webpack-dev-middleware options
	quiet: false,
	noInfo: true,
	stats: { colors: true },
	headers: { 'Access-Control-Allow-Origin': '*' },
	// Set this as true if you want to access dev server from arbitrary url.
	// This is handy if you are using a html5 router.
	historyApiFallback: false,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	}
	// Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "*" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    // proxy: {
    // 	'*': 'http://localhost:3000'
    // }
}

export default function() {
	const compiler = webpack(config)
	let bundleStartTime

	compiler.plugin('compile', function() {
		console.log('\nCompiling...\n')
		bundleStartTime = Date.now()
	})

	// compiler.apply(new ProgressPlugin(function(percentage, msg) {
	// 	console.log((Math.ceil(percentage * 100)) + '%', msg)
	// }))

	compiler.plugin('done', function() {
		compileTime(bundleStartTime)
	})

	const server = new WebpackDevServer(compiler, options)

	server.listen(PORT, HOST, function() {
		console.log(`\n---\n\nWebpackDevServer is listening on http://${ HOST }:${ PORT }\n\n---`)
	})
}
