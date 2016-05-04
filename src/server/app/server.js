'use strict';

import app from './init';
import logger from './logger';

app.start()
  .then(function (app) {
    logger.info('Modern-MEAN started Successfully');
  })
  .catch(function (err) {
    logger.error(err);
    app.stop();
  });
