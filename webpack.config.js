var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
		entry: {
				main: './_js/main.js'
		},
		output: {
				filename: './public/js/[name].js'
		},
		devtool: 'source-map',
		module: {
				loaders: [
						{
								test: /\.js$/,
								exclude: /(node_modules|bower_components)/,
								loader: 'babel-loader',
						},
						{
			                    loadertest: /\.css$/,
			                    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			            },

						{
								test: /\.scss$/,
								loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader!sass-loader"})
						}
				]
		},
		plugins: [
				new ExtractTextPlugin('./public/css/[name].css')
		]
}
