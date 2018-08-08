var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcryptjs');
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// @Route   POST /login
// @desc    Login user
// @access  Public
router.post('/', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // find user by email   
    User.findOne({ email })
        .then(user => {
            if(!user) 
                return res.status(404).json({ email: 'user not found'})
            else {
                bcrypt.compare(password, user.password)
                    .then(isMatched => {
                        if(isMatched){ // user matched 
                            const payload = { // jwt payload
                                id: user.id, 
                                name: user.name, 
                                avatar: user.avatar 
                            } 

                            
                            jwt.sign( // sign token
                                payload, 
                                keys.secretOrKey, 
                                { expiresIn: 3600 }, (err, token) => 
                                res.json({
                                    success: true,
                                    token: token
                                })
                            );

                        }
                        else return res.status(400)
                            .json({ password: 'Password is incorrect' });
                    })
            }
        })
});

module.exports = router;