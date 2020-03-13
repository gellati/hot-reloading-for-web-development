var path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/App.js'
  ],
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['*', '.js']
  },
  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, '.'),
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  }
}
