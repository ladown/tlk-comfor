const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const pugPages = require('./pugPages')();
const { generateTemplaet } = require('./pageList');

fs.writeFileSync(`${paths.src.pugPages}/index.pug`, generateTemplaet(), { encoding: 'utf8' });

module.exports = {
	target: 'web',

	entry: {
		app: `${paths.src.scripts}/app.js`,
	},

	output: {
		path: paths.build.default,
		filename: './js/[name].[contenthash].js',
		clean: true,
	},

	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: paths.src.sprite,
					to: paths.build.sprite,
				},
				{
					from: paths.src.imgs,
					to: paths.build.imgs,
					globOptions: {
						ignore: ['backgrounds/*.*'],
					},
				},
				{
					from: paths.src.static,
					to: paths.build.static,
				},
			],
		}),

		...pugPages.map((file) => {
			return new HtmlWebpackPlugin({
				template: `${paths.src.pugPages}/${file}`,
				filename: path.join(paths.build.default, file.replace('.pug', '.html')),
				inject: 'body',
				alwaysWriteToDisk: true,
			});
		}),
	],

	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: '@webdiscus/pug-loader',
			},

			{
				test: /\.m?js$/,
				exclude: [/(node_modules|bower_components)/, `${paths.src.vendors}/vendor.js`],
				use: {
					loader: 'babel-loader',
				},
			},

			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
					'glob-import-loader',
				],
			},

			{
				test: /\.(woff(2)?|ttf(2)?|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},

			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				exclude: [/(node_modules|bower_components)/, /sprite\.svg/],
				type: 'asset',
				generator: {
					filename: 'img/backgrounds/[name][ext]',
				},
			},
		],
	},

	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
};
