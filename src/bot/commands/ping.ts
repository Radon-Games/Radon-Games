import {
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction
} from "discord.js";

export const command: ChatInputApplicationCommandData = {
  name: "ping",
  description: "Replies with Pong!"
};

export async function handle(
  interaction:
    | ChatInputCommandInteraction
    | MessageContextMenuCommandInteraction
    | UserContextMenuCommandInteraction
) {
  await interaction.reply("Pong!");
}
