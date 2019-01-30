require('babel-runtime/core-js/promise').default = require('bluebird');
require('babel-core/register');
module.exports = require('./app.js');