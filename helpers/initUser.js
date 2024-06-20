const User = require("../models/userSchema");
const getUserPhoto = require("./getUserPhoto");

module.exports = initUser = async (data) => {
  const { id, first_name, last_name, username } = data.from;
  try {
    const userExists = await User.findOne({ chatId: id });
    if (!userExists) {
      const photo = await getUserPhoto(id);
      const newUser = new User({
        chatId: id,
        firstName: first_name,
        lastName: last_name,
        username,
        photo
      });
      await newUser.save();
    }
  } catch (error) {
    console.log(error);
    data.reply("An error occured.");
  }
};
