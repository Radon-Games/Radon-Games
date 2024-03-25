import { client } from "../client";
import { Events } from "discord.js";

export function bindInteractionCreateEvent(): void {
  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      if (interaction.isChatInputCommand()) {
        if (client.commands.has(interaction.commandName)) {
          client.commands.get(interaction.commandName)?.(interaction);
        }
      }
    } catch {
      // Do nothing
    }
  });
}
