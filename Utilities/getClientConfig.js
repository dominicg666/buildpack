const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const postCssConfig = require('../WebpackTools/plugins/postcss.config');
module.exports = async function ({
    context,
    paths,
    hasFlag
}) {

    let vendorTest = '[\\/]node_modules[\\/]';

    // if (vendor.length > 0) {
    //     vendorTest += `(${vendor.join('|')})[\\\/]`;
    // }
    const config = {
        context,
        entry: {
            client: path.resolve(paths.src, 'index.js')
        },
        output: {
            path: paths.output,
            publicPath: '/',
            filename: '[name].js',
            strictModuleExceptionHandling: true,
            chunkFilename: '[name].[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.(mjs|js|jsx)$/,
                    // exclude: /node_modules/,
                    include: [paths.src, ...hasFlag('esModules')],
                    sideEffects: false,
                    use: {
                        loader: "babel-loader"
                    }
                }, {
                    test: /\.(scss|css)$/,
                    use: [{
                        loader: 'style-loader', // inject CSS to page
                    }, {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                        loader: 'postcss-loader', // Run post css actions
                        options: postCssConfig
                    }, {
                        loader: 'sass-loader', // compiles Sass to CSS
                    }]
                },
                {
                    test: /\.(jpg|svg|png|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                }
            ]
        },
        plugins: [],

        devtool: 'source-map',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: new RegExp(vendorTest),
                        chunks: 'all'
                    }
                }
            }
        },
        optimization: {
            moduleIds: 'hashed',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    /**
                     * Creating the vendors bundle. This bundle
                     * will have all the packages that the app
                     * needs to render. Since these dont change
                     * often, it is advantageous to bundle them
                     * separately and cache them on the client.
                     */
                    vendor: {
                        test: new RegExp(vendorTest),
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    cache: true,
                    terserOptions: {
                        ecma: 8,
                        parse: {
                            ecma: 8
                        },
                        compress: {
                            drop_console: true
                        },
                        output: {
                            ecma: 7,
                            semicolons: false
                        },
                        keep_fnames: true
                    }
                })
            ]
        }
    };

    return config;
};
