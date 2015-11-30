import webpack from 'webpack';
import path from 'path';

const output_options = {
    chunks      : false,
    chunkModules: false,
    colors      : true,
    timings     : true
};

const app_path = path.join(__dirname, 'app/');

export default {
    entry: {
        app: path.join(app_path, 'app.jsx')
    },
    output: {
        path        : 'public/',
        publicPath  : 'public/',
        filename    : '[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: [
                    'react-hot',
                    'babel?optional[]=es7.classProperties&optional[]=es7.objectRestSpread&optional[]=es7.decorators',
                    'autoimport?config[]=checkIfUsed&' + [
                        'React=>react',
                        'ReactDOM=react-dom',
                        '_=lodash',
                        'classnames',
                        '{ReactClass}=react-core-decorators'
                    ].join(','),
                    'eslint'
                ].join('!')
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=8192&name=[name].[ext]'
            },
            {
                test: /\.(eot|ttf|woff|svg|svgz|otf)$/,
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },
    resolve: {
        root: app_path,
        extensions: [ '', '.js', '.jsx' ]
    },
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: JSON.stringify(process.env.NODE_ENV) !== '"production"'
        })
    ],
    stats: output_options,
    devServer: {
        host    : 'localhost',
        port    : '1234',
        quiet   : false,
        noInfo  : false,
        proxy: {
            '*': 'http://localhost:3000/'
        },
        stats: output_options
    }
};