const User = require("../models/userSchema");
const showMenu = require("../showMenu");
const alreadyReferred = require("./alreadyReferred");
const createUser = require("./createUser");
const handleError = require("./handleError");

module.exports = handleReferral = async (data) => {
  try {
    let inviteId = data.payload;
    //If user clicked a forged link
    if (isNaN(inviteId)) {
      return await data.reply(
        "Sorry that link is invalid. Please check and try again."
      );
    }

    inviteId = parseInt(inviteId);

    const chatId = data.from.id;

    //Check if link owner exists
    const referrer = await User.findOne({ chatId: inviteId });
    if (!referrer) {
      return await data.reply(
        "Sorry that link is invalid. Please check and try again."
      );
    }

    //If user clicked their own link
    if (inviteId === chatId) {
      return await data.reply("You cannot refer yourself.");
    }

    //Check if user already has an account
    const userExists = await User.findOne({chatId})
    if (userExists) {
      return await data.reply("You already have an account.");
    }

    // Check if user has already been referred
    const alreadyReferredCheck = await alreadyReferred(chatId);

    //If an error prevented checking
    if (alreadyReferredCheck.error) {
      return await data.reply("An error occured.");
    }

    //If they've already been referred by someone
    if (alreadyReferredCheck.result) {
      return await data.reply("You already have an account.");
    }

    //Process referral
    referrer.referrals.push({chatId, commission:0});
    await referrer.save();

    //Create user account
    await createUser(data)

    await showMenu(data)
  } catch (error) {
    console.log(error)
    handleError(error, data);
  }
};
