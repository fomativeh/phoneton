module.exports = handleError = (error, data) => {
  console.log(error);
  if (data) {
    data.reply("An error occured.");
  }
};
