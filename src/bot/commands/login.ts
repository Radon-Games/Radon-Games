import client from "..";
import { message } from "../messages/generatingCode";
import { createMessage } from "../messages/loginCode";
import {
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  GuildMember
} from "discord.js";
import { generateCode } from "~/util/loginCodes";

export const command: ChatInputApplicationCommandData = {
  name: "login",
  description: "Generates a one time login code."
};

export async function handle(interaction: ChatInputCommandInteraction) {
  if (!interaction.member) return;

  await interaction.reply(message);

  const code = generateCode(interaction.user.id);

  const nickname =
    (interaction.member instanceof GuildMember
      ? interaction.member.nickname
      : interaction.member.nick) || interaction.user.username;

  await client.prisma.profile.upsert({
    where: {
      id: interaction.user.id
    },
    update: {
      username: interaction.user.username,
      displayName: nickname,
      avatar: interaction.user.avatarURL() ?? "",
      playTokens: {
        increment: 1
      },
      lastToken: new Date()
    },
    create: {
      id: interaction.user.id,
      username: interaction.user.username,
      displayName: nickname,
      avatar: interaction.user.avatarURL() ?? "",
      user: {
        create: {
          settings: "",
          permissions: ""
        }
      }
    }
  });

  await interaction.editReply(createMessage(code));
}
