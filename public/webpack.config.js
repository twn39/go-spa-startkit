const Encore = require('@symfony/webpack-encore');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  .setOutputPath('build/')
  .setPublicPath('/public/build')
  .setManifestKeyPrefix("public/build")
  .enableVersioning()
  .addEntry('app', './src/index.tsx')
  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .configureBabel(null)
  .enableSassLoader()
  .enableTypeScriptLoader()
  .enableReactPreset()
  .configureLoaderRule('ts', loaderRule => {
    loaderRule.test = /\.(ts|tsx)$/
    loaderRule.exclude = /node_modules/;
    loaderRule.use = [
      {
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [Encore.isDev() && require.resolve('react-refresh/babel')].filter(Boolean),
        },
      },
    ];
  })
;

const config = Encore.getWebpackConfig();
if (Encore.isDev()) {
  config.plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = config;
