var config = require('../config');
var fs = require('fs');
var http = require('http');

var download = function(options) {
  if (config.storage.provider == 'disk') {

    return fs.createReadStream(options.path, options);

  } else if (config.storage.provider == 'http') {

    //TODO: maybe support this

  } else {

    var client = require('./client');
    return client.download({
      container: config.aws.container,
      remote: options.remote
    });

  }
}

module.exports = download;
