const Extra = require('telegraf/extra');

module.exports = () => {
  return async (ctx) => {
    const { helpers, message, reply, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { args } = state.command;

    if (!state.allowed) {
      reply(
        'You are not whitelisted to use this bot',
        inReplyTo(message.message_id)
      );
      return;
    }

    if (args.length !== 1) {
      reply(
        `ERROR: Invalid number of arguments. ${args.length} of 1 provided.`,
        inReplyTo(message.message_id)
      );
      return;
    }

    const ethers = helpers.getEthLib('mainnet').ethers;
    const qty = args[0];

    try {
      const result = ethers.utils.parseEther(qty);
      replyWithMarkdown(result.toString(), inReplyTo(message.message_id));
    } catch (e) {
      replyWithMarkdown(e.toString(), inReplyTo(message.message_id));
    }
  };
};
