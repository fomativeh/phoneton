const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    chatId: Number,
    firstName: String,
    lastName: String,
    username: String,
    photo: String,
    mineBalance: {
      type: Number,
      default: 0,
    },
    unclaimedMineBalance: { type: Number, default: 0 },
    referralBalance: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    referrals: [],
    task1Done: {
      type: Boolean,
      default: false,
    },
    task2Done: {
      type: Boolean,
      default: false,
    },
    task3Done: {
      type: Boolean,
      default: false,
    },
    task1Credited: {
      type: Boolean,
      default: false,
    },
    task2Credited: {
      type: Boolean,
      default: false,
    },
    task3Credited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
