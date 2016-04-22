'use strict';

import winston from 'winston';
import { config } from '../config/config';

let logger

function init() {
  return new Promise((resolve, reject) => {
    let transports = [];

    if (config.logs.winston.file) {
      transports.push(new (winston.transports.File)({ filename: config.logs.winston.file }));
    }

    if (config.logs.winston.console) {
      transports.push(new (winston.transports.Console)());
    }

    logger = new (winston.Logger)({
      level: config.logs.winston.level,
      transports: transports
    });

    return resolve();
  });
}

let service = { init: init };

export { init };
export default service;
