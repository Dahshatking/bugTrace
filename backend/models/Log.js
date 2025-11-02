import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectName: { type: String },
  fileName: { type: String },
  content: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  analyzed: { type: Boolean, default: false }
});

export default mongoose.model('Log', LogSchema);
