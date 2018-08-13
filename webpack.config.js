const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin({
    filename: "bundle.css"
});

module.exports = {
  devServer: {
    inline:true,
    port: 8080
  },
  entry: './App.js',
  output:{ 
	path: __dirname, // путь к каталогу выходных файлов
	filename: "bundle.js"  // название создаваемого файла 
}, 
  module: {
    rules: [
		{
			test: /\.js$/,
			use: {
				loader: "babel-loader"
		}
		},
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
	extractCSS
]
};