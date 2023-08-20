const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');

require('dotenv').config()

const mode = process.env.PRODUCTION_MODE;
const isDev = mode === 'development';

const plugins = [
  new DefinePlugin({
    'process.env': JSON.stringify(process.env)
  }),
  new CleanWebpackPlugin(),
  new HTMLWebpackPlugin({
    template: './public/index.html',
    minify: {
      collapseWhitespace: !isDev,
      removeComments: !isDev,
    }
  }),
  new MiniCSSExtractPlugin({
    filename: isDev ? '[name].css' : '[contenthash].css',
    chunkFilename: isDev ? '[id].css' : '[contenthash].css',
  }),
];

module.exports = {
  context: __dirname,
  mode,
  entry: './index.js',
  output: {
    filename: isDev ? '[name].js' : '[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    assetModuleFilename: 'public/[contenthash][ext][query]',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devtool: isDev ? 'source-map': false,
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, 'public')
    },
    historyApiFallback: true
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      new CSSMinimizerWebpackPlugin(),
      new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          }
        }
      })
    ]
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js.$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel/preset-env'],
          }
        }
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:7]'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
			{
				test: /^((?!\.module).)*s[ac]ss$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
    ]
  }
}