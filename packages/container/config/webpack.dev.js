const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 80,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
