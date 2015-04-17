var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './scripts/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'scripts')
    },{
      test: /\.scss$/,
      loaders: 'style!css!sass?includePaths[]=' +
        (path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets'))
      //   '&includePaths[]=' +
      //   (path.resolve(__dirname, './node_modules/bootstrap-sass/assets/fonts/bootstrap')),
    }]
  }
};
