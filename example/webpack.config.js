const path = require("path");

module.exports = {
  entry: path.join(__dirname, "App.js"),
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve(process.cwd(), "example"),
    hot: false,
    port: 9000,
    compress: true
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"]
  }
};
