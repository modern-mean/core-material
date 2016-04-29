'use strict';

let config;

function load() {
  return config = {
    app: {
      title: process.env.MEAN_CORE_TITLE || 'MODERN-MEAN',
      description: process.env.MEAN_CORE_DESCRIPTION || 'Full-Stacka JavaScript with MongoDB, Express, AngularJS, and Node.js',
      keywords: process.env.MEAN_CORE_KEYWORDS || 'mongodb, express, angularjs, node.js, mongoose, passport',
      logo: process.env.MEAN_CORE_LOGO || '/dist/img/core/client/img/brand/logo.png',
      favicon: process.env.MEAN_CORE_FAVICON || '/dist/img/core/client/img/brand/favicon.ico',
    },
    express: {
      host: process.env.MEAN_CORE_HOST || '0.0.0.0',
      http: {
        port: process.env.MEAN_CORE_HTTP_PORT || '8080',
      },
      https: {
        enable: process.env.MEAN_CORE_HTTPS || 'false', //Enabling SSL makes the entire site forced over SSL.
        port: process.env.MEAN_CORE_HTTPS_PORT || '8443',
        options: {
          key: process.env.MEAN_CORE_HTTPS_KEY || __dirname + '/../ssl/key.pem',
          cert: process.env.MEAN_CORE_HTTPS_CERT || __dirname + '/../ssl/cert.pem'
        }
      },
      livereload: process.env.MEAN_CORE_LIVERELOAD || 'false'
    },
    logs: {
      //https://github.com/expressjs/morgan
      morgan: {
        format: process.env.MEAN_CORE_MORGAN_FORMAT || process.env.MEAN_MORGAN_FORMAT || 'short'
      },
      //https://github.com/winstonjs/winston
      winston: {
        level:  process.env.MEAN_CORE_WINSTON_LEVEL || process.env.MEAN_WINSTON_LEVEL || 'info', //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
        file: process.env.MEAN_CORE_WINSTON_FILE || process.env.MEAN_WINSTON_FILE || './logs/core.log',
        console: process.env.MEAN_CORE_WINSTON_CONSOLE || process.env.MEAN_WINSTON_CONSOLE || 'true'
      }
    },
    modules: {
      core: process.env.MEAN_CORE_MODULES_CORE || '../core.module.js',
      custom: process.env.MEAN_CORE_MODULES_CUSTOM || ['./modules/*/dist/server/!(*core).module.js', './node_modules/modern-mean-*/dist/server/!(*core).module.js']
    },
    mongoose: {
      uri: process.env.MEAN_CORE_MONGOOSE_URI || 'mongodb://localhost/',
      db: process.env.MEAN_CORE_MONGOOSE_DB || 'modern-mean-dev',
      options: {
        user: process.env.MEAN_CORE_MONGOOSE_USER || '',
        pass: process.env.MEAN_CORE_MONGOOSE_DB || ''
      },
      // Enable mongoose debug mode
      debug: process.env.MEAN_CORE_MONGOOSE_DEBUG || 'false'
    }
  };
}

load();

export { load, config };
