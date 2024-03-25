import {
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction
} from "discord.js";

export const command: ChatInputApplicationCommandData = {
  name: "ping",
  description: "Replies with Pong!"
};

export async function handle(interaction: ChatInputCommandInteraction) {
  await interaction.reply("Pong!");
}
