var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: __dirname + '/src',
	entry: {
		app: './app.ts',
		vendor: ['angular', 'angular-route', 'jquery', 'angular-animate', 'angular-aria', 'angular-material']
		},
	output: {
		path: __dirname + '/public',
		filename: 'app.bundle.js'
		},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
			filename:'vendor.js',
            minChunks: Infinity
        }),
		new HtmlWebpackPlugin({
			template: './index.html'
		})
	],
	module: {
		loaders: [
			{ 	test: /\.ts$/, 
				loaders: ['ts-loader'], exclude: /node_modules/ 
			},
			{ 	test: /.html$/,
				loaders: [ 'html' ] 
			},
			{ 	test: /\.js$/,
				loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
			}
      ]
    },
	resolve: {
		extensions: [
			'',
			'.webpack.js',
			'.web.js',
			'.js',
			'.ts'
		]
	}
//	plugins: [
//		new HtmlWebpackPlugin({
//			template: './index.html'
//		})
//	]
}; 