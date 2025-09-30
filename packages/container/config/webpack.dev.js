const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 80,
    historyApiFallback: true,
  },
  plugins: [
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
