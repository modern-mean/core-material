'use strict';

import gulp from 'gulp';
import * as modules from 'modern-mean-build-gulp/dist/modules';
import { clientConfig as config } from './src/server/config/config';



function setTest(done) {
  process.env.NODE_ENV = 'test';
  process.env.MM_MONGOOSE_DB = 'modern-mean-test';
  return done();
}

function clientConfig(done) {
  process.env.MM_MODULE_CLIENT_CONSTANTS = JSON.stringify(config.constants);
  process.env.MM_MODULE_CLIENT_VALUES = JSON.stringify(config.values);
  process.env.MM_MODULE_ROOT = 'modern-mean-core-material';
  process.env.MM_MODULE_ANGULAR = 'core';
  return done();
}




//Build Client
let client = gulp.series(modules.client.clean, clientConfig, modules.client.build, modules.client.angular, modules.client.bootloader);
client.displayName = 'client';
gulp.task(client);

//Build Server
let server = gulp.series(modules.server.clean, gulp.parallel(modules.server.application));
server.displayName = 'server';
gulp.task(server);

//Gulp Default
//let defaultTask = gulp.series(modules.clean, modules.server.config, gulp.parallel(modules.client.build, modules.server.build));
let defaultTask = gulp.parallel(client, server);
defaultTask.displayName = 'default';
gulp.task(defaultTask);

//Gulp Watch
let watch = gulp.series(defaultTask, modules.watch.all);
watch.displayName = 'watch';
gulp.task(watch);

//Gulp Lint
let lint = gulp.series(modules.lint.all);
lint.displayName = 'lint';
gulp.task(lint);

//Gulp Test
let testTask = gulp.series(modules.lint.all, defaultTask, modules.test.client, modules.test.server);
testTask.displayName = 'test';
gulp.task(testTask);

//Gulp TestClient
let testClient = gulp.series(modules.lint.client, defaultTask, modules.test.client);
testClient.displayName = 'test:client';
gulp.task(testClient);

//Gulp TestServer
let testServer = gulp.series(modules.lint.server, defaultTask, modules.test.server);
testServer.displayName = 'test:server';
gulp.task(testServer);

//Gulp Coverage
let coverage = gulp.series(modules.test.coverage);
coverage.displayName = 'coverage';
gulp.task(coverage);

//Gulp Clean
let clean = gulp.series(modules.clean);
clean.displayName = 'clean';
gulp.task(clean);
