var webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  //defines the place at which the parser enters the application to begin execution, can be a single point 
  //or an array of multiple points
    entry: './src/main.js',
    devServer: {
        port: 8081,
        historyApiFallback: true,
        proxy: {
          '/api': {
            target: 'http://localhost:8080',
            secure: false
          },
          '/landingpage': {
            target: 'http://localhost:8080',
            secure: false
          }
        }
    },
    //specifies the location in which to dump the bundled files and what to name them
    output: {
        path: __dirname + '/app/assets/javascripts',
        filename: 'bundle.js'
      },
      resolve: {
        //automatically resolves file extensions, removes the need to include file extension on import
        extensions: ['*', '.js', '.json', '.vue']
      },
      module: {
        //defines what type of files can be handled by the webpack parser and bundling service
          rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
              // other vue-loader options go here
        },
        {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader'
            ]
        },
            ]
        },
      plugins: [
        new VueLoaderPlugin(),
        //include jquery as a plugin for use throughout the project, allows use of the "$" reference
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jQuery"
      }),
      ]
      };