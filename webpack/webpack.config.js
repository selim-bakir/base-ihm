'use strict';
const path = require('path');
const pluginsConfig = require('./webpack.plugins.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let dev = false;

//CSS LOADER
let cssLoaders = [
    {   loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: '../'
        }
    },
    {
        loader: 'css-loader',
        options: {
            sourceMap: true,
        }
    }
];
if (!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            plugins: () => [
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 8']
                })
            ]
        }
    });
}

//START CONFIG
let config = {
    devtool: dev ? 'cheap-eval-source-map' : false,
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        host: 'localhost',
        port: '9000',
        disableHostCheck: false,
        open: true,
        hot: true,
        quiet: true,
    },
    resolve: {
        alias: {
            'root': path.resolve('src/'),
            'assets': path.resolve('src/assets/'),
            'components': path.resolve('src/assets/components/'),
            'components-scss': path.resolve('src/assets/scss/components/'),
            'blocs-scss': path.resolve('src/assets/scss/blocs/'),
            'template-scss': path.resolve('src/assets/scss/templates/'),
            'vendors-scss': path.resolve('src/assets/scss/vendors/'),
            'font': path.resolve('src/assets/fonts/'),
        },
        extensions: ['.js', '.jsx', '.css', '.png', '.jpg', '.gif', '.jpeg'],
    },
    watch: dev ? true : false,
    entry: {
        all: ['./src/assets/scss/all.scss', './src/assets/scripts/all.js'],
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
        chunkFilename: '[id].bundle_[chunkhash].js',
        sourceMapFilename: '[file].map'
    },
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(dom7|swiper)\/)&&(node_modules|bower_components).*/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.twig$/,
                loader: 'twig-loader',
                options: {
                    twigOptions: {
                        namespaces: { 'fun-webpack': require('path').join(__dirname, '/../src/templates') }
                     }
                },
            },
            {
                test: /\.css$/,
                use: cssLoaders,
            },
            {
                test: /\.scss$/,
                use: [
                    ...cssLoaders,
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                require('path').resolve(__dirname, 'node_modules')
                            ]
                        },

                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        limit: 8192
                    },
                }, ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '../fonts/[name].[ext]',
                        outputPath: 'fonts/',
                    },
                }
            }
        ]
    },

    node: {
        fs: 'empty' // avoids error messages
    },
    plugins: pluginsConfig,
};


module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        dev = true;
    } else {
        dev = false;
    }

    return config;
};
//module.exports = config;
