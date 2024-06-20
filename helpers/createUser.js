const User = require("../models/userSchema");
const getUserPhoto = require("./getUserPhoto");
const handleError = require("./handleError");

module.exports = createUser = async (data) => {
  const { first_name, last_name, username, id } = data;
  try {
    const photo = await getUserPhoto(id);
    const newUser = new User({
      chatId: id,
      firstName: first_name,
      lastName: last_name,
      username,
      photo,
    });
    await newUser.save();
  } catch (error) {
    handleError(error, data);
  }
};
