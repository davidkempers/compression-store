var deepDefaults = require('deep-defaults');

var config = {
  database: {
    connection: process.env.DATABASEHOST + ':' + process.env.DATABASEPORT + '/' + process.env.DATABASENAME
  },
  storage: {
    provider: process.env.STORAGEPROVIDER,
    path: process.env.STORAGEPATH
  },
  aws: {
    accesskey: process.env.AWSACCESSKEY,
    secretkey: process.env.AWSSECRETKEY,
    region: process.env.AWSREGION,
    container: process.env.AWSCONTAINER
  }

}

var defaults = {
  database: {
    connection: (process.env.DATABASEHOST || 'database') + ':' + (process.env.DATABASEPORT || '27017') + '/' + (process.env.DATABASENAME || 'compressionstore')
  },
  storage: {
    provider: process.env.STORAGEPROVIDER || 'disk',
    path: process.env.STORAGEPATH || './uploads/'
  },
  compression: 'deflate', // only support deflate for now
  aws: {
    accesskey: process.env.AWSACCESSKEY,
    secretkey: process.env.AWSSECRETKEY,
    region: process.env.AWSREGION,
    container: process.env.AWSCONTAINER
  }
};

module.exports = deepDefaults(defaults, config);
