import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  projectName: { type: String, required: true },
  fileName: { type: String },
  content: { type: String, required: true }, // log content
  errorType: { type: String }, // optional AI-tagged type
  uploadedAt: { type: Date, default: Date.now },
  analyzed: { type: Boolean, default: false },
});

export default mongoose.model("Log", LogSchema);
