const express = require('express');
const routes = require('../routes');
const router = express.Router();
const middleware = require('../middlewares');
const response = require('../controllers/globalresponse');

router.get(routes.home, response.home);

router.get(routes.test, response.test);

router.post(routes.getdata, response.getdata);

router.post(routes.uploadimg, middleware.cpUpload, response.uploadimg);

module.exports = router;
