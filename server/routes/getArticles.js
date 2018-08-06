var express = require('express');
var router = express.Router();

/* GET articles. */
router.get('/', function(req, res, next) {
  res.json([
    {
      id: 1, 
      title: "lorem",
      author: "alex",
      date: "april 22 1998",
      body: "lorem ipsum dolor sit amet"
    },
    {
      id: 1, 
      title: "asdf",
      author: "sadf",
      date: "sadf 22 1998",
      body: "lsdfdsaffdfafmet"
    }
  ])
});

module.exports = router;
