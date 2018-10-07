
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	mode: 'production',
	entry: {
		app: path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{test: /\.sass$/, use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader',
			]},
			{test: /\.html$/, use: [
				{loader: 'file-loader', options: {name: '[name].[ext]'}},
				'extract-loader',
				{loader: 'html-loader', options: {minimize: true}},
			]},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({filename: 'style.css'}),
	],
}
