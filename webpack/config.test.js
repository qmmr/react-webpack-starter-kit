/* eslint-disable no-var */
var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer-core')
var csswring = require('csswring')

var buildPath = path.resolve(__dirname, '../.tmp')
var mainPath = path.resolve(__dirname, '../test/index.js')
var testPath = path.resolve(__dirname, '../test')
/* eslint-enable */

module.exports = {
	target: 'node',
	entry: [ mainPath ],
	output: {
		path: buildPath,
		filename: 'bundleTests.js'
	},
	resolve: {
		root: testPath,
		extensions: [ '', '.js', '.jsx' ],
		modulesDirectories: [ 'node_modules' ]
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel?optional[]=runtime', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel' },
			{ test: /\.css$/, loader: 'style!css!postcss' }
		]
	},
	plugins: [],
	/* eslint-disable object-shorthand */
	postcss: function() {
		return [
			autoprefixer({ browsers: [ 'last 2 version' ] }),
			csswring
		]
	}
	/* eslint-enable */
}
