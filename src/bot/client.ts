import { PrismaClient } from "@prisma/client";
import {
  CacheType,
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction
} from "discord.js";

export type ClientWithCommands = Client<true> & {
  commands: Map<
    string,
    (
      interaction:
        | ChatInputCommandInteraction<CacheType>
        | MessageContextMenuCommandInteraction<CacheType>
        | UserContextMenuCommandInteraction<CacheType>
    ) => Promise<void> | void
  >;
  prisma: PrismaClient;
};

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
}) as ClientWithCommands;

client.commands = new Map();
client.prisma = new PrismaClient();

export { client };
