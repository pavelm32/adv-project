const config = require('../config');
const http = require('axios');

module.exports.blog = function (req, res) {
    const pathAPI = '/api/blog';
    const requestOptions = {
        url: `http://${config.server.host}:${config.server.port}${pathAPI}`,
        method: 'GET',
        responseType: 'json',
    };
    const sendObj = {
        title: 'My Blog',
    };

    http(requestOptions)
        .then(function(response) {
            res.render('pages/blog', Object.assign({}, sendObj, response.data));
        },function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
};