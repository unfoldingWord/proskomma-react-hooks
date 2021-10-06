var path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  devtool: false,
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: 'index',
    globalObject: "this",
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'commonjs react',
   'react-dom': 'commonjs react-dom',
 },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, '/node_modules/'),
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-proposal-optional-chaining'],
        },
      }
    ]
  },
  node: {
    child_process: 'empty',
    fs: 'empty',
    // "os": require.resolve("os-browserify/browser"),
    // "stream": require.resolve("stream-browserify")
  }
};