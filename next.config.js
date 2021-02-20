const path = require("path");

module.exports = {
  compress: true,
  webpack(config, { webpack }) {
    const prod = process.env.MODE_ENV === "production";
    const plugins = [...config.plugins];

    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins,
    };
  },
};
