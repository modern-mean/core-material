'use strict';

import mongoose from 'mongoose';
import globby from 'globby';
import path from 'path';
import logger from './logger';
import { config } from '../config/config';

mongoose.Promise = global.Promise;

if (config.mongoose.debug === 'true') {
  logger.debug('Mongoose::Debug::Enabled');
  mongoose.set('debug', true);
}

//Database Connection
let db;

function connect() {
  return new Promise((resolve, reject) => {

    if (mongoose.connection.readyState !== 0) {
      logger.info('Mongoose::Connect::Already Connected');
      return resolve(mongoose);
    }

    mongoose.connect(config.mongoose.uri + config.mongoose.db, config.mongoose.options, function (err) {
      if (err) {
        return reject(err);
      }
    });

    mongoose.connection.once('connected', function () {
      logger.info('Mongoose::Connect::Success');
      return resolve(mongoose);
    });

  });
}

function disconnect() {
  return new Promise(function (resolve, reject) {
    logger.debug('Mongoose::Disconnect::Start');
    if (mongoose.connection.readyState === 0) {
      logger.info('Mongoose::Disconnect::Not Connected');
      return resolve();
    }

    mongoose.disconnect(function (err) {
      if (err) {
        return reject(err);
      }
    });

    mongoose.connection.once('disconnected', function () {
      logger.info('Mongoose::Disconnect::Success');
      db = undefined;
      return resolve();
    });

  });
}


let service = { connect: connect, disconnect: disconnect, mongoose: mongoose };

export default service;
export { connect, disconnect, mongoose };
