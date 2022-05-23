import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: string, required: true, unique },
  firstname: { type: string, required: true },
  lastname: { type: string },
  ip: { type: string },
  hash: { type: string, required: true },
  avatar: { type: string, default: generateRobohashAvatar() },
  dates: {
    registered: date,
    default: Date.now(),
    last_active: date,
  },
  messages: number,
});

const User = mongoose.model("user", UserSchema);

export default User;
