import Log from '../models/Log.js';
import Analysis from '../models/Analysis.js';

export const summary = async (req, res) => {
  try {
    const totalLogs = await Log.countDocuments({ user: req.user._id });
    const analyzed = await Log.countDocuments({ user: req.user._id, analyzed: true });
    res.json({ totalLogs, analyzed });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const errorTypes = async (req, res) => {
  try {
    const pipeline = [
      { $lookup: { from: 'logs', localField: 'log', foreignField: '_id', as: 'log' } },
      { $unwind: '$log' },
      { $match: { 'log.user': req.user._id } },
      { $group: { _id: '$errorCategory', count: { $sum: 1 } } },
    ];
    const result = await Analysis.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const trends = async (req, res) => {
  try {
    const pipeline = [
      { $lookup: { from: 'logs', localField: 'log', foreignField: '_id', as: 'log' } },
      { $unwind: '$log' },
      { $match: { 'log.user': req.user._id } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ];
    const result = await Analysis.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const projects = async (req, res) => {
  try {
    const pipeline = [
      { $match: { user: req.user._id } },
      { $group: { _id: '$projectName', count: { $sum: 1 } } },
    ];
    const result = await Log.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
