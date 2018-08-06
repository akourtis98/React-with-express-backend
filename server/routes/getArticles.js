var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET articles. */
router.get('/', function(req, res, next) {
  mongoose.model('articles').find( (err, articles) => {
    if(err){
      res.json(err);
    }else{
      res.json(articles);
    }
  })
});

module.exports = router;
