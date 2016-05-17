const express = require('express');

const User                  = require('../models/user');
const { authAPI }           = require('../middlewares/authMiddleware');
const ProfileChangeStatus   = require('../../universal/ProfileChangeStatus');
const Constants             = require('../../universal/Constants');

const api = express.Router();

module.exports = function (passport) {
    'use strict';

    api.post('/signup',
        (req, res, next) => {
            passport.authenticate('local-signup', (err, user, payload) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.status(409).json({
                        message: payload
                    });
                }

                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }

                    return res.status(302).json({
                        location: Constants.INDEX_ROUTE.USER
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
                        location: Constants.INDEX_ROUTE.USER
                    });
                });
            })(req, res, next);
        }
    );

    api.post('/logout', (req, res) => {
        req.logout();

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

        const {
            username: newUsername,
            email   : newEmail,
            password: newPassword
        } = body;

        console.log(newUsername, newEmail, newPassword);

        function save() {
            if (newUsername) {
                user.local.username = newUsername;
            }

            if (newEmail) {
                user.local.email = newEmail;
            }

            if (newPassword) {
                user.local.password = user.generateHash(newPassword);
            }

            user.save((err) => {
                if (err) {
                    throw err;
                }

                res.json({
                    username: user.local.username,
                    email   : user.local.email
                });
            });
        }

        const usernameExistsPromise = !newUsername ?
            Promise.resolve(false) :
            new Promise((resolve) => {
                User.findOne({ 'local.username': newUsername }, (error, user) => {
                    if (error) {
                        done(error);
                    } else {
                        resolve(!!user);
                    }
                });
            });

        const emailExistsPromise = !newEmail ?
            Promise.resolve(false) :
            new Promise((resolve) => {
                User.findOne({ 'local.email': newEmail }, (error, user) => {
                    if (error) {
                        done(error);
                    } else {
                        resolve(!!user);
                    }
                });
            });

        Promise.all([ usernameExistsPromise, emailExistsPromise ]).then(([ usernameExists, emailExists ]) => {
            if (usernameExists || emailExists) {
                let message;

                if (usernameExists) {
                    message = ProfileChangeStatus.USER_ALREADY_EXISTS;
                }

                if (emailExists) {
                    const emailError = ProfileChangeStatus.EMAIL_ALREADY_USED;

                    if (message) {
                        message = [ message, emailError ];
                    } else {
                        message = emailError;
                    }
                }

                res.status(409).json({
                    message
                });
            } else {
                save();
            }
        });
    });

    return api;
};