import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

const User = mongoose.model("User", userSchema);

export default User;
