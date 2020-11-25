var express = require('express');
var router = express.Router();

const user = require("../controllers/user.js");
const { verify } = require("../helper/authenticate");

router.get('/', verify, user.getAll);
router.get('/:id', verify, user.getSingle);
router.put('/:id', verify, user.update);
router.delete('/:id', verify, user.delete);
router.post('/', verify, user.create);

module.exports = router;