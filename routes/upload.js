var express = require('express');
var router = express.Router();

var db = require('../lib/db');
var upload = require('../lib/upload');

router.use('/', upload.any(), function (req, res, next) {

  var files = req.files;

  var collection = db.get('files');
  var duplicates = [];

  var md5s = [];
  for (i in files) {
    md5s.push(files[i].md5);
  }

  collection.find({
      "md5": { "$in": md5s }
    },{},function(e,docs){
      for (i in docs) {
        for (j in files) {
          if (docs[i].md5 == files[j].md5) {
            duplicates = duplicates.concat(files.splice(j, 1));
          }
        }
      }

      if (files.length == 0) {
        res.render('upload', {files: {}, duplicates: duplicates});
      } else {
        // Submit to the DB
        collection.insert(files, function (err, doc) {
          if (err) {
            // If it failed, return error
            res.send(err);
          } else {

            res.render('upload', {files: doc, duplicates: duplicates});
          }
        });
      }
      // TODO: delete duplicated files uploaded
      //deleteDuplicates(duplicates);
  });

});

module.exports = router;
