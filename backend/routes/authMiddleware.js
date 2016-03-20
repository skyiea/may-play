module.exports = {
    authPage(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
    
        console.log('Unauthenticated request to Page:', req.url);
        res.redirect('/');
    },
    
    authAPI(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        console.log('Unauthenticated request to API:', req.url);
        return res.status(401).end();
    }
};