import { EmbedBuilder } from "discord.js";

export const message = {
  embeds: [
    new EmbedBuilder()
      .setTitle("Please be patient")
      .setDescription(
        "We are working hard to generate your own unique login code..."
      )
      .setColor("#f59e0b")
      .setTimestamp()
  ],
  ephemeral: true
};
