const express = require("express");
const handleError = require("../helpers/handleError");
const getUserPhoto = require("../helpers/getUserPhoto");
const User = require("../models/userSchema");
const userRouter = express.Router();

//Create a user
userRouter.post("/new", async (req, res) => {
  const { username, firstName, lastName, chatId } = req.body;
  if (!username || !firstName || !lastName || !chatId) {
    return res
      .status(404)
      .json({ success: false, error: "Please fill all fields." });
  }

  try {
    //Check if user already exists
    const userExists = await User.findOne({ chatId });
    if (userExists) {
      return res.status(200).json({ success: true, data: userExists });
    }
    
    const photo = await getUserPhoto(chatId);

    const newUser = new User({
      username,
      firstName,
      lastName,
      chatId,
      photo,
    });

    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

//Fetch a user
userRouter.get("/:chatId", async (req, res) => {
  const { chatId } = req.params;
  try {
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required." });
    }

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

//Fetch all users
userRouter.get("/", (req, res) => {});

//Update a user's account
userRouter.patch("/:chatId", async (req, res) => {
  const { chatId } = req.params;
  const { updateDetails } = req.body;
  try {
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required." });
    }

    if (!updateDetails) {
      return res
        .status(404)
        .json({ success: false, error: "Please provide details to update." });
    }

    const user = await User.findOne({ chatId });
    if (!user) {
      return res.status(401).json({ success: false, error: "User not found." });
    }

    let updatedUser = await User.findOneAndUpdate(
      { chatId },
      { $set: updateDetails },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

module.exports = userRouter;
