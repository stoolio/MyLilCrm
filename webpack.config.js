var webpack = require('webpack');
var path = require('path');

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
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/locale/)
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets'))
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: [path.join(__dirname, 'scripts'), path.join(__dirname, 'app')]
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  }
};
