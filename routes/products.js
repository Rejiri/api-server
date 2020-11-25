var express = require('express');
var router = express.Router();

const products = require("../controllers/product.js");
const { verify } = require("../helper/authenticate");

router.get('/', verify, products.getAll);
router.get('/:id', verify, products.getSingle);
router.put('/:id', verify, products.update);
router.delete('/:id', verify, products.delete);
router.post('/', verify, products.create);

module.exports = router;