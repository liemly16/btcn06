var express = require("express");
var User = require("../models/user");
var passwordHash = require("password-hash");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", function(req, res, next) {
  let user = new User({
    username: req.body.username,
    password: passwordHash.generate(req.body.password)
  });

  user
    .save()
    .then(u => {
      res.json({
        result: u
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Error" });
    });
});

module.exports = router;
