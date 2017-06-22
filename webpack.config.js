module.exports = {
  entry: ['./client/index.js'],
  output: {
    filename: "bundle.js",
    path: "/app/public"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {loader: 'babel-loader'}
    }]
  }
}