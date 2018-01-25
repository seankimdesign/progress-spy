const path = require('path')

const config = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'app.js'
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      use: 'babel-loader'
    }]
  },
  resolve: {
    alias: {
      globalStyles: path.resolve(__dirname, 'src/global/config/styles.js'),
      globalUtils: path.resolve(__dirname, 'src/global/utils/'),
      globalComponents: path.resolve(__dirname, 'src/global/components/'),
      global: path.resolve(__dirname, 'src/global/')
    }
  }
}

module.exports = config
