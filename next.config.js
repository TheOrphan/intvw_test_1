/* eslint-disable */
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './utils/styles/antd.variables.less'),
    'utf8',
  ),
);

module.exports = withLess({
  assetPrefix: '/intvw_test_1/',
  basePath: '/intvw_test_1',
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    URL_DEVELOPMENT: process.env.URL_DEVELOPMENT,
    URL_PRODUCTION: process.env.URL_PRODUCTION,
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  /**
   * Dont use this!!
   * https://nextjs.org/docs/advanced-features/custom-server
   */
  // useFileSystemPublicRoutes: false,
  // *******************************************************
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }

    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['modules'] = path.join(__dirname, 'modules');
    config.resolve.alias['utils'] = path.join(__dirname, 'utils');

    return config;
  },
});
