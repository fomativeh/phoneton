const User = require("../models/userSchema");
const handleError = require("./handleError");
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const isUserInChannel = require("./isUserInChannel");
const verifyTask1 = async (chatId, eachUser) => {
  const channelId = process.env.CHANNEL_1_ID; // Replace with the actual chat ID of the channel // Replace with the actual user ID

  const result = await isUserInChannel(channelId, chatId, bot);
  if (result.error) {
    console.log("Error checking channel 1 membership.");
  } else if (result.isMember) {
    //user is a member of the channel

    //Credit user if they haven't been credited
    if (!eachUser.task1Credited) {
      eachUser.mineBalance += 20;
      eachUser.task1Credited = true;
    }

    if (!eachUser.task1Done) {
      eachUser.task1Done = true;
    }
    await eachUser.save();
  } else {
    // console.log("User left channel 1");
    //user is not a member of the channel

    //Recover profit because they left the channel
    if (eachUser.task1Credited) {
      eachUser.mineBalance -= 20;
      eachUser.task1Credited = false;
      eachUser.task1Done = false;
    }
    await eachUser.save();
  }
};

const verifyTask2 = async (chatId, eachUser) => {
  const channelId = process.env.CHANNEL_2_ID; // Replace with the actual chat ID of the channel // Replace with the actual user ID

  const result = await isUserInChannel(channelId, chatId, bot);
  if (result.error) {
    console.log("Error checking channel 2 membership.");
  } else if (result.isMember) {
    //user is a member of the channel

    //Credit user if they haven't been credited
    if (!eachUser.task2Credited) {
      eachUser.mineBalance += 20;
      eachUser.task2Credited = true;
    }

    if (!eachUser.task2Done) {
      eachUser.task2Done = true;
    }
    await eachUser.save();
  } else {
    // console.log("User left channel 2");
    //user is not a member of the channel

    //Recover profit because they left the channel
    if(eachUser.task2Credited){
      eachUser.mineBalance -= 20;
      eachUser.task2Credited = false;
      eachUser.task2Done = false;
    }
    await eachUser.save();
  }
};

module.exports = verifyTasks = async () => {
  try {
    const allUsers = await User.find();

    allUsers.forEach(async (eachUser) => {
      //Verify task 1
      const { chatId } = eachUser;
      await verifyTask1(chatId, eachUser);
      await verifyTask2(chatId, eachUser);

      if (!eachUser.task3Credited) {
        //First check if they haven't been credited for task 3
        if (eachUser.referrals.length >= 3) {
          //Then check process task 3
          eachUser.task3Done = true;
          eachUser.mineBalance += 150;
          eachUser.task3Credited = true;
        }
      }
      await eachUser.save();
    });

    verifyTasks();
  } catch (error) {
    handleError(error);
  }
};
