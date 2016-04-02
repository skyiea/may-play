const express = require('express');

const { authAPI } = require('./authMiddleware');

const api = express.Router();

module.exports = function (passport) {
    api.post('/signup',
        (req, res, next) => {
            passport.authenticate('local-signup', (err, user, payload) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.status(400).json({
                        message: payload
                    });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }

                    return res.status(302).json({
                        location: '/profile'
                    });
                });
            })(req, res, next);
        }
    );

    api.post('/login',
        (req, res, next) => {
            passport.authenticate('local-login', (err, user, payload) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.status(400).json({
                        message: payload
                    });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }

                    return res.status(302).json({
                        location: '/profile'
                    });
                });
            })(req, res, next);
        }
    );

    api.post('/logout', (req, res) => {
        req.logout();
        // not cleared automatically
        res.clearCookie('connect.sid', '/');

        res.status(302).json({
            location: '/'
        });
    });

    api.get('/profile', authAPI, (req, res) => {
        const { username, email } = req.user.local;

        res.json({
            username,
            email
        });
    });

    api.post('/profile', authAPI, (req, res) => {
        const { user, body } = req;
        const promises = [];

        if (body.username) {
            promises.push(new Promise((resolve, reject) => {
                User.findOne({ 'local.username': body.username }, (err, user) => {
                    if (user) {
                        reject();
                    } else {
                        resolve();
                    }
                });
            }));
        }

        if (body.email) {
            user.local.email = body.email;
        }

        if (body.password) {
            user.local.password = user.generateHash(body.password);
        }

        user.save((err) => {
            if (err) {
                throw err;
            }

            res.end();
        });
    });

    return api;
};