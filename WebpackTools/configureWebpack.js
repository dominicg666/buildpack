
const path = require('path');
const pkgDir = require('pkg-dir');
const getServiceWorkerConfig = require('../Utilities/getServiceWorkerConfig');
const getClientConfig = require('../Utilities/getClientConfig');


function getMode(cliEnv = {}) {
    if (cliEnv.mode) {
        return cliEnv.mode;
    }
    return 'development';
}


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

    const mode = getMode(options.argv);

    const configOptions = {
        mode,
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