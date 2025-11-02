import User from '../models/User.js';
import Log from '../models/Log.js';

export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin only' });
    }
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin only' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAllLogs = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin only' });
    }
    const logs = await Log.find().sort({ uploadedAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteLog = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin only' });
    }
    await Log.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
