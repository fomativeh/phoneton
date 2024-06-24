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
const phonesData = require("./phonesData");
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

app.get("/buy/:chatId/:level", async (req, res) => {
  const { chatId, level } = req.params;
  if (!chatId) {
    return res
      .status(401)
      .json({ success: false, error: "Chat id is required." });
  }

  if (!level) {
    return res
      .status(401)
      .json({ success: false, error: "Level is required." });
  }

  if (level < 0 || level > 10) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid level provided." });
  }

  try {
    const userDetails = await User.findOne({ chatId });
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, error: "User does not exist." });
    }

    const price = phonesData.filter((eachPhone) => eachPhone.level == level)[0]
      .price;

    if (userDetails.mineBalance < price) {
      return res
        .status(401)
        .json({ success: false, error: "Insufficient balance." });
    }

    //Deduct balance and update level
    userDetails.level = level;
    userDetails.mineBalance -= price;
    await userDetails.save();

    return res.status(200).json({ success: true, data: "Unlock successful" });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

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

    let amountEarnedFromReferrals = 0;

    let modified = false;
    //Sum commissions and reset
    userDetails.referrals.forEach((eachReferredPerson) => {
      amountEarnedFromReferrals += eachReferredPerson.commission;
      eachReferredPerson.commission = 0;
    });
    modified = true;

    // console.log(amountEarnedFromReferrals)
    //Add referral income to mined balance
    userDetails.mineBalance += amountEarnedFromReferrals;
    if (modified) {
      // Mark the referrals array as modified
      userDetails.markModified("referrals");
      await userDetails.save();
    }

    return res
      .status(200)
      .json({ success: true, data: "Referral income claimed." });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

app.get("/claim-mine/:chatId/:amount", async (req, res) => {
  try {
    let { chatId, amount } = req.params;
    amount = parseInt(amount)
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

    if (!amount) {
      return res
        .status(404)
        .json({ success: false, error: "Claim amount is required." });
    }

    if (amount <= 0) {
      return res.status(404).json({
        success: false,
        error: "Claim amount must be greater than 0.",
      });
    }

    // //Add unclaimed phn to balance
    // const unclaimedMineBalance = userDetails.unclaimedMineBalance;
    // if (unclaimedMineBalance == 0) return;

    // console.log(userDetails.mineBalance, amount, userDetails.mineBalance+amount)
    //Add claim amount to balance
    userDetails.mineBalance += amount;

    //Credit 10% of unclaimedMineBalance to referrer

    const referrer = await User.findOne({
      referrals: { $elemMatch: { chatId } },
    });

    // console.log(referrer)

    if (referrer) {
      let modified = false;
      let peopleTheyReferred = referrer.referrals;
      peopleTheyReferred.forEach((eachPerson) => {
        if (eachPerson.chatId == chatId) {
          eachPerson.commission += amount * 0.1;
          modified = true;
        }
      });
      if (modified) {
        // Mark the referrals array as modified
        referrer.markModified("referrals");
        await referrer.save();
      }
    }

    // automatically begin new mining cycle

    const startTime = new Date();
    const expectedEndTime = new Date(startTime.getTime() + 6 * 60 * 60 * 1000); // 6 hours later
    // const expectedEndTime = new Date(startTime.getTime() + 4 * 60 * 1000); // 4 minutes later

    userDetails.mineTimerStart = startTime;
    userDetails.mineTimerEnd = expectedEndTime;

    await userDetails.save();
    return res.status(200).json({ success: true, data: "Mine claimed." });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

app.get("/start-mine/:chatId", async (req, res) => {
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

    if (userDetails.expectedEndTime) {
      const endTimeString = new Date(
        userDetails.expectedEndTime
      ).toLocaleString();
      return res.status(400).json({
        success: false,
        error: `Wait for current countdown to end in ${endTimeString}`,
      });
    }

    const startTime = new Date();
    const expectedEndTime = new Date(startTime.getTime() + 6 * 60 * 60 * 1000); // 6 hours later

    userDetails.mineTimerStart = startTime;
    userDetails.mineTimerEnd = expectedEndTime;

    await userDetails.save();
    return res.status(200).json({ success: true, data: "Mine started." });
  } catch (error) {
    res.status(500).json({ success: false, error });
    handleError(error);
  }
});

app.get("/claim-daily-reward/:chatId/:amount", async (req, res) => {
  try {
    let { chatId, amount } = req.params;
    amount = parseInt(amount)
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

    if (!amount) {
      return res
        .status(404)
        .json({ success: false, error: "Reward amount is required." });
    }

    if (amount <= 0) {
      return res.status(404).json({
        success: false,
        error: "Reward amount must be greater than 0.",
      });
    }

    const claimTime = new Date()

    userDetails.mineBalance+=amount
    userDetails.lastDailyRewardClaimTime = claimTime

    await userDetails.save()


    return res.status(200).json({ success: true, data: "Reward(s) claimed." });
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

      await showMenu(data);
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
