import Analysis from '../models/Analysis.js';

export const getRecommendations = async (req, res) => {
  try {
    const { logId } = req.params;
    const analysis = await Analysis.findOne({ log: logId });
    if (!analysis) return res.status(404).json({ msg: 'Analysis not found' });

    res.json({
      suggestions: analysis.suggestions,
      possibleCauses: analysis.possibleCauses,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const { logId, feedback, helpful } = req.body;
    // For now, just log feedback — later, store to DB and use for retraining
    console.log('Feedback for', logId, { feedback, helpful, by: req.user._id });
    res.json({ msg: 'Feedback received' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
