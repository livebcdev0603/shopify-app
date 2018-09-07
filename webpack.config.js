const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
  template: 'public/index.html',
  favicon: 'public/favicon.ico'
})

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ "env", "react" ]
          }
        }
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: [ 
          { loader: 'style-loader'},
          { 
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              camelCase: true,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [ 
    new webpack.HotModuleReplacementPlugin(), 
    htmlPlugin,
    new CleanWebpackPlugin(['dist'])
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
}