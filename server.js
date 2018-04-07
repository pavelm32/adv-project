const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');

require('./config/db');


const app = express();
const index = require('./routes/index');
const indexApi = require('./api/routes/index')


app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/templates'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: 'loftschool',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null,
    },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
}));

require('./config/config-passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/api', indexApi);

app.use(history({
    disableDotRule: true,
    verbose: true,
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => {
    console.log('server is running on port: 3000');
});