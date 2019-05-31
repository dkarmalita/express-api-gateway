const express = require('express');

const account = require('../controller/account');
// const foodtruck = require('../controller/foodtruck');

const router = express();

// api routes v1
router.use('/account', account({ /* config, db */ }))
// router.use('/foodtruck', foodtruck({ config, db }))

module.exports = router;