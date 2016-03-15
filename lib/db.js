var mongo = require('mongodb');
var monk = require('monk');
var config = require('../config');

var db = monk(config.database.connection);

module.exports = db;
