const express = require('express');
const router = express.Router();
const { validateUserQuery, validateUserBody, validate } = require('../middlewares/validators');
const { getUsers, getUser, createUser, updateUser, deleteUser, getUserOrders, checkInactiveUser } = require('../controllers/usersController');


router.get('/', validateUserQuery, validate, getUsers);
router.get('/:id', validateUserQuery, validate, getUser);
router.post('/', validateUserBody, validate, createUser);
router.put('/:id', validateUserQuery, validateUserBody, validate, updateUser);
router.delete('/:id', validateUserQuery, validate, deleteUser);


router.get('/:id/orders', validateUserQuery, validate, getUserOrders);
router.get('/inactive', validateUserQuery, validate, checkInactiveUser);

module.exports = router;
