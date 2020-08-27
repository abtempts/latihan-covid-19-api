const path = require("path");

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
			/*{
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
			}*/
		
		]
	}
	
}