var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src/scripts");

var config = {
    entry: SRC_DIR + "/utilities/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [{        
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            {
                test: /.css$/,
                use: ExtractTextPlugin.extract({
                        use: ["css-loader",'sass-loader']               
                     })
            }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "bundle.css",
            disable: false,
            allChunks: true
         })]
};

module.exports = config;