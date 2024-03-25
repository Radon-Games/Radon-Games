import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";

export const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Terms Of Service")
    .setURL("https://radon.games/terms"),
  new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Privacy Policy")
    .setURL("https://radon.games/privacy")
);

export const message = {
  embeds: [
    new EmbedBuilder()
      .setTitle("Please be patient")
      .setDescription(
        "We are working hard to generate your own unique login code..."
      )
      .setFooter({
        text: "By logging in or signing up, you agree to our Terms Of Service and Privacy Policy."
      })
      .setColor("#f59e0b")
  ],
  components: [actionRow],
  ephemeral: true
};
