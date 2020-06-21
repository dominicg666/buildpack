const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const ServiceWorkerPlugin = require('../WebpackTools/plugins/ServiceWorkerPlugin');

module.exports = function ({
    context,
    paths,
    hasFlag
}) {
    const config = {
        context,
        entry: {
            sw: path.resolve(paths.src, 'ServiceWorker/sw.js')
        },
        output: {
            path: paths.output,
            publicPath: '/',
            filename: '[name].js',
            strictModuleExceptionHandling: true,
            chunkFilename: '[name]-[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.(mjs|js|jsx)$/,
                    include: [paths.src, ...hasFlag('esModules')],
                    sideEffects: false,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new ServiceWorkerPlugin({
                paths,
                injectManifest: true,
                // enableServiceWorkerDebugging: !!projectConfig.section(
                //     'devServer'
                // ).serviceWorkerEnabled,
                injectManifestConfig: {
                    include: [/\.js$/],
                    swSrc: './sw.js',
                    swDest: './sw.js'
                }
            })
        ],
        optimization: {
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
