const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './src/index.js',
        './src/style.css'
    ],

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
          {
            exclude: /node_modules|packages/,
            test: /\.js$/,
            use: 'babel-loader',
          },
          {
              test: /\.css$/,
              loader: 'style!css-loader'
          }
        ],
    },

    resolve: {
        modules: [path.resolve('./src'), 'node_modules']  /* react 프로젝트의 root folder 설정 */
    }
};