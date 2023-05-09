// config/webpack/base.js
const { webpackConfig, merge } = require("@rails/webpacker");
const webpack = require("webpack");

const customConfig = {
  resolve: {
    extensions: [".css", ".scss"],
    fallback: {
      url: require.resolve("url"),
      util: require.resolve("util"),
      assert: require.resolve("assert"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      querystring: require.resolve("querystring-es3"),
      "react-native": false,
      fs: false,
      net: false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser.js"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};

module.exports = merge(webpackConfig, customConfig);
