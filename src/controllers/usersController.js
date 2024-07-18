const User = require('../models/User');
const Order = require('../models/Order');

const getUsers = async (req, res) => {
  try {
    const query = req.query;
    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id };

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = undefined;
      query.$or = [{ first_name: id }, { last_name: id }, { age: id }];
    }

    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ error: 'User is not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id };

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = undefined;
      query.$or = [{ first_name: id }, { last_name: id }, { age: id }];
    }

    const user = await User.findOneAndUpdate(query, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User is not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id };

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = undefined;
      query.$or = [{ first_name: id }, { last_name: id }, { age: id }];
    }

    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ error: 'User is not found' });
    }

    const hasOrders = await Order.exists({ user_id: user._id });
    if (hasOrders) {
      return res.status(400).json({ error: 'Cannot delete user with associated orders' });
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id };

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = undefined;
      query.$or = [{ first_name: id }, { last_name: id }, { age: id }];
    }

    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ error: 'User is not found' });
    }
    const orders = await Order.find({ user_id: user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkInactiveUser = async (req, res) => {
  try {
    const query = req.query;
    query.active = false;
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ error: 'Inactive user not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserOrders,
  checkInactiveUser,
};
