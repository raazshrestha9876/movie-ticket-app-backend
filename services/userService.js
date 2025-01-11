import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  //check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return newUser;
};

export const loginUser = async (email, password) => {
  //check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  //validate password
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  //generate JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
  return { token, user };
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const updateUserProfile = async (
  userId,
  updateData
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  //update fields
  if (updateData.name) {
    user.name = updateData.name;
  }
  if (updateData.email) {
    user.email = updateData.email;
  }
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(updateData.password, salt);
    user.password = hashedPassword;
  }
  //save changes
  await user.save();
  return user;
};

export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

