var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var User = require('../models/User');
var gravatar = require('gravatar');
var bcrypt = require('bcryptjs');

// @Route   POST /create/user
// @desc    Create user
// @access  Public
router.post('/user', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({ email: 'email already exists'});
            }else{
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // size
                    r: 'pg', // rating
                    d: 'mm' // default
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar
                });

                bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        })
                })
            }
        })
});

module.exports = router;