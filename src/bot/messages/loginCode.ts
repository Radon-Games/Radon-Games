import { EmbedBuilder } from "discord.js";

export function createMessage(loginCode: string) {
  return {
    embeds: [
      new EmbedBuilder()
        .setTitle(`Login Code: \`${loginCode}\``)
        .setDescription("This code is valid for 24 hours or until it is used.")
        .setColor("#f59e0b")
        .setTimestamp()
    ],
    ephemeral: true
  };
}
