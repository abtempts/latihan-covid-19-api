const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
			
			//babel loader
			{
				test: /\.js$/,
				exclude: "/node_mdules",
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"]
						}
					}
				]
			}

		]
	},
	
	//plugins
	plugins: [
		//html webpack plugins
		new HtmlWebpackPlugin({
			template: "./index.html",
			filename: "index.html"
		})
	]
}