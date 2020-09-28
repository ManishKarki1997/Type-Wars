module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["vue-svg-icon-loader"],
      },
    ],
  },
};
