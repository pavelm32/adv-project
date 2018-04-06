const mongoose = require('mongoose');

module.exports.getArticles = function (req, res) {
    const blog = mongoose.model('blog');

    blog
        .find()
        .then(items => {
            if (!items.length) {
                res
                    .status(200)
                    .json({articles: []});
            } else {
                res
                    .status(200)
                    .json({articles: items});
            }
        });
};

module.exports.createArticle = function (req, res) {
    // создаем новую запись блога и передаем в нее поля из формы
    const Model = mongoose.model('blog');
    let item = new Model({
        name: req.body.name,
        date: new Date(req.body.date),
        html: req.body.html,
    });
    // сохраняем запись в базе
    item
        .save()
        .then(item => {
            return res
                .status(201)
                .json({status: 'Запись успешно добавлена'});
        }, err => {
            // обрабатываем  и отправляем
            res
                .status(404)
                .json({
                    status: 'При добавление записи произошла ошибка: ' + err,
                });
        });
};

module.exports.editArticle = function (req, res) {
    const id = req.params.id;

    let data = {
        name: req.body.name,
        date: new Date(req.body.date),
        html: req.body.html,
    };

    const Model = mongoose.model('blog');

    Model
        .findByIdAndUpdate(id, {$set: data})
        .then((item) => {
            if (item) {
                res
                    .status(200)
                    .json({status: 'Запись успешно обновлена'});
            } else {
                res
                    .status(404)
                    .json({status: 'Запись в БД не обнаружена'});
            }
        })
        .catch((err) => {
            res
                .status(404)
                .json({
                    status: 'При обновлении записи произошла ошибка: ' + err,
                });
        });
};

module.exports.deleteArticle = function (req, res) {
    const id = req.params.id;
    const Model = mongoose.model('blog');

    Model
        .findByIdAndRemove(id)
        .then((item) => {
            if (item) {
                res.status(200).json({status: 'Запись успешно удалена'});
            } else {
                res.status(404).json({status: 'Запись в БД не обнаружена'});
            }
        }, (err) => {
            res.status(404).json({
                status: 'При удалении записи произошла ошибка: ' + err,
            });
        });
}