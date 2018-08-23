var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

// load validation validateEduInput
var validateProfileInput = require('../../validation/Profile');
var validateExpInput = require('../../validation/Experience');
var validateEduInput = require('../../validation/Education');

// Models
var Profile = require('../models/Profile');
var User = require('../models/User');

/* GET profile. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// @Route   GET profile
// @desc    Get current users profile
// @access  Private
router.get('/', 
    passport.authenticate('jwt', { session: false }), 
        (req, res) => {
            const errors = {};
            
            Profile.findOne({ user : req.user.id })
                .populate('user', ['name', 'avatar'])
                .then(profile => {
                    if(!profile) {
                        errors.noprofile = 'There is no profile for this user.';
                        return res.status(404).json(errors)
                    }
                    res.json(profile);
                })
                .catch(err => res.status(404).json(err));
        });

// @Route   GET profiles
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if(!profiles) {
                errors.noprofile = 'There are no profiles.';
                return res.status(404).json();
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json({ profile: 'There are no profiles.'}));
})
// @Route   GET profile/handle/:handle
// @desc    Get user profile
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user.'
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @Route   GET profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user.'
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        
        .catch(err => res.status(404).json({ profile: 'There is no profile for this user.' }));
});

// @Route   POST profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', 
    passport.authenticate('jwt', { session: false }), 
        (req, res) => {
            const { errors, isValid } = validateProfileInput(req.body);

            // check validation
            if(!isValid){
                //return erors with 400
                return res.status(400).json(errors);
            }

            const profileFields = {};

            profileFields.user = req.user.id;
            if(req.body.handle) profileFields.handle = req.body.handle;
            if(req.body.company) profileFields.company = req.body.company;
            if(req.body.location) profileFields.location = req.body.location;
            if(req.body.bio) profileFields.bio = req.body.bio;
            if(req.body.status) profileFields.status = req.body.status;
            if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
            // skills - Split into array
            if (typeof req.body.skills !== 'undefined') {
                profileFields.skills = req.body.skills.split(',');
            }

            // Social
            profileFields.social = {};
            if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
            if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
            if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
            if(req.body.facebook) profileFields.social.facebook = req.body.facebook;

            Profile.findOne({ user: req.user.id })
                .then(profile => {
                    if(profile){
                        // update
                        Profile.findOneAndUpdate(
                            { user: req.user.id }, 
                            { $set: profileFields }, 
                            { new: true }
                        )
                        .then(profile => res.json(profile));
                    } else {
                        // create

                        // check if handle exists
                        Profile.findOne({ handle: profileFields.handle })
                            .then(profile => {
                                if(profile) {
                                    errors.handle = 'That handle already exists';
                                    res.status(400).json(errors);
                                }

                                // Save Profile
                                new Profile(profileFields)
                                    .save()
                                    .then(profile => res.json(profile)); 
                            })
                    }
                });
});

// @Route   POST profile/experience
// @desc    add experience to profile
// @access  Private
router.post('/experience', 
passport.authenticate('jwt', { session: false }), 
        (req, res) => {
            const { errors, isValid } = validateExpInput(req.body);

            if(!isValid) res.status(400).json(errors);

            Profile.findOne({ user: req.user.user_id})
                .then(profile => {
                    const newExp = {
                        title: req.body.title,
                        company: req.body.company,
                        location: req.body.location,
                        from: req.body.from,
                        to: req.body.to,
                        current: req.body.current,
                        description: req.body.description
                    }
                    // add to exp array
                    profile.experience.unshift(newExp);

                    profile.save().then(profile => res.json(profile));
                })
        });

        
// @Route   POST profile/education
// @desc    add education to profile
// @access  Private
router.post('/education', 
passport.authenticate('jwt', { session: false }), 
        (req, res) => {
            const { errors, isValid } = validateEduInput(req.body);

            if(!isValid) res.status(400).json(errors);

            Profile.findOne({ user: req.user.user_id})
                .then(profile => {
                    const newEdu = {
                        school: req.body.school,
                        degree: req.body.degree,
                        fieldofstudy: req.body.fieldofstudy,
                        from: req.body.from,
                        to: req.body.to,
                        current: req.body.current,
                        description: req.body.description
                    }
                    // add to exp array
                    profile.education.unshift(newEdu);

                    profile.save().then(profile => res.json(profile));
                })
        });

// @Route   DELETE profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', 
passport.authenticate('jwt', { session: false }), 
        (req, res) => {

            Profile.findOne({ user: req.user.user_id})
                .then(profile => {
                    // get remove index
                    const removeIndex = profile.experience
                        .map(item => item.id)
                        .indexOf(req.params.exp_id);

                        // splice out of array
                        profile.experience.splice(removeIndex, 1);

                        // save
                        profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
    });

// @Route   DELETE profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', 
passport.authenticate('jwt', { session: false }), 
        (req, res) => {

            Profile.findOne({ user: req.user.user_id})
                .then(profile => {
                    // get remove index
                    const removeIndex = profile.education
                        .map(item => item.id)
                        .indexOf(req.params.edu_id);

                    // splice out of array
                    profile.education.splice(removeIndex, 1);

                    // save
                    profile.save().then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
    });

// @Route   DELETE profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/', 
passport.authenticate('jwt', { session: false }), 
        (req, res) => {
            Profile.findOneAndRemove({ user: req.user.id })
                .then(() => {
                    User.findOneAndRemove({ _id: req.user.id })
                        .then(() => res.json({ successs: true }))
                })
    });

module.exports = router;