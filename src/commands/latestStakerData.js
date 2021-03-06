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

    if (args.length < 1) {
      reply(
        `ERROR: Invalid number of arguments. ${args.length} of required 1 provided.`,
        inReplyTo(message.message_id)
      );
      return;
    }

    const network = args[1] ? args[1].toLowerCase() : 'mainnet';
    const staker = args[0];
    const getLatestStakerData = helpers.getStakingFunction(
      network,
      'getLatestStakerData'
    );

    try {
      const result = await getLatestStakerData(staker);

      let msg = '';
      msg = msg.concat(
        `Stake: \`${helpers.toHumanWei(result.stake)} KNC\`\n`,
        `Delegated Stake: \`${helpers.toHumanWei(
          result.delegatedStake
        )} KNC\`\n`,
        `Representative: \`${result.representative}\``
      );

      replyWithMarkdown(msg, inReplyTo(message.message_id));
    } catch (e) {
      replyWithMarkdown(e.message, inReplyTo(message.message_id));
    }
  };
};
