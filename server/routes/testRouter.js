var express = require('express');
var router = express.Router();
var passport = require('passport')

// @Route   GET /current
// @desc    Return current user
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        res.json(req.user);
});

module.exports = router;