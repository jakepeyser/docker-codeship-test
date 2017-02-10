const webpack = require('webpack')
const base = require('./webpack.base.config')

const LOCAL_PORT = 3030;

module.exports = Object.assign({}, base, {
  target: 'node',
  devtool: false,
  entry: './client/server-entry.js',
  output: Object.assign({}, base.output, {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  }),
  externals: Object.keys(require('../package.json').dependencies),
  plugins: (base.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
      'process.env.SERVER_URI':
        `"http://localhost:${process.env.PORT || LOCAL_PORT}/"`
    })
  ])
})
