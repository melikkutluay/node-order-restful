const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const productCont = require('../controller/products');

router.get("/", auth, productCont.product_get_all);

router.post("/", auth, productCont.product_create);

router.get("/:productId", auth, productCont.product_get_Id);

router.patch("/:productId", auth, productCont.product_update);

router.delete("/:productId", auth, productCont.product_delete);

module.exports = router;
