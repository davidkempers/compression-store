var express = require('express');
var router = express.Router();
var db = require('../lib/db')

/* GET homepage listing. */
router.get('/', function(req, res, next) {

  var collection = db.get('files');
  collection.find({},{},function(e,docs) {
    res.render('index', {files: docs});
  });
});

module.exports = router;
