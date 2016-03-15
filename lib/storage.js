var config = require('../config');
var multer  = require('multer');

var storage = function(options) {

  if (config.storage.provider == 'disk') {
    return multer.diskStorage(options);
  } else {
    var client = require('./client');
    // pkgcloud uses remote as the path
    options.remote = options.remote || options.path;
    return multer.cloudStorage({
      client: client,
      destination: options.destination
    });
  }
};

module.exports = storage;
