var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../../models/User');
var gravatar = require('gravatar');
var bcrypt = require('bcryptjs');
const keys = require('../../config/keys');

// load validation
var validateRegisterInput = require('../../../validation/register');
var validateLoginInput = require('../../../validation/login');

// @Route   POST /create/user
// @desc    Create user
// @access  Public
router.post('/signup', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // check validation
    if(!isValid) return res.status(400).json(errors);

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
                    password2: req.body.password2,
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
                return res.status(200).json({
                    msg: 'Success. ' +  req.body.name + ' has been registered.' 
                });
            }
        })
});

// @Route   POST /login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // check validation
    if(!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    // find user by emai
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
                                    return res.json({
                                        success: true,
                                        token: token
                                    })
                                }
                            );
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