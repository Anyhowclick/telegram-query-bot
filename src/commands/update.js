const Extra = require('telegraf/extra');
const shell = require('shelljs');

module.exports = () => {
  return async ctx => {
    const { message, reply, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;

    if (!state.allowed) {
      reply('You are not whitelisted to use this bot', inReplyTo(message.message_id));
      return;
    }

    if (shell.exec('cd /home/ubuntu/telegram-query-bot', { silent : true }).code === 1) {
      reply('ERROR: Unexpected shell error has occured.', inReplyTo(message.message_id));
      return;
    }

    const result = shell.exec('/usr/bin/git pull', { silent : true });

    if (result.code === 1) {
      reply('ERROR: git pull failed', inReplyTo(message.message_id));
      return;
    }

    replyWithMarkdown(result.stdout, inReplyTo(message.message_id));
  };
};
