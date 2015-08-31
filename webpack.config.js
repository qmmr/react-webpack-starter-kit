var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer-core')
var csswring = require('csswring')

var nodeModulesPath = path.resolve(__dirname, 'node_modules')
var buildPath = path.resolve(__dirname, 'build')
var mainPath = path.resolve(__dirname, 'src', 'index.js')

var config = {
	devtool: 'eval-cheap-module-source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		mainPath
	],
	output: {
		// We need to give Webpack a path. It does not actually need it,
		// because files are kept in memory in webpack-dev-server, but an
		// error will occur if nothing is specified. We use the buildPath
		// as that points to where the files will eventually be bundled
		// in production
		path: buildPath,
		filename: 'bundle.js',
		// Everything related to Webpack should go through a build path,
		// localhost:3000/build. That makes proxying easier to handle
		publicPath: 'http://localhost:8080/build/'
	},
	resolve: {
		extensions: [ '', '.js', '.jsx' ]
	},
	module: {
		loaders: [
			{ test: require.resolve('react'), loader: 'expose?React' }, // expose React as global
			{ test: /\.js$/, loader: 'babel', exclude: [ nodeModulesPath ] },
			{ test: /\.jsx$/, loaders: [ 'react-hot', 'babel' ], include: path.join(__dirname, 'src') },
			{ test: /\.html$/, loader: 'raw', exclude: /node_modules/ },
			{ test: /\.css$/, loader: 'style!css!postcss', exclude: /node_modules/ },
			{ test: /\.json$/, loader: 'json' }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	postcss: function() {
		return [
			autoprefixer({ browsers: [ 'last 2 version' ] }),
			csswring
		]
	}
}

module.exports = config
