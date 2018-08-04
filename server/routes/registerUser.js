const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @Route   POST /register
// @desc    Register user
// @access  Public
router.post('/', (req, res) => {
    User.findOne({ name: req.body.name })
        .then(user => {
            if(user) {
                return res.status(400).json({name: 'Name already exists'});
            }else {

                const newUser = new User({
                    name: req.body.name,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

module.exports = router;