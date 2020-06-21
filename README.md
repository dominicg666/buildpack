# @react_pwa/buildpack  [![npm version](https://img.shields.io/npm/v/@react_pwa/buildpack.svg?style=flat)](https://www.npmjs.com/package/@react_pwa/buildpack)
[React](http://facebook.github.io/react/) + [@react_pwa/buildpack](https://github.com/dominicg666/-dom-buildpack/) + [@react_pwa/buildpack](https://www.npmjs.com/package/@react_pwa/buildpack/)



### 1. Getting Started

* You need to create a webpack.config.js.


```js
// ...
const {
  configureWebpack
} = require('@react_pwa/buildpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = async env => {

  const { clientConfig, serviceWorkerConfig } = await configureWebpack({
    context: __dirname,
    special: {
    },
    env
  });


  clientConfig.plugins = [
    ...clientConfig.plugins,
    new HtmlWebPackPlugin({
      template: "./template.html",
      filename: "./index.html"
    })
  ];

  return [clientConfig, serviceWorkerConfig];
};

//...
```

### 2. .babelrc
create a .babelrc

```js
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```





