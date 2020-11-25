var express = require('express');
var router = express.Router();

const account = require("../controllers/account.js");

router.post('/signup', account.signup);
router.post('/signin', account.signin);

module.exports = router;
