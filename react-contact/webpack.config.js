const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        hot: true,
        port: 7777,
        contentBase: __dirname + '/public/'
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

    plugins: [
        new webpack.NamedModulesPlugin()
    ]

};