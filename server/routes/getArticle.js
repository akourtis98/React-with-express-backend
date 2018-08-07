var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET articles. */
router.get('/:title', function(req, res, next) {
    mongoose.model('articles').findOne({ 'title': req.params.title },  (err, article) => {
    if(err){
        res.json(err);
    }else{
        res.json(article);
        }
    })
});

module.exports = router;
