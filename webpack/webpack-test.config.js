var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var WebpackShellPlugin = require('webpack-shell-plugin');


var config = {
  entry: './webpack/all-tests.js',
  output: {
    filename: './webpack/test/testBundle.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    fs: 'empty'
  },


  plugins: [
    new WebpackShellPlugin({
      onBuildExit: "mocha --colors --require ./webpack/spec-helper.js ./webpack/test/testBundle.js"
    })
  ]
};


module.exports = config;