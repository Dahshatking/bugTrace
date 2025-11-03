import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["developer", "admin"], default: "developer" },
  createdAt: { type: Date, default: Date.now },
});

// Optional index for faster lookups
UserSchema.index({ email: 1 });

export default mongoose.model("User", UserSchema);
