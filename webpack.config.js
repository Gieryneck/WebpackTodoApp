// module.exports ZAWSZE definiujemy na koncu skryptu. W tym wypadku kolejność deklaracji MA ZNACZENIE


const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack'); // potrzebny do UglifyJSPlugin


var UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 
// UglifyJSPlugin zabezpiecza nasz kod przed osobami, które chciałby go skopiować i użyć w swoich projektach. 
//Pluginu nie trzeba pobierać - jest on częścią samego Webpacka. Dodatkowo mocno kompresujemy rozmiar paczki, np. nawet 4x.

var OptimizeJsPlugin = require('optimize-js-plugin');


// PONIZEJ: jesli wklepiemy  NODE_ENV=production npm start to dolaczymy dwa pluginy optymalizacyjne
// ktore sa nam potrzebne tylko w srodowisku "start": "webpack-dev-server --inline --hot --config ./webpack.config.js",produkcyjnym. 
// dzieki takiemu rozroznianiu srodowisk oszczedzamy czas nie kompilujac niepotrzebnych w danym momencie rzeczy

var env = process.env.NODE_ENV || 'development';
var plugins = [
new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: 'body',
    })
];

console.log('NODE_ENV:', env);

if (env === 'production') {

plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeJsPlugin({
      sourceMap: false
    })
  );
}



module.exports = {

    devtool: 'eval-source-map', // powoduje cross origin error, ale to nic. za to bledy sa wskazywane sensowniej
    
    entry: [
        'react-hot-loader/patch',
        './src/index.js'
    ],

    output: {

        path: path.resolve(__dirname, "build"), // __dirname = "./" czyli current path w ktorym jest webpack.config
        filename: 'App.bundle.js'
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                loader: 'babel-loader'
            },

            {
                test: /\.sass$/,
                use: [
                    
                    { loader: 'style-loader'},

                    {
                        loader: 'css-loader',
                        options: {

                            modules: true
                        }
                    },

                    { loader: 'sass-loader',
                        options: {

                            modules: true
                        }
                    }
                ]

                /*
                Parametr use to odpowiednik dla pojedynczego loader. Przyjmuje listę loaderów przez które musi przejść plik .css,
                 aby stać się modułem. Dzięki opcji module: true ustawionej na loaderze css-loader, Webpack nie tylko potrafi 
                 ładować pliki .css, ale także zmienia ich zasięg na lokalny (tzn. działa tylko w obrębie danego modułu,
                     w którym został zaimportowany). Dzięki temu nie musimy się martwić o to, że użyliśmy już jakiejś klasy.

                     2. Loader zmieni nazwę klasy className na module na ciag losowych znakow aby nazwy klas sie nie powtarzaly
                     w wynikowym pliku.
                */
            }
        ]
    },

    plugins: plugins // pluginy musimy zdefiniowac w module.exports
}








