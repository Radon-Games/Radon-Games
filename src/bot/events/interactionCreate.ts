import { client } from "../client";
import { Events } from "discord.js";

export function bindInteractionCreateEvent(): void {
  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      if (interaction.isCommand()) {
        if (client.commands.has(interaction.commandName)) {
          client.commands.get(interaction.commandName)?.(interaction);
        }
      } else if (interaction.isModalSubmit()) {
        if (client.modals.has(interaction.customId.split(":")[0])) {
          client.modals.get(interaction.customId.split(":")[0])?.(
            interaction,
            interaction.customId.split(":")[1]
          );
        }
      } else if (interaction.isButton()) {
        if (client.buttons.has(interaction.customId.split(":")[0])) {
          client.buttons.get(interaction.customId.split(":")[0])?.(
            interaction,
            interaction.customId.split(":")[1],
            interaction.customId.split(":")[2]
          );
        }
      }
    } catch {
      // Do nothing
    }
  });
}
