var webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/app/assets/javascripts',
        filename: 'bundle.js'
      },
      resolve: {
        extensions: ['*', '.js', '.json', '.vue']
      },
      module: {
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
        new VueLoaderPlugin()
      ]
      };