const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    createOrder,
    getOrders,
    getOrderById,
    getOrdersByUser,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');


// Protected routes
router.use(authMiddleware);


router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.get('/user/:userId', getOrdersByUser);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
