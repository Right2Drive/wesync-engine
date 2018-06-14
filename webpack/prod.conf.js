const merge = require('webpack-merge')

const baseConfig = require('./base.conf.js')

module.exports = () => merge(baseConfig(), {
  mode: 'production',
  devtool: 'source-map',
  plugins: [

  ]
})
