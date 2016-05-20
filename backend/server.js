const passport = require('passport');

const app = require('express')();
const PORT = 3000;

require('./config/configConsoleColors');
require('./config/configPassport')(passport);

app.
    use(require('morgan')('dev')).
    use(require('cookie-parser')()).
    use(require('body-parser').json()).
    use(require('./middlewares/sessionMiddleware')).
    use(passport.initialize()).
    use(passport.session());

require('./routes/routes')(app, passport);

const server = app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:%s'.blue, PORT);
});

require('./ws/configWebSockets')(server);