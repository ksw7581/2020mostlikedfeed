const express = require('express');
const routes = require('../routes');
const router = express.Router();
const response = require('../controllers/globalresponse');

router.get(routes.home, response.home);

router.get(routes.test, response.test);

router.post(routes.getdata, response.getdata);

module.exports = router;
