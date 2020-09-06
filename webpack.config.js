const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {

    entry: ['babel-polyfill', './src/assets/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },

   
    optimization: {
        minimizer: [           
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/assets/index.html',
            favicon: './src/assets/img/favicon-12x13.png'
        }),

        new MiniCssExtractPlugin({
            filename: './style.css'
        }),

    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.s?[ac]ss$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', // interpreta @import, url()
                    'sass-loader',
                ]
            },

            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
              },           

            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: ['file-loader']
                // use: [                  {
                //     loader: 'file-loader',
                //     options: {
                //       name: '[name].[ext]',
                //       outputPath: 'img'
                //     }
                //   }]
            }
        ]
    }
};