const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../static-wrapper/libs'),
        filename: 'autocomplete-bundle.js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3001,
        open: true,
        hot: true,
    },
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
                test: /\.css$/i,
                use: [
                    'to-string-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: false, // Disable automatic handling of src attributes
                    minimize: true,
                    esModule: false, // Export HTML as CommonJS module (i.e., as a string)
                },
            },
        ],
    },
};