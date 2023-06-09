# Emit Deps Webpack Plugin

This is a webpack plugin that simply emit your dependencies based on entry point of webpack. This is especially useful when you are migrating source code, not entire code, but only specific entry point and it's dependencies. 

## Install

```
npm install -D emit-deps-webpack-plugin
```

## Usage

The plugin will copy all dependencies(only source code, not library code) based on webpack entry point. The directory structure of output is same with original structure. Just add the plugin to your webpack config as follows:

```js
const EmitDepsWebpackPlugin = require('emit-deps-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: { symlinks: false }, // only for Webpack 5+
  plugins: [new EmitDepsWebpackPlugin()]
}
```

As you build, webpack generate `dist` folder and also `output` folder including dependencies from entry point.

**NOTE**: Webpack 5 introduced a new feature to follow symlinks, but it cause an issue by including all parent directories as result. If you are using Webpack 5, you need to add `resolve: { symlinks: false }` option to prevent this issue. see https://github.com/webpack/webpack/issues/11971. If you are using Webpack 4, then it's OK.


## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`outputPath`**|`{String}`|`output`|The output folder name|

## Lisence

MIT