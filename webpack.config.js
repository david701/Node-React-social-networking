const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDebug = !process.argv.includes('--release');

module.exports = {
  entry: {
    main: './_js/main.js',
  },
  output: {
    filename: './public/js/[name].js',
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('./public/css/[name].css'),
  ],
};
