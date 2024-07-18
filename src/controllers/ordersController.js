const Order = require('../models/Order');

const getOrders = async (req, res) => {
  try {
    const query = req.query;
    const orders = await Order.find(query);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id };

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = undefined;
      query.$or = [{ price: id }, { date: id }, { user_id: id }];
    }

    const order = await Order.findOne(query);
    if (!order) {
      return res.status(404).json({ error: 'Order is not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id };

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = undefined;
      query.$or = [{ price: id }, { date: id }, { user_id: id }];
    }

    const order = await Order.findOneAndUpdate(query, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order is not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id };

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = undefined;
      query.$or = [{ price: id }, { date: id }, { user_id: id }];
    }

    const order = await Order.findOne(query);
    if (!order) {
      return res.status(404).json({ error: 'Order is not found' });
    }

    await Order.deleteOne({ _id: order._id });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
