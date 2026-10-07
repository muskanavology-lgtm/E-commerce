const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const { protect, admin } = require('../middleware/authMiddleware');
router.post('/', protect, async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }
  else {
    const order = new Order({
      user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
router.get('/:id', protect, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});
router.get('/', protect, admin, async (req, res) =>{
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});
module.exports = router;
