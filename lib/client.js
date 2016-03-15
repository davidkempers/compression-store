
var pkgcloud = require('pkgcloud');
var config = require('../config');

var client = pkgcloud.storage.createClient({
  provider: config.storage.provider,
  keyId: config.aws.accesskey, // access key id
  key: config.aws.secretkey, // secret key
  region: config.aws.region // region
});

module.exports = client;
