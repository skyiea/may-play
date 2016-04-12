const express   = require('express');
const path      = require('path');

const { authPage } = require('./authMiddleware');

module.exports = function (app, passport) {
    const api = require('./api')(passport);

    app.use('/public', express.static('public'));
    app.use('/api', api);

    app.get('/profile*', authPage, (req, res, next) => {
        next();
    });
    
    app.get('/favicon.png', (req, res) => {
        res.sendFile(path.resolve('favicon.png'));
    });

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'));
    });
};