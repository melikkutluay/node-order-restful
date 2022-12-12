const express = require('express');
const router = express.Router();
const order_cont = require('../controller/orders')
const auth = require('../middleware/auth')

router.get("/", auth, order_cont.order_get_all);
router.post("/", auth, order_cont.order_create);
router.get("/:orderId", auth, order_cont.order_get_Id);
router.post("/:orderId", auth, order_cont.order_create_from_Id);
router.delete("/:orderId", auth, order_cont.order_delete);

module.exports = router;