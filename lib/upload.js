
var config = require('../config');
var storage = require('./storage');
var multer  = require('multer');

var preprocess = multer.preprocess;

var destination = config.storage.provider == 'disk' ? config.storage.path : function(req, file, cb) {
  cb(null, {
      container: config.aws.container,
      path: config.storage.path,
      remote: Date.now() + file.originalname + '.' + config.compression
  });
}

var filename = function (req, file, cb) {
  cb(null, Date.now() + file.originalname + '.' + config.compression);
}

var upload = multer({
  storage: storage({
    destination: destination,
    filename: filename
  }),
  preprocessors: [
    preprocess.extract(),
    preprocess.size(),
    preprocess.digest('md5', 'hex'),
    preprocess.digest('crc', 'hex'),
    preprocess.compress(config.compression, { level:9}),
    preprocess.size(),
    preprocess.digest('md5', 'hex'),
    function(file, fileStream, cb) {
      // do someother processing
      // ...
      // then callback
      cb(file, fileStream);
    }
  ]
});

module.exports = upload;
