// Karma configuration
// Generated on Tue Jul 28 2015 18:32:32 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        "src/components/angular/angular.js",
        "src/components/angular-bootstrap/ui-bootstrap-tpls.js",
        "src/components/angular-loading-bar/build/loading-bar.js",
        "src/components/angular-ui-router/release/angular-ui-router.js",
        "src/components/angular-mocks/angular-mocks.js",
        "src/components/lodash/lodash.js",
        "src/app/services/index.js",
        "src/app/**/*.js",
        "src/app/**/*.htm",
        "src/app/**/*.html",
        "src/app/**/*.spec.js"
    ],

    exclude: [
        "src/app/bootstrap.js"
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        "src/app/**/*.htm": ["ng-html2js"],
        "src/app/**/*.html": ["ng-html2js"]
    },

    ngHtml2JsPreprocessor: {
        moduleName: "templates",
        stripPrefix: "src/"
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
