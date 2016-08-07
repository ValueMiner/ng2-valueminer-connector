module.exports = function (config) {
    config.set({
        basePath: '.',
        /*
         * Frameworks to use
         *
         * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
         */
        frameworks: ['jasmine'],

        files: [ { pattern: './spec-bundle.js', watched: false } ],
        preprocessors: { './spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

        webpack: {
            devtool: 'source-map',
            module: {
                loaders: [
                    {
                        test: /\.ts/,
                        loaders: ['ts-loader'],
                        exclude: /node_modules/
                    }
                ]
            },
            resolve: {
                extensions: ["", ".js", ".ts"]
            }
        },
        // Webpack please don't spam the console when running in karma!
        webpackServer: { noInfo: true },

        /*
         * test results reporter to use
         *
         * possible values: 'dots', 'progress'
         * available reporters: https://npmjs.org/browse/keyword/karma-reporter
         */
        reporters: [ 'coverage' ],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        /*
         * level of logging
         * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
         */
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        /*
         * start these browsers
         * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
         */
        browsers: [
            'Chrome'
        ],

        /*
         * Continuous Integration mode
         * if true, Karma captures browsers, runs the tests and exits
         */
        singleRun: true
    });
};