var express = require('express');
var router = express.Router();

// @Route   POST /login
// @desc    Login user
// @access  Public
router.post('/', (req, res, next) => {
    console.log(req.body);
});

module.exports = router;