var express = require('express');
var router = express.Router();
var User = require("../models/user");
const passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  res.send("Hello World");
});

router.get('/me',passport.authenticate('jwt', {session: false}), async function(req, res, next) {
  if (req.user) {
    let user = await User.findOne({_id: req.user._id});
    res.json({result: user});
  }
  else {
    res.status(500).json({
      message: "Error"
    })
  }
});

module.exports = router;
