'use strict';
/* eslint-disable no-magic-numbers */

const chalk = require('chalk');

module.exports = (err, req, res) => {
  if (err.status !== 404) {
    const errStatus = err.status ? `(${err.status}) ` : '';
    console.error(chalk.red(`${errStatus}Route: ${req.url} - ${err.message}`))
    console.error(chalk.red(err.stack))
  }
  res.status(err.status || 500).send(err.message || 'Internal server error.');
};
