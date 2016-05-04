import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonPromised from 'sinon-as-promised';
import promised from 'chai-as-promised';
import request from 'supertest';
import logger from '../src/server/app/logger';
import * as config from '../src/server/config/config';

chai.use(promised);
chai.use(sinonChai);

global.expect = chai.expect;
global.should = chai.should();
global.sinon = sinon;
global.request = request;

process.env.MM_CORE_HTTPS_PORT = 8444;
process.env.MM_CORE_HTTP_PORT = 8081;


config.load();
global.config = config;
