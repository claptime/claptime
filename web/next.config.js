const withLess = require('@zeit/next-less');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const antdCustom = require('./src/styles/antd-custom');

const { STRIPE_CONNECT_CLIENT_ID, STRIPE_PUBLISHABLE_KEY } = process.env;

if (!STRIPE_CONNECT_CLIENT_ID || !STRIPE_PUBLISHABLE_KEY) {
  console.error('ERROR: ENVIRONMENT VARIABLES NOT DEFINED');
  console.error(`STRIPE_CONNECT_CLIENT_ID=${STRIPE_CONNECT_CLIENT_ID}`);
  console.error(`STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}`);
  process.exit(1);
}

module.exports = withLess({
  target: 'serverless',
  env: {
    NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID: STRIPE_CONNECT_CLIENT_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: STRIPE_PUBLISHABLE_KEY,
  },
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: antdCustom,
    },
  },
  webpack: (config, { isServer }) => {
    /* eslint-disable no-param-reassign */

    // Ant Design + Next.js + Less
    // https://github.com/vercel/next-plugins/issues/598#issuecomment-618461761
    // Regular expression updated from this comment:
    // https://github.com/vercel/next.js/issues/8151#issuecomment-527385664
    if (isServer) {
      const antStyles = /(antd\/.*?\/style).*(?<![.]js)$/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) {
            callback();
          } else if (typeof origExternals[0] === 'function') {
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

    // https://github.com/vercel/next-plugins/issues/506
    // Avoid this warning coming from AntD + Less + Next.js
    // chunk styles [mini-css-extract-plugin]
    // Conflicting order between:
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    );

    return config;
  },
});
