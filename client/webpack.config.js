const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Text Editor'
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'TextEditor',
        description: 'A simple browser-based text editor.',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '.',
        display: 'standalone',
        fingerprints: false,
        publicPath: ".",
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 192, 512],
            destination: path.join('assets', 'icons'),
            
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'sw.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
