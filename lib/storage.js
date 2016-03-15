var config = require('../config');
var client = require('./client');
var multer  = require('multer');

var storage = function(options) {

  if (config.storage.provider == 'disk') {
    return multer.diskStorage(options);
  } else {
    // pkgcloud uses remote as the path
    options.remote = options.remote || options.path;
    return multer.cloudStorage({
      client: client,
      destination: options.destination
    });
  }
};


module.exports = storage;
