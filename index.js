const { Telegraf } = require("telegraf");
require("dotenv").config();
const express = require("express");
const app = express();
const { Schema, model, default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Queue = require("queue-promise");
const userRouter = require("./routes/userRouter");
const initUser = require("./helpers/initUser");
const handleError = require("./helpers/handleError");
const handleReferral = require("./helpers/handleReferral");
const User = require("./models/userSchema");
const verifyTasks = require("./helpers/verifyTasks");
const showMenu = require("./showMenu");
// const extractChatIds = require("./test");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Create a queue instance
const queue = new Queue({
  concurrent: 25, // Process one request at a time
  interval: 3000, // Interval between dequeue operations (1 second)
});

app.use(
  cors({
    origin: "*",
  })
);

// Parse URL-encoded bodies (deprecated in Express v4.16+)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(express.json());

//Routes
app.use("/users", userRouter);

app.get("/claim-referrals/:chatId", async (req, res) => {
  const { chatId } = req.params;
  if (!chatId) {
    return res
      .status(401)
      .json({ success: false, error: "Chat id is required." });
  }

  try {
    const userDetails = await User.findOne({ chatId });
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, error: "User does not exist." });
    }

    let amountEarnedFromReferrals;

    //Sum commissions and reset
    userDetails.referrals.forEach((eachReferredPerson) => {
      amountEarnedFromReferrals += eachReferredPerson.commission;
      eachReferredPerson.commission = 0;
    });

    //Add referral income to mined balance
    userDetails.mineBalance += amountEarnedFromReferrals;

    await userDetails.save();

    return res
      .status(200)
      .json({ success: true, data: "Referral income claimed." });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

app.get("/claim-mine/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return res
        .status(401)
        .json({ success: false, error: "Chat id is required." });
    }

    const userDetails = await User.findOne({ chatId });
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, error: "User does not exist." });
    }

    //Add unclaimed phn to balance

    const unclaimedMineBalance = userDetails.unclaimedMineBalance;

    userDetails.balance += unclaimedMineBalance;

    //Credit 10% of unclaimedMineBalance to referrer

    const referrer = await User.findOne({
      referrals: { $elemMatch: { chatId } },
    });

    if (referrer) {
      let peopleTheyReferred = referrer.referrals;
      peopleTheyReferred.forEach((eachPerson) => {
        if (eachPerson.chatId == chatId) {
          eachPerson.commission += unclaimedMineBalance * 0.1;
        }
      });
      await referrer.save();
    }

    //Reset unclaimed phn balance
    userDetails.unclaimedMineBalance = 0;
    return res.status(200).json({ success: true, data: "Mine claimed." });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

app.get("/friends/:chatId", async (req, res) => {
  const { chatId } = req.params;
  if (!chatId) {
    return res
      .status(401)
      .json({ success: false, error: "Chat id is required." });
  }

  try {
    const userDetails = await User.findOne({ chatId });
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, error: "User does not exist." });
    }

    const allFriends = userDetails.referrals;
    let totalReferralIncome = 0;
    let allFriendsDetails = [];
    allFriends.forEach(async (eachFriend) => {
      referralIncome += eachFriend.commission;
      const friendDetails = await User.findOne({ chatId: eachFriend.chatId });
      let relevantDetails = {
        username: friendDetails.username,
        photo: friendDetails.photo,
        level: friendDetails.level,
        commission: friendDetails.level,
      };
      allFriendsDetails.push(relevantDetails);
    });

    const resData = { totalReferralIncome, allFriendsDetails };
    return res.status(404).json({ success: true, data: resData });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

bot.start(async (data) => {
  queue.enqueue(async () => {
    try {
      //If user clicked a referral link
      if (data.payload) {
        return await handleReferral(data);
      }

      //Creates an account for new users
      await initUser(data);

      await showMenu(data)
    } catch (error) {
      console.log(error);
      handleError(error, data);
    }
  });
});

bot.action("invite-link", async (data) => {
  queue.enqueue(async () => {
    try {
      const { id } = data.from;
      const referralLink = `https://t.me/phonetonbot?start=${id}`;
      data.reply(`Your invitation link:\n\n\`${referralLink}\``, {
        parse_mode: "Markdown",
      });
    } catch (error) {
      handleError(error, data);
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

//Connect to DB
const URI = process.env.URI;
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to DB");
    //Begin task verification cycle
    verifyTasks();
  })
  .catch((err) => console.log(err));

// Log a message when the bot is connected
bot.telegram
  .getMe()
  .then((botInfo) => {
    console.log(`Bot ${botInfo.username} is connected and running.`);
    bot.launch();
  })
  .catch((err) => {
    console.error("Error connecting bot:", err);
  });


