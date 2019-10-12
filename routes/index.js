var express = require('express');
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  res.send("Hello World");
});

router.get('/me',passport.authenticate('jwt', {session: false}), function(req, res, next) {
  if (req.user) {
    res.json({result: req.user});
  }
  else {
    res.status(500).json({
      message: "Error"
    })
  }
});

module.exports = router;
