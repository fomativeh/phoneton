const User = require("../models/userSchema");
const getUserPhoto = require("./getUserPhoto");
const handleError = require("./handleError");

module.exports = createUser = async (data) => {
  const { first_name, last_name, username, id } = data.from;
  try {
    const photo = await getUserPhoto(id);
    // automatically begin new mining cycle

    const startTime = new Date();
    const expectedEndTime = new Date(startTime.getTime() + 6 * 60 * 60 * 1000); // 6 hours later
    // const expectedEndTime = new Date(startTime.getTime() + 4 * 60 * 1000); // 5 minutes later
    const newUser = new User({
      chatId: id,
      firstName: first_name,
      lastName: last_name,
      username,
      photo,
      mineTimerStart: startTime,
      mineTimerEnd: expectedEndTime,
    });

    await newUser.save();
  } catch (error) {
    handleError(error, data);
  }
};
