var jwt = require('jwt-simple');
const passport = require('passport');
var models = require('./models/mysql-models');
const BearerStrategy = require('passport-http-bearer').Strategy;
const appConfig = require(__dirname + '/config/app-config');

passport.use(new BearerStrategy(
  function(token, done) {
    try {
      let userFromJWT = jwt.decode(token, appConfig.jwtsecret);

      models.User.findOne({
        where: { id: userFromJWT.id }
      }).then(user => {
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    } catch (error) {
      return done(null, false);
    }
  }
));

exports.authenticated = function(req, res, next){
  passport.authenticate('bearer', { session: false }, function(err, user, info) {
    if (err) { return next(err) }

    if (!user) { return res.json({ errors: 'Invalid Token' }) }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
        return next();
    });

  })(req, res, next)
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
