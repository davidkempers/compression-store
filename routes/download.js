var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var download = require('../lib/download');

var zipstream = require('zip-stream');
var client = require('../lib/download');

var archiver = require('archiver');

function createDownload(files, cb) {
  var collection = db.get('downloads');
  collection.insert({ files: files }, cb);
}

function getDownload(id, options, cb) {
  var collection = db.get('downloads');
  collection.findOne({"_id": id},function(e,doc) {
    if (e || !doc) {
      return cb(e);
    }
    createArchive(doc.files, options, cb);

  });
}

function getFiles(files, cb) {
  var ObjectID = require('mongodb').ObjectID;
  files = [].concat(files).map(function (item){
    return ObjectID(item);
  });
  var collection = db.get('files');
  collection.find({_id: { $in: files }}, cb);
}

function createArchive(files, options, cb) {
  var archiveOpts = options;
  getFiles(files, function(e,files) {

      if (e) {return cb(e);}
      var archive = archiver('zip', archiveOpts);
      var length = 0;
      for (i in files) {
        var file = files[i];
        var stream = download({
          container: file.container,
          path: file.path,
          remote: file.remote
        });
        file.name = file.name || file.originalname;
        archive.append(stream, file);

        // bit of a hack to get the length
        var fileheaderLength = 30 + file.name.length + (file.comment ? file.comment.length : 0);
        var dataDescriptorLength = 16;
        var generalDirectoryHeaderLength = fileheaderLength + 16;
        length += fileheaderLength + file.compressedSize + dataDescriptorLength + generalDirectoryHeaderLength;
      }

      archive.finalize();
      // add footer length
      archive.length = length + 22;
      cb(null, archive);

    });
}

/* GET download listing. */
router.get('/', function(req, res, next) {

  var start = 0;
  var end = null;

  if (req.headers.range) {
    var ranges = req.headers.range.replace('bytes=', '').split('-');
    start = ranges.shift();
    end = ranges.shift();
  }

  var download_id = req.query.id;

  getDownload(download_id, {range: {start: start, end: end}}, function(e, archive) {


    if (e) {
      res.send(e);
    } else {

        var length = archive.length;

        if (req.headers.range) {
          res.status(206);
          end = end || length -1 ;
          res.setHeader('Content-Range', 'bytes ' + start + '-' + end + '/' + length);
          length = end - start + 1;
        }

        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-disposition', 'attachment; filename="arm-download-' + download_id + '.zip"');
        //res.setHeader('Pragma', 'public');
        //res.setHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0');
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('ETag', download_id);
        res.setHeader('Date', new Date(Date.now()).toUTCString());
        if (length) {
          res.setHeader('Content-Length', length);
        }
        archive.pipe(res);
      }
  });
});

// create a bundle
router.post('/', function(req, res) {

  // make sure it's an array
  var files = [].concat(req.body.file);

  createDownload(files, function(err, doc) {
    if (err) {
      res.json(err);
    } else {
      var download_id = doc._id;
      getFiles(files, function(e, files) {
        res.render('download', {
          download_id: download_id,
          files:files
        });
      });
    }
  });
});

module.exports = router;
