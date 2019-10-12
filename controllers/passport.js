const passport = require("passport");
const passwordHash = require("password-hash");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, cb) {
      return User.findOne({ username })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Incorrect username" });
          }

          if (passwordHash.verify(password, user.password)) {
            return cb(null, user, { message: "Logged In Successfully" });
          } else {
            return cb(null, false, { message: "Incorrect password" });
          }
        })
        .catch(err => cb(err));
    }
  )
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findById(jwtPayload._id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));