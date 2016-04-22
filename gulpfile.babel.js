'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import debug from 'gulp-debug';
import eslint from 'gulp-eslint';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import coveralls from 'gulp-coveralls';
import del from 'del';
import mainBowerFiles from 'main-bower-files';
import templateCache from 'gulp-angular-templatecache';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import { Server as KarmaServer } from 'karma';
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';

var isparta = require('isparta');

function clean() {
  return del([
    './dist'
  ]);
}
clean.displayName = 'clean';
gulp.task(clean);

function lint() {
  return gulp.src(['./server/**/*.js', './client/**/*.js', './test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
lint.displayName = 'lint';

function server() {
  let filterJS = filter(['**/*.js'], { restore: true });
  return gulp.src(['./server/**/*.{js,html}'])
    .pipe(filterJS)
    .pipe(babel())
    .pipe(filterJS.restore)
    .pipe(gulp.dest('./dist/server'));
}
server.displayName = 'server';
gulp.task(server);

function vendor() {
  let bowerFiles = mainBowerFiles();
  let filterCSS = filter(['**/*.css'], { restore: true });
  let filterJS = filter(['**/*.js', '!**/angular.js'], { restore: true });
  return gulp.src(bowerFiles)
    .pipe(filterCSS)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./dist/client'))
    .pipe(filterCSS.restore)
    .pipe(filterJS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/client'));
}
vendor.displayName = 'vendor';
gulp.task(vendor);

function templates() {
  return gulp.src(['./client/**/*.html'])
    .pipe(templateCache({
      root: 'modern-mean-core-material/',
      module: 'core'
    }))
    .pipe(gulp.dest('./dist/client'));
}
templates.displayName = 'templates';
gulp.task(templates);

function bootloader() {
  return gulp.src(['./client/app/core.client.app.loader.js'])
          .pipe(rename('bootloader.js'))
          .pipe(gulp.dest('./dist/client'));
}
bootloader.displayName = 'bootloader';
gulp.task(bootloader);

function angular() {
  let bowerFiles = mainBowerFiles();
  let angularJS = filter(['**/angular.js'], { restore: false });
  return gulp.src(bowerFiles)
    .pipe(angularJS)
    .pipe(rename('angular.js'))
    .pipe(gulp.dest('./dist/client'));
}
angular.displayName = 'angular';
gulp.task(angular);

function client() {
  let filterJS = filter(['**/*.js'], { restore: true }),
    filterCSS = filter(['**/*.css'], { restore: true });

  return gulp.src(['./client/**/*.module.js', './client/**/*.{js,css}', '!**/core.client.app.loader.js'])
    .pipe(filterJS)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./dist/client'))
    .pipe(filterJS.restore)
    .pipe(filterCSS)
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./dist/client'));
}
client.displayName = 'client';
gulp.task(client);

function images() {
  return gulp.src(['./client/**/*.{jpg,png,gif,ico}'])
  .pipe(imagemin({
        progressive: true,
        svgoPlugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ],
        use: [pngquant()]
      }))
    .pipe(gulp.dest('./dist/client'));
}
images.displayName = 'images';
gulp.task(images);


function testClientSingle(done) {
  process.env.NODE_ENV = 'test';
  new KarmaServer({
    configFile: process.cwd() + '/tests/karma.conf.js',
    singleRun: true
  }, done).start();
}
testClientSingle.displayName = 'test:client';
gulp.task(testClientSingle);

function testServerSingle(done) {
  gulp.src(['./server/**/*.js'])
  	.pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
  	.pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules())
  	.on('finish', function () {
  	  gulp.src(['./tests/server/**/*.js'])
      //.pipe(injectModules())
  		.pipe(mocha({
        reporter: 'spec',
        require: ['./tests/mocha.setup'],
      }))
  		.pipe(istanbul.writeReports(
        {
          dir: './tests/.coverage/server',
          reporters: [ 'lcov', 'html', 'text' ]
        }
      ))
      .once('error', () => {
        process.exit(1);
        return done();
      })
      .once('end', () => {
        return done();
      });
  	});
}
testServerSingle.displayName = 'test:server';
gulp.task(testServerSingle);


function sendCoveralls() {
  return gulp.src('tests/.coverage/**/lcov.info')
    .pipe(debug())
    .pipe(concat('lcov.info'))
    .pipe(coveralls());
}
sendCoveralls.displayName = 'coveralls';
gulp.task(sendCoveralls);


//Gulp Default
var defaultTask = gulp.series(clean, gulp.parallel(images, templates, client, vendor, server, bootloader, angular));
defaultTask.displayName = 'default';
gulp.task(defaultTask);

//Lint test
var lint = gulp.series(lint);
lint.displayName = 'lint';
gulp.task(lint);

//Gulp Test
var testTask = gulp.series(clean, defaultTask, lint, testClientSingle, testServerSingle);
testTask.displayName = 'test';
gulp.task(testTask);
