import Log from '../models/Log.js';

export const uploadLog = async (req, res) => {
  try {
    const { projectName, fileName, content } = req.body;
    if (!content) return res.status(400).json({ msg: 'Log content required' });

    const log = new Log({
      user: req.user._id,
      projectName,
      fileName,
      content
    });

    await log.save();
    res.json(log);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user._id }).sort({ uploadedAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: 'Log not found' });
    if (log.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    res.json(log);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteLog = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: 'Log not found' });
    if (log.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    await log.deleteOne();
    res.json({ msg: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateLog = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: 'Log not found' });
    if (log.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { projectName, fileName, content } = req.body;
    log.projectName = projectName ?? log.projectName;
    log.fileName = fileName ?? log.fileName;
    log.content = content ?? log.content;

    await log.save();
    res.json(log);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
