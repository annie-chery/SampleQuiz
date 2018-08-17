const path = require("path");
const webpack = require("webpack");

module.exports = {
	
	entry: ['webpack/hot/dev-server',
          'webpack-hot-middleware/client?http://localhost:8080/',
           "./src/js/main.js"],
	output: {
	path: path.resolve(__dirname, "dist/js/"),
  publicPath :'/dist/js/',
	filename: "main.js",
	},
	resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".json"
      
    ],

    modules: [
      "node_modules"
      //"src/scripts/local-modules"
    ]
  },
  // devServer: {
  //       contentBase: path.join(__dirname, "dist/"),
  //       port: 9000
  //   },
  plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      }),
      new webpack.LoaderOptionsPlugin({debug:true}),
      new webpack.HotModuleReplacementPlugin(),
      //new webpack.NoErrorsPlugin()
  ],

  
  module: {
    rules: [
      {
        test: /\.js$/,
       
        exclude: [
          "/node_modules/"
        ],
        loader: "babel-loader",
        options: {
            cacheDirectory: true,
            presets:["es2015"]
        }
      },
      {

        test: /\.js$/,
       
        exclude: [
          "/node_modules/"
        ],
        loader: "webpack-module-hot-accept"
      }      
      
    ]
    
  },
  mode: 'none'
};