module.exports = isUserInChannel = async (channelId, userId, bot) => {
    try {
      const chatMember = await bot.telegram.getChatMember(channelId, userId);
      // Check if the user is a member or an admin (not kicked or left)
      const isMember = ['member', 'administrator', 'creator'].includes(chatMember.status);
      return { error: false, isMember };
    } catch (error) {
      handleError(error);
      return { error: true, isMember: false };
    }
  };
  