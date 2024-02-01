import client from "..";
import { message } from "../messages/generatingCode";
import { createMessage } from "../messages/loginCode";
import {
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction
} from "discord.js";
import { generateCode } from "~/util/loginCodes";

export const command: ChatInputApplicationCommandData = {
  name: "login",
  description: "Generates a one time login code."
};

export async function handle(
  interaction:
    | ChatInputCommandInteraction
    | MessageContextMenuCommandInteraction
    | UserContextMenuCommandInteraction
) {
  await interaction.reply(message);

  const code = generateCode(interaction.user.id);

  const user = await client.prisma.user.findUnique({
    where: {
      id: interaction.user.id
    }
  });

  if (!user) {
    await client.prisma.profile.create({
      data: {
        id: interaction.user.id,
        username: interaction.user.username,
        displayName: interaction.user.displayName,
        avatar: interaction.user.avatarURL() ?? "",
        user: {
          create: {
            settings: "",
            permissions: ""
          }
        }
      }
    });
  }

  await interaction.editReply(createMessage(code));
}
