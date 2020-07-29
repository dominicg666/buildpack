# @baaz/buildpack  [![npm version](https://img.shields.io/npm/v/@baaz/buildpack.svg?style=flat)](https://www.npmjs.com/package/@baaz/buildpack)
[React](http://facebook.github.io/react/) + [@baaz/buildpack](https://github.com/dominicg666/buildpack/) + [@baaz/buildpack](https://www.npmjs.com/package/@baaz/buildpack/)



### 1. Getting Started

* You need to create a webpack.config.js.


```js
// ...
const {
  configureWebpack
} = require('@baaz/buildpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require('webpack');

module.exports = async (env, argv = {}) => {

  const { clientConfig, serviceWorkerConfig } = await configureWebpack({
    context: __dirname,
    vendor: [
      // 'react',
      // 'react-dom',
    ],
    special: {
      // 'buikit': {
      //   cssModules: true,
      //   esModules: true,
      // },
      // '@baaz/adapter': {
      //   esModules: true,
      //   cssModules: true
      // }
    },
    env,
    argv
  });


  clientConfig.plugins = [
    ...clientConfig.plugins,
     new DefinePlugin({
      /**
       * Make sure to add the same constants to
       * the globals object in jest.config.js.
       */
      PWA_NAME: JSON.stringify('BAAZ PWA')
    }),
    new HtmlWebPackPlugin({
      template: "./template.html",
      filename: "./index.html"
    })
  ];

  return [clientConfig, serviceWorkerConfig];
};

//...
```

### 2. babel.config.js
create a babel.config.js

```js
module.exports = { presets: ['@baaz/adapter'] };

```





