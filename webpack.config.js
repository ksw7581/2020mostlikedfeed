const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();
const mode = process.env.MODE;

module.exports = {
    name: '2020mostlikedfeed',
    mode: mode,
    devtool: 'eval',
    devServer: {
        hot: true,
        inline: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public/'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        app: ['./public/index'],
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR']
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
                ]
            },
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/dist/index.html'),
        })
    ],
    output: {
        publicPath: '/',
        filename: 'main.js',
        path: path.join(__dirname, 'public/dist'),
    },
}
