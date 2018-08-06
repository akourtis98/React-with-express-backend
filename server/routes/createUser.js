var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var User = require('../models/User');

// @Route   POST /create/user
// @desc    Create user
// @access  Public
router.post('/user', (req, res, next) => {
    console.log(req.body);

    const newUser = new User({
        name: req.body.name,
        password: req.body.password
    });
    
    newUser.save()
        .then(user => res.send("item saved to db"))
        .catch(err => res.send(err));
});

module.exports = router;