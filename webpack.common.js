const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
	entry: {
		main: './src/script/main/index.js'
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: 'bundle.js',
		//path: __dirname + '/dist'
		
	},
	mode: 'production',
	module: {
		rules: [
			//style and css loader
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			},

		]
	},
	plugins: [new HtmlWebpackPlugin({
		template: "./src/script/main/index.html",
		filename: "index.html"
	})]	
	
	
};

module.exports = webpackConfig;