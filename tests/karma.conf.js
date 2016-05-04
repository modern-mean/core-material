import lodash from 'lodash';

let karmaReporters = ['progress'];
karmaReporters.push('coverage');

// Karma configuration
module.exports = function (karmaConfig) {
  let karmaFiles = [];

  karmaFiles.push('karma.setup.js');
  karmaFiles.push('../dist/client/angular.js');
  karmaFiles.push('../bower_components/angular-mocks/angular-mocks.js');
  karmaFiles.push('../bower_components/angular-material/angular-material-mocks.js');
  karmaFiles = lodash.union(karmaFiles, ['../src/client/app/core.client.app.loader.js', '../src/client/**/*.module.js', '../src/client/**/!(*module).js', '../tests/client/**/*.js']);
  karmaFiles.push('../dist/client/vendor.js');
  karmaFiles.push('../dist/client/templates.js');


  karmaConfig.set({
    client: {
      captureConsole: false,
    },

    // Frameworks to use
    frameworks: ['browserify', 'mocha'],

    preprocessors: {
      'karma.setup.js': [ 'browserify' ],
      '../src/client/views/**/*.html': ['ng-html2js'],
      '../src/client/**/*.js': ['coverage']
    },
    browserify: {
      debug: true,
      transform: [ 'babelify' ]
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'modernMean',

      cacheIdFromPath: function (filepath) {
        return filepath;
      },
    },

    // List of files / patterns to load in the browser
    files: karmaFiles,

    // Test results reporter to use
    // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: karmaReporters,

    // Configure the coverage reporter
    coverageReporter: {
      dir: '.coverage/client',
      reporters: [
        // Reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        // Output coverage to console
        { type: 'text' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },

    // Web server port
    port: 9876,

    // Enable / disable colors in the output (reporters and logs)
    colors: true,

    // Level of logging
    // Possible values: karmaConfig.LOG_DISABLE || karmaConfig.LOG_ERROR || karmaConfig.LOG_WARN || karmaConfig.LOG_INFO || karmaConfig.LOG_DEBUG
    logLevel: process.env.KARMA_LOG || karmaConfig.LOG_DISABLE,

    // Enable / disable watching file and executing tests whenever any file changes

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    customContextFile: 'karma.context.html'


  });
};
