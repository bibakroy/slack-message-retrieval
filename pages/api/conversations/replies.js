const { WebClient } = require("@slack/web-api");

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

export default async function handler(req, res) {
  const { channelName, ts } = req.body.data;

  try {
    const channelList = await client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
    });
    for (const channel of channelList.channels) {
      if (channel.name === channelName) {
        const conversationHistory = await client.conversations.replies({
          token: process.env.SLACK_BOT_TOKEN,
          channel: channel.id,
          ts: ts,
        });
        console.log("messages", conversationHistory);
        return res.status(200).json({ replies: conversationHistory.messages });
      }
    }
    return res.status(404).send("Channel not found");
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }
}
