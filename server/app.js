'use strict';
/* eslint-disable no-console */

// Set up express server
const express = require('express');
const app = express();
const morgan = require('morgan');
const chalk = require('chalk');
const favicon = require('serve-favicon');
const path = require('path');
const PATHS = {
  indexHTML: path.join(__dirname, '../dist/index.html'),
  serverBundle: path.join(__dirname, '../dist/server-bundle.js'),
  dist: path.join(__dirname, '../dist'),
  serviceWorker: path.join(__dirname, '../dist/service-worker.js')
}

const LOCAL_PORT = 3030;
const PORT = process.env.PORT || LOCAL_PORT;
const isProd = process.env.NODE_ENV === 'production'

// Logging and favicon middleware
app.use(morgan(isProd ? 'tiny' : 'dev'));
app.use(favicon('./public/favicon.ico'))

// Serve static files w/ 30-day caching on prod
const cacheOptions = {};
if (isProd) cacheOptions.maxage = '30d';
app.use('/dist', express.static(PATHS.dist, cacheOptions));
app.use(express.static(PATHS.serviceWorker, cacheOptions));

if (process.env.NODE_ENV !== 'testing') {

  // Initialize server-side rendering and index.html build
  let indexHTML;
  let renderer;
  const {
    ssr,
    createRenderer,
    parseIndex
  } = require('./middleware/vue-renderer.js');
  if (isProd) {
    // in production: create server renderer and index HTML from real fs
    const fs = require('fs');
    renderer = createRenderer(fs.readFileSync(PATHS.serverBundle, 'utf-8'));
    indexHTML = parseIndex(fs.readFileSync(PATHS.indexHTML, 'utf-8'));
  } else {
    // in development: setup the dev server with watch and hot-reload,
    // and update renderer / index HTML on file change.
    require('../build/setup-dev-server')(app, {
      bundleUpdated: bundle => {
        renderer = createRenderer(bundle);
      },
      indexUpdated: index => {
        indexHTML = parseIndex(index);
      }
    })
  }

  // Serve sever-rendered Vue app
  app.get('/*', (...args) => ssr.apply({ renderer, indexHTML }, args));

  // Start the server
  app.listen(PORT, function () {
    console.log(chalk.magenta(`Server started on port ${chalk.cyan(PORT)}`));
  });
} else {
  app.get('/*', (req, res) => res.send('Hello world!'));
}

// Error handler
app.use(require('./middleware/error-handler'));

module.exports = app;
