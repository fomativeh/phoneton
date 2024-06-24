const fs = require("fs");
const path = require("path");
module.exports = showMenu = async (data) => {
    //Welcome image path
    const photoPath = path.join(__dirname, "assets/images/logo.jpg");
    const webAppUrl = `https://phoneton.vercel.app`;
    const caption = `📱Welcome to Phone TON Ecosystem!
    
    Click *start* and *mine* the PHN!`;
    await data.replyWithPhoto(
      { source: fs.createReadStream(photoPath) },
      {
        caption: caption,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Start",
                web_app: {
                  url: webAppUrl,
                },
              },
            ],
            [
              {
                text: "Invite link",
                callback_data: "invite-link",
              },
            ],
            [
              {
                text: "Invite friends",
                url: `https://t.me/share/url?url=https://t.me/phonetonbot?start=${data.from.id}&text=Play with me, get coins!\n💸 +28 Coins as a first-time gift\n🔥 +64 Coins if you have Telegram Premium`,
              },
            ],
          ],
        },
      }
    );
  };