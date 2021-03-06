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
    const { ethers } = helpers.getEthLib(network);
    const enabled = helpers.getProxyFunction(network, 'enabled');
    const maxGasPrice = helpers.getProxyFunction(network, 'maxGasPrice');
    const getNetworkData = helpers.getNetworkFunction(
      network,
      'getNetworkData'
    );
    const networkData = await getNetworkData();

    let msg = '';
    msg = msg.concat(
      `enabled: \`${
        (await enabled())
          ? helpers.emojis('checkMark')
          : helpers.emojis('crossMark')
      }\`\n`,
      `negligibleDiffBps: \`${networkData.negligibleDiffBps}\`\n`,
      `maxGasPrice: \`${ethers.utils.formatUnits(await maxGasPrice(), 'gwei')} gwei\`\n`,
      `networkFeeBps: \`${networkData.networkFeeBps}\`\n`,
      `expiryTimestamp: \`${helpers.formatTime(
        networkData.expiryTimestamp
      )}\`\n`
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};
