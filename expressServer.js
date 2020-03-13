var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackconfig = require('./webpack.express.config')

const compiler = webpack(webpackconfig)
const port = 3002
const host = 'localhost'

const app = express()
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackconfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.listen(port, host, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:'+port)
})