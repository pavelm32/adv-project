const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.serializeUser(function (user, done) {
    console.log('serializeUser: ', user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('deserialize: ', id);
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// локальная стратегия
passport.use(
    'loginUsers',
    new LocalStrategy(
        {
            usernameField: 'login',
            passReqToCallback: true
        },
        (req, username, password, done) => {
            User.findOne({ login: username })
                .then(user => {
                    if (!user) {
                        return done(
                            null,
                            false,
                            req.flash('message', 'Пользователь не найден')
                        );
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, req.flash('message', 'Не верный пароль'));
                    }
                    return done(null, user);
                })
                .catch(err => {
                    done(err);
                });
        }
    )
);