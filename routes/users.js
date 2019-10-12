var express = require("express");
var User = require("../models/user");
var passwordHash = require("password-hash");
var router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

/* GET users listing. */
router.get("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      console.log(user);
      const userJSON = user.toJSON();
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(JSON.stringify(userJSON), "your_jwt_secret");
      return res.json({ userJSON, token });
    });
  })(req, res);
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
