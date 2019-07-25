const helpers = require('../utils/helpers');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const argv = require('yargs').argv
const name = argv.name || 'mobile';
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const { env = 'development' } = argv;
const getPages = require('../utils/getPage');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const rules = require('./getRules')();
const path = require('path');

module.exports = () => {
  return new Promise(resolve => {
    const options = {
      mode: env,
      entry: {
      },
      output: {
        filename: '[name].js',
        path: helpers.resolve(`../../app/public`),
        publicPath: '/'
      },
      module: {
        rules: []
      },
      resolve: {
        extensions: [ ".js", ".json", ".jsx", ".css", ".vue", '.ts', '.less', '.scss', '.tsx' ],
        alias: {
          vue: 'vue/dist/vue.esm.js',
        }
      },
      // optimization: {
      //   runtimeChunk: {
      //     name: 'manifest'
      //   },
      //   // minimize: [new UglifyJsPlugin()],
      //   splitChunks:{
      //     chunks: 'async',
      //     minSize: 30000,
      //     minChunks: 1,
      //     maxAsyncRequests: 5,
      //     maxInitialRequests: 3,
      //     name: false,
      //     cacheGroups: {
      //       vue: {
      //         name: 'vue',
      //         chunks: 'initial',
      //         priority: -10,
      //         reuseExistingChunk: false,
      //         test: /node_modules\/vue\/(.*)\.js/
      //       },
      //     }
      //   }
      // },
      plugins: [
        new VueLoaderPlugin(),
        // new CleanWebpackPlugin(),
        new webpack.LoaderOptionsPlugin({
          progress: true
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(env),
        })
      ],
    }

    const entry = {};
    const plugins = [];
    getPages(name).then((pageMap) => {
      const pageList = Object.keys(pageMap);
      console.log(pageMap)
      pageList.forEach((page) => {
        const entryName = page;
        const pageObj = pageMap[page];
        if (pageObj.nj && (pageObj.ts || pageObj.js)) {
          entry[entryName] = [helpers.resolve(`../../view/${pageObj.ts || pageObj.js}`)];
          const filename = path.basename(pageObj.nj);
          console.log(filename);
          // plugins.push(
          //   new HtmlWebpackPlugin({
          //     template: helpers.resolve(`../../view/${filename}`),
          //     filename,
          //     chunks: ['manifest', entryName]
          //   }),
          // )
        }
      })
      options.entry = entry;
      options.plugins = options.plugins.concat(plugins)
      options.module.rules = options.module.rules.concat(rules);
      resolve(options)
    })
  })
}
