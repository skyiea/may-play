const User = require('../models/userModel');
const mongoStore = require('../modules/mongoStore');

module.exports = function (sid) {
    return new Promise((resolve) => {
        mongoStore.get(sid, (error, session) => {
            if (session.passport) {
                User.findById(session.passport.user, (err, user) => {
                    if (user) {
                        resolve(user.local.username);
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    });
};