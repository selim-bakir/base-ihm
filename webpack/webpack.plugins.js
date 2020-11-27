'use strict';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const NotifierPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const ICON = path.resolve(__dirname, 'icon.png');
const PreloadWebpackPlugin = require('preload-webpack-plugin');


module.exports = [
    /* Twig & Json Ready */
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        chunks: ['all']
    }),
    new PreloadWebpackPlugin({
        rel: 'preload',
        as(entry) {
          if (/\.css$/.test(entry)) return 'style';
          if (/\.woff$/.test(entry)) return 'font';
          if (/\.png$/.test(entry)) return 'image';
          return 'script';
        }
      }),

    new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        options: {
            publicPath: '../'
        }
    }),
    new CleanWebpackPlugin(__dirname + '../../dist', {
        allowExternal: true
    }),
    new FriendlyErrorsWebpackPlugin(),
    new LiveReloadPlugin(),
    new NotifierPlugin({
        onErrors: (severity, errors) => {
            if (severity !== 'error') {
                return;
            }
            const error = errors[0];
            notifier.notify({
                title: 'Webpack error',
                message: severity + ': ' + error.name,
                subtitle: error.file || '',
                icon: ICON
            });
        }
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    })
];
