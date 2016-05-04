'use strict';

import app from '../../../src/server/app/init';
import expressModule from '../../../src/server/app/express';

let sandbox;

describe('/modules/core/server/app/init.js', () => {

  beforeEach(() => {
    return sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    return sandbox.restore();
  });

  it('should export app', () => {
    return app.should.be.an('object');
  });

  it('should have start property that is a function', () => {
    return app.start.should.be.a('function');
  });

  describe('app.start()', () => {

    describe('error', () => {

      let mockExpress;

      beforeEach(() => {
        mockExpress = sandbox.stub(expressModule, 'init').rejects();
      });

      afterEach(() => {
        return app.stop();
      });

      it('should reject the promise', () => {
        return app.start().should.be.rejected;
      });
    });

    describe('success', () => {

      let initStub, variablesStub, middlewareStub, engineStub, headersStub, modulesStub, coreStub, listenStub;

      beforeEach(() => {
        //Express Stubs
        initStub = sandbox.stub(expressModule, 'init').resolves();
        middlewareStub = sandbox.stub(expressModule, 'middleware').resolves();
        variablesStub = sandbox.stub(expressModule, 'variables').resolves();
        engineStub = sandbox.stub(expressModule, 'engine').resolves();
        headersStub = sandbox.stub(expressModule, 'headers').resolves();
        modulesStub = sandbox.stub(expressModule, 'modules').resolves();
        coreStub = sandbox.stub(expressModule, 'core').resolves();
        listenStub = sandbox.stub(expressModule, 'listen').resolves();

        return app.start();
      });

      afterEach(() => {
        return app.stop();
      });

      it('should initialize express', () => {
        initStub.should.have.been.called;
        middlewareStub.should.have.been.called;
        variablesStub.should.have.been.called;
        engineStub.should.have.been.called;
        headersStub.should.have.been.called;
        modulesStub.should.have.been.called;
        coreStub.should.have.been.called;
        return listenStub.should.have.been.called;
      });

      it('should resolve the promise', () => {
        let promise = app.start();
        return promise.should.be.fulfilled;
      });
    });

    describe('agent', () => {

      describe('http', () => {

        before(() => {
          return app.start();
        });

        after(() => {
          return app.stop();
        });

        it('should start the http server and be listening', done => {

          request(expressModule.getExpressApp())
            .get('/')
            .expect(200, done);
        });

      });

      describe('https', () => {

        before(() => {
          process.env.MM_CORE_HTTPS = 'true';
          config.load();
          return app.start();
        });

        after(() => {
          delete process.env.MM_CORE_HTTPS;
          config.load();
          return app.stop();
        });

        it('should start the http server and force redirect', done => {
          request(expressModule.getExpressApp())
            .get('/')
            .expect(301, done);
        });

      });



    });

  });

  it('should have stop property that is a function', () => {
    expect(app.stop).to.be.a('function');
  });

  describe('app.stop()', () => {

    describe('express failure', () => {
      let mockExpress;

      beforeEach(() => {
        mockExpress = sandbox.stub(expressModule, 'destroy').rejects();
      });

      it('should reject the promise', done => {
        app.stop()
          .catch(() => {
            done();
          });
      });
    });

  });
});
