const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib'),
      crypto: require.resolve('crypto-browserify'),
      child_process: false,
      http: require.resolve('stream-http'),
      timers: require.resolve('timers-browserify'),
    },
  },
  module: {
    noParse: /\/mongodb\//,
  },
  entry: {
    app: './src/index.js', // Update the entry file accordingly
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
