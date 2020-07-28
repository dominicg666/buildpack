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

### 2. babel.config.js
create a babel.config.js

```js
module.exports = { presets: ['@baaz/adapter'] };

```





