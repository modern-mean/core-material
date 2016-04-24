'use strict';

import winston from 'winston';
import { config } from '../config/config';

let logger;

if (logger === undefined) {
  let transports = [];

  if (config.logs.winston.file === 'true') {
    transports.push(new (winston.transports.File)({ filename: config.logs.winston.file }));
  }

  if (config.logs.winston.console === 'true') {
    transports.push(new (winston.transports.Console)());
  }

  logger = new (winston.Logger)({
    level: config.logs.winston.level,
    transports: transports
  });
}

let service = { logger: logger };

export { logger };
export default logger;
