const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const withLess = require('@zeit/next-less');

module.exports = withTypescript(
  withLess({
    webpack: (configuration, { dev }) => {
      const config = configuration;

      config.resolve.alias['../../theme.config$'] = path.join(
        __dirname,
        'src/styles/theme.config'
      );

      config.module.rules.push({
        test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            publicPath: '/_next/static/',
            outputPath: 'static/',
            name: dev ? '[name].[ext]' : '[hash].[ext]',
          },
        },
      });

      return config;
    },
  })
);