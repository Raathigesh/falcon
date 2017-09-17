const path = require("path");
module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = [path.join(__dirname, "./src/index.tsx")];

    config.resolve = {
      extensions: [".ts", ".tsx", ".js", ".json"]
    };

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: "awesome-typescript-loader"
    });

    return config;
  }
};
