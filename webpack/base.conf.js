const { CheckerPlugin } = require('awesome-typescript-loader')

const { root } = require('./utils')

module.exports = () => ({
  entry: root('src', 'index.ts'),
  output: {
    path: root('dist'),
    filename: 'index.js'
  },
  target: 'web',
  resolve: {
    extensions: ['.ts'],
  },
  externals: {
    ramda: 'ramda',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
            {
                loader: 'tslint-loader',
                options: {
                  emitErrors: true,
                  configFile: root('tslint.json'),
                  tsConfigFile: root('tsconfig.json'),
                  typeCheck: true,
                }
            }
        ]
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
  ],
})
