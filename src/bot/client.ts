import { PrismaClient } from "@prisma/client";
import {
  ButtonInteraction,
  CacheType,
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
  MessageContextMenuCommandInteraction,
  ModalSubmitInteraction,
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
  modals: Map<
    string,
    (
      interaction: ModalSubmitInteraction<CacheType>,
      id?: string
    ) => Promise<void> | void
  >;
  buttons: Map<
    string,
    (
      interaction: ButtonInteraction<CacheType>,
      id: string,
      data?: string
    ) => Promise<void> | void
  >;
  prisma: PrismaClient;
};

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
}) as ClientWithCommands;

client.commands = new Map();
client.modals = new Map();
client.buttons = new Map();
client.prisma = new PrismaClient();

export { client };
