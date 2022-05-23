import mongoose from "mongoose";
import {generateRobohashAvatar }from "../helpers/avatar.js";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String },
  ip: { type: String },
  password: { type: String, required: true },
  avatar: { type: String, default: generateRobohashAvatar()},
  dates: {
    registered: {type:Date, default: Date.now(),last_active: Date }
   
  },
  messages: {type:Number}
});

const User = mongoose.model("User", UserSchema);

export default User;
