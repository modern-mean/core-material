'use strict';

import logger from './logger';
import express from './express';

function start() {
  return new Promise(function (resolve, reject) {
    logger.verbose('Init::Start');
    express.init()
      .then(function (app) {
        return Promise.all([express.variables(app), express.middleware(app), express.engine(app), express.headers(app)])
                .then(() => app)
                .catch(err => reject(err));
      })
      .then(express.modules)
      .then(express.core)
      .then(express.listen)
      .then(function (app) {
        logger.verbose('Express::Done::Success');
        resolve(app);
      })
      .catch(function (err) {
        return reject(err);
        logger.error(err);
      });
  });
}

function stop() {
  return new Promise(function (resolve, reject) {
    Promise.all([express.destroy()])
      .then(function () {
        logger.verbose('MEAN::Stop::Success');
        resolve();
      })
      .catch(function (err) {
        logger.error(err);
        reject(err);
      });
  });
}

let service = { start: start, stop: stop };
export default service;

export { start, stop };
