const path = require("path");
const { override, useBabelRc, addLessLoader, addWebpackPlugin } = require("customize-cra");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const options = {
  stylesDir: path.join(__dirname, "./src/utils/styles"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  varFile: path.join(__dirname, "./src/utils/styles/variables.less"),
  mainLessFile: path.join(__dirname, "./src/utils/styles/mixins.less"),
  themeVariables: [
    "@primary-color",
    "@secondary-color",
    "@text-color",
    "@text-color-secondary",
    "@heading-color",
    "@layout-body-background",
    "@btn-primary-bg",
    "@layout-header-background",
    "@border-color-base"
  ],
  indexFileName: "index.html",
  generateOnce: false // generate color.less on each compilation
};
const isEnvProduction = process.env.NODE_ENV === "production";
function myOverrides(config) {
  // do stuff to config
  // WEBPACK BUNDLE REDUCTION AND OPTIMIZATION
  isEnvProduction &&
    config.optimization.minimizer.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            inline: 1 // this right here
            // keep_fnames: true
          },
          mangle: {
            // keep_fnames: true
          }
        }
      })
    );
  // DEFINE PLUGIN
  isEnvProduction &&
    config.plugins.push(
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        // VERSION: JSON.stringify('5fa3b9'),
        BROWSER_SUPPORTS_HTML5: true,
        TWO: "1+1",
        "typeof window": JSON.stringify("object"),
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      })
    );

  // DEFINE PLUGIN
  isEnvProduction &&
    config.plugins.push(
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        // VERSION: JSON.stringify('5fa3b9'),
        BROWSER_SUPPORTS_HTML5: true,
        TWO: "1+1",
        "typeof window": JSON.stringify("object"),
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      })
    );

  // Split large chunks
  isEnvProduction &&
    config.plugins.push(
      new webpack.optimize.AggressiveSplittingPlugin({
        minSize: 30000,
        maxSize: 50000
      })
    );
  // Merge small chunks
  isEnvProduction &&
    config.plugins.push(new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }));
  // console.log(config);

  return config;
}
module.exports = override(
  myOverrides,
  useBabelRc(),
  addLessLoader({
    javascriptEnabled: true,
    lessLoaderOptions: {
      javascriptEnabled: true,
      async: true
    },
    cssLoaderOptions: {
      modules: true
    },
    modifyVars: {
      "@primary-color": "#fb6506",
      "@btn-primary-bg": "#fb6506"
    }
  }),

  addWebpackPlugin(new AntDesignThemePlugin(options))
);

// fixBabelImports("import", {
//   libraryName: "antd",
//   libraryDirectory: "es",
//   style: "css"
// }),
