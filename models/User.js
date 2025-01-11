import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: { type: String, required: false, unique: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
