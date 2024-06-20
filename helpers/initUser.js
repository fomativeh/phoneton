const User = require("../models/userSchema");
const createUser = require("./createUser");
const getUserPhoto = require("./getUserPhoto");

module.exports = initUser = async (data) => {
  const { id } = data.from;
  try {
    const userExists = await User.findOne({ chatId: id });
    if (!userExists) {
      await createUser(data);
    }
  } catch (error) {
    console.log(error);
    data.reply("An error occured.");
  }
};
