const express = require('express');
const routes = require('../routes');
const router = express.Router();
const middleware = require('../middlewares');
const response = require('../controllers/globalresponse');

router.get(routes.home, response.home);

router.post(routes.getdata, response.getdata);

router.post(routes.uploadimg, middleware.cpUpload, response.uploadimg);

router.get(routes.isforeign, response.isforeign)

module.exports = router;
