const express   = require('express');
const path      = require('path');

const { authPage } = require('../middlewares/authMiddleware');

module.exports = function (app, passport) {
    const api = require('./apiRoutes')(passport);

    app.use('/public', express.static('public'));
    app.use('/api', api);

    const securedRoutes = [
        'profile(\/*)*',
        'home'
    ];

    app.get(new RegExp(`\/(${securedRoutes.join('|')})`), authPage, (req, res, next) => {
        next();
    });

    app.get('/favicon.png', (req, res) => {
        res.sendFile(path.resolve('favicon.png'));
    });

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'));
    });
};