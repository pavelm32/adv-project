//const nodemailer = require('nodemailer');
//const config = require('../config.json');

const mongoose = require('mongoose');
const passport = require('passport');

module.exports.index = function (req, res) {
    const sendObj = {
        title: 'Главная страница',
        msg: req.flash('message'),
        auth: req.isAuthenticated(),
    };
    res.render('pages/index', Object.assign({}, sendObj));
};

module.exports.auth = function (req, res, next) {
    passport.authenticate('loginUsers', (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('message', ' укажите правильный логин и пароль!');
            return res.redirect('/');
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/admin');
        });
    })(req, res, next);
};

/*module.exports.sendEmail = function(req, res) {
    // требуем наличия имени, обратной почты и текста
    if (!req.body.name || !req.body.email || !req.body.text) {
        //если что-либо не указано - сообщаем об этом
        return res.redirect('/?msg=Все поля нужно заполнить!');
    }
    // инициализируем модуль для отправки писем и указываем данные из конфига
    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
        from: `"${req.body.name}" <${req.body.email}>`,
        to: config.mail.smtp.auth.user,
        subject: config.mail.subject,
        text: req
            .body
            .text
            .trim()
            .slice(0, 500) + `\n Отправлено с: <${req.body.email}>`
    };
    // отправляем почту
    transporter.sendMail(mailOptions, function (error, info) {
        //если есть ошибки при отправке - сообщаем об этом
        if (error) {
            return res.redirect('/?msg=При отправке письма произошла ошибка: ' + error);
        }
        res.redirect('/?msg=Письмо успешно отправлено');
    });
}*/