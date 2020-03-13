# Hot reloading for web development

Different ways of hot reloading in web development. The different alternatives shown can be run with the scripts in `package.json`.

First, set the project up by installing the dependencies:

    npm install

and then run the npm scripts.

Currently using [React](https://reactjs.org) components as example.

## Express server

With [webpack](https://webpack.js.org/), [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware), it is possible to make hot reloading possible when using an [Express](http://expressjs.com/) server. The webpack settings are read from a configuration file.

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

### Using hot reload with Express and React

Hot reloading React components from an Express server requires [React hot loader](https://github.com/gaearon/react-hot-loader) in order to update the changes to the browser.

Add this to the root component of the project

    import { hot } from 'react-hot-loader/root'
    class Hello extends React.Component {
      render() {
        return (
          <div>
            Hello world
          </div>
        )
      }
    }
    export default hot(Hello)


## Webpack

The configurations for hot reloading in [webpack](https://webpack.js.org/) are in `webpack.webpack.config.js`. There are (at least) three ways to enable hot reloading with webpack using [webpack-dev-server](https://github.com/webpack/webpack-dev-server).

### Set server mode

In the configuration file set `mode` as `'development'`

    mode: 'development'

This is the easiest option.

### Set hot reload plugin

Import webpack and used the [HotModuleReplacementPlugin](https://webpack.js.org/plugins/hot-module-replacement-plugin/):

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]

### Configure devServer settings

In the configuration files `devServer` section, set these parameters:

    devServer: {
      inline: true,
      hot: true
    }

If the webpack development server is started from the CLI instead of the npm script, these options can also be given as

    webpack-dev-server -hot -inline
