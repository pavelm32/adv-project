module.exports.admin = function (req, res) {
    res.render('pages/admin', {
        title: 'Admin panel',
    });
}