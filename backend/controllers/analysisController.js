import Log from '../models/Log.js';
import Analysis from '../models/Analysis.js';
import aiEngine from '../services/aiEngine.js';
import parser from '../services/parser.js';

export const analyzeLog = async (req, res) => {
  try {
    const { logId, content } = req.body;

    let log;
    if (logId) {
      log = await Log.findById(logId);
      if (!log) return res.status(404).json({ msg: 'Log not found' });
      if (log.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ msg: 'Access denied' });
      }
    } else if (content) {
      // Create a temporary log object (not saved in DB)
      log = { content, user: req.user._id };
    } else {
      return res.status(400).json({ msg: 'Provide logId or content' });
    }

    // Preprocess/parse log
    const parsed = parser.parseLog(log.content);

    // Analyze log content using AI engine (stub or real implementation)
    const result = await aiEngine.analyze(parsed);

    // Save analysis only if logId exists
    let analysisDoc = null;
    if (logId) {
      analysisDoc = new Analysis({
        log: log._id,
        errorCategory: result.errorCategory,
        confidence: result.confidence,
        possibleCauses: result.possibleCauses,
        suggestions: result.suggestions
      });
      await analysisDoc.save();

      await Log.findByIdAndUpdate(log._id, { analyzed: true });
    }

    res.json({
      analysis: result,
      analysisId: analysisDoc?._id ?? null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAnalysisByLogId = async (req, res) => {
  try {
    const { logId } = req.params;
    const analysis = await Analysis.findOne({ log: logId });
    if (!analysis) return res.status(404).json({ msg: 'No analysis found for this log' });
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAnalyses = async (req, res) => {
  try {
    // Find analyses for logs that belong to the logged-in user
    const analyses = await Analysis.find()
      .populate({ path: 'log', match: { user: req.user._id } })
      .sort({ createdAt: -1 });

    // Filter out analyses with unmatched logs
    const filtered = analyses.filter(a => a.log != null);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
