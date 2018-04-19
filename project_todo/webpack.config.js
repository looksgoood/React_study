const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',

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
        ],
    },
};