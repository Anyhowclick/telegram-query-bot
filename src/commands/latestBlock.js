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

    const network = args[0] ? args[0].toLowerCase() : 'mainnet';
    const { provider } = helpers.getEthLib(network);
    const blockNumber = await provider.getBlockNumber();

    replyWithMarkdown(`${blockNumber}`, inReplyTo(message.message_id));
  };
};
