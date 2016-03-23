import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';

const APP_PATH = path.join(__dirname, 'frontend');
const isCamelCasedSCSS = /([A-Z][a-z0-9]*)+\.scss$/;

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
                        '{PropTypes}=react',
                        'ReactDOM=react-dom',
                        'classnames',
                        'CSSModules=react-css-modules',
                        '{ReactClass}=react-core-decorators',
                        '{mixin}=react-core-decorators'
                    ].join(','),
                    'eslint'
                ]
            },
            {
                test: /\.scss$/,
                exclude: isCamelCasedSCSS,
                loaders: [
                    'style',
                    'css',
                    'postcss',
                    'sass'
                ]
            },
            {
                test: isCamelCasedSCSS,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
                    'postcss',
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
    postcss() {
        return [
            autoprefixer({
                browsers: [
                    // default prefixing
                    '> 1%', 'last 2 versions', 'Firefox ESR',
                    // excluding unsupported IE
                    'not ie < 10'
                ]
            })
        ];
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