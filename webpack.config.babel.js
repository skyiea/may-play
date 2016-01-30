import webpack from 'webpack';
import path from 'path';

const APP_PATH = path.join(__dirname, 'app');

export default {
    entry: {
        app: path.join(APP_PATH, 'app.jsx')
    },
    output: {
        path: 'public/',
        publicPath: 'public/',
        sourceMapFilename: '[file].map',
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'babel',
                    'autoimport?config[]=checkIfUsed&' + [
                        'React=>react',
                        'ReactDOM=react-dom',
                        'classnames',
                        '_=lodash',
                        '{ReactClass}=react-core-decorators',
                        '{mixin}=react-core-decorators'
                    ].join(','),
                    'eslint'
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=8192&name=[name].[ext]'
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },
    resolve: {
        root: APP_PATH,
        extensions: [ '', '.js', '.jsx' ]
    },
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: JSON.stringify(process.env.NODE_ENV) !== '"production"'
        })
    ],
    devServer: {
        host    : 'localhost',
        port    : '3001',
        quiet   : false,
        noInfo  : false,
        proxy: {
            '*': 'http://localhost:3000/'
        },
        stats: {
            chunks      : false,
            chunkModules: false,
            timings     : true
        }
    }
};