const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('views', './src/templates');
app.set('view engine', 'pug');

app.get(['/', '/:pageName'], (req, res) => {
    let pageName = req.params.pageName;
    if (!pageName) pageName = 'index';

    res.render(`pages/${pageName}.pug`, (err, html) => {
        if (err) {
            if (err.message.indexOf('Failed to lookup view') !== -1) {
                return res.send('Страница не найдена');
            }
            throw err;
        }
        res.send(html);
    });
});

app.listen(3000, () => {
    console.log('server is running on port: 3000');
});
