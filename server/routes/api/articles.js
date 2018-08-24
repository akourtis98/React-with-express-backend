var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var Article = require('../../models/Articles');

// @Route   POST /create/article
// @desc    Create article
// @access  Private (only for admin)
router.post('/new', (req, res, next) => {
    console.log(req.body);

    const article = new Article({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        body: req.body.body
    });
    
    article.save()
        .then(article => res.send("article saved to db"))
        .catch(err => res.send(err));
});

/* GET articles. */
router.get('/all', function(req, res, next) {
    mongoose.model('articles').find( (err, articles) => {
        if(err){
            res.json(err);
        }else{
            res.json(articles);
        }
    })
});

/* GET article by title. */
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