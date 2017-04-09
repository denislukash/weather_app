const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const extractLESS = new ExtractTextPlugin('[name].css');

module.exports = {

    entry: {
        index: './app/index.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: './build/',
        filename: '[name].js',
        library: '[name]'
    },

    watch: false,

    watchOptions: {
        aggregateTimeout: 100 
    },
    
    devtool: 'source-map',

    resolveLoader: {
        modules: ["node_modules"],
        moduleExtensions: ['-loader'],
        extensions: ["*", ".js"]
    },

    module: {
        rules: [
            {
            	test: /\.less$/i,
            	use: extractLESS.extract(['css-loader', 'less-loader'])
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    
    plugins: [
        extractLESS
    ]
};