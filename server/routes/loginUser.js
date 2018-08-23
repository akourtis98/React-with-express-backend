var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcryptjs');
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// load input validation
var validateLoginInput = require('../../validation/login');

// @Route   POST /login
// @desc    Login user
// @access  Public
router.post('/', (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // check validation
    if(!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    // find user by email   
    User.findOne({ email })
        .then(user => {
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json( errors )
            }
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
                                { expiresIn: 3600 }, (err, token) => {
                                    console.log('token: ' + token);
                                    res.json({
                                        success: true,
                                        token: token
                                    })
                                }
                            );
                            return res.status(200).json({
                                msg: 'Success. ' +  user.name + ' has been signed in.' 
                            });
                        }
                        else {
                            errors.password = 'Password incorrect';
                            return res.status(400)
                            .json( errors );
                        }
                    })
            }
        })
});

module.exports = router;