'use strict';

import logger from './app/logger';
import routes from './routes/core.server.routes';



function init(app) {
  return new Promise(function (resolve, reject) {
    logger.debug('Core::Init::Start');
    routes.init(app)
      .then(function (app) {
        logger.verbose('Core::Init::Success');
        return resolve(app);
      })
      .catch(function (err) {
        logger.error(err);
        return reject(err);
      });
  });

}

let service = { init: init };

export default service;
export { init };
