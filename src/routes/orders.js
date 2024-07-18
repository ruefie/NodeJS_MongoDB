const express = require('express');
const router = express.Router();
const { validateOrderQuery, validateOrderBody, validate } = require('../middlewares/validators');
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/ordersController');


router.get('/', validateOrderQuery, validate, getOrders);
router.get('/:id', validateOrderQuery, validate, getOrder);
router.post('/', validateOrderBody, validate, createOrder);
router.put('/:id', validateOrderQuery, validateOrderBody, validate, updateOrder);
router.delete('/:id', validateOrderQuery, validate, deleteOrder);

module.exports = router;
