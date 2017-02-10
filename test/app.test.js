'use strict';
/* eslint-disable no-undef, no-magic-numbers */

process.env.NODE_ENV = 'testing';
const PORT = 3030;

const assert = require('assert');
const axios = require('axios');
const app = require('../server/app');

describe('Node server:', function() {
  before(function(done) {
    this.server = app.listen(PORT);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  describe ('API proxying w/', function() {

    describe ('unauthed requests', function() {

      it('open endpoint', function(done) {
        axios.get(`http://localhost:${PORT}/`)
          .then(result => {
            assert.equal(result.status, 200);
            assert.equal(result.data, 'Hello world!');
            done();
          })
          .catch(done);
      });
    })
  })
});
