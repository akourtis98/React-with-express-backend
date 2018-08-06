var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var Article = require('../models/Articles');

// @Route   POST /create/article
// @desc    Create article
// @access  Private (only for admin)
router.post('/article', (req, res, next) => {
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

module.exports = router;