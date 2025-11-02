import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema({
  log: { type: mongoose.Schema.Types.ObjectId, ref: 'Log', required: true },
  errorCategory: { type: String },
  confidence: { type: Number, default: 0 },
  possibleCauses: [String],
  suggestions: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Analysis', AnalysisSchema);
