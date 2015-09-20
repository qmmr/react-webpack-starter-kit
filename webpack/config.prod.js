/* eslint-disable no-var */
var webpack = require('webpack')
var path = require('path')

var buildPath = path.resolve(__dirname, '../public/build')
var mainPath = path.resolve(__dirname, '../src/index.js')
var nodeModulesPath = path.resolve(__dirname, '../node_modules')
var srcPath = path.resolve(__dirname, '../src')
/* eslint-enable */

module.exports = {
	entry: mainPath,
	output: {
		path: buildPath,
		filename: 'bundle.js'
	},
	resolve: {
		root: srcPath,
		extensions: [ '', '.js', '.jsx' ],
		modulesDirectories: [ nodeModulesPath ]
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel?optional[]=runtime', exclude: /node_modules/ },
			{ test: /\.jsx$/, loaders: [ 'react-hot', 'babel' ], include: srcPath },
			{ test: /\.css$/, loader: 'style!css!postcss' }
		]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		// removes a lot of debugging code in React
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		// keeps hashes consistent between compilations
		new webpack.optimize.OccurenceOrderPlugin(),
		// minifies your code
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop')
	]
}
