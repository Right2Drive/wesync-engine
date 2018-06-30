const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const { root } = require('./utils')

module.exports = () => ({
  cache: true,
  entry: root('src', 'index.ts'),
  output: {
    path: root('dist'),
    filename: 'wesync-engine.js',
    library: 'wesyncEngine',
  },
  target: 'web',
  resolve: {
    extensions: ['.ts'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: root('tsconfig.json'),
      }),
    ],
  },
  externals: {
    ramda: {
      commonjs: 'ramda',
      commonjs2: 'ramda',
      amd: 'ramda',
      root: 'R',
    },
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
                  configFile: root('tslint.json'),
                  tsConfigFile: root('tsconfig.json'),
                  typeCheck: true,
                }
            }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
          {
            loader: 'ts-loader'
          },
        ]
      },
    ],
  },
  stats: {
    errorDetails: true,
  },
})
