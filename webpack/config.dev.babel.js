import webpack from 'webpack'
import path from 'path'
import autoprefixer from 'autoprefixer'
import csswring from 'csswring'

const buildPath = path.resolve(__dirname, '../public/build')
const mainPath = path.resolve(__dirname, '../src/index.js')
const srcPath = path.resolve(__dirname, '../src')

const config = {
	devtool: 'eval-cheap-module-source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		mainPath
	],
	output: {
		// We need to give Webpack a path. It does not actually need it,
		// because files are kept in memory in webpack-dev-server, but an
		// error will occur if nothing is specified.
		// We use the buildPath as that points to where the files will eventually be bundled in production
		path: buildPath,
		filename: 'bundle.js',
		// Everything related to Webpack should go through a build path,
		// localhost:3000/build. That makes proxying easier to handle
		publicPath: 'http://localhost:8080/build/'
	},
	resolve: {
		root: srcPath,
		extensions: [ '', '.js', '.jsx' ],
		modulesDirectories: [ 'node_modules' ]
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loaders: [ 'react-hot', 'babel-loader' ], include: srcPath },
			{ test: /\.html$/, loader: 'raw', exclude: /node_modules/ },
			{ test: /\.css$/, loader: 'style!css!postcss', exclude: /node_modules/ },
			{ test: /\.json$/, loader: 'json' }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	postcss() {
		return [
			autoprefixer({ browsers: [ 'last 2 version' ] }),
			csswring
		]
	}
}

export default config
