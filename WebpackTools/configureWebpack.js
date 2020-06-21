
const path = require('path');
const pkgDir = require('pkg-dir');
const getServiceWorkerConfig = require('../Utilities/getServiceWorkerConfig');
const getClientConfig = require('../Utilities/getClientConfig');
async function configureWebpack(options) {
    const { context } = options;


    const paths = {
        src: path.resolve(context, 'src'),
        output: path.resolve(context, 'dist')
    };
    const special = options.special || {};

    const features = await Promise.all(
        Object.entries(special).map(async ([packageName, flags]) => [
            await pkgDir(path.dirname(require.resolve(packageName))),
            flags
        ])
    );

    const hasFlag = flag =>
    features.reduce(
        (hasIt, [packagePath, flags]) =>
            flags[flag] ? [...hasIt, packagePath] : hasIt,
        []
    );

    const configOptions = {
        context,
        paths,
        hasFlag
    };
    const clientConfig = await getClientConfig({
        ...configOptions,
        vendor: options.vendor || []
    });


    const serviceWorkerConfig = getServiceWorkerConfig(configOptions);

    return { clientConfig, serviceWorkerConfig };
}

module.exports = configureWebpack;