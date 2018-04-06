const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index');
const ctrlBlog = require('../controllers/blog');
const ctrlAbout = require('../controllers/about');
const ctrlAdmin = require('../controllers/admin');
const ctrlWorks = require('../controllers/works');

router.get('/', ctrlHome.index);
router.post('/', ctrlHome.auth);
//router.post('/mail', ctrlHome.sendEmail);

router.get('/blog', ctrlBlog.blog);

router.get('/about', ctrlAbout.about);
router.get('/works', ctrlWorks.works);

router.get('/admin', ctrlAdmin.admin);

module.exports = router;