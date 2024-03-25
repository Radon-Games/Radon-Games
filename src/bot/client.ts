import { PrismaClient } from "@prisma/client";
import {
  CacheType,
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits
} from "discord.js";

export type ClientWithCommands = Client<true> & {
  commands: Map<
    string,
    (
      interaction: ChatInputCommandInteraction<CacheType>
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
