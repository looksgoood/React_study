const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './src/index.js',
        'webpack-dev-server/client?http://0.0.0.0:4000',
        'webpack/hot/only-dev-server',
        './src/style.css'
    ],

    output: {
        path: '/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public/',
        proxy: {
            "**": "http://localhost:3000"
        },
        stats: {
            asserts: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
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
              loader: 'style-loader!css-loader'
          }
        ],
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    resolve: {
        modules: [path.resolve('./src'), 'node_modules']  /* react 프로젝트의 root folder 설정 */
    }
};